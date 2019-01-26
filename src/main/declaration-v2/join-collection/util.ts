import * as sd from "schema-decorator";
import {JoinCollection} from "./join-collection";
import {TupleKeys, TupleLength, tupleWPush, TupleWPush} from "../tuple";
import {ColumnCollectionUtil} from "../column-collection";
import {JoinType, Join, AnyJoin, JoinUtil} from "../join";
import {AnyColumn, ColumnTupleUtil} from "../column";
import {AnyAliasedTable, AliasedTableUtil} from "../aliased-table";
import {JoinFromDelegate, JoinFromDelegateUtil} from "../join-from-delegate";
import {JoinToDelegate, JoinToDelegateUtil} from "../join-to-delegate";
import * as invalid from "../invalid";
import {AnySelectBuilder} from "../select-builder";

import {Column} from "../column";
import {AliasedTable} from "../aliased-table";
import {ColumnCollection} from "../column-collection";
Column;
AliasedTable;
const _0 : ColumnCollection|undefined = undefined;
_0;

export namespace JoinCollectionUtil {
    //Types only
    export type FindWithTableAlias<JoinsT extends JoinCollection, TableAliasT extends string> = (
        {
            [index in TupleKeys<JoinsT>] : (
                Extract<JoinsT[index], AnyJoin>["table"]["alias"] extends TableAliasT ?
                    Extract<JoinsT[index], AnyJoin> :
                    never
            )
        }[TupleKeys<JoinsT>]
    );
    export function findWithTableAlias<
        JoinsT extends JoinCollection, TableAliasT extends string
    > (
        joins : JoinsT,
        tableAlias : TableAliasT
    ) : AnyJoin|undefined {
        return joins.find(j => j.table.alias == tableAlias) as any;
    }
    export type IndexWithTableAlias<JoinsT extends JoinCollection, TableAliasT extends string> = (
        {
            [index in TupleKeys<JoinsT>] : (
                Extract<JoinsT[index], AnyJoin>["table"]["alias"] extends TableAliasT ?
                    index :
                    never
            )
        }[TupleKeys<JoinsT>]
    );
    export type Joins<JoinsT extends JoinCollection> = (
        Extract<
            {
                [index in TupleKeys<JoinsT>] : (
                    JoinsT[index]
                )
            }[TupleKeys<JoinsT>],
            AnyJoin
        >
    );
    export type TableAliases<JoinsT extends JoinCollection> = (
        Joins<JoinsT>["table"]["alias"]
    );
    export type Tables<JoinsT extends JoinCollection> = (
        Joins<JoinsT>["table"]
    );
    export type ToTableCollectionImpl<JoinsT extends JoinCollection, K extends string> = (
        K extends Extract<keyof JoinsT, string> ?
            (
                JoinsT[K] extends Join<infer TableT, any, any> ?
                    {
                        readonly [tableAlias in TableT["alias"]] : (
                            TableT
                        )
                    } :
                    {}
            ) :
            {}
    );
    /*
    function gen (max) {
	const base = [];
	for (let i=0; i<=max; ++i) {
            base.push(`ToTableCollectionImpl<JoinsT, "${i}">`);
        }
        return base.join(" &\n    ");
    }

    gen(50)
    */
    export type ToTableCollection<JoinsT extends JoinCollection> = (
        ToTableCollectionImpl<JoinsT, "0"> &
        ToTableCollectionImpl<JoinsT, "1"> &
        ToTableCollectionImpl<JoinsT, "2"> &
        ToTableCollectionImpl<JoinsT, "3"> &
        ToTableCollectionImpl<JoinsT, "4"> &
        ToTableCollectionImpl<JoinsT, "5"> &
        ToTableCollectionImpl<JoinsT, "6"> &
        ToTableCollectionImpl<JoinsT, "7"> &
        ToTableCollectionImpl<JoinsT, "8"> &
        ToTableCollectionImpl<JoinsT, "9"> &
        ToTableCollectionImpl<JoinsT, "10"> &
        ToTableCollectionImpl<JoinsT, "11"> &
        ToTableCollectionImpl<JoinsT, "12"> &
        ToTableCollectionImpl<JoinsT, "13"> &
        ToTableCollectionImpl<JoinsT, "14"> &
        ToTableCollectionImpl<JoinsT, "15"> &
        ToTableCollectionImpl<JoinsT, "16"> &
        ToTableCollectionImpl<JoinsT, "17"> &
        ToTableCollectionImpl<JoinsT, "18"> &
        ToTableCollectionImpl<JoinsT, "19"> &
        ToTableCollectionImpl<JoinsT, "20"> /*&
        ToTableCollectionImpl<JoinsT, "21"> &
        ToTableCollectionImpl<JoinsT, "22"> &
        ToTableCollectionImpl<JoinsT, "23"> &
        ToTableCollectionImpl<JoinsT, "24"> &
        ToTableCollectionImpl<JoinsT, "25"> &
        ToTableCollectionImpl<JoinsT, "26"> &
        ToTableCollectionImpl<JoinsT, "27"> &
        ToTableCollectionImpl<JoinsT, "28"> &
        ToTableCollectionImpl<JoinsT, "29"> &
        ToTableCollectionImpl<JoinsT, "30"> &
        ToTableCollectionImpl<JoinsT, "31"> &
        ToTableCollectionImpl<JoinsT, "32"> &
        ToTableCollectionImpl<JoinsT, "33"> &
        ToTableCollectionImpl<JoinsT, "34"> &
        ToTableCollectionImpl<JoinsT, "35"> &
        ToTableCollectionImpl<JoinsT, "36"> &
        ToTableCollectionImpl<JoinsT, "37"> &
        ToTableCollectionImpl<JoinsT, "38"> &
        ToTableCollectionImpl<JoinsT, "39"> &
        ToTableCollectionImpl<JoinsT, "40"> &
        ToTableCollectionImpl<JoinsT, "41"> &
        ToTableCollectionImpl<JoinsT, "42"> &
        ToTableCollectionImpl<JoinsT, "43"> &
        ToTableCollectionImpl<JoinsT, "44"> &
        ToTableCollectionImpl<JoinsT, "45"> &
        ToTableCollectionImpl<JoinsT, "46"> &
        ToTableCollectionImpl<JoinsT, "47"> &
        ToTableCollectionImpl<JoinsT, "48"> &
        ToTableCollectionImpl<JoinsT, "49"> &
        ToTableCollectionImpl<JoinsT, "50">*/
    );
    export function toTableCollection<JoinsT extends JoinCollection> (
        joins : JoinsT
    ) : ToTableCollection<JoinsT> {
        return joins.reduce((memo, join) => {
            memo[join.table.alias] = join.table;
            return memo;
        }, {} as any);
    }

