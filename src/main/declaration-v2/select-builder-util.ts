import {SelectBuilderData, SelectBuilder, AnySelectBuilder, __DUMMY_FROM_TABLE} from "./select-builder";
import {AnyAliasedTable, AliasedTableUtil} from "./aliased-table";
import {Join, JoinType} from "./join";
import {SelectCollectionUtil} from "./select-collection";
import {spread} from "@anyhowstep/type-util";
import {JoinCollectionUtil} from "./join-collection";
import * as invalid from "./invalid";
import {JoinFromDelegate} from "./join-from-delegate";
import {JoinToDelegate} from "./join-to-delegate";
import {AggregateDelegateUtil} from "./aggregate-delegate";
import {FetchRow} from "./fetch-row";
import {TypeNarrowDelegate} from "./type-narrow-delegate";
import {Column} from "./column";
import {SelectDelegate} from "./select-delegate";

export namespace SelectBuilderUtil {
    export type CleanData = {
        hasSelect : false,
        hasFrom : false,
        hasUnion : false,

        //This is just a dummy JOIN
        //It will be replaced when the FROM clause is added
        joins : [
            Join<
                typeof __DUMMY_FROM_TABLE,
                typeof __DUMMY_FROM_TABLE["columns"],
                true
            >
        ],
        selects : undefined,
        aggregateDelegate : undefined,

        hasParentJoins : false,
        //This is just a dummy JOIN
        //It will be replaced when we have a subquery
        parentJoins : [
            Join<
                typeof __DUMMY_FROM_TABLE,
                typeof __DUMMY_FROM_TABLE["columns"],
                true
            >
        ],
    };
    export type CleanToFromData<ToTableT extends AnyAliasedTable> = (
        {
            readonly [key in keyof CleanData] : (
                key extends "hasFrom" ?
                true :
                key extends "joins" ?
                [
                    Join<
                        AliasedTableUtil.EraseSubType<ToTableT>,
                        ToTableT["columns"],
                        false
                    >
                ] :
                CleanData[key]
            )
        }
    );
    export type CleanToFrom<ToTableT extends AnyAliasedTable> = (
        SelectBuilder<CleanToFromData<ToTableT>>
    );
    export type SelectAllData<DataT extends SelectBuilderData> = (
        {
            readonly [key in keyof DataT] : (
                key extends "selects" ?
                SelectCollectionUtil.FromJoinCollection<DataT["joins"]> :
                key extends "hasSelect" ?
                true :
                DataT[key]
            )
        }
    );
    export type CleanToSelectAll<ToTableT extends AnyAliasedTable> = (
        SelectBuilder<
            SelectAllData<
                CleanToFromData<ToTableT>
            >
        >
    );

    export type FromUnsafe<
        SelectBuilderT extends AnySelectBuilder,
        ToTableT extends AnyAliasedTable
    > = (
        SelectBuilderT extends SelectBuilder<infer DataT> ?
            SelectBuilder<{
                readonly [key in keyof DataT] : (
                    key extends "hasFrom" ?
                    true :
                    key extends "joins" ?
                    [
                        Join<
                            AliasedTableUtil.EraseSubType<ToTableT>,
                            ToTableT["columns"],
                            false
                        >
                    ] :
                    DataT[key]
                )
            }> :
            never
    );
    export type From<
        SelectBuilderT extends AnySelectBuilder,
        ToTableT extends AnyAliasedTable
    > = (
        SelectBuilderT extends SelectBuilder<infer DataT> ?
            JoinCollectionUtil.FindWithTableAlias<DataT["parentJoins"], ToTableT["alias"]> extends never ?
            FromUnsafe<SelectBuilderT, ToTableT> :
            invalid.E4<
                "Alias",
                ToTableT["alias"],
                "was already used as join in parent scope",
                JoinCollectionUtil.FindWithTableAlias<DataT["parentJoins"], ToTableT["alias"]>
            > :
            never
    );
    export function from<
        SelectBuilderT extends AnySelectBuilder,
        ToTableT extends AnyAliasedTable
    > (s : SelectBuilderT, toTable : ToTableT) : (
        From<SelectBuilderT, ToTableT>
    ) {
        if (s.data.hasFrom) {
            throw new Error(`FROM clause already exists`);
        }
        if (s.data.hasParentJoins) {
            JoinCollectionUtil.assertNonDuplicateTableAlias(
                s.data.parentJoins,
                toTable.alias
            );
        }
        return new SelectBuilder(spread(
            s.data,
            {
                hasFrom : true,
                joins : [
                    new Join(
                        JoinType.FROM,
                        toTable,
                        toTable.columns,
                        false,
                        [],
                        []
                    )
                ]
            }
        ), s.extraData) as any;
    }

