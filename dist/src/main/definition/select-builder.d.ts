import * as d from "../declaration";
import * as sd from "schema-decorator";
import { Database } from "./Database";
export interface ExtraSelectBuilderData {
    readonly db: Database;
    readonly narrowExpr?: d.IExpr<any, boolean>;
    readonly whereExpr?: d.IExpr<any, boolean>;
    readonly havingExpr?: d.IExpr<any, boolean>;
    readonly union?: d.ISelectBuilder<any>[];
}
export declare class SelectBuilder<DataT extends d.AnySelectBuilderData> implements d.ISelectBuilder<DataT> {
    readonly data: DataT;
    readonly extraData: ExtraSelectBuilderData;
    constructor(data: DataT, extraData: ExtraSelectBuilderData);
    assertAllowed(op: d.SelectBuilderOperation): void;
    assertNonDuplicateAlias(alias: string): void;
    assertEqualLength(a: any[], b: any[]): void;
    private enableOperation;
    private disableOperation;
    join<ToTableT extends d.AnyAliasedTable, FromTupleT extends d.JoinFromTupleCallback<DataT["columnReferences"], d.Tuple<d.AnyColumn>>>(toTable: ToTableT, from: FromTupleT, to: d.JoinToTupleCallback<ToTableT, d.JoinFromTupleOfCallback<FromTupleT>>): any;
    rightJoin<ToTableT extends d.AnyAliasedTable, FromTupleT extends d.JoinFromTupleCallback<DataT["columnReferences"], d.Tuple<d.AnyColumn>>>(toTable: ToTableT, from: FromTupleT, to: d.JoinToTupleCallback<ToTableT, d.JoinFromTupleOfCallback<FromTupleT>>): any;
    leftJoin<ToTableT extends d.AnyAliasedTable, FromTupleT extends d.JoinFromTupleCallback<DataT["columnReferences"], d.Tuple<d.AnyColumn>>>(toTable: ToTableT, from: FromTupleT, to: d.JoinToTupleCallback<ToTableT, d.JoinFromTupleOfCallback<FromTupleT>>): any;
    joinUsing<ToTableT extends d.AnyAliasedTable, FromTupleT extends d.JoinFromTupleCallback<DataT["columnReferences"], d.Tuple<d.AnyColumn>>>(toTable: ToTableT, from: FromTupleT): any;
    rightJoinUsing<ToTableT extends d.AnyAliasedTable, FromTupleT extends d.JoinFromTupleCallback<DataT["columnReferences"], d.Tuple<d.AnyColumn>>>(toTable: ToTableT, from: FromTupleT): any;
    leftJoinUsing<ToTableT extends d.AnyAliasedTable, FromTupleT extends d.JoinFromTupleCallback<DataT["columnReferences"], d.Tuple<d.AnyColumn>>>(toTable: ToTableT, from: FromTupleT): any;
    private appendNarrowData;
    private appendWhereExpr;
    private appendNarrowExpr;
    whereIsNotNull<TypeNarrowCallbackT extends d.TypeNarrowCallback<d.ISelectBuilder<DataT>>>(typeNarrowCallback: TypeNarrowCallbackT): any;
    whereIsNull<TypeNarrowCallbackT extends d.TypeNarrowCallback<d.ISelectBuilder<DataT>>>(typeNarrowCallback: TypeNarrowCallbackT): any;
    whereIsEqual<ConstT extends boolean | number | string, TypeNarrowCallbackT extends d.TypeNarrowCallback<d.ISelectBuilder<DataT>>>(value: ConstT, typeNarrowCallback: TypeNarrowCallbackT): any;
    where<WhereCallbackT extends d.WhereCallback<d.ISelectBuilder<DataT>>>(whereCallback: WhereCallbackT): any;
    andWhere<WhereCallbackT extends d.WhereCallback<d.ISelectBuilder<DataT>>>(whereCallback: WhereCallbackT): any;
    private appendSelectTuple;
    select<SelectCallbackT extends d.SelectCallback<d.ISelectBuilder<DataT>>>(selectCallback: SelectCallbackT): any;
    selectAll(): any;
    distinct(distinct?: boolean): any;
    sqlCalcFoundRows(sqlCalcFoundRows?: boolean): any;
    groupBy<GroupByCallbackT extends d.GroupByCallback<d.ISelectBuilder<DataT>>>(groupByCallback: GroupByCallbackT): any;
    appendGroupBy<GroupByCallbackT extends d.GroupByCallback<d.ISelectBuilder<DataT>>>(groupByCallback: GroupByCallbackT): any;
    unsetGroupBy(): any;
    having<HavingCallbackT extends d.HavingCallback<d.ISelectBuilder<DataT>>>(havingCallback: HavingCallbackT): any;
    andHaving<HavingCallbackT extends d.HavingCallback<d.ISelectBuilder<DataT>>>(havingCallback: HavingCallbackT): any;
    orderBy<OrderByCallbackT extends d.OrderByCallback<d.ISelectBuilder<DataT>>>(orderByCallback: OrderByCallbackT): any;
    appendOrderBy<OrderByCallbackT extends d.OrderByCallback<d.ISelectBuilder<DataT>>>(orderByCallback: OrderByCallbackT): any;
    unsetOrderBy(): any;
    limit<RowCountT extends number>(rowCount: RowCountT): any;
    offset<OffsetT extends number>(offset: OffsetT): any;
    unsetLimit(): any;
    widen<TypeWidenCallbackT extends d.TypeWidenCallback<d.ISelectBuilder<DataT>>, WidenT>(typeWidenCallback: TypeWidenCallbackT, assertWidened: sd.AssertFunc<WidenT>): any;
    union<SelectBuilderT extends d.ISelectBuilder<{
        allowed: any;
        columnReferences: any;
        joins: any;
        selectReferences: any;
        selectTuple: any;
        distinct: any;
        sqlCalcFoundRows: any;
        groupByTuple: any;
        orderByTuple: any;
        limit: any;
        unionOrderByTuple: any;
        unionLimit: any;
    }>>(other: SelectBuilderT): any;
    unionOrderBy<OrderByCallbackT extends d.OrderByCallback<d.ISelectBuilder<DataT>>>(orderByCallback: OrderByCallbackT): any;
    appendUnionOrderBy<OrderByCallbackT extends d.OrderByCallback<d.ISelectBuilder<DataT>>>(orderByCallback: OrderByCallbackT): any;
    unsetUnionOrderBy(): any;
    unionLimit<RowCountT extends number>(rowCount: RowCountT): any;
    unionOffset<OffsetT extends number>(offset: OffsetT): any;
    unsetUnionLimit(): any;
    as<AliasT extends string>(alias: AliasT): any;
    readonly from: d.CreateSubSelectBuilderDelegate<DataT["columnReferences"]>;
    querifyColumnReferences(sb: d.IStringBuilder): void;
    querifyWhere(sb: d.IStringBuilder): void;
    querify(sb: d.IStringBuilder): string;
    private schema;
    private getSchema;
    private readonly processRow;
    private getQuery;
    fetchAll(): any;
    fetchOne(): any;
    fetchZeroOrOne(): any;
    fetchValue(): any;
    fetchValueOrUndefined(): any;
    fetchValueArray(): any;
    count(): Promise<number>;
    exists(): Promise<boolean>;
    paginate(rawPaginationArgs?: d.RawPaginationArgs): any;
}
export declare function newCreateSelectBuilderDelegate(db: Database): d.CreateSelectBuilderDelegate;