    export type Columns<JoinsT extends JoinCollection> = (
        {
            [index in TupleKeys<JoinsT>] : (
                ColumnCollectionUtil.Columns<
                    Extract<JoinsT[index], AnyJoin>["columns"]
                >
            )
        }[TupleKeys<JoinsT>]
    );
    export type NullableColumns<JoinsT extends JoinCollection> = (
        {
            [index in TupleKeys<JoinsT>] : (
                ColumnCollectionUtil.Columns<
                    ColumnCollectionUtil.ToNullable<
                        Extract<JoinsT[index], AnyJoin>["columns"]
                    >
                >
            )
        }[TupleKeys<JoinsT>]
    );

    //Types with implementation
    export const push = tupleWPush<AnyJoin>();

    export type NullableTableAlias<
        JoinsT extends JoinCollection
    > = (
        {
            [index in TupleKeys<JoinsT>] : (
                true extends Extract<JoinsT[index], AnyJoin>["nullable"] ?
                    Extract<JoinsT[index], AnyJoin>["table"]["alias"] :
                    never
            )
        }[TupleKeys<JoinsT>]
    )
    //Needs to take the `nullable` status of the join into account...
    export type ToColumnReferences<
        JoinsT extends JoinCollection
    > = (
        Joins<JoinsT> extends AnyJoin ?
            (
                Joins<JoinsT>["table"] extends AnyAliasedTable ?
                    {
                        readonly [tableAlias in Joins<JoinsT>["table"]["alias"]] : (
                            FindWithTableAlias<JoinsT, tableAlias> extends AnyJoin ?
                            (
                                true extends FindWithTableAlias<JoinsT, tableAlias>["nullable"] ?
                                    ColumnCollectionUtil.ToNullable<FindWithTableAlias<JoinsT, tableAlias>["columns"]> :
                                    FindWithTableAlias<JoinsT, tableAlias>["columns"]
                            ) :
                            never
                        )
                    } :
                    {}
            ) :
            {}
    );
    export function toColumnReferences<JoinsT extends JoinCollection> (
        joins : JoinsT
    ) : (
        ToColumnReferences<JoinsT>
    ) {
        return joins.reduce((memo, join) => {
            if (join.nullable) {
                memo[join.table.alias] = ColumnCollectionUtil.toNullable(join.columns);
            } else {
                memo[join.table.alias] = join.columns;
            }
            return memo;
        }, {} as any);
    }

    //ColumnReferencesUtil.ToConvenient<> exists,
    //TODO Maybe remove this one?
    export type ToConvenientColumnReferences<
        JoinsT extends JoinCollection
    > = (
        JoinsT["length"] extends 1 ?
            //Only one table
            (
                //Give a column collection
                ToColumnReferences<JoinsT>[
                    keyof ToColumnReferences<JoinsT>
                ]
            ) :
            //Muli-table
            ToColumnReferences<JoinsT>
    );
    export function toConvenientColumnReferences<
        JoinsT extends JoinCollection
    > (joins : JoinsT) : (
        ToConvenientColumnReferences<JoinsT>
    ) {
        if (joins.length == 1) {
            return (toColumnReferences(joins) as any)[
                joins[0].table.alias
            ] as any;
        } else {
            return toColumnReferences(joins) as any;
        }
    }

