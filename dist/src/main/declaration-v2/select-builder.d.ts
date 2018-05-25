import { JoinCollection, JoinCollectionUtil } from "./join-collection";
import { JoinFromDelegate } from "./join-from-delegate";
import { JoinToDelegate } from "./join-to-delegate";
import { AliasedTable, AnyAliasedTable } from "./aliased-table";
import { ReplaceValue, ReplaceValue2 } from "./obj-util";
import { Join } from "./join";
import { SelectCollection, SelectCollectionUtil } from "./select-collection";
import { SelectDelegate } from "./select-delegate";
import { FetchRow } from "./fetch-row";
import { AggregateDelegate, AggregateDelegateUtil } from "./aggregate-delegate";
import { TypeNarrowDelegate } from "./type-narrow-delegate";
import { Column } from "./column";
import * as invalid from "./invalid";
import { WhereDelegate } from "./where-delegate";
import { GroupByDelegate } from "./group-by-delegate";
import { HavingDelegate } from "./having-delegate";
import { OrderByDelegate } from "./order-by-delegate";
import { TypeWidenDelegate } from "./type-widen-delegate";
import * as sd from "schema-decorator";
import { FetchValueCheck, FetchValueType } from "./fetch-value";
import { AnyTable } from "./table";
import { AnyGroupBy } from "./group-by";
import { AnyOrderBy } from "./order-by";
import { Expr } from "./expr";
import { PooledDatabase } from "./PooledDatabase";
import { Querify } from "./querify";
import { StringBuilder } from "./StringBuilder";
import { AliasedExpr } from "./aliased-expr";
import { SubqueryTable } from "./subquery-table";
import { RawExprUtil, SelectValueBuilder } from "./raw-expr";
import { UpdateBuilder, UpdateAssignmentReferencesDelegate, RawUpdateAssignmentReferences } from "./update-builder";
import { InsertAssignmentCollectionDelegate, RawInsertSelectAssignmentCollection, InsertSelectBuilder } from "./insert-select-builder";
import { DeleteTables, DeleteBuilder, DeleteTablesDelegate } from "./delete-builder";
import { Table } from "./table";
export declare const ARBITRARY_ROW_COUNT = 999999999;
export interface LimitData {
    readonly rowCount: number;
    readonly offset: number;
}
export interface ExtraSelectBuilderData {
    readonly db: PooledDatabase;
    readonly narrowExpr?: Expr<any, boolean>;
    readonly whereExpr?: Expr<any, boolean>;
    readonly havingExpr?: Expr<any, boolean>;
    readonly union?: {
        target: SelectBuilder<any>;
        distinct: boolean;
    }[];
    readonly distinct: boolean;
    readonly sqlCalcFoundRows: boolean;
    readonly groupBy?: AnyGroupBy[];
    readonly orderBy?: AnyOrderBy[];
    readonly limit?: LimitData;
    readonly unionOrderBy?: AnyOrderBy[];
    readonly unionLimit?: LimitData;
}
export interface RawPaginationArgs {
    page?: number | null | undefined;
    itemsPerPage?: number | null | undefined;
}
export interface PaginateInfo {
    itemsFound: number;
    pagesFound: number;
    page: number;
    itemsPerPage: number;
}
export interface PaginateResult<T> {
    info: PaginateInfo;
    rows: T[];
}
export interface SelectBuilderData {
    readonly hasSelect: boolean;
    readonly hasFrom: boolean;
    readonly hasUnion: boolean;
    readonly joins: JoinCollection;
    readonly selects: undefined | SelectCollection;
    readonly aggregateDelegate: undefined | AggregateDelegate<any>;
    readonly hasParentJoins: boolean;
    readonly parentJoins: JoinCollection;
}
export declare const __DUMMY_FROM_TABLE: Table<"__DUMMY_FROM_TABLE", "__DUMMY_FROM_TABLE", {}, {
    autoIncrement: undefined;
    isGenerated: {};
    hasDefaultValue: {};
    isMutable: {};
}>;
export declare class SelectBuilder<DataT extends SelectBuilderData> implements Querify {
    readonly data: DataT;
    readonly extraData: ExtraSelectBuilderData;
    constructor(data: DataT, extraData: ExtraSelectBuilderData);
    assertAfterFrom(): void;
    assertBeforeSelect(): void;
    assertAfterSelect(): void;
    assertBeforeUnion(): void;
    from<ToTableT extends AnyAliasedTable>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: false;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, toTable: ToTableT): (SelectBuilder<ReplaceValue2<DataT, "hasFrom", true, "joins", [Join<ToTableT, ToTableT["columns"], false>]>>);
    join<ToTableT extends AnyAliasedTable, FromDelegateT extends JoinFromDelegate<DataT["joins"]>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, toTable: ToTableT, fromDelegate: FromDelegateT, toDelegate: JoinToDelegate<ToTableT, ReturnType<FromDelegateT>>): (Error extends JoinCollectionUtil.InnerJoin<DataT["joins"], ToTableT> ? JoinCollectionUtil.InnerJoin<DataT["joins"], ToTableT> : SelectBuilder<ReplaceValue<DataT, "joins", JoinCollectionUtil.InnerJoinUnsafe<DataT["joins"], ToTableT>>>);
    joinUsing<ToTableT extends AnyAliasedTable, FromDelegateT extends JoinFromDelegate<DataT["joins"]>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, toTable: ToTableT, fromDelegate: FromDelegateT): (Error extends JoinCollectionUtil.InnerJoinUsing<DataT["joins"], ToTableT, FromDelegateT> ? JoinCollectionUtil.InnerJoinUsing<DataT["joins"], ToTableT, FromDelegateT> : SelectBuilder<ReplaceValue<DataT, "joins", JoinCollectionUtil.InnerJoinUnsafe<DataT["joins"], ToTableT>>>);
    rightJoin<ToTableT extends AnyAliasedTable, FromDelegateT extends JoinFromDelegate<DataT["joins"]>>(this: SelectBuilder<{
        hasSelect: false;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, toTable: ToTableT, fromDelegate: FromDelegateT, toDelegate: JoinToDelegate<ToTableT, ReturnType<FromDelegateT>>): (Error extends JoinCollectionUtil.RightJoin<DataT["joins"], ToTableT> ? JoinCollectionUtil.RightJoin<DataT["joins"], ToTableT> : SelectBuilder<ReplaceValue<DataT, "joins", JoinCollectionUtil.RightJoinUnsafe<DataT["joins"], ToTableT>>>);
    rightJoinUsing<ToTableT extends AnyAliasedTable, FromDelegateT extends JoinFromDelegate<DataT["joins"]>>(this: SelectBuilder<{
        hasSelect: false;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, toTable: ToTableT, fromDelegate: FromDelegateT): (Error extends JoinCollectionUtil.RightJoinUsing<DataT["joins"], ToTableT, FromDelegateT> ? JoinCollectionUtil.RightJoinUsing<DataT["joins"], ToTableT, FromDelegateT> : SelectBuilder<ReplaceValue<DataT, "joins", JoinCollectionUtil.RightJoinUnsafe<DataT["joins"], ToTableT>>>);
    leftJoin<ToTableT extends AnyAliasedTable, FromDelegateT extends JoinFromDelegate<DataT["joins"]>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, toTable: ToTableT, fromDelegate: FromDelegateT, toDelegate: JoinToDelegate<ToTableT, ReturnType<FromDelegateT>>): (Error extends JoinCollectionUtil.LeftJoin<DataT["joins"], ToTableT> ? JoinCollectionUtil.LeftJoin<DataT["joins"], ToTableT> : SelectBuilder<ReplaceValue<DataT, "joins", JoinCollectionUtil.LeftJoinUnsafe<DataT["joins"], ToTableT>>>);
    leftJoinUsing<ToTableT extends AnyAliasedTable, FromDelegateT extends JoinFromDelegate<DataT["joins"]>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, toTable: ToTableT, fromDelegate: FromDelegateT): (Error extends JoinCollectionUtil.LeftJoinUsing<DataT["joins"], ToTableT, FromDelegateT> ? JoinCollectionUtil.LeftJoinUsing<DataT["joins"], ToTableT, FromDelegateT> : SelectBuilder<ReplaceValue<DataT, "joins", JoinCollectionUtil.LeftJoinUnsafe<DataT["joins"], ToTableT>>>);
    select<SelectDelegateT extends SelectDelegate<SelectBuilder<DataT>>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: any;
        hasUnion: false;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, selectDelegate: SelectDelegateT): (Error extends SelectCollectionUtil.AppendSelect<DataT["selects"], SelectBuilder<DataT>, SelectDelegateT> ? SelectCollectionUtil.AppendSelect<DataT["selects"], SelectBuilder<DataT>, SelectDelegateT> : (SelectBuilder<ReplaceValue2<DataT, "selects", SelectCollectionUtil.AppendSelectUnsafe<DataT["selects"], SelectBuilder<DataT>, SelectDelegateT>, "hasSelect", true>>));
    selectAll(this: SelectBuilder<{
        hasSelect: false;
        hasFrom: true;
        hasUnion: false;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>): (SelectBuilder<ReplaceValue2<DataT, "selects", SelectCollectionUtil.FromJoinCollection<DataT["joins"]>, "hasSelect", true>>);
    replaceTable<TableA extends AnyAliasedTable, TableB extends AnyAliasedTable>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, tableA: TableA, tableB: TableB): (TableB extends AliasedTable<any, any, TableA["columns"]> ? SelectBuilder<ReplaceValue<DataT, "joins", JoinCollectionUtil.ReplaceTableUnsafe<DataT["joins"], TableA, TableB>>> : Error extends JoinCollectionUtil.ReplaceTable<DataT["joins"], TableA, TableB> ? JoinCollectionUtil.ReplaceTable<DataT["joins"], TableA, TableB> : SelectBuilder<ReplaceValue<DataT, "joins", JoinCollectionUtil.ReplaceTableUnsafe<DataT["joins"], TableA, TableB>>>);
    aggregate<AggregateDelegateT extends undefined | AggregateDelegate<FetchRow<DataT["joins"], SelectCollectionUtil.ToColumnReferences<DataT["selects"]>>>>(this: SelectBuilder<{
        hasSelect: true;
        hasFrom: any;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: false;
        parentJoins: any;
    }>, aggregateDelegate: AggregateDelegateT): (SelectBuilder<ReplaceValue<DataT, "aggregateDelegate", AggregateDelegateT>>);
    private rowAssertDelegate;
    private getRowAssertDelegate;
    readonly processRow: (rawRow: any) => any;
    readonly aggregateRow: (rawRow: any) => any;
    fetchAll(this: SelectBuilder<{
        hasSelect: true;
        hasFrom: any;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: false;
        parentJoins: any;
    }>): (Promise<AggregateDelegateUtil.AggregatedRow<FetchRow<DataT["joins"], SelectCollectionUtil.ToColumnReferences<DataT["selects"]>>, DataT["aggregateDelegate"]>[]>);
    fetchOne(this: SelectBuilder<{
        hasSelect: true;
        hasFrom: any;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: false;
        parentJoins: any;
    }>): (Promise<AggregateDelegateUtil.AggregatedRow<FetchRow<DataT["joins"], SelectCollectionUtil.ToColumnReferences<DataT["selects"]>>, DataT["aggregateDelegate"]>>);
    fetchZeroOrOne(this: SelectBuilder<{
        hasSelect: true;
        hasFrom: any;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: false;
        parentJoins: any;
    }>): (Promise<undefined | AggregateDelegateUtil.AggregatedRow<FetchRow<DataT["joins"], SelectCollectionUtil.ToColumnReferences<DataT["selects"]>>, DataT["aggregateDelegate"]>>);
    count(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: false;
        parentJoins: any;
    }>): Promise<number>;
    exists(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: false;
        parentJoins: any;
    }>): Promise<boolean>;
    paginate(this: SelectBuilder<{
        hasSelect: true;
        hasFrom: any;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: false;
        parentJoins: any;
    }>, rawPaginationArgs?: RawPaginationArgs): (Promise<PaginateResult<AggregateDelegateUtil.AggregatedRow<FetchRow<DataT["joins"], SelectCollectionUtil.ToColumnReferences<DataT["selects"]>>, DataT["aggregateDelegate"]>>>);
    fetchValue(this: SelectBuilder<{
        hasSelect: true;
        hasFrom: any;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: false;
        parentJoins: any;
    }>): (FetchValueCheck<DataT, FetchValueType<DataT>>);
    fetchValueOrUndefined(this: SelectBuilder<{
        hasSelect: true;
        hasFrom: any;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: false;
        parentJoins: any;
    }>): (FetchValueCheck<DataT, undefined | FetchValueType<DataT>>);
    fetchValueArray(this: SelectBuilder<{
        hasSelect: true;
        hasFrom: any;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: false;
        parentJoins: any;
    }>): (FetchValueCheck<DataT, FetchValueType<DataT>[]>);
    private narrow;
    whereIsNotNull<TypeNarrowDelegateT extends TypeNarrowDelegate<DataT["joins"]>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: false;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, typeNarrowDelegate: TypeNarrowDelegateT): (ReturnType<TypeNarrowDelegateT> extends Column<infer TableAliasT, infer ColumnNameT, infer TypeT> ? SelectBuilder<ReplaceValue2<DataT, "joins", JoinCollectionUtil.ReplaceColumnType<DataT["joins"], TableAliasT, ColumnNameT, Exclude<TypeT, null | undefined>>, "selects", SelectCollectionUtil.ReplaceSelectType<DataT["selects"], TableAliasT, ColumnNameT, Exclude<TypeT, null | undefined>>>> : (invalid.E2<"Invalid column or could not infer some types", ReturnType<TypeNarrowDelegateT>>));
    whereIsNull<TypeNarrowDelegateT extends TypeNarrowDelegate<DataT["joins"]>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: false;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, typeNarrowDelegate: TypeNarrowDelegateT): (ReturnType<TypeNarrowDelegateT> extends Column<infer TableAliasT, infer ColumnNameT, infer TypeT> ? SelectBuilder<ReplaceValue2<DataT, "joins", JoinCollectionUtil.ReplaceColumnType<DataT["joins"], TableAliasT, ColumnNameT, null>, "selects", SelectCollectionUtil.ReplaceSelectType<DataT["selects"], TableAliasT, ColumnNameT, null>>> : (invalid.E2<"Invalid column or could not infer some types", ReturnType<TypeNarrowDelegateT>>));
    whereIsEqual<TypeNarrowDelegateT extends TypeNarrowDelegate<DataT["joins"]>, ConstT extends boolean | number | string>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: false;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, typeNarrowDelegate: TypeNarrowDelegateT, value: ConstT): (ReturnType<TypeNarrowDelegateT> extends Column<infer TableAliasT, infer ColumnNameT, infer TypeT> ? SelectBuilder<ReplaceValue2<DataT, "joins", JoinCollectionUtil.ReplaceColumnType<DataT["joins"], TableAliasT, ColumnNameT, ConstT>, "selects", SelectCollectionUtil.ReplaceSelectType<DataT["selects"], TableAliasT, ColumnNameT, ConstT>>> : (invalid.E2<"Invalid column or could not infer some types", ReturnType<TypeNarrowDelegateT>>));
    where<WhereDelegateT extends WhereDelegate<SelectBuilder<DataT>>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, whereDelegate: WhereDelegateT): SelectBuilder<DataT>;
    andWhere<WhereDelegateT extends WhereDelegate<SelectBuilder<DataT>>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, whereDelegate: WhereDelegateT): SelectBuilder<DataT>;
    distinct(distinct?: boolean): SelectBuilder<DataT>;
    sqlCalcFoundRows(sqlCalcFoundRows?: boolean): SelectBuilder<DataT>;
    groupBy<GroupByDelegateT extends GroupByDelegate<SelectBuilder<DataT>>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, groupByDelegate: GroupByDelegateT): SelectBuilder<DataT>;
    appendGroupBy<GroupByDelegateT extends GroupByDelegate<SelectBuilder<DataT>>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, groupByDelegate: GroupByDelegateT): SelectBuilder<DataT>;
    unsetGroupBy(): SelectBuilder<DataT>;
    having<HavingDelegateT extends HavingDelegate<SelectBuilder<DataT>>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, havingDelegate: HavingDelegateT): SelectBuilder<DataT>;
    andHaving<HavingDelegateT extends HavingDelegate<SelectBuilder<DataT>>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, havingDelegate: HavingDelegateT): SelectBuilder<DataT>;
    orderBy<OrderByDelegateT extends OrderByDelegate<SelectBuilder<DataT>>>(orderByDelegate: OrderByDelegateT): SelectBuilder<DataT>;
    appendOrderBy<OrderByDelegateT extends OrderByDelegate<SelectBuilder<DataT>>>(orderByDelegate: OrderByDelegateT): SelectBuilder<DataT>;
    unsetOrderBy(): SelectBuilder<DataT>;
    limit(rowCount: number): SelectBuilder<DataT>;
    offset(offset: number): SelectBuilder<DataT>;
    unsetLimit(): SelectBuilder<DataT>;
    unionOrderBy<OrderByDelegateT extends OrderByDelegate<SelectBuilder<DataT>>>(orderByDelegate: OrderByDelegateT): SelectBuilder<DataT>;
    appendUnionOrderBy<OrderByDelegateT extends OrderByDelegate<SelectBuilder<DataT>>>(orderByDelegate: OrderByDelegateT): SelectBuilder<DataT>;
    unsetUnionOrderBy(): SelectBuilder<DataT>;
    unionLimit(rowCount: number): SelectBuilder<DataT>;
    unionOffset(offset: number): SelectBuilder<DataT>;
    unsetUnionLimit(): SelectBuilder<DataT>;
    widen<TypeWidenDelegateT extends TypeWidenDelegate<DataT["selects"]>, WidenT>(this: SelectBuilder<{
        hasSelect: true;
        hasFrom: any;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: undefined;
        hasParentJoins: any;
        parentJoins: any;
    }>, typeWidenDelegate: TypeWidenDelegateT, assertWidened: sd.AssertFunc<WidenT>): (ReturnType<TypeWidenDelegateT> extends Column<infer TableAliasT, infer ColumnNameT, infer TypeT> ? SelectBuilder<ReplaceValue2<DataT, "joins", JoinCollectionUtil.ReplaceColumnType<DataT["joins"], TableAliasT, ColumnNameT, WidenT | TypeT>, "selects", SelectCollectionUtil.ReplaceSelectType<DataT["selects"], TableAliasT, ColumnNameT, WidenT | TypeT>>> : (invalid.E2<"Invalid column or could not infer some types", ReturnType<TypeWidenDelegateT>>));
    union<TargetT extends SelectBuilder<{
        hasSelect: true;
        hasFrom: any;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>>(this: SelectBuilder<{
        hasSelect: true;
        hasFrom: any;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, target: TargetT, distinct?: boolean): (TargetT extends SelectBuilder<infer TargetDataT> ? (TargetDataT["selects"] extends SelectCollection ? (DataT["selects"] extends SelectCollection ? (SelectCollectionUtil.HasCompatibleTypes<TargetDataT["selects"], DataT["selects"]> extends true ? (SelectBuilder<DataT>) : invalid.E4<"Target SELECT clause", SelectCollectionUtil.MapToTypes<TargetDataT["selects"]>, "is not compatible with", SelectCollectionUtil.MapToTypes<DataT["selects"]>>) : invalid.E2<"Could not find SELECT clause", DataT["selects"]>) : invalid.E2<"Union target does not have a SELECT clause", TargetDataT["selects"]>) : invalid.E2<"Invalid union target, or could not infer TargetDataT", TargetT>);
    querifyJoins(sb: StringBuilder): void;
    querifyWhere(sb: StringBuilder): void;
    querify(sb: StringBuilder): void;
    getQuery(): string;
    printQuery(): this;
    as<AliasT extends string>(this: SelectBuilder<{
        hasSelect: true;
        hasFrom: any;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, alias: AliasT): (DataT extends {
        hasSelect: true;
    } ? SubqueryTable<AliasT, DataT> : invalid.E1<"Missing SELECT clause">);
    asExpr<AliasT extends string>(this: SelectBuilder<{
        hasSelect: true;
        hasFrom: any;
        hasUnion: any;
        joins: any;
        selects: DataT["selects"] & {
            length: 1;
        };
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, alias: AliasT): (AliasedExpr<{}, "__expr", AliasT, RawExprUtil.Type<SelectBuilder<DataT>>>);
    subQuery<SubQueryDelegateT extends ((childBuilder: SelectBuilder<{
        hasSelect: false;
        hasFrom: false;
        hasUnion: false;
        joins: [Join<typeof __DUMMY_FROM_TABLE, typeof __DUMMY_FROM_TABLE["columns"], true>];
        selects: undefined;
        aggregateDelegate: undefined;
        hasParentJoins: DataT["hasFrom"];
        parentJoins: DataT["joins"];
    }>) => SelectValueBuilder<any>)>(delegate: SubQueryDelegateT): (RawExprUtil.ToExpr<ReturnType<SubQueryDelegateT>>);
    insertInto<TableT extends AnyTable>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: any;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: false;
        parentJoins: any;
    }>, table: TableT, delegate: InsertAssignmentCollectionDelegate<TableT, SelectBuilder<DataT>>): (InsertSelectBuilder<TableT, SelectBuilder<DataT>, RawInsertSelectAssignmentCollection<TableT, SelectBuilder<DataT>>, "NORMAL">);
    set(this: SelectBuilder<{
        hasSelect: false;
        hasFrom: true;
        hasUnion: false;
        joins: any;
        selects: undefined;
        aggregateDelegate: any;
        hasParentJoins: false;
        parentJoins: any;
    }>, delegate: UpdateAssignmentReferencesDelegate<SelectBuilder<DataT>>): (UpdateBuilder<SelectBuilder<{
        hasSelect: false;
        hasFrom: true;
        hasUnion: false;
        joins: DataT["joins"];
        selects: undefined;
        aggregateDelegate: any;
        hasParentJoins: false;
        parentJoins: any;
    }>, RawUpdateAssignmentReferences<SelectBuilder<DataT>>>);
    delete(this: SelectBuilder<{
        hasSelect: false;
        hasFrom: true;
        hasUnion: false;
        joins: any;
        selects: undefined;
        aggregateDelegate: any;
        hasParentJoins: false;
        parentJoins: any;
    }>, delegate?: DeleteTablesDelegate<SelectBuilder<DataT>>): (DeleteBuilder<SelectBuilder<{
        hasSelect: false;
        hasFrom: true;
        hasUnion: false;
        joins: DataT["joins"];
        selects: undefined;
        aggregateDelegate: any;
        hasParentJoins: false;
        parentJoins: any;
    }>, DeleteTables<SelectBuilder<DataT>>>);
}
export declare type CreateSelectBuilderDelegate = (() => (SelectBuilder<{
    hasSelect: false;
    hasFrom: false;
    hasUnion: false;
    joins: [Join<typeof __DUMMY_FROM_TABLE, typeof __DUMMY_FROM_TABLE["columns"], true>];
    selects: undefined;
    aggregateDelegate: undefined;
    hasParentJoins: false;
    parentJoins: [Join<typeof __DUMMY_FROM_TABLE, typeof __DUMMY_FROM_TABLE["columns"], true>];
}>));
export declare type AnySelectBuilder = SelectBuilder<any>;