    //TODO Rename everything else to DoXxx
    export type DoJoin<
        SelectBuilderT extends AnySelectBuilder,
        ToTableT extends AnyAliasedTable
    > = (
        SelectBuilderT extends SelectBuilder<infer DataT> ?
            (
                Error extends JoinCollectionUtil.InnerJoin<SelectBuilder<DataT>, ToTableT> ?
                    JoinCollectionUtil.InnerJoin<SelectBuilder<DataT>, ToTableT> :
                    SelectBuilder<{
                        readonly [key in keyof DataT] : (
                            key extends "joins" ?
                            JoinCollectionUtil.InnerJoinUnsafe<DataT["joins"], ToTableT> :
                            DataT[key]
                        )
                    }>
            ) :
            never
    );
    export function doJoin<
        SelectBuilderT extends AnySelectBuilder,
        ToTableT extends AnyAliasedTable,
        FromDelegateT extends JoinFromDelegate<SelectBuilderT["data"]["joins"]>
    > (
        s : SelectBuilderT,
        toTable : ToTableT,
        fromDelegate : FromDelegateT,
        toDelegate : JoinToDelegate<ToTableT, ReturnType<FromDelegateT>>
    ) : (
        DoJoin<SelectBuilderT, ToTableT>
    ) {
        s.assertAfterFrom();
        return new SelectBuilder(spread(
            s.data,
            {
                joins : JoinCollectionUtil.innerJoin(
                    s,
                    toTable,
                    fromDelegate as any,
                    toDelegate
                )
            }
        ), s.extraData) as any;
    }

    export type Select<
        SelectBuilderT extends AnySelectBuilder,
        SelectDelegateT extends SelectDelegate<SelectBuilderT>
    > = (
        SelectBuilderT extends SelectBuilder<infer DataT> ?
            (
                Error extends SelectCollectionUtil.AppendSelect<
                    SelectBuilderT["data"]["selects"],
                    SelectBuilderT,
                    SelectDelegateT
                > ?
                    SelectCollectionUtil.AppendSelect<
                        SelectBuilderT["data"]["selects"],
                        SelectBuilderT,
                        SelectDelegateT
                    > :
                    (
                        SelectBuilder<{
                            readonly [key in keyof DataT] : (
                                key extends "selects" ?
                                SelectCollectionUtil.AppendSelectUnsafe<
                                    SelectBuilderT["data"]["selects"],
                                    SelectBuilderT,
                                    SelectDelegateT
                                > :
                                key extends "hasSelect" ?
                                true :
                                DataT[key]
                            )
                        }>
                    )
            ) :
            never
    );
    export type SelectAll<SelectBuilderT extends AnySelectBuilder> = (
        SelectBuilderT extends SelectBuilder<infer DataT> ?
            SelectBuilder<{
                readonly [key in keyof DataT] : (
                    key extends "selects" ?
                    SelectCollectionUtil.FromJoinCollection<DataT["joins"]> :
                    key extends "hasSelect" ?
                    true :
                    DataT[key]
                )
            }> :
            never
    );
    export function selectAll<
        SelectBuilderT extends AnySelectBuilder
    > (s : SelectBuilderT) : (
        SelectAll<SelectBuilderT>
    ) {
        s.assertBeforeSelect();
        s.assertAfterFrom();
        s.assertBeforeUnion();
        return new SelectBuilder(spread(
            s.data,
            {
                hasSelect : true,
                selects : SelectCollectionUtil.fromJoinCollection(s.data.joins)
            }
        ), s.extraData) as any;
    }