    export type ToNullable<JoinsT extends JoinCollection> = (
        Joins<JoinsT> extends AnyJoin ?
            (
                {
                    [index in TupleKeys<JoinsT>] : (
                        JoinsT[index] extends AnyJoin ?
                            JoinUtil.ToNullable<JoinsT[index]> :
                            never
                    )
                } &
                {
                    length : JoinsT["length"],
                    "0" : JoinUtil.ToNullable<JoinsT[0]>
                } &
                AnyJoin[]
            ) :
            never
    );
    export function toNullable<
        JoinsT extends JoinCollection
    > (
        joins : JoinsT
    ) : (
        ToNullable<JoinsT>
    ) {
        return joins.map(JoinUtil.toNullable) as any;
    }

    export type Duplicates<A extends JoinCollection, B extends JoinCollection> = (
        FindWithTableAlias<A, Extract<TableAliases<B>, string>>
    );
    export function assertNonDuplicateTableAlias (joins : JoinCollection, tableAlias : string) {
        joins.forEach((join, index) => {
            if (join.table.alias == tableAlias) {
                throw new Error(`Alias ${tableAlias} was already used as join ${index}`);
            }
        });
    }
    export function assertNoDuplicates (a : JoinCollection, b : JoinCollection) {
        b.forEach((join) => {
            assertNonDuplicateTableAlias(a, join.table.alias);
        });
    }
    export function assertHasColumn (joins : JoinCollection, column : AnyColumn) {
        const join = joins.find((join) => {
            if (join.table.alias != column.tableAlias) {
                return false;
            }
            return ColumnCollectionUtil.hasColumn(join.columns, column);
        });
        if (join == null) {
            throw new Error(`Column ${column.tableAlias}.${column.name} does not exist in joins`);
        }
    }
    export function assertHasColumns (joins : JoinCollection, arr : AnyColumn[]) {
        for (let i of arr) {
            assertHasColumn(joins, i);
        }
    }

    export type InnerJoinUnsafe<
        JoinsT extends JoinCollection,
        ToTableT extends AnyAliasedTable
    > = (
        TupleWPush<
            AnyJoin,
            JoinsT,
            Join<
                AliasedTableUtil.EraseSubType<ToTableT>,
                ToTableT["columns"],
                false
            >
        >
    );
    export type RightJoinUnsafe<
        JoinsT extends JoinCollection,
        ToTableT extends AnyAliasedTable
    > = (
        TupleWPush<
            AnyJoin,
            JoinCollectionUtil.ToNullable<JoinsT>,
            Join<
                AliasedTableUtil.EraseSubType<ToTableT>,
                ToTableT["columns"],
                false
            >
        >
    );
    export type LeftJoinUnsafe<
        JoinsT extends JoinCollection,
        ToTableT extends AnyAliasedTable
    > = (
        TupleWPush<
            AnyJoin,
            JoinsT,
            Join<
                AliasedTableUtil.EraseSubType<ToTableT>,
                ToTableT["columns"],
                true
            >
        >
    );
    export type CrossJoinUnsafe<
        JoinsT extends JoinCollection,
        ToTableT extends AnyAliasedTable
    > = (
        TupleWPush<
            AnyJoin,
            JoinsT,
            Join<
                AliasedTableUtil.EraseSubType<ToTableT>,
                ToTableT["columns"],
                false
            >
        >
    );

    export type CheckedJoin<
        SelectBuilderT extends AnySelectBuilder,
        ToTableT extends AnyAliasedTable,
        ResultT extends JoinCollection
    > = (
        FindWithTableAlias<SelectBuilderT["data"]["parentJoins"], ToTableT["alias"]> extends never ?
            (
                FindWithTableAlias<SelectBuilderT["data"]["joins"], ToTableT["alias"]> extends never ?
                    ResultT :
                    invalid.E4<
                        "Alias",
                        ToTableT["alias"],
                        "was already used as join",
                        FindWithTableAlias<SelectBuilderT["data"]["joins"], ToTableT["alias"]>
                    >
            ) :
            invalid.E4<
                "Alias",
                ToTableT["alias"],
                "was already used as join in parent scope",
                FindWithTableAlias<SelectBuilderT["data"]["parentJoins"], ToTableT["alias"]>
            >
    );
    function checkedJoin<
        SelectBuilderT extends AnySelectBuilder,
        ToTableT extends AnyAliasedTable,
        ResultDelegateT extends () => JoinCollection
    > (
        selectBuilder : SelectBuilderT,
        toTable : ToTableT,
        resultDelegate : ResultDelegateT
    ) : (
        CheckedJoin<SelectBuilderT, ToTableT, ReturnType<ResultDelegateT>>
    ) {
        assertNonDuplicateTableAlias(selectBuilder.data.parentJoins, toTable.alias);
        assertNonDuplicateTableAlias(selectBuilder.data.joins, toTable.alias);
        //TODO https://github.com/Microsoft/TypeScript/issues/24277
        return resultDelegate() as any;
    }
    export type CheckedJoinUsing<
        SelectBuilderT extends AnySelectBuilder,
        ToTableT extends AnyAliasedTable,
        FromDelegateT extends JoinFromDelegate<SelectBuilderT["data"]["joins"]>,
        ResultT extends JoinCollection,
    > = (
        JoinToDelegateUtil.CreateUsing<ToTableT, ReturnType<FromDelegateT>> extends never ?
            invalid.E4<
                "Table",
                ToTableT["alias"],
                "does not have some columns",
                Exclude<
                    ColumnTupleUtil.WithTableAlias<ReturnType<FromDelegateT>, ToTableT["alias"]>[TupleKeys<ReturnType<FromDelegateT>>],
                    ColumnCollectionUtil.Columns<ToTableT["columns"]>
                >
            > :
            CheckedJoin<SelectBuilderT, ToTableT, ResultT>
    );
    function checkedJoinUsing<
        SelectBuilderT extends AnySelectBuilder,
        ToTableT extends AnyAliasedTable,
        FromDelegateT extends JoinFromDelegate<SelectBuilderT["data"]["joins"]>,
        ResultT extends JoinCollection,
    > (
        selectBuilder : SelectBuilderT,
        toTable : ToTableT,
        fromDelegate : FromDelegateT,
        resultDelegate : (
            from : ReturnType<FromDelegateT>,
            to : JoinToDelegateUtil.CreateUsingUnsafe<ToTableT, ReturnType<FromDelegateT>>
        ) => ResultT,
    ) : (
        CheckedJoinUsing<SelectBuilderT, ToTableT, FromDelegateT, ResultT>
    ) {
        const from = JoinFromDelegateUtil.execute(
            selectBuilder.data.joins,
            fromDelegate as any
        );
        const to : JoinToDelegateUtil.CreateUsing<
            ToTableT,
            ReturnType<FromDelegateT>
        > = JoinToDelegateUtil.createUsing(toTable, from) as any;

        return checkedJoin(selectBuilder, toTable, () => {
            return resultDelegate(from, to as any);
        }) as any;
    }

