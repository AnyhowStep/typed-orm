import { SelectBuilderData, SelectBuilder, AnySelectBuilder, __DUMMY_FROM_TABLE } from "./select-builder";
import { AnyAliasedTable, AliasedTableUtil } from "./aliased-table";
import { Join } from "./join";
import { SelectCollectionUtil } from "./select-collection";
import { JoinCollectionUtil } from "./join-collection";
import * as invalid from "./invalid";
import { JoinFromDelegate } from "./join-from-delegate";
import { JoinToDelegate } from "./join-to-delegate";
import { AggregateDelegateUtil } from "./aggregate-delegate";
import { FetchRow } from "./fetch-row";
import { TypeNarrowDelegate } from "./type-narrow-delegate";
import { Column } from "./column";
import { SelectDelegate } from "./select-delegate";
export declare namespace SelectBuilderUtil {
    type CleanData = {
        hasSelect: false;
        hasFrom: false;
        hasUnion: false;
        joins: [Join<typeof __DUMMY_FROM_TABLE, typeof __DUMMY_FROM_TABLE["columns"], true>];
        selects: undefined;
        aggregateDelegate: undefined;
        hasParentJoins: false;
        parentJoins: [Join<typeof __DUMMY_FROM_TABLE, typeof __DUMMY_FROM_TABLE["columns"], true>];
    };
    type CleanToFromData<ToTableT extends AnyAliasedTable> = ({
        readonly [key in keyof CleanData]: (key extends "hasFrom" ? true : key extends "joins" ? [Join<AliasedTableUtil.EraseSubType<ToTableT>, ToTableT["columns"], false>] : CleanData[key]);
    });
    type CleanToFrom<ToTableT extends AnyAliasedTable> = (SelectBuilder<CleanToFromData<ToTableT>>);
    type SelectAllData<DataT extends SelectBuilderData> = ({
        readonly [key in keyof DataT]: (key extends "selects" ? SelectCollectionUtil.FromJoinCollection<DataT["joins"]> : key extends "hasSelect" ? true : DataT[key]);
    });
    type CleanToSelectAll<ToTableT extends AnyAliasedTable> = (SelectBuilder<SelectAllData<CleanToFromData<ToTableT>>>);
    type FromUnsafe<SelectBuilderT extends AnySelectBuilder, ToTableT extends AnyAliasedTable> = (SelectBuilderT extends SelectBuilder<infer DataT> ? SelectBuilder<{
        readonly [key in keyof DataT]: (key extends "hasFrom" ? true : key extends "joins" ? [Join<AliasedTableUtil.EraseSubType<ToTableT>, ToTableT["columns"], false>] : DataT[key]);
    }> : never);
    type From<SelectBuilderT extends AnySelectBuilder, ToTableT extends AnyAliasedTable> = (SelectBuilderT extends SelectBuilder<infer DataT> ? JoinCollectionUtil.FindWithTableAlias<DataT["parentJoins"], ToTableT["alias"]> extends never ? FromUnsafe<SelectBuilderT, ToTableT> : invalid.E4<"Alias", ToTableT["alias"], "was already used as join in parent scope", JoinCollectionUtil.FindWithTableAlias<DataT["parentJoins"], ToTableT["alias"]>> : never);
    function from<SelectBuilderT extends AnySelectBuilder, ToTableT extends AnyAliasedTable>(s: SelectBuilderT, toTable: ToTableT): (From<SelectBuilderT, ToTableT>);
    type DoJoin<SelectBuilderT extends AnySelectBuilder, ToTableT extends AnyAliasedTable> = (SelectBuilderT extends SelectBuilder<infer DataT> ? (Error extends JoinCollectionUtil.InnerJoin<SelectBuilder<DataT>, ToTableT> ? JoinCollectionUtil.InnerJoin<SelectBuilder<DataT>, ToTableT> : SelectBuilder<{
        readonly [key in keyof DataT]: (key extends "joins" ? JoinCollectionUtil.InnerJoinUnsafe<DataT["joins"], ToTableT> : DataT[key]);
    }>) : never);
    function doJoin<SelectBuilderT extends AnySelectBuilder, ToTableT extends AnyAliasedTable, FromDelegateT extends JoinFromDelegate<SelectBuilderT["data"]["joins"]>>(s: SelectBuilderT, toTable: ToTableT, fromDelegate: FromDelegateT, toDelegate: JoinToDelegate<ToTableT, ReturnType<FromDelegateT>>): (DoJoin<SelectBuilderT, ToTableT>);
    type Select<SelectBuilderT extends AnySelectBuilder, SelectDelegateT extends SelectDelegate<SelectBuilderT>> = (SelectBuilderT extends SelectBuilder<infer DataT> ? (Error extends SelectCollectionUtil.AppendSelect<SelectBuilderT["data"]["selects"], SelectBuilderT, SelectDelegateT> ? SelectCollectionUtil.AppendSelect<SelectBuilderT["data"]["selects"], SelectBuilderT, SelectDelegateT> : (SelectBuilder<{
        readonly [key in keyof DataT]: (key extends "selects" ? SelectCollectionUtil.AppendSelectUnsafe<SelectBuilderT["data"]["selects"], SelectBuilderT, SelectDelegateT> : key extends "hasSelect" ? true : DataT[key]);
    }>)) : never);
    type SelectAll<SelectBuilderT extends AnySelectBuilder> = (SelectBuilderT extends SelectBuilder<infer DataT> ? SelectBuilder<{
        readonly [key in keyof DataT]: (key extends "selects" ? SelectCollectionUtil.FromJoinCollection<DataT["joins"]> : key extends "hasSelect" ? true : DataT[key]);
    }> : never);
    function selectAll<SelectBuilderT extends AnySelectBuilder>(s: SelectBuilderT): (SelectAll<SelectBuilderT>);
    type AggregatedRow<SelectBuilderT extends AnySelectBuilder> = (AggregateDelegateUtil.AggregatedRow<FetchRow<SelectBuilderT["data"]["joins"], SelectCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["selects"]>>, SelectBuilderT["data"]["aggregateDelegate"]>);
    type WhereIsNotNull<SelectBuilderT extends AnySelectBuilder, TypeNarrowDelegateT extends TypeNarrowDelegate<SelectBuilderT>> = (SelectBuilderT extends SelectBuilder<infer DataT> ? (ReturnType<TypeNarrowDelegateT> extends Column<infer TableAliasT, infer ColumnNameT, infer TypeT> ? (((null extends ReturnType<JoinCollectionUtil.FindWithTableAlias<DataT["joins"], TableAliasT>["table"]["columns"][ColumnNameT]["assertDelegate"]> ? true : false) | (JoinCollectionUtil.HasRightJoin<DataT["joins"]> extends true ? false : true)) extends true ? SelectBuilder<{
        readonly [key in keyof DataT]: (key extends "joins" ? JoinCollectionUtil.ReplaceColumnType<JoinCollectionUtil.ReplaceNullable<DataT["joins"], TableAliasT, false>, TableAliasT, ColumnNameT, Exclude<TypeT, null | undefined>> : key extends "selects" ? SelectCollectionUtil.ReplaceSelectType<DataT["selects"], TableAliasT, ColumnNameT, Exclude<TypeT, null | undefined>> : key extends "parentJoins" ? JoinCollectionUtil.ReplaceColumnType<DataT["parentJoins"], TableAliasT, ColumnNameT, Exclude<TypeT, null | undefined>> : DataT[key]);
    }> : ((null extends ReturnType<JoinCollectionUtil.FindWithTableAlias<DataT["parentJoins"], TableAliasT>["table"]["columns"][ColumnNameT]["assertDelegate"]> ? true : false) | (JoinCollectionUtil.HasRightJoin<DataT["parentJoins"]> extends true ? false : true)) extends true ? SelectBuilder<{
        readonly [key in keyof DataT]: (key extends "joins" ? JoinCollectionUtil.ReplaceColumnType<DataT["joins"], TableAliasT, ColumnNameT, Exclude<TypeT, null | undefined>> : key extends "selects" ? SelectCollectionUtil.ReplaceSelectType<DataT["selects"], TableAliasT, ColumnNameT, Exclude<TypeT, null | undefined>> : key extends "parentJoins" ? JoinCollectionUtil.ReplaceColumnType<JoinCollectionUtil.ReplaceNullable<DataT["parentJoins"], TableAliasT, false>, TableAliasT, ColumnNameT, Exclude<TypeT, null | undefined>> : DataT[key]);
    }> : SelectBuilder<{
        readonly [key in keyof DataT]: (key extends "joins" ? JoinCollectionUtil.ReplaceColumnType<DataT["joins"], TableAliasT, ColumnNameT, Exclude<TypeT, null | undefined>> : key extends "selects" ? SelectCollectionUtil.ReplaceSelectType<DataT["selects"], TableAliasT, ColumnNameT, Exclude<TypeT, null | undefined>> : key extends "parentJoins" ? JoinCollectionUtil.ReplaceColumnType<DataT["parentJoins"], TableAliasT, ColumnNameT, Exclude<TypeT, null | undefined>> : DataT[key]);
    }>) : (invalid.E2<"Invalid column or could not infer some types", ReturnType<TypeNarrowDelegateT>>)) : never);
    type WhereIsNull<SelectBuilderT extends AnySelectBuilder, TypeNarrowDelegateT extends TypeNarrowDelegate<SelectBuilderT>> = (SelectBuilderT extends SelectBuilder<infer DataT> ? (ReturnType<TypeNarrowDelegateT> extends Column<infer TableAliasT, infer ColumnNameT, infer TypeT> ? SelectBuilder<{
        readonly [key in keyof DataT]: (key extends "joins" ? JoinCollectionUtil.ReplaceColumnType<DataT["joins"], TableAliasT, ColumnNameT, null> : key extends "selects" ? SelectCollectionUtil.ReplaceSelectType<DataT["selects"], TableAliasT, ColumnNameT, null> : key extends "parentJoins" ? JoinCollectionUtil.ReplaceColumnType<DataT["parentJoins"], TableAliasT, ColumnNameT, null> : DataT[key]);
    }> : (invalid.E2<"Invalid column or could not infer some types", ReturnType<TypeNarrowDelegateT>>)) : never);
    type WhereIsEqual<SelectBuilderT extends AnySelectBuilder, TypeNarrowDelegateT extends TypeNarrowDelegate<SelectBuilderT>, ConstT extends boolean | number | string> = (SelectBuilderT extends SelectBuilder<infer DataT> ? (ReturnType<TypeNarrowDelegateT> extends Column<infer TableAliasT, infer ColumnNameT, infer TypeT> ? SelectBuilder<{
        readonly [key in keyof DataT]: (key extends "joins" ? JoinCollectionUtil.ReplaceColumnType<DataT["joins"], TableAliasT, ColumnNameT, ConstT> : key extends "selects" ? SelectCollectionUtil.ReplaceSelectType<DataT["selects"], TableAliasT, ColumnNameT, ConstT> : DataT[key]);
    }> : (invalid.E2<"Invalid column or could not infer some types", ReturnType<TypeNarrowDelegateT>>)) : never);
}
export declare type AggregatedRow<SelectBuilderT extends AnySelectBuilder> = (SelectBuilderUtil.AggregatedRow<SelectBuilderT>);
//# sourceMappingURL=select-builder-util.d.ts.map