    export type AggregatedRow<
        SelectBuilderT extends AnySelectBuilder
    > = (
        AggregateDelegateUtil.AggregatedRow<
            FetchRow<
                SelectBuilderT["data"]["joins"],
                SelectCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["selects"]>
            >,
            SelectBuilderT["data"]["aggregateDelegate"]
        >
    );
    //If there is a RIGHT JOIN, we cannot set the `nullable` part to false
    //for the JOIN at the moment.
    //The type system isn't strong enough at the moment
    export type WhereIsNotNull<
        SelectBuilderT extends AnySelectBuilder,
        TypeNarrowDelegateT extends TypeNarrowDelegate<SelectBuilderT>
    > = (
        SelectBuilderT extends SelectBuilder<infer DataT> ?
            (
                ReturnType<TypeNarrowDelegateT> extends Column<infer TableAliasT, infer ColumnNameT, infer TypeT> ?
                    SelectBuilder<{
                        readonly [key in keyof DataT] : (
                            key extends "joins" ?
                            (
                                JoinCollectionUtil.HasRightJoin<DataT["joins"]> extends true ?
                                    JoinCollectionUtil.ReplaceColumnType<
                                        DataT["joins"],
                                        TableAliasT,
                                        ColumnNameT,
                                        Exclude<
                                            TypeT,
                                            null|undefined
                                        >
                                    > :
                                    JoinCollectionUtil.ReplaceColumnType<
                                        JoinCollectionUtil.ReplaceNullable<
                                            DataT["joins"],
                                            TableAliasT,
                                            false
                                        >,
                                        TableAliasT,
                                        ColumnNameT,
                                        Exclude<
                                            TypeT,
                                            null|undefined
                                        >
                                    >
                            ) :
                            key extends "selects" ?
                            SelectCollectionUtil.ReplaceSelectType<
                                DataT["selects"],
                                TableAliasT,
                                ColumnNameT,
                                Exclude<
                                    TypeT,
                                    null|undefined
                                >
                            > :
                            key extends "parentJoins" ?
                            (
                                JoinCollectionUtil.HasRightJoin<DataT["parentJoins"]> extends true ?
                                    JoinCollectionUtil.ReplaceColumnType<
                                        DataT["parentJoins"],
                                        TableAliasT,
                                        ColumnNameT,
                                        Exclude<
                                            TypeT,
                                            null|undefined
                                        >
                                    > :
                                    JoinCollectionUtil.ReplaceColumnType<
                                        JoinCollectionUtil.ReplaceNullable<
                                            DataT["parentJoins"],
                                            TableAliasT,
                                            false
                                        >,
                                        TableAliasT,
                                        ColumnNameT,
                                        Exclude<
                                            TypeT,
                                            null|undefined
                                        >
                                    >
                            ) :
                            DataT[key]
                        )
                    }> :
                    (invalid.E2<"Invalid column or could not infer some types", ReturnType<TypeNarrowDelegateT>>)
            ) :
            never
    );
    export type WhereIsNull<
        SelectBuilderT extends AnySelectBuilder,
        TypeNarrowDelegateT extends TypeNarrowDelegate<SelectBuilderT>
    > = (
        SelectBuilderT extends SelectBuilder<infer DataT> ?
            (
                ReturnType<TypeNarrowDelegateT> extends Column<infer TableAliasT, infer ColumnNameT, infer TypeT> ?
                    SelectBuilder<{
                        readonly [key in keyof DataT] : (
                            key extends "joins" ?
                            JoinCollectionUtil.ReplaceColumnType<
                                DataT["joins"],
                                TableAliasT,
                                ColumnNameT,
                                null
                            > :
                            key extends "selects" ?
                            SelectCollectionUtil.ReplaceSelectType<
                                DataT["selects"],
                                TableAliasT,
                                ColumnNameT,
                                null
                            > :
                            key extends "parentJoins" ?
                            JoinCollectionUtil.ReplaceColumnType<
                                DataT["parentJoins"],
                                TableAliasT,
                                ColumnNameT,
                                null
                            > :
                            DataT[key]
                        )
                    }> :
                    (invalid.E2<"Invalid column or could not infer some types", ReturnType<TypeNarrowDelegateT>>)
            ) :
            never
    );
    export type WhereIsEqual<
        SelectBuilderT extends AnySelectBuilder,
        TypeNarrowDelegateT extends TypeNarrowDelegate<SelectBuilderT>,
        ConstT extends boolean|number|string
    > = (
        SelectBuilderT extends SelectBuilder<infer DataT> ?
            (
                ReturnType<TypeNarrowDelegateT> extends Column<infer TableAliasT, infer ColumnNameT, infer TypeT> ?
                    SelectBuilder<{
                        readonly [key in keyof DataT] : (
                            key extends "joins" ?
                            JoinCollectionUtil.ReplaceColumnType<
                                DataT["joins"],
                                TableAliasT,
                                ColumnNameT,
                                ConstT
                            > :
                            key extends "selects" ?
                            SelectCollectionUtil.ReplaceSelectType<
                                DataT["selects"],
                                TableAliasT,
                                ColumnNameT,
                                ConstT
                            > :
                            DataT[key]
                        )
                    }> :
                    (invalid.E2<"Invalid column or could not infer some types", ReturnType<TypeNarrowDelegateT>>)
            ) :
            never
    );
}
//Convenience
export type AggregatedRow<SelectBuilderT extends AnySelectBuilder> = (
    SelectBuilderUtil.AggregatedRow<SelectBuilderT>
);