    /*export type InnerJoin<
        SelectBuilderT extends AnySelectBuilder,
        ToTableT extends AnyAliasedTable,
    > = (
        CheckedJoin<SelectBuilderT, ToTableT, InnerJoinUnsafe<SelectBuilderT["data"]["joins"], ToTableT>>
    );*/
    export type InnerJoin<
        SelectBuilderT extends AnySelectBuilder,
        ToTableT extends AnyAliasedTable,
    > = (
        FindWithTableAlias<SelectBuilderT["data"]["parentJoins"], ToTableT["alias"]> extends never ?
            (
                FindWithTableAlias<SelectBuilderT["data"]["joins"], ToTableT["alias"]> extends never ?
                    InnerJoinUnsafe<SelectBuilderT["data"]["joins"], ToTableT> :
                    invalid.E4<
                        "Alias",
                        ToTableT["alias"],
                        "was already used as join",
                        FindWithTableAlias<SelectBuilderT["data"]["joins"], ToTableT["alias"]>
                    >
            ) :
            invalid.E4<
                "Alias",
                ToTableT["alias"],
                "was already used as join in parent scope",
                FindWithTableAlias<SelectBuilderT["data"]["parentJoins"], ToTableT["alias"]>
            >
    );
    /*export type InnerJoinUsing<
        SelectBuilderT extends AnySelectBuilder,
        ToTableT extends AnyAliasedTable,
        FromDelegateT extends JoinFromDelegate<SelectBuilderT["data"]["joins"]>
    > = (
        CheckedJoinUsing<SelectBuilderT, ToTableT, FromDelegateT, InnerJoinUnsafe<SelectBuilderT["data"]["joins"], ToTableT>>
    );*/
    export type InnerJoinUsing<
        SelectBuilderT extends AnySelectBuilder,
        ToTableT extends AnyAliasedTable,
        FromDelegateT extends JoinFromDelegate<SelectBuilderT["data"]["joins"]>
    > = (
        JoinToDelegateUtil.CreateUsing<ToTableT, ReturnType<FromDelegateT>> extends never ?
            invalid.E4<
                "Table",
                ToTableT["alias"],
                "does not have some columns",
                Exclude<
                    ColumnTupleUtil.WithTableAlias<ReturnType<FromDelegateT>, ToTableT["alias"]>[TupleKeys<ReturnType<FromDelegateT>>],
                    ColumnCollectionUtil.Columns<ToTableT["columns"]>
                >
            > :
            FindWithTableAlias<SelectBuilderT["data"]["parentJoins"], ToTableT["alias"]> extends never ?
            (
                FindWithTableAlias<SelectBuilderT["data"]["joins"], ToTableT["alias"]> extends never ?
                    InnerJoinUnsafe<SelectBuilderT["data"]["joins"], ToTableT> :
                    invalid.E4<
                        "Alias",
                        ToTableT["alias"],
                        "was already used as join",
                        FindWithTableAlias<SelectBuilderT["data"]["joins"], ToTableT["alias"]>
                    >
            ) :
            invalid.E4<
                "Alias",
                ToTableT["alias"],
                "was already used as join in parent scope",
                FindWithTableAlias<SelectBuilderT["data"]["parentJoins"], ToTableT["alias"]>
            >
    );
    /*export type RightJoin<
        SelectBuilderT extends AnySelectBuilder,
        ToTableT extends AnyAliasedTable,
    > = (
        CheckedJoin<SelectBuilderT, ToTableT, RightJoinUnsafe<SelectBuilderT["data"]["joins"], ToTableT>>
    );*/

