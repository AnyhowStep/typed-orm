import { JoinCollection, JoinCollectionUtil } from "./join-collection";
import { JoinFromDelegate } from "./join-from-delegate";
import { JoinToDelegate } from "./join-to-delegate";
import { AliasedTable, AnyAliasedTable } from "./aliased-table";
import { Join } from "./join";
import { SelectCollection, SelectCollectionUtil } from "./select-collection";
import { SelectDelegate } from "./select-delegate";
import { FetchRow } from "./fetch-row";
import { AggregateDelegate } from "./aggregate-delegate";
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
import { RawExprUtil } from "./raw-expr";
import { UpdateBuilder, UpdateAssignmentReferencesDelegate, RawUpdateAssignmentReferences } from "./update-builder";
import { InsertAssignmentCollectionDelegate, RawInsertSelectAssignmentCollection, InsertSelectBuilder } from "./insert-select-builder";
import { DeleteTables, DeleteBuilder, DeleteTablesDelegate } from "./delete-builder";
import { TupleWConcat } from "./tuple";
import { AnyJoin } from "./join";
import { SelectBuilderUtil } from "./select-builder-util";
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
    id: undefined;
    uniqueKeys: undefined;
    parentTables: undefined;
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
    }>, toTable: ToTableT): (SelectBuilderUtil.From<this, ToTableT>);
    join<ToTableT extends AnyAliasedTable, FromDelegateT extends JoinFromDelegate<this["data"]["joins"]>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, toTable: ToTableT, fromDelegate: FromDelegateT, toDelegate: JoinToDelegate<ToTableT, ReturnType<FromDelegateT>>): (SelectBuilderUtil.DoJoin<this, ToTableT>);
    joinUsing<ToTableT extends AnyAliasedTable, FromDelegateT extends JoinFromDelegate<DataT["joins"]>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, toTable: ToTableT, fromDelegate: FromDelegateT): (Error extends JoinCollectionUtil.InnerJoinUsing<SelectBuilder<DataT>, ToTableT, FromDelegateT> ? JoinCollectionUtil.InnerJoinUsing<SelectBuilder<DataT>, ToTableT, FromDelegateT> : SelectBuilder<{
        readonly [key in keyof DataT]: (key extends "joins" ? JoinCollectionUtil.InnerJoinUnsafe<DataT["joins"], ToTableT> : DataT[key]);
    }>);
    rightJoin<ToTableT extends AnyAliasedTable, FromDelegateT extends JoinFromDelegate<DataT["joins"]>>(this: SelectBuilder<{
        hasSelect: false;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, toTable: ToTableT, fromDelegate: FromDelegateT, toDelegate: JoinToDelegate<ToTableT, ReturnType<FromDelegateT>>): (Error extends JoinCollectionUtil.RightJoin<SelectBuilder<DataT>, ToTableT> ? JoinCollectionUtil.RightJoin<SelectBuilder<DataT>, ToTableT> : SelectBuilder<{
        readonly [key in keyof DataT]: (key extends "joins" ? JoinCollectionUtil.RightJoinUnsafe<DataT["joins"], ToTableT> : DataT[key]);
    }>);
    rightJoinUsing<ToTableT extends AnyAliasedTable, FromDelegateT extends JoinFromDelegate<DataT["joins"]>>(this: SelectBuilder<{
        hasSelect: false;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, toTable: ToTableT, fromDelegate: FromDelegateT): (Error extends JoinCollectionUtil.RightJoinUsing<SelectBuilder<DataT>, ToTableT, FromDelegateT> ? JoinCollectionUtil.RightJoinUsing<SelectBuilder<DataT>, ToTableT, FromDelegateT> : SelectBuilder<{
        readonly [key in keyof DataT]: (key extends "joins" ? JoinCollectionUtil.RightJoinUnsafe<DataT["joins"], ToTableT> : DataT[key]);
    }>);
    leftJoin<ToTableT extends AnyAliasedTable, FromDelegateT extends JoinFromDelegate<DataT["joins"]>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, toTable: ToTableT, fromDelegate: FromDelegateT, toDelegate: JoinToDelegate<ToTableT, ReturnType<FromDelegateT>>): (Error extends JoinCollectionUtil.LeftJoin<SelectBuilder<DataT>, ToTableT> ? JoinCollectionUtil.LeftJoin<SelectBuilder<DataT>, ToTableT> : SelectBuilder<{
        readonly [key in keyof DataT]: (key extends "joins" ? JoinCollectionUtil.LeftJoinUnsafe<DataT["joins"], ToTableT> : DataT[key]);
    }>);
    leftJoinUsing<ToTableT extends AnyAliasedTable, FromDelegateT extends JoinFromDelegate<DataT["joins"]>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, toTable: ToTableT, fromDelegate: FromDelegateT): (Error extends JoinCollectionUtil.LeftJoinUsing<SelectBuilder<DataT>, ToTableT, FromDelegateT> ? JoinCollectionUtil.LeftJoinUsing<SelectBuilder<DataT>, ToTableT, FromDelegateT> : SelectBuilder<{
        readonly [key in keyof DataT]: (key extends "joins" ? JoinCollectionUtil.LeftJoinUnsafe<DataT["joins"], ToTableT> : DataT[key]);
    }>);
    select<SelectDelegateT extends SelectDelegate<this>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: any;
        hasUnion: false;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, selectDelegate: SelectDelegateT): (SelectBuilderUtil.Select<this, SelectDelegateT>);
    selectAll(this: SelectBuilder<{
        hasSelect: false;
        hasFrom: true;
        hasUnion: false;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>): (SelectBuilderUtil.SelectAll<this>);
    replaceTable<TableA extends AnyAliasedTable, TableB extends AnyAliasedTable>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, tableA: TableA, tableB: TableB): (TableB extends AliasedTable<any, any, TableA["columns"]> ? SelectBuilder<{
        readonly [key in keyof DataT]: (key extends "joins" ? JoinCollectionUtil.ReplaceTableUnsafe<DataT["joins"], TableA, TableB> : DataT[key]);
    }> : Error extends JoinCollectionUtil.ReplaceTable<DataT["joins"], TableA, TableB> ? JoinCollectionUtil.ReplaceTable<DataT["joins"], TableA, TableB> : SelectBuilder<{
        readonly [key in keyof DataT]: (key extends "joins" ? JoinCollectionUtil.ReplaceTableUnsafe<DataT["joins"], TableA, TableB> : DataT[key]);
    }>);
    aggregate<AggregateDelegateT extends undefined | AggregateDelegate<FetchRow<this["data"]["joins"], SelectCollectionUtil.ToColumnReferences<this["data"]["selects"]>>>>(this: SelectBuilder<{
        hasSelect: true;
        hasFrom: any;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: false;
        parentJoins: any;
    }>, aggregateDelegate: AggregateDelegateT): (SelectBuilder<{
        readonly [key in keyof DataT]: (key extends "aggregateDelegate" ? AggregateDelegateT : DataT[key]);
    }>);
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
    }>): (Promise<SelectBuilderUtil.AggregatedRow<this>[]>);
    fetchOne(this: SelectBuilder<{
        hasSelect: true;
        hasFrom: any;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: false;
        parentJoins: any;
    }>): (Promise<SelectBuilderUtil.AggregatedRow<this>>);
    fetchZeroOrOne(this: SelectBuilder<{
        hasSelect: true;
        hasFrom: any;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: false;
        parentJoins: any;
    }>): (Promise<undefined | SelectBuilderUtil.AggregatedRow<this>>);
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
    }>, rawPaginationArgs?: RawPaginationArgs): (Promise<PaginateResult<SelectBuilderUtil.AggregatedRow<this>>>);
    fetchValue(this: SelectBuilder<{
        hasSelect: true;
        hasFrom: any;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: false;
        parentJoins: any;
    }>): (FetchValueCheck<this["data"], FetchValueType<this["data"]>>);
    fetchValueOrUndefined(this: SelectBuilder<{
        hasSelect: true;
        hasFrom: any;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: false;
        parentJoins: any;
    }>): (FetchValueCheck<this["data"], undefined | FetchValueType<this["data"]>>);
    fetchValueArray(this: SelectBuilder<{
        hasSelect: true;
        hasFrom: any;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: false;
        parentJoins: any;
    }>): (FetchValueCheck<this["data"], FetchValueType<this["data"]>[]>);
    private narrow;
    whereIsNotNull<TypeNarrowDelegateT extends TypeNarrowDelegate<this["data"]["joins"]>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: false;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, typeNarrowDelegate: TypeNarrowDelegateT): (SelectBuilderUtil.WhereIsNotNull<this, TypeNarrowDelegateT>);
    whereIsNull<TypeNarrowDelegateT extends TypeNarrowDelegate<this["data"]["joins"]>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: false;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, typeNarrowDelegate: TypeNarrowDelegateT): (SelectBuilderUtil.WhereIsNull<this, TypeNarrowDelegateT>);
    whereIsEqual<TypeNarrowDelegateT extends TypeNarrowDelegate<this["data"]["joins"]>, ConstT extends boolean | number | string>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: false;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, typeNarrowDelegate: TypeNarrowDelegateT, value: ConstT): (SelectBuilderUtil.WhereIsEqual<this, TypeNarrowDelegateT, ConstT>);
    where<WhereDelegateT extends WhereDelegate<SelectBuilder<DataT>>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, whereDelegate: WhereDelegateT): this;
    andWhere<WhereDelegateT extends WhereDelegate<SelectBuilder<DataT>>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, whereDelegate: WhereDelegateT): this;
    distinct(distinct?: boolean): this;
    sqlCalcFoundRows(sqlCalcFoundRows?: boolean): this;
    groupBy<GroupByDelegateT extends GroupByDelegate<SelectBuilder<DataT>>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, groupByDelegate: GroupByDelegateT): this;
    appendGroupBy<GroupByDelegateT extends GroupByDelegate<SelectBuilder<DataT>>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, groupByDelegate: GroupByDelegateT): this;
    unsetGroupBy(): this;
    having<HavingDelegateT extends HavingDelegate<SelectBuilder<DataT>>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, havingDelegate: HavingDelegateT): this;
    andHaving<HavingDelegateT extends HavingDelegate<SelectBuilder<DataT>>>(this: SelectBuilder<{
        hasSelect: any;
        hasFrom: true;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: any;
        hasParentJoins: any;
        parentJoins: any;
    }>, havingDelegate: HavingDelegateT): this;
    orderBy<OrderByDelegateT extends OrderByDelegate<SelectBuilder<DataT>>>(orderByDelegate: OrderByDelegateT): this;
    appendOrderBy<OrderByDelegateT extends OrderByDelegate<SelectBuilder<DataT>>>(orderByDelegate: OrderByDelegateT): this;
    unsetOrderBy(): this;
    limit(rowCount: number): this;
    offset(offset: number): this;
    unsetLimit(): this;
    unionOrderBy<OrderByDelegateT extends OrderByDelegate<SelectBuilder<DataT>>>(orderByDelegate: OrderByDelegateT): this;
    appendUnionOrderBy<OrderByDelegateT extends OrderByDelegate<SelectBuilder<DataT>>>(orderByDelegate: OrderByDelegateT): this;
    unsetUnionOrderBy(): this;
    unionLimit(rowCount: number): this;
    unionOffset(offset: number): this;
    unsetUnionLimit(): this;
    widen<TypeWidenDelegateT extends TypeWidenDelegate<DataT["selects"]>, WidenT>(this: SelectBuilder<{
        hasSelect: true;
        hasFrom: any;
        hasUnion: any;
        joins: any;
        selects: any;
        aggregateDelegate: undefined;
        hasParentJoins: any;
        parentJoins: any;
    }>, typeWidenDelegate: TypeWidenDelegateT, assertWidened: sd.AssertFunc<WidenT>): (ReturnType<TypeWidenDelegateT> extends Column<infer TableAliasT, infer ColumnNameT, infer TypeT> ? SelectBuilder<{
        readonly [key in keyof DataT]: (key extends "joins" ? JoinCollectionUtil.ReplaceColumnType<DataT["joins"], TableAliasT, ColumnNameT, WidenT | TypeT> : key extends "selects" ? SelectCollectionUtil.ReplaceSelectType<DataT["selects"], TableAliasT, ColumnNameT, WidenT | TypeT> : DataT[key]);
    }> : (invalid.E2<"Invalid column or could not infer some types", ReturnType<TypeWidenDelegateT>>));
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
    subQuery(): (DataT["hasParentJoins"] extends true ? SelectBuilder<{
        hasSelect: false;
        hasFrom: false;
        hasUnion: false;
        joins: [Join<typeof __DUMMY_FROM_TABLE, typeof __DUMMY_FROM_TABLE["columns"], true>];
        selects: undefined;
        aggregateDelegate: undefined;
        hasParentJoins: true;
        parentJoins: (DataT["hasFrom"] extends true ? TupleWConcat<AnyJoin, DataT["parentJoins"], DataT["joins"]> : DataT["parentJoins"]);
    }> : SelectBuilder<{
        hasSelect: false;
        hasFrom: false;
        hasUnion: false;
        joins: [Join<typeof __DUMMY_FROM_TABLE, typeof __DUMMY_FROM_TABLE["columns"], true>];
        selects: undefined;
        aggregateDelegate: undefined;
        hasParentJoins: DataT["hasFrom"];
        parentJoins: DataT["joins"];
    }>);
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