    export type RightJoin<
        SelectBuilderT extends AnySelectBuilder,
        ToTableT extends AnyAliasedTable,
    > = (
        FindWithTableAlias<SelectBuilderT["data"]["parentJoins"], ToTableT["alias"]> extends never ?
            (
                FindWithTableAlias<SelectBuilderT["data"]["joins"], ToTableT["alias"]> extends never ?
                    RightJoinUnsafe<SelectBuilderT["data"]["joins"], ToTableT> :
                    invalid.E4<
                        "Alias",
                        ToTableT["alias"],
                        "was already used as join",
                        FindWithTableAlias<SelectBuilderT["data"]["joins"], ToTableT["alias"]>
                    >
            ) :
            invalid.E4<
                "Alias",
                ToTableT["alias"],
                "was already used as join in parent scope",
                FindWithTableAlias<SelectBuilderT["data"]["parentJoins"], ToTableT["alias"]>
            >
    );
    /*export type RightJoinUsing<
        SelectBuilderT extends AnySelectBuilder,
        ToTableT extends AnyAliasedTable,
        FromDelegateT extends JoinFromDelegate<SelectBuilderT["data"]["joins"]>
    > = (
        CheckedJoinUsing<SelectBuilderT, ToTableT, FromDelegateT, RightJoinUnsafe<SelectBuilderT["data"]["joins"], ToTableT>>
    );*/
    export type RightJoinUsing<
        SelectBuilderT extends AnySelectBuilder,
        ToTableT extends AnyAliasedTable,
        FromDelegateT extends JoinFromDelegate<SelectBuilderT["data"]["joins"]>
    > = (
        JoinToDelegateUtil.CreateUsing<ToTableT, ReturnType<FromDelegateT>> extends never ?
            invalid.E4<
                "Table",
                ToTableT["alias"],
                "does not have some columns",
                Exclude<
                    ColumnTupleUtil.WithTableAlias<ReturnType<FromDelegateT>, ToTableT["alias"]>[TupleKeys<ReturnType<FromDelegateT>>],
                    ColumnCollectionUtil.Columns<ToTableT["columns"]>
                >
            > :
            FindWithTableAlias<SelectBuilderT["data"]["parentJoins"], ToTableT["alias"]> extends never ?
            (
                FindWithTableAlias<SelectBuilderT["data"]["joins"], ToTableT["alias"]> extends never ?
                    RightJoinUnsafe<SelectBuilderT["data"]["joins"], ToTableT> :
                    invalid.E4<
                        "Alias",
                        ToTableT["alias"],
                        "was already used as join",
                        FindWithTableAlias<SelectBuilderT["data"]["joins"], ToTableT["alias"]>
                    >
            ) :
            invalid.E4<
                "Alias",
                ToTableT["alias"],
                "was already used as join in parent scope",
                FindWithTableAlias<SelectBuilderT["data"]["parentJoins"], ToTableT["alias"]>
            >
    );
    /*export type LeftJoin<
        SelectBuilderT extends AnySelectBuilder,
        ToTableT extends AnyAliasedTable,
    > = (
        CheckedJoin<SelectBuilderT, ToTableT, LeftJoinUnsafe<SelectBuilderT["data"]["joins"], ToTableT>>
    );*/
    export type LeftJoin<
        SelectBuilderT extends AnySelectBuilder,
        ToTableT extends AnyAliasedTable,
    > = (
        FindWithTableAlias<SelectBuilderT["data"]["parentJoins"], ToTableT["alias"]> extends never ?
            (
                FindWithTableAlias<SelectBuilderT["data"]["joins"], ToTableT["alias"]> extends never ?
                    LeftJoinUnsafe<SelectBuilderT["data"]["joins"], ToTableT> :
                    invalid.E4<
                        "Alias",
                        ToTableT["alias"],
                        "was already used as join",
                        FindWithTableAlias<SelectBuilderT["data"]["joins"], ToTableT["alias"]>
                    >
            ) :
            invalid.E4<
                "Alias",
                ToTableT["alias"],
                "was already used as join in parent scope",
                FindWithTableAlias<SelectBuilderT["data"]["parentJoins"], ToTableT["alias"]>
            >
    );
    /*export type LeftJoinUsing<
        SelectBuilderT extends AnySelectBuilder,
        ToTableT extends AnyAliasedTable,
        FromDelegateT extends JoinFromDelegate<SelectBuilderT["data"]["joins"]>
    > = (
        CheckedJoinUsing<SelectBuilderT, ToTableT, FromDelegateT, LeftJoinUnsafe<SelectBuilderT["data"]["joins"], ToTableT>>
    );*/
    export type LeftJoinUsing<
        SelectBuilderT extends AnySelectBuilder,
        ToTableT extends AnyAliasedTable,
        FromDelegateT extends JoinFromDelegate<SelectBuilderT["data"]["joins"]>
    > = (
        JoinToDelegateUtil.CreateUsing<ToTableT, ReturnType<FromDelegateT>> extends never ?
            invalid.E4<
                "Table",
                ToTableT["alias"],
                "does not have some columns",
                Exclude<
                    ColumnTupleUtil.WithTableAlias<ReturnType<FromDelegateT>, ToTableT["alias"]>[TupleKeys<ReturnType<FromDelegateT>>],
                    ColumnCollectionUtil.Columns<ToTableT["columns"]>
                >
            > :
            FindWithTableAlias<SelectBuilderT["data"]["parentJoins"], ToTableT["alias"]> extends never ?
            (
                FindWithTableAlias<SelectBuilderT["data"]["joins"], ToTableT["alias"]> extends never ?
                    LeftJoinUnsafe<SelectBuilderT["data"]["joins"], ToTableT> :
                    invalid.E4<
                        "Alias",
                        ToTableT["alias"],
                        "was already used as join",
                        FindWithTableAlias<SelectBuilderT["data"]["joins"], ToTableT["alias"]>
                    >
            ) :
            invalid.E4<
                "Alias",
                ToTableT["alias"],
                "was already used as join in parent scope",
                FindWithTableAlias<SelectBuilderT["data"]["parentJoins"], ToTableT["alias"]>
            >
    );
    /*export type CrossJoin<
        SelectBuilderT extends AnySelectBuilder,
        ToTableT extends AnyAliasedTable,
    > = (
        CheckedJoin<SelectBuilderT, ToTableT, CrossJoinUnsafe<SelectBuilderT["data"]["joins"], ToTableT>>
    );*/
    export type CrossJoin<
        SelectBuilderT extends AnySelectBuilder,
        ToTableT extends AnyAliasedTable,
    > = (
        FindWithTableAlias<SelectBuilderT["data"]["parentJoins"], ToTableT["alias"]> extends never ?
            (
                FindWithTableAlias<SelectBuilderT["data"]["joins"], ToTableT["alias"]> extends never ?
                    CrossJoinUnsafe<SelectBuilderT["data"]["joins"], ToTableT> :
                    invalid.E4<
                        "Alias",
                        ToTableT["alias"],
                        "was already used as join",
                        FindWithTableAlias<SelectBuilderT["data"]["joins"], ToTableT["alias"]>
                    >
            ) :
            invalid.E4<
                "Alias",
                ToTableT["alias"],
                "was already used as join in parent scope",
                FindWithTableAlias<SelectBuilderT["data"]["parentJoins"], ToTableT["alias"]>
            >
    );
    export function innerJoin<
        SelectBuilderT extends AnySelectBuilder,
        ToTableT extends AnyAliasedTable,
        FromDelegateT extends JoinFromDelegate<SelectBuilderT["data"]["joins"]>
    > (
        selectBuilder : SelectBuilderT,
        toTable : ToTableT,
        fromDelegate : FromDelegateT,
        toDelegate : JoinToDelegate<ToTableT, ReturnType<FromDelegateT>>
    ) : (
        InnerJoin<SelectBuilderT, ToTableT>
    ) {
        return checkedJoin(selectBuilder, toTable, () => {
            const from = JoinFromDelegateUtil.execute(selectBuilder.data.joins, fromDelegate as any);
            const to = JoinToDelegateUtil.execute(toTable, from, toDelegate);
            return push(
                selectBuilder.data.joins,
                new Join(
                    JoinType.INNER,
                    toTable,
                    toTable.columns,
                    false,
                    from,
                    to
                )
            ) as any;
        });
    }
    export function innerJoinUsing<
        SelectBuilderT extends AnySelectBuilder,
        ToTableT extends AnyAliasedTable,
        FromDelegateT extends JoinFromDelegate<SelectBuilderT["data"]["joins"]>
    > (
        selectBuilder : SelectBuilderT,
        toTable : ToTableT,
        fromDelegate : FromDelegateT
    ) : (
        InnerJoinUsing<SelectBuilderT, ToTableT, FromDelegateT>
    ) {
        return checkedJoinUsing(selectBuilder, toTable, fromDelegate, (from, to) => {
            return push(
                selectBuilder.data.joins,
                new Join(
                    JoinType.INNER,
                    toTable,
                    toTable.columns,
                    false,
                    from,
                    to
                )
            ) as any;
        });
    }

    export function rightJoin<
        SelectBuilderT extends AnySelectBuilder,
        ToTableT extends AnyAliasedTable,
        FromDelegateT extends JoinFromDelegate<SelectBuilderT["data"]["joins"]>
    > (
        selectBuilder : SelectBuilderT,
        toTable : ToTableT,
        fromDelegate : FromDelegateT,
        toDelegate : JoinToDelegate<ToTableT, ReturnType<FromDelegateT>>
    ) : (
        RightJoin<SelectBuilderT, ToTableT>
    ) {
        return checkedJoin(selectBuilder, toTable, () => {
            const from = JoinFromDelegateUtil.execute(selectBuilder.data.joins, fromDelegate as any);
            const to = JoinToDelegateUtil.execute(toTable, from, toDelegate);
            return push(
                JoinCollectionUtil.toNullable(selectBuilder.data.joins),
                new Join(
                    JoinType.RIGHT,
                    toTable,
                    toTable.columns,
                    false,
                    from,
                    to
                )
            ) as any;
        });
    }
    export function rightJoinUsing<
        SelectBuilderT extends AnySelectBuilder,
        ToTableT extends AnyAliasedTable,
        FromDelegateT extends JoinFromDelegate<SelectBuilderT["data"]["joins"]>
    > (
        selectBuilder : SelectBuilderT,
        toTable : ToTableT,
        fromDelegate : FromDelegateT
    ) : (
        RightJoinUsing<SelectBuilderT, ToTableT, FromDelegateT>
    ) {
        return checkedJoinUsing(selectBuilder, toTable, fromDelegate, (from, to) => {
            return push(
                JoinCollectionUtil.toNullable(selectBuilder.data.joins),
                new Join(
                    JoinType.RIGHT,
                    toTable,
                    toTable.columns,
                    false,
                    from,
                    to
                )
            ) as any;
        });
    }

    export function leftJoin<
        SelectBuilderT extends AnySelectBuilder,
        ToTableT extends AnyAliasedTable,
        FromDelegateT extends JoinFromDelegate<SelectBuilderT["data"]["joins"]>
    > (
        selectBuilder : SelectBuilderT,
        toTable : ToTableT,
        fromDelegate : FromDelegateT,
        toDelegate : JoinToDelegate<ToTableT, ReturnType<FromDelegateT>>
    ) : (
        LeftJoin<SelectBuilderT, ToTableT>
    ) {
        return checkedJoin(selectBuilder, toTable, () => {
            const from = JoinFromDelegateUtil.execute(selectBuilder.data.joins, fromDelegate as any);
            const to = JoinToDelegateUtil.execute(toTable, from, toDelegate);
            return push(
                selectBuilder.data.joins,
                new Join(
                    JoinType.LEFT,
                    toTable,
                    toTable.columns,
                    true,
                    from,
                    to
                )
            ) as any;
        });
    }
    export function leftJoinUsing<
        SelectBuilderT extends AnySelectBuilder,
        ToTableT extends AnyAliasedTable,
        FromDelegateT extends JoinFromDelegate<SelectBuilderT["data"]["joins"]>
    > (
        selectBuilder : SelectBuilderT,
        toTable : ToTableT,
        fromDelegate : FromDelegateT
    ) : (
        LeftJoinUsing<SelectBuilderT, ToTableT, FromDelegateT>
    ) {
        return checkedJoinUsing(selectBuilder, toTable, fromDelegate, (from, to) => {
            return push(
                selectBuilder.data.joins,
                new Join(
                    JoinType.LEFT,
                    toTable,
                    toTable.columns,
                    true,
                    from,
                    to
                )
            ) as any;
        });
    }

    export function crossJoin<
        SelectBuilderT extends AnySelectBuilder,
        ToTableT extends AnyAliasedTable
    > (
        selectBuilder : SelectBuilderT,
        toTable : ToTableT
    ) : (
        CrossJoin<SelectBuilderT, ToTableT>
    ) {
        return checkedJoin(selectBuilder, toTable, () => {
            return push(
                selectBuilder.data.joins,
                new Join(
                    JoinType.CROSS,
                    toTable,
                    toTable.columns,
                    false,
                    [],
                    []
                )
            ) as any;
        });
    }

    export type IsReplaceableBy<
        JoinsT extends JoinCollection,
        TableA extends AnyAliasedTable,
        TableB extends AnyAliasedTable
    > = (
        FindWithTableAlias<JoinsT, TableA["alias"]> extends never ?
            //A's alias does not exist
            false :
            (
                true extends AliasedTableUtil.IsReplaceableBy<TableA, TableB> ?
                    (
                        true extends ColumnCollectionUtil.IsReplaceableBy<
                            FindWithTableAlias<JoinsT, TableA["alias"]>["columns"],
                            TableB["columns"]
                        > ?
                            (true) :
                            //The column cannot be replaced
                            (false)
                    ) :
                    //'A' cannot be replaced by 'B'
                    false
            )
    )
    export function isReplaceableBy<
        JoinsT extends JoinCollection,
        TableA extends AnyAliasedTable,
        TableB extends AnyAliasedTable
    > (
        joins : JoinsT,
        tableA : TableA,
        tableB : TableB
    ) : (IsReplaceableBy<JoinsT, TableA, TableB>) {
        const join = joins.find(join => join.table == tableA);
        if (join == undefined) {
            return false as any;
        }
        if (!AliasedTableUtil.isReplaceableBy(tableA, tableB)) {
            return false as any;
        }
        if (!ColumnCollectionUtil.isReplaceableBy(join.columns, tableB.columns)) {
            return false as any;
        }
        return true as any;
    };

    export type ReplaceJoinUnsafe<
        JoinT extends AnyJoin,
        TableA extends AnyAliasedTable,
        TableB extends AnyAliasedTable
    > = (
        JoinT["table"] extends AliasedTableUtil.EraseSubType<TableA> ?
            Join<
                AliasedTableUtil.As<TableB, JoinT["table"]["alias"]>,
                ColumnCollectionUtil.AndType<
                    AliasedTableUtil.As<TableB, JoinT["table"]["alias"]>["columns"],
                    JoinT["columns"]
                >,
                JoinT["nullable"]
            > :
            //Not the replacement target
            JoinT
    );
    export type ReplaceTableUnsafe<
        JoinsT extends JoinCollection,
        TableA extends AnyAliasedTable,
        TableB extends AnyAliasedTable
    > = (
        {
            [index in TupleKeys<JoinsT>] : (
                JoinsT[index] extends AnyJoin ?
                    ReplaceJoinUnsafe<
                        JoinsT[index],
                        TableA,
                        TableB
                    > :
                    never
            )
        } &
        {
            "0" : (
                ReplaceJoinUnsafe<
                    JoinsT[0],
                    TableA,
                    TableB
                >
            ),
            length : TupleLength<JoinsT>
        } &
        AnyJoin[]
    );
    export type ReplaceTable<
        JoinsT extends JoinCollection,
        TableA extends AnyAliasedTable,
        TableB extends AnyAliasedTable
    > = (
        true extends IsReplaceableBy<JoinsT, TableA, TableB> ?
            (
                ReplaceTableUnsafe<JoinsT, TableA, TableB>
            ) :
            invalid.E4<
                "Table", TableA,
                "is not replaceable by table", TableB
            >
    );
    export function replaceTable<
        JoinsT extends JoinCollection,
        TableA extends AnyAliasedTable,
        TableB extends AnyAliasedTable
    > (
        joins : JoinsT,
        tableA : TableA,
        tableB : TableB
    ) : (
        ReplaceTable<JoinsT, TableA, TableB>
    ) {
        assertNonDuplicateTableAlias(joins, tableB.alias);

        if (!AliasedTableUtil.isReplaceableBy(tableA, tableB)) {
            throw new Error(`Cannot replace ${tableA.alias} with ${tableB.alias}`);
        }
        return joins.map((join) => {
            if (join.table == tableA) {
                const aliasedB = AliasedTableUtil.as(tableB, tableA.alias);
                return new Join(
                    join.joinType,
                    aliasedB,
                    ColumnCollectionUtil.andType(
                        aliasedB.columns,
                        join.columns
                    ),
                    join.nullable,
                    //With this, we are potentially comparing
                    //columns of different data types...
                    //TODO Fix? Might be undesirable?
                    join.from,
                    join.to
                );
            } else {
                return join;
            }
        }) as any;
    }

    export type ReplaceColumnType<
        JoinsT extends JoinCollection,
        TableAliasT extends string,
        ColumnNameT extends string,
        NewTypeT
    > = (
        {
            [index in TupleKeys<JoinsT>] : (
                JoinsT[index] extends AnyJoin ?
                    JoinUtil.ReplaceColumnType<
                        JoinsT[index],
                        TableAliasT,
                        ColumnNameT,
                        NewTypeT
                    > :
                    never
            )
        } &
        {
            "0" : (
                JoinUtil.ReplaceColumnType<
                    JoinsT[0],
                    TableAliasT,
                    ColumnNameT,
                    NewTypeT
                >
            ),
            length : TupleLength<JoinsT>
        } &
        AnyJoin[]
    );
    export function replaceColumnType<
        JoinsT extends JoinCollection,
        TableAliasT extends string,
        ColumnNameT extends string,
        NewTypeT
    > (
        joins : JoinsT,
        tableAlias : TableAliasT,
        columnName : ColumnNameT,
        newAssertDelegate : sd.AssertDelegate<NewTypeT>
    ) : (
        ReplaceColumnType<
            JoinsT,
            TableAliasT,
            ColumnNameT,
            NewTypeT
        >
    ) {
        return joins.map((join) => {
            return JoinUtil.replaceColumnType(
                join,
                tableAlias,
                columnName,
                newAssertDelegate
            );
        }) as any;
    };

    export type ReplaceNullable<
        JoinsT extends JoinCollection,
        TableAliasT extends string,
        NullableT extends boolean
    > = (
        {
            [index in TupleKeys<JoinsT>] : (
                JoinUtil.ReplaceNullable<
                    Extract<JoinsT[index], AnyJoin>,
                    TableAliasT,
                    NullableT
                >
            )
        } &
        {
            "0" : (
                JoinUtil.ReplaceNullable<
                    JoinsT[0],
                    TableAliasT,
                    NullableT
                >
            ),
            length : TupleLength<JoinsT>
        } &
        AnyJoin[]
    );
    export function replaceNullable<
        JoinsT extends JoinCollection,
        TableAliasT extends string,
        NullableT extends boolean
    > (
        joins : JoinsT,
        tableAlias : TableAliasT,
        nullable : NullableT
    ) : (
        ReplaceNullable<
            JoinsT,
            TableAliasT,
            NullableT
        >
    ) {
        return joins.map((join) => {
            return JoinUtil.replaceNullable(
                join,
                tableAlias,
                nullable
            );
        }) as any;
    };

    //The very from Join is in the FROM clause
    //It will never be nullable unless a RIGHT JOIN was used.
    export type HasRightJoin<JoinsT extends JoinCollection> = (
        JoinsT[0]["nullable"] extends true ?
            true : false
    );
    export function hasRightJoin<JoinsT extends JoinCollection> (
        joins : JoinsT
    ) : HasRightJoin<JoinsT> {
        return joins[0].nullable as any;
    }
}
