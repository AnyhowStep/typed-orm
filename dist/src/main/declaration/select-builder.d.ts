import * as sd from "schema-decorator";
import { ColumnReferences } from "./column-references";
import { Join, AnyJoin, JoinFromTupleCallback, JoinFromTupleOfCallback, JoinToTupleCallback, MatchesJoinFromTuple, ToNullableJoinTuple, ReplaceColumnOfJoinTuple } from "./join";
import { Tuple, TuplePush, TupleConcat } from "./tuple";
import { AliasedTable, AnyAliasedTable } from "./aliased-table";
import { IColumn, AnyColumn } from "./column";
import { TableAlias, TableToReference } from "./table-operation";
import { ToNullableColumnReferences, ReplaceColumnOfReference, ColumnReferencesToSchemaWithJoins } from "./column-references-operation";
import { TypeNarrowCallback } from "./type-narrow";
import { WhereCallback } from "./where";
import { SelectCallback, SelectTupleHasDuplicateColumn, SelectTupleToReferences, AnySelectTupleElement, ReplaceColumnOfSelectTuple, JoinTupleToSelectTuple } from "./select";
import { GroupByCallback, AnyGroupByTupleElement } from "./group-by";
import { HavingCallback } from "./having";
import { OrderByCallback, AnyOrderByTupleElement } from "./order-by";
import { TypeWidenCallback } from "./widen";
import { SelectTupleToType, SelectTupleElementType } from "./union";
import { JoinableSelectTupleElement, JoinableSelectTupleToRawColumnCollection, JoinableSelectTupleHasDuplicateColumnName } from "./select-as";
import { Querify } from "./querify";
import { RenameTableOfColumns } from "./column-operation";
import { IStringBuilder } from "./IStringBuilder";
import { SelectBuilderValueQuery, IColumnExpr } from "./expr";
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
export declare enum SelectBuilderOperation {
    JOIN = "JOIN",
    NARROW = "NARROW",
    WHERE = "WHERE",
    SELECT = "SELECT",
    DISTINCT = "DISTINCT",
    SQL_CALC_FOUND_ROWS = "SQL_CALC_FOUND_ROWS",
    GROUP_BY = "GROUP_BY",
    HAVING = "HAVING",
    ORDER_BY = "ORDER_BY",
    LIMIT = "LIMIT",
    OFFSET = "OFFSET",
    WIDEN = "WIDEN",
    UNION = "UNION",
    UNION_ORDER_BY = "UNION_ORDER_BY",
    UNION_LIMIT = "UNION_LIMIT",
    UNION_OFFSET = "UNION_OFFSET",
    AS = "AS",
    FETCH = "FETCH",
    AGGREGATE = "AGGREGATE"
}
export declare type DisableOperation<DataT extends AnySelectBuilderData, OperationT extends SelectBuilderOperation> = (DataT["allowed"] extends Array<infer AllowedT> ? (AllowedT extends SelectBuilderOperation ? (Exclude<AllowedT, OperationT>[]) : (never)) : (never));
export declare type EnableOperation<DataT extends AnySelectBuilderData, OperationT extends SelectBuilderOperation> = (DataT["allowed"] extends Array<infer AllowedT> ? (AllowedT extends SelectBuilderOperation ? (AllowedT | OperationT)[] : (never)) : (never));
export declare const ArbitraryRowCount = 999999999;
export interface LimitData {
    readonly rowCount: number;
    readonly offset: number;
}
export declare type AggregateCallback<DataT extends AnySelectBuilderData> = ((row: ColumnReferencesToSchemaWithJoins<DataT["selectReferences"], DataT["joins"]>) => Promise<any> | any);
export declare type FetchRowResult<DataT extends AnySelectBuilderData> = (DataT["aggregateCallback"] extends ((row: any) => infer R) ? (R extends Promise<infer P> ? P : R) : ColumnReferencesToSchemaWithJoins<DataT["selectReferences"], DataT["joins"]>);
export interface AnySelectBuilderData {
    readonly allowed: SelectBuilderOperation[];
    readonly columnReferences: ColumnReferences;
    readonly joins: Tuple<AnyJoin>;
    readonly selectReferences: ColumnReferences;
    readonly selectTuple: undefined | Tuple<AnySelectTupleElement>;
    readonly distinct: boolean;
    readonly sqlCalcFoundRows: boolean;
    readonly groupByTuple: undefined | Tuple<AnyGroupByTupleElement>;
    readonly orderByTuple: undefined | Tuple<AnyOrderByTupleElement>;
    readonly limit: undefined | LimitData;
    readonly unionOrderByTuple: undefined | Tuple<AnyOrderByTupleElement>;
    readonly unionLimit: undefined | LimitData;
    readonly aggregateCallback: undefined | ((row: any) => Promise<any>);
}
export declare type IsAllowedSelectBuilderOperation<DataT extends AnySelectBuilderData, OperationT extends SelectBuilderOperation> = (OperationT[] extends DataT["allowed"] ? true : never);
export interface ISelectBuilder<DataT extends AnySelectBuilderData> extends Querify {
    readonly data: DataT;
    join<ToTableT extends AnyAliasedTable, FromTupleT extends JoinFromTupleCallback<DataT["columnReferences"], Tuple<AnyColumn>>>(toTable: ToTableT, from: FromTupleT, to: JoinToTupleCallback<ToTableT, JoinFromTupleOfCallback<FromTupleT>>): (IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.JOIN> extends never ? ("JOIN clause not allowed here" | void | never) : (TableAlias<ToTableT> extends keyof DataT["columnReferences"] ? ("Duplicate alias" | TableAlias<ToTableT> | void) : (JoinFromTupleOfCallback<FromTupleT> extends MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>> ? (ISelectBuilder<{
        allowed: DataT["allowed"];
        columnReferences: (DataT["columnReferences"] & TableToReference<ToTableT>);
        joins: (TuplePush<DataT["joins"], Join<"INNER", ToTableT, TableToReference<ToTableT>, false>>);
        selectReferences: DataT["selectReferences"];
        selectTuple: DataT["selectTuple"];
        distinct: DataT["distinct"];
        sqlCalcFoundRows: DataT["sqlCalcFoundRows"];
        groupByTuple: DataT["groupByTuple"];
        orderByTuple: DataT["orderByTuple"];
        limit: DataT["limit"];
        unionOrderByTuple: DataT["unionOrderByTuple"];
        unionLimit: DataT["unionLimit"];
        aggregateCallback: DataT["aggregateCallback"];
    }>) : (MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>> | void))));
    rightJoin<ToTableT extends AnyAliasedTable, FromTupleT extends JoinFromTupleCallback<DataT["columnReferences"], Tuple<AnyColumn>>>(toTable: ToTableT, from: FromTupleT, to: JoinToTupleCallback<ToTableT, JoinFromTupleOfCallback<FromTupleT>>): (IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.JOIN> extends never ? ("JOIN clause not allowed here" | void | never) : (TableAlias<ToTableT> extends keyof DataT["columnReferences"] ? ("Duplicate alias" | TableAlias<ToTableT> | void) : (JoinFromTupleOfCallback<FromTupleT> extends MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>> ? (ISelectBuilder<{
        allowed: DataT["allowed"];
        columnReferences: (ToNullableColumnReferences<DataT["columnReferences"]> & TableToReference<ToTableT>);
        joins: (TuplePush<ToNullableJoinTuple<DataT["joins"]>, Join<"RIGHT", ToTableT, TableToReference<ToTableT>, false>>);
        selectReferences: DataT["selectReferences"];
        selectTuple: DataT["selectTuple"];
        distinct: DataT["distinct"];
        sqlCalcFoundRows: DataT["sqlCalcFoundRows"];
        groupByTuple: DataT["groupByTuple"];
        orderByTuple: DataT["orderByTuple"];
        limit: DataT["limit"];
        unionOrderByTuple: DataT["unionOrderByTuple"];
        unionLimit: DataT["unionLimit"];
        aggregateCallback: DataT["aggregateCallback"];
    }>) : (MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>> | void))));
    leftJoin<ToTableT extends AnyAliasedTable, FromTupleT extends JoinFromTupleCallback<DataT["columnReferences"], Tuple<AnyColumn>>>(toTable: ToTableT, from: FromTupleT, to: JoinToTupleCallback<ToTableT, JoinFromTupleOfCallback<FromTupleT>>): (IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.JOIN> extends never ? ("JOIN clause not allowed here" | void | never) : (TableAlias<ToTableT> extends keyof DataT["columnReferences"] ? ("Duplicate alias" | TableAlias<ToTableT> | void) : (JoinFromTupleOfCallback<FromTupleT> extends MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>> ? (ISelectBuilder<{
        allowed: DataT["allowed"];
        columnReferences: (DataT["columnReferences"] & ToNullableColumnReferences<TableToReference<ToTableT>>);
        joins: (TuplePush<DataT["joins"], Join<"LEFT", ToTableT, TableToReference<ToTableT>, true>>);
        selectReferences: DataT["selectReferences"];
        selectTuple: DataT["selectTuple"];
        distinct: DataT["distinct"];
        sqlCalcFoundRows: DataT["sqlCalcFoundRows"];
        groupByTuple: DataT["groupByTuple"];
        orderByTuple: DataT["orderByTuple"];
        limit: DataT["limit"];
        unionOrderByTuple: DataT["unionOrderByTuple"];
        unionLimit: DataT["unionLimit"];
        aggregateCallback: DataT["aggregateCallback"];
    }>) : (MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>> | void))));
    joinUsing<ToTableT extends AnyAliasedTable, FromTupleT extends JoinFromTupleCallback<DataT["columnReferences"], Tuple<AnyColumn>>>(toTable: ToTableT, from: FromTupleT): (IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.JOIN> extends never ? ("JOIN USING clause not allowed here" | void | never) : (TableAlias<ToTableT> extends keyof DataT["columnReferences"] ? ("Duplicate alias" | TableAlias<ToTableT> | void) : (JoinFromTupleOfCallback<FromTupleT> extends MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>> ? (RenameTableOfColumns<JoinFromTupleOfCallback<FromTupleT>, ToTableT["alias"]> extends JoinToTupleCallback<ToTableT, JoinFromTupleOfCallback<FromTupleT>> ? ISelectBuilder<{
        allowed: DataT["allowed"];
        columnReferences: (DataT["columnReferences"] & TableToReference<ToTableT>);
        joins: (TuplePush<DataT["joins"], Join<"INNER", ToTableT, TableToReference<ToTableT>, false>>);
        selectReferences: DataT["selectReferences"];
        selectTuple: DataT["selectTuple"];
        distinct: DataT["distinct"];
        sqlCalcFoundRows: DataT["sqlCalcFoundRows"];
        groupByTuple: DataT["groupByTuple"];
        orderByTuple: DataT["orderByTuple"];
        limit: DataT["limit"];
        unionOrderByTuple: DataT["unionOrderByTuple"];
        unionLimit: DataT["unionLimit"];
        aggregateCallback: DataT["aggregateCallback"];
    }> : ("Cannot JOIN USING; to table is missing columns or types do not match" | void | never)) : (MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>> | void))));
    rightJoinUsing<ToTableT extends AnyAliasedTable, FromTupleT extends JoinFromTupleCallback<DataT["columnReferences"], Tuple<AnyColumn>>>(toTable: ToTableT, from: FromTupleT): (IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.JOIN> extends never ? ("JOIN clause not allowed here" | void | never) : (TableAlias<ToTableT> extends keyof DataT["columnReferences"] ? ("Duplicate alias" | TableAlias<ToTableT> | void) : (JoinFromTupleOfCallback<FromTupleT> extends MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>> ? (RenameTableOfColumns<JoinFromTupleOfCallback<FromTupleT>, ToTableT["alias"]> extends JoinToTupleCallback<ToTableT, JoinFromTupleOfCallback<FromTupleT>> ? ISelectBuilder<{
        allowed: DataT["allowed"];
        columnReferences: (ToNullableColumnReferences<DataT["columnReferences"]> & TableToReference<ToTableT>);
        joins: (TuplePush<ToNullableJoinTuple<DataT["joins"]>, Join<"RIGHT", ToTableT, TableToReference<ToTableT>, false>>);
        selectReferences: DataT["selectReferences"];
        selectTuple: DataT["selectTuple"];
        distinct: DataT["distinct"];
        sqlCalcFoundRows: DataT["sqlCalcFoundRows"];
        groupByTuple: DataT["groupByTuple"];
        orderByTuple: DataT["orderByTuple"];
        limit: DataT["limit"];
        unionOrderByTuple: DataT["unionOrderByTuple"];
        unionLimit: DataT["unionLimit"];
        aggregateCallback: DataT["aggregateCallback"];
    }> : ("Cannot RIGHT JOIN USING; to table is missing columns or types do not match" | void | never)) : (MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>> | void))));
    leftJoinUsing<ToTableT extends AnyAliasedTable, FromTupleT extends JoinFromTupleCallback<DataT["columnReferences"], Tuple<AnyColumn>>>(toTable: ToTableT, from: FromTupleT): (IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.JOIN> extends never ? ("JOIN clause not allowed here" | void | never) : (TableAlias<ToTableT> extends keyof DataT["columnReferences"] ? ("Duplicate alias" | TableAlias<ToTableT> | void) : (JoinFromTupleOfCallback<FromTupleT> extends MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>> ? (RenameTableOfColumns<JoinFromTupleOfCallback<FromTupleT>, ToTableT["alias"]> extends JoinToTupleCallback<ToTableT, JoinFromTupleOfCallback<FromTupleT>> ? ISelectBuilder<{
        allowed: DataT["allowed"];
        columnReferences: (DataT["columnReferences"] & ToNullableColumnReferences<TableToReference<ToTableT>>);
        joins: (TuplePush<DataT["joins"], Join<"LEFT", ToTableT, TableToReference<ToTableT>, true>>);
        selectReferences: DataT["selectReferences"];
        selectTuple: DataT["selectTuple"];
        distinct: DataT["distinct"];
        sqlCalcFoundRows: DataT["sqlCalcFoundRows"];
        groupByTuple: DataT["groupByTuple"];
        orderByTuple: DataT["orderByTuple"];
        limit: DataT["limit"];
        unionOrderByTuple: DataT["unionOrderByTuple"];
        unionLimit: DataT["unionLimit"];
        aggregateCallback: DataT["aggregateCallback"];
    }> : ("Cannot LEFT JOIN USING; to table is missing columns or types do not match" | void | never)) : (MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>> | void))));
    whereIsNotNull<TypeNarrowCallbackT extends TypeNarrowCallback<ISelectBuilder<DataT>>>(typeNarrowCallback: TypeNarrowCallbackT): (IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.NARROW> extends never ? ("NARROW clause not allowed here" | void | never) : ReturnType<TypeNarrowCallbackT> extends IColumn<infer TableNameT, infer NameT, infer TypeT> ? ISelectBuilder<{
        allowed: DataT["allowed"];
        columnReferences: ReplaceColumnOfReference<DataT["columnReferences"], TableNameT, NameT, Exclude<TypeT, null | undefined>>;
        joins: ReplaceColumnOfJoinTuple<DataT["joins"], TableNameT, NameT, Exclude<TypeT, null | undefined>>;
        selectReferences: ReplaceColumnOfReference<DataT["selectReferences"], TableNameT, NameT, Exclude<TypeT, null | undefined>>;
        selectTuple: (DataT["selectTuple"] extends Tuple<any> ? ReplaceColumnOfSelectTuple<DataT["selectTuple"], TableNameT, NameT, Exclude<TypeT, null | undefined>> : undefined);
        distinct: DataT["distinct"];
        sqlCalcFoundRows: DataT["sqlCalcFoundRows"];
        groupByTuple: DataT["groupByTuple"];
        orderByTuple: DataT["orderByTuple"];
        limit: DataT["limit"];
        unionOrderByTuple: DataT["unionOrderByTuple"];
        unionLimit: DataT["unionLimit"];
        aggregateCallback: DataT["aggregateCallback"];
    }> : ("Invalid ColumnT or cannot infer TableNameT/NameT/TypeT" | void | never));
    whereIsNull<TypeNarrowCallbackT extends TypeNarrowCallback<ISelectBuilder<DataT>>>(typeNarrowCallback: TypeNarrowCallbackT): (IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.NARROW> extends never ? ("NARROW clause not allowed here" | void | never) : ReturnType<TypeNarrowCallbackT> extends IColumn<infer TableNameT, infer NameT, infer TypeT> ? ISelectBuilder<{
        allowed: DataT["allowed"];
        columnReferences: ReplaceColumnOfReference<DataT["columnReferences"], TableNameT, NameT, null>;
        joins: ReplaceColumnOfJoinTuple<DataT["joins"], TableNameT, NameT, null>;
        selectReferences: ReplaceColumnOfReference<DataT["selectReferences"], TableNameT, NameT, null>;
        selectTuple: (DataT["selectTuple"] extends Tuple<any> ? ReplaceColumnOfSelectTuple<DataT["selectTuple"], TableNameT, NameT, null> : undefined);
        distinct: DataT["distinct"];
        sqlCalcFoundRows: DataT["sqlCalcFoundRows"];
        groupByTuple: DataT["groupByTuple"];
        orderByTuple: DataT["orderByTuple"];
        limit: DataT["limit"];
        unionOrderByTuple: DataT["unionOrderByTuple"];
        unionLimit: DataT["unionLimit"];
        aggregateCallback: DataT["aggregateCallback"];
    }> : ("Invalid ColumnT or cannot infer TableNameT/NameT/TypeT" | void | never));
    whereIsEqual<ConstT extends boolean | number | string, TypeNarrowCallbackT extends TypeNarrowCallback<ISelectBuilder<DataT>>>(value: ConstT, typeNarrowCallback: TypeNarrowCallbackT): (IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.NARROW> extends never ? ("NARROW clause not allowed here" | void | never) : ReturnType<TypeNarrowCallbackT> extends IColumn<infer TableNameT, infer NameT, infer TypeT> ? ISelectBuilder<{
        allowed: DataT["allowed"];
        columnReferences: ReplaceColumnOfReference<DataT["columnReferences"], TableNameT, NameT, ConstT>;
        joins: ReplaceColumnOfJoinTuple<DataT["joins"], TableNameT, NameT, ConstT>;
        selectReferences: ReplaceColumnOfReference<DataT["selectReferences"], TableNameT, NameT, ConstT>;
        selectTuple: (DataT["selectTuple"] extends Tuple<any> ? ReplaceColumnOfSelectTuple<DataT["selectTuple"], TableNameT, NameT, ConstT> : undefined);
        distinct: DataT["distinct"];
        sqlCalcFoundRows: DataT["sqlCalcFoundRows"];
        groupByTuple: DataT["groupByTuple"];
        orderByTuple: DataT["orderByTuple"];
        limit: DataT["limit"];
        unionOrderByTuple: DataT["unionOrderByTuple"];
        unionLimit: DataT["unionLimit"];
        aggregateCallback: DataT["aggregateCallback"];
    }> : ("Invalid ColumnT or cannot infer TableNameT/NameT/TypeT" | void | never));
    where<WhereCallbackT extends WhereCallback<ISelectBuilder<DataT>>>(whereCallback: WhereCallbackT): (IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.WHERE> extends never ? ("WHERE clause not allowed here" | void | never) : ISelectBuilder<{
        allowed: DataT["allowed"];
        columnReferences: DataT["columnReferences"];
        joins: DataT["joins"];
        selectReferences: DataT["selectReferences"];
        selectTuple: DataT["selectTuple"];
        distinct: DataT["distinct"];
        sqlCalcFoundRows: DataT["sqlCalcFoundRows"];
        groupByTuple: DataT["groupByTuple"];
        orderByTuple: DataT["orderByTuple"];
        limit: DataT["limit"];
        unionOrderByTuple: DataT["unionOrderByTuple"];
        unionLimit: DataT["unionLimit"];
        aggregateCallback: DataT["aggregateCallback"];
    }>);
    andWhere<WhereCallbackT extends WhereCallback<ISelectBuilder<DataT>>>(whereCallback: WhereCallbackT): (IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.WHERE> extends never ? ("WHERE clause not allowed here" | void | never) : ISelectBuilder<{
        allowed: DataT["allowed"];
        columnReferences: DataT["columnReferences"];
        joins: DataT["joins"];
        selectReferences: DataT["selectReferences"];
        selectTuple: DataT["selectTuple"];
        distinct: DataT["distinct"];
        sqlCalcFoundRows: DataT["sqlCalcFoundRows"];
        groupByTuple: DataT["groupByTuple"];
        orderByTuple: DataT["orderByTuple"];
        limit: DataT["limit"];
        unionOrderByTuple: DataT["unionOrderByTuple"];
        unionLimit: DataT["unionLimit"];
        aggregateCallback: DataT["aggregateCallback"];
    }>);
    select<SelectCallbackT extends SelectCallback<ISelectBuilder<DataT>>>(selectCallback: SelectCallbackT): (IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.SELECT> extends never ? ("SELECT clause not allowed here" | void | never) : true extends SelectTupleHasDuplicateColumn<(DataT["selectTuple"] extends Tuple<any> ? TupleConcat<DataT["selectTuple"], ReturnType<SelectCallbackT>> : ReturnType<SelectCallbackT>)> ? ("Duplicate columns found in SELECT, consider aliasing" | void | never) : ISelectBuilder<{
        allowed: EnableOperation<DataT, SelectBuilderOperation.WIDEN | SelectBuilderOperation.UNION | SelectBuilderOperation.AS | SelectBuilderOperation.FETCH | SelectBuilderOperation.AGGREGATE>;
        columnReferences: DataT["columnReferences"];
        joins: DataT["joins"];
        selectReferences: (DataT["selectReferences"] & SelectTupleToReferences<ReturnType<SelectCallbackT>>);
        selectTuple: (DataT["selectTuple"] extends Tuple<any> ? TupleConcat<DataT["selectTuple"], ReturnType<SelectCallbackT>> : ReturnType<SelectCallbackT>);
        distinct: DataT["distinct"];
        sqlCalcFoundRows: DataT["sqlCalcFoundRows"];
        groupByTuple: DataT["groupByTuple"];
        orderByTuple: DataT["orderByTuple"];
        limit: DataT["limit"];
        unionOrderByTuple: DataT["unionOrderByTuple"];
        unionLimit: DataT["unionLimit"];
        aggregateCallback: DataT["aggregateCallback"];
    }>);
    selectAll(): (IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.SELECT> extends never ? ("SELECT clause not allowed here" | void | never) : (DataT["selectTuple"] extends undefined ? ISelectBuilder<{
        allowed: EnableOperation<DataT, SelectBuilderOperation.WIDEN | SelectBuilderOperation.UNION | SelectBuilderOperation.AS | SelectBuilderOperation.FETCH | SelectBuilderOperation.AGGREGATE>;
        columnReferences: DataT["columnReferences"];
        joins: DataT["joins"];
        selectReferences: DataT["columnReferences"];
        selectTuple: JoinTupleToSelectTuple<DataT["joins"]>;
        distinct: DataT["distinct"];
        sqlCalcFoundRows: DataT["sqlCalcFoundRows"];
        groupByTuple: DataT["groupByTuple"];
        orderByTuple: DataT["orderByTuple"];
        limit: DataT["limit"];
        unionOrderByTuple: DataT["unionOrderByTuple"];
        unionLimit: DataT["unionLimit"];
        aggregateCallback: DataT["aggregateCallback"];
    }> : ("selectAll() must be called before select()" | void | never)));
    distinct(): (IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.DISTINCT> extends never ? ("DISTINCT clause not allowed here" | void | never) : ISelectBuilder<{
        allowed: DataT["allowed"];
        columnReferences: DataT["columnReferences"];
        joins: DataT["joins"];
        selectReferences: DataT["selectReferences"];
        selectTuple: DataT["selectTuple"];
        distinct: true;
        sqlCalcFoundRows: DataT["sqlCalcFoundRows"];
        groupByTuple: DataT["groupByTuple"];
        orderByTuple: DataT["orderByTuple"];
        limit: DataT["limit"];
        unionOrderByTuple: DataT["unionOrderByTuple"];
        unionLimit: DataT["unionLimit"];
        aggregateCallback: DataT["aggregateCallback"];
    }>);
    distinct<DistinctT extends boolean>(distinct: DistinctT): (IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.DISTINCT> extends never ? ("DISTINCT clause not allowed here" | void | never) : ISelectBuilder<{
        allowed: DataT["allowed"];
        columnReferences: DataT["columnReferences"];
        joins: DataT["joins"];
        selectReferences: DataT["selectReferences"];
        selectTuple: DataT["selectTuple"];
        distinct: DistinctT;
        sqlCalcFoundRows: DataT["sqlCalcFoundRows"];
        groupByTuple: DataT["groupByTuple"];
        orderByTuple: DataT["orderByTuple"];
        limit: DataT["limit"];
        unionOrderByTuple: DataT["unionOrderByTuple"];
        unionLimit: DataT["unionLimit"];
        aggregateCallback: DataT["aggregateCallback"];
    }>);
    sqlCalcFoundRows(): (IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.SQL_CALC_FOUND_ROWS> extends never ? ("SQL_CALC_FOUND_ROWS clause not allowed here" | void | never) : ISelectBuilder<{
        allowed: DataT["allowed"];
        columnReferences: DataT["columnReferences"];
        joins: DataT["joins"];
        selectReferences: DataT["selectReferences"];
        selectTuple: DataT["selectTuple"];
        distinct: DataT["distinct"];
        sqlCalcFoundRows: true;
        groupByTuple: DataT["groupByTuple"];
        orderByTuple: DataT["orderByTuple"];
        limit: DataT["limit"];
        unionOrderByTuple: DataT["unionOrderByTuple"];
        unionLimit: DataT["unionLimit"];
        aggregateCallback: DataT["aggregateCallback"];
    }>);
    sqlCalcFoundRows<SqlCalcFoundRowsT extends boolean>(sqlCalcFoundRows: SqlCalcFoundRowsT): (IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.SQL_CALC_FOUND_ROWS> extends never ? ("SQL_CALC_FOUND_ROWS clause not allowed here" | void | never) : ISelectBuilder<{
        allowed: DataT["allowed"];
        columnReferences: DataT["columnReferences"];
        joins: DataT["joins"];
        selectReferences: DataT["selectReferences"];
        selectTuple: DataT["selectTuple"];
        distinct: DataT["distinct"];
        sqlCalcFoundRows: SqlCalcFoundRowsT;
        groupByTuple: DataT["groupByTuple"];
        orderByTuple: DataT["orderByTuple"];
        limit: DataT["limit"];
        unionOrderByTuple: DataT["unionOrderByTuple"];
        unionLimit: DataT["unionLimit"];
        aggregateCallback: DataT["aggregateCallback"];
    }>);
    groupBy<GroupByCallbackT extends GroupByCallback<ISelectBuilder<DataT>>>(groupByCallback: GroupByCallbackT): (IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.GROUP_BY> extends never ? ("GROUP_BY clause not allowed here" | void | never) : ISelectBuilder<{
        allowed: DataT["allowed"];
        columnReferences: DataT["columnReferences"];
        joins: DataT["joins"];
        selectReferences: DataT["selectReferences"];
        selectTuple: DataT["selectTuple"];
        distinct: DataT["distinct"];
        sqlCalcFoundRows: DataT["sqlCalcFoundRows"];
        groupByTuple: ReturnType<GroupByCallbackT>;
        orderByTuple: DataT["orderByTuple"];
        limit: DataT["limit"];
        unionOrderByTuple: DataT["unionOrderByTuple"];
        unionLimit: DataT["unionLimit"];
        aggregateCallback: DataT["aggregateCallback"];
    }>);
    appendGroupBy<GroupByCallbackT extends GroupByCallback<ISelectBuilder<DataT>>>(groupByCallback: GroupByCallbackT): (IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.GROUP_BY> extends never ? ("GROUP_BY clause not allowed here" | void | never) : ISelectBuilder<{
        allowed: DataT["allowed"];
        columnReferences: DataT["columnReferences"];
        joins: DataT["joins"];
        selectReferences: DataT["selectReferences"];
        selectTuple: DataT["selectTuple"];
        distinct: DataT["distinct"];
        sqlCalcFoundRows: DataT["sqlCalcFoundRows"];
        groupByTuple: (DataT["groupByTuple"] extends Tuple<any> ? TupleConcat<DataT["groupByTuple"], ReturnType<GroupByCallbackT>> : ReturnType<GroupByCallbackT>);
        orderByTuple: DataT["orderByTuple"];
        limit: DataT["limit"];
        unionOrderByTuple: DataT["unionOrderByTuple"];
        unionLimit: DataT["unionLimit"];
        aggregateCallback: DataT["aggregateCallback"];
    }>);
    unsetGroupBy(): (ISelectBuilder<{
        allowed: DataT["allowed"];
        columnReferences: DataT["columnReferences"];
        joins: DataT["joins"];
        selectReferences: DataT["selectReferences"];
        selectTuple: DataT["selectTuple"];
        distinct: DataT["distinct"];
        sqlCalcFoundRows: DataT["sqlCalcFoundRows"];
        groupByTuple: undefined;
        orderByTuple: DataT["orderByTuple"];
        limit: DataT["limit"];
        unionOrderByTuple: DataT["unionOrderByTuple"];
        unionLimit: DataT["unionLimit"];
        aggregateCallback: DataT["aggregateCallback"];
    }>);
    having<HavingCallbackT extends HavingCallback<ISelectBuilder<DataT>>>(havingCallback: HavingCallbackT): (IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.HAVING> extends never ? ("HAVING clause not allowed here" | void | never) : ISelectBuilder<{
        allowed: DataT["allowed"];
        columnReferences: DataT["columnReferences"];
        joins: DataT["joins"];
        selectReferences: DataT["selectReferences"];
        selectTuple: DataT["selectTuple"];
        distinct: DataT["distinct"];
        sqlCalcFoundRows: DataT["sqlCalcFoundRows"];
        groupByTuple: DataT["groupByTuple"];
        orderByTuple: DataT["orderByTuple"];
        limit: DataT["limit"];
        unionOrderByTuple: DataT["unionOrderByTuple"];
        unionLimit: DataT["unionLimit"];
        aggregateCallback: DataT["aggregateCallback"];
    }>);
    andHaving<HavingCallbackT extends HavingCallback<ISelectBuilder<DataT>>>(havingCallback: HavingCallbackT): (IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.HAVING> extends never ? ("HAVING clause not allowed here" | void | never) : ISelectBuilder<{
        allowed: DataT["allowed"];
        columnReferences: DataT["columnReferences"];
        joins: DataT["joins"];
        selectReferences: DataT["selectReferences"];
        selectTuple: DataT["selectTuple"];
        distinct: DataT["distinct"];
        sqlCalcFoundRows: DataT["sqlCalcFoundRows"];
        groupByTuple: DataT["groupByTuple"];
        orderByTuple: DataT["orderByTuple"];
        limit: DataT["limit"];
        unionOrderByTuple: DataT["unionOrderByTuple"];
        unionLimit: DataT["unionLimit"];
        aggregateCallback: DataT["aggregateCallback"];
    }>);
    orderBy<OrderByCallbackT extends OrderByCallback<ISelectBuilder<DataT>>>(orderByCallback: OrderByCallbackT): (IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.ORDER_BY> extends never ? ("ORDER_BY clause not allowed here" | void | never) : ISelectBuilder<{
        allowed: DataT["allowed"];
        columnReferences: DataT["columnReferences"];
        joins: DataT["joins"];
        selectReferences: DataT["selectReferences"];
        selectTuple: DataT["selectTuple"];
        distinct: DataT["distinct"];
        sqlCalcFoundRows: DataT["sqlCalcFoundRows"];
        groupByTuple: DataT["groupByTuple"];
        orderByTuple: ReturnType<OrderByCallbackT>;
        limit: DataT["limit"];
        unionOrderByTuple: DataT["unionOrderByTuple"];
        unionLimit: DataT["unionLimit"];
        aggregateCallback: DataT["aggregateCallback"];
    }>);
    appendOrderBy<OrderByCallbackT extends OrderByCallback<ISelectBuilder<DataT>>>(orderByCallback: OrderByCallbackT): (IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.ORDER_BY> extends never ? ("ORDER_BY clause not allowed here" | void | never) : ISelectBuilder<{
        allowed: DataT["allowed"];
        columnReferences: DataT["columnReferences"];
        joins: DataT["joins"];
        selectReferences: DataT["selectReferences"];
        selectTuple: DataT["selectTuple"];
        distinct: DataT["distinct"];
        sqlCalcFoundRows: DataT["sqlCalcFoundRows"];
        groupByTuple: DataT["groupByTuple"];
        orderByTuple: (DataT["orderByTuple"] extends Tuple<any> ? TupleConcat<DataT["orderByTuple"], ReturnType<OrderByCallbackT>> : ReturnType<OrderByCallbackT>);
        limit: DataT["limit"];
        unionOrderByTuple: DataT["unionOrderByTuple"];
        unionLimit: DataT["unionLimit"];
        aggregateCallback: DataT["aggregateCallback"];
    }>);
    unsetOrderBy(): (ISelectBuilder<{
        allowed: DataT["allowed"];
        columnReferences: DataT["columnReferences"];
        joins: DataT["joins"];
        selectReferences: DataT["selectReferences"];
        selectTuple: DataT["selectTuple"];
        distinct: DataT["distinct"];
        sqlCalcFoundRows: DataT["sqlCalcFoundRows"];
        groupByTuple: DataT["groupByTuple"];
        orderByTuple: undefined;
        limit: DataT["limit"];
        unionOrderByTuple: DataT["unionOrderByTuple"];
        unionLimit: DataT["unionLimit"];
        aggregateCallback: DataT["aggregateCallback"];
    }>);
    limit<RowCountT extends number>(rowCount: RowCountT): (IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.LIMIT> extends never ? ("LIMIT clause not allowed here" | void | never) : ISelectBuilder<{
        allowed: DataT["allowed"];
        columnReferences: DataT["columnReferences"];
        joins: DataT["joins"];
        selectReferences: DataT["selectReferences"];
        selectTuple: DataT["selectTuple"];
        distinct: DataT["distinct"];
        sqlCalcFoundRows: DataT["sqlCalcFoundRows"];
        groupByTuple: DataT["groupByTuple"];
        orderByTuple: DataT["orderByTuple"];
        limit: (DataT["limit"] extends LimitData ? {
            rowCount: RowCountT;
            offset: DataT["limit"]["offset"];
        } : {
            rowCount: RowCountT;
            offset: 0;
        });
        unionOrderByTuple: DataT["unionOrderByTuple"];
        unionLimit: DataT["unionLimit"];
        aggregateCallback: DataT["aggregateCallback"];
    }>);
    offset<OffsetT extends number>(offset: OffsetT): (IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.OFFSET> extends never ? ("OFFSET clause not allowed here" | void | never) : ISelectBuilder<{
        allowed: DataT["allowed"];
        columnReferences: DataT["columnReferences"];
        joins: DataT["joins"];
        selectReferences: DataT["selectReferences"];
        selectTuple: DataT["selectTuple"];
        distinct: DataT["distinct"];
        sqlCalcFoundRows: DataT["sqlCalcFoundRows"];
        groupByTuple: DataT["groupByTuple"];
        orderByTuple: DataT["orderByTuple"];
        limit: (DataT["limit"] extends LimitData ? {
            rowCount: DataT["limit"]["rowCount"];
            offset: OffsetT;
        } : {
            rowCount: typeof ArbitraryRowCount;
            offset: OffsetT;
        });
        unionOrderByTuple: DataT["unionOrderByTuple"];
        unionLimit: DataT["unionLimit"];
        aggregateCallback: DataT["aggregateCallback"];
    }>);
    unsetLimit(): (ISelectBuilder<{
        allowed: DataT["allowed"];
        columnReferences: DataT["columnReferences"];
        joins: DataT["joins"];
        selectReferences: DataT["selectReferences"];
        selectTuple: DataT["selectTuple"];
        distinct: DataT["distinct"];
        sqlCalcFoundRows: DataT["sqlCalcFoundRows"];
        groupByTuple: DataT["groupByTuple"];
        orderByTuple: DataT["orderByTuple"];
        limit: undefined;
        unionOrderByTuple: DataT["unionOrderByTuple"];
        unionLimit: DataT["unionLimit"];
        aggregateCallback: DataT["aggregateCallback"];
    }>);
    widen<TypeWidenCallbackT extends TypeWidenCallback<ISelectBuilder<DataT>>, WidenT>(typeWidenCallback: TypeWidenCallbackT, assertWidened: sd.AssertFunc<WidenT>): (IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.WIDEN> extends never ? ("WIDEN clause not allowed here" | void | never) : ReturnType<TypeWidenCallbackT> extends IColumn<infer TableNameT, infer NameT, infer TypeT> ? ISelectBuilder<{
        allowed: DataT["allowed"];
        columnReferences: DataT["columnReferences"];
        joins: ReplaceColumnOfJoinTuple<DataT["joins"], TableNameT, NameT, TypeT | WidenT>;
        selectReferences: ReplaceColumnOfReference<DataT["selectReferences"], TableNameT, NameT, TypeT | WidenT>;
        selectTuple: (DataT["selectTuple"] extends Tuple<any> ? ReplaceColumnOfSelectTuple<DataT["selectTuple"], TableNameT, NameT, TypeT | WidenT> : undefined);
        distinct: DataT["distinct"];
        sqlCalcFoundRows: DataT["sqlCalcFoundRows"];
        groupByTuple: DataT["groupByTuple"];
        orderByTuple: DataT["orderByTuple"];
        limit: DataT["limit"];
        unionOrderByTuple: DataT["unionOrderByTuple"];
        unionLimit: DataT["unionLimit"];
        aggregateCallback: DataT["aggregateCallback"];
    }> : ("Invalid ColumnT or cannot infer TableNameT/NameT/TypeT" | void | never));
    union<SelectBuilderT extends ISelectBuilder<{
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
        aggregateCallback: any;
    }>>(selectBuilder: SelectBuilderT): (IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.UNION> extends never ? ("UNION clause not allowed here" | void | never) : SelectBuilderT extends ISelectBuilder<infer OtherT> ? (OtherT["selectTuple"] extends Tuple<any> ? (DataT["selectTuple"] extends Tuple<any> ? (SelectTupleToType<OtherT["selectTuple"]> extends SelectTupleToType<DataT["selectTuple"]> ? ISelectBuilder<{
        allowed: DisableOperation<DataT, SelectBuilderOperation.NARROW | SelectBuilderOperation.SELECT>;
        columnReferences: DataT["columnReferences"];
        joins: DataT["joins"];
        selectReferences: DataT["selectReferences"];
        selectTuple: DataT["selectTuple"];
        distinct: DataT["distinct"];
        sqlCalcFoundRows: DataT["sqlCalcFoundRows"];
        groupByTuple: DataT["groupByTuple"];
        orderByTuple: DataT["orderByTuple"];
        limit: DataT["limit"];
        unionOrderByTuple: DataT["unionOrderByTuple"];
        unionLimit: DataT["unionLimit"];
        aggregateCallback: DataT["aggregateCallback"];
    }> : ("Cannot UNION; SELECT tuples have incompatible types" | void | never | ("self" & SelectTupleToType<DataT["selectTuple"]>) | ("other" & SelectTupleToType<DataT["selectTuple"]>))) : ("Cannot UNION; Invalid selectTuple, does SELECT clause exist?" | void | never)) : ("Cannot UNION; sub-select has invalid selectTuple; does SELECT clause exist?" | void | never)) : ("Invalid sub-select, or could not infer OtherT" | void | never));
    unionOrderBy<OrderByCallbackT extends OrderByCallback<ISelectBuilder<DataT>>>(orderByCallback: OrderByCallbackT): (IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.UNION_ORDER_BY> extends never ? ("UNION_ORDER_BY clause not allowed here" | void | never) : ISelectBuilder<{
        allowed: DataT["allowed"];
        columnReferences: DataT["columnReferences"];
        joins: DataT["joins"];
        selectReferences: DataT["selectReferences"];
        selectTuple: DataT["selectTuple"];
        distinct: DataT["distinct"];
        sqlCalcFoundRows: DataT["sqlCalcFoundRows"];
        groupByTuple: DataT["groupByTuple"];
        orderByTuple: DataT["orderByTuple"];
        limit: DataT["limit"];
        unionOrderByTuple: ReturnType<OrderByCallbackT>;
        unionLimit: DataT["unionLimit"];
        aggregateCallback: DataT["aggregateCallback"];
    }>);
    appendUnionOrderBy<OrderByCallbackT extends OrderByCallback<ISelectBuilder<DataT>>>(orderByCallback: OrderByCallbackT): (IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.UNION_ORDER_BY> extends never ? ("UNION_ORDER_BY clause not allowed here" | void | never) : ISelectBuilder<{
        allowed: DataT["allowed"];
        columnReferences: DataT["columnReferences"];
        joins: DataT["joins"];
        selectReferences: DataT["selectReferences"];
        selectTuple: DataT["selectTuple"];
        distinct: DataT["distinct"];
        sqlCalcFoundRows: DataT["sqlCalcFoundRows"];
        groupByTuple: DataT["groupByTuple"];
        orderByTuple: DataT["orderByTuple"];
        limit: DataT["limit"];
        unionOrderByTuple: (DataT["unionOrderByTuple"] extends Tuple<any> ? TupleConcat<DataT["unionOrderByTuple"], ReturnType<OrderByCallbackT>> : ReturnType<OrderByCallbackT>);
        unionLimit: DataT["unionLimit"];
        aggregateCallback: DataT["aggregateCallback"];
    }>);
    unsetUnionOrderBy(): (ISelectBuilder<{
        allowed: DataT["allowed"];
        columnReferences: DataT["columnReferences"];
        joins: DataT["joins"];
        selectReferences: DataT["selectReferences"];
        selectTuple: DataT["selectTuple"];
        distinct: DataT["distinct"];
        sqlCalcFoundRows: DataT["sqlCalcFoundRows"];
        groupByTuple: DataT["groupByTuple"];
        orderByTuple: DataT["orderByTuple"];
        limit: DataT["limit"];
        unionOrderByTuple: undefined;
        unionLimit: DataT["unionLimit"];
        aggregateCallback: DataT["aggregateCallback"];
    }>);
    unionLimit<RowCountT extends number>(rowCount: RowCountT): (IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.UNION_LIMIT> extends never ? ("UNION_LIMIT clause not allowed here" | void | never) : ISelectBuilder<{
        allowed: DataT["allowed"];
        columnReferences: DataT["columnReferences"];
        joins: DataT["joins"];
        selectReferences: DataT["selectReferences"];
        selectTuple: DataT["selectTuple"];
        distinct: DataT["distinct"];
        sqlCalcFoundRows: DataT["sqlCalcFoundRows"];
        groupByTuple: DataT["groupByTuple"];
        orderByTuple: DataT["orderByTuple"];
        limit: DataT["limit"];
        unionOrderByTuple: DataT["unionOrderByTuple"];
        unionLimit: (DataT["unionLimit"] extends LimitData ? {
            rowCount: RowCountT;
            offset: DataT["unionLimit"]["offset"];
        } : {
            rowCount: RowCountT;
            offset: 0;
        });
        aggregateCallback: DataT["aggregateCallback"];
    }>);
    unionOffset<OffsetT extends number>(offset: OffsetT): (IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.UNION_OFFSET> extends never ? ("UNION_OFFSET clause not allowed here" | void | never) : ISelectBuilder<{
        allowed: DataT["allowed"];
        columnReferences: DataT["columnReferences"];
        joins: DataT["joins"];
        selectReferences: DataT["selectReferences"];
        selectTuple: DataT["selectTuple"];
        distinct: DataT["distinct"];
        sqlCalcFoundRows: DataT["sqlCalcFoundRows"];
        groupByTuple: DataT["groupByTuple"];
        orderByTuple: DataT["orderByTuple"];
        limit: DataT["limit"];
        unionOrderByTuple: DataT["unionOrderByTuple"];
        unionLimit: (DataT["unionLimit"] extends LimitData ? {
            rowCount: DataT["unionLimit"]["rowCount"];
            offset: OffsetT;
        } : {
            rowCount: typeof ArbitraryRowCount;
            offset: OffsetT;
        });
        aggregateCallback: DataT["aggregateCallback"];
    }>);
    unsetUnionLimit(): (ISelectBuilder<{
        allowed: DataT["allowed"];
        columnReferences: DataT["columnReferences"];
        joins: DataT["joins"];
        selectReferences: DataT["selectReferences"];
        selectTuple: DataT["selectTuple"];
        distinct: DataT["distinct"];
        sqlCalcFoundRows: DataT["sqlCalcFoundRows"];
        groupByTuple: DataT["groupByTuple"];
        orderByTuple: DataT["orderByTuple"];
        limit: DataT["limit"];
        unionOrderByTuple: DataT["unionOrderByTuple"];
        unionLimit: undefined;
        aggregateCallback: DataT["aggregateCallback"];
    }>);
    readonly from: CreateSubSelectBuilderDelegate<DataT["columnReferences"]>;
    as<AliasT extends string>(alias: AliasT): (IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.AS> extends never ? ("AS clause not allowed here" | void | never) : DataT["selectTuple"] extends Tuple<JoinableSelectTupleElement<DataT["columnReferences"]>> ? (true extends JoinableSelectTupleHasDuplicateColumnName<DataT["selectTuple"]> ? "Cannot have duplicate column names in SELECT clause when aliasing" | void | never : AliasedTable<AliasT, AliasT, JoinableSelectTupleToRawColumnCollection<DataT["selectTuple"]>>) : ("Cannot use tables in SELECT clause when aliasing" | void | never));
    asExpr<AliasT extends string>(alias: AliasT): (IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.AS> extends never ? ("AS clause not allowed here" | void | never) : this extends SelectBuilderValueQuery<infer TypeT> ? IColumnExpr<{}, "__expr", AliasT, TypeT | null> : ("Cannot be used as an expression" | void | never));
    aggregate<AggregateCallbackT extends AggregateCallback<DataT>>(aggregateCallback: AggregateCallbackT): (IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.AGGREGATE> extends never ? ("AGGREGATE not allowed here" | void | never) : ISelectBuilder<{
        allowed: DisableOperation<DataT, SelectBuilderOperation.WIDEN>;
        columnReferences: DataT["columnReferences"];
        joins: DataT["joins"];
        selectReferences: DataT["selectReferences"];
        selectTuple: DataT["selectTuple"];
        distinct: DataT["distinct"];
        sqlCalcFoundRows: DataT["sqlCalcFoundRows"];
        groupByTuple: DataT["groupByTuple"];
        orderByTuple: DataT["orderByTuple"];
        limit: DataT["limit"];
        unionOrderByTuple: DataT["unionOrderByTuple"];
        unionLimit: DataT["unionLimit"];
        aggregateCallback: AggregateCallbackT;
    }>);
    querifyColumnReferences(sb: IStringBuilder): void;
    querifyWhere(sb: IStringBuilder): void;
    fetchAll(): (IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.FETCH> extends never ? ("Cannot FETCH here" | void | never) : Promise<FetchRowResult<DataT>[]>);
    fetchOne(): (IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.FETCH> extends never ? ("Cannot FETCH here" | void | never) : Promise<FetchRowResult<DataT>>);
    fetchZeroOrOne(): (IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.FETCH> extends never ? ("Cannot FETCH here" | void | never) : Promise<FetchRowResult<DataT> | undefined>);
    fetchValue(): (IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.FETCH> extends never ? ("Cannot FETCH here" | void | never) : DataT["selectTuple"] extends (Tuple<JoinableSelectTupleElement<DataT["columnReferences"]>> & {
        length: 1;
    }) ? Promise<SelectTupleElementType<DataT["selectTuple"][0]>> : ("You can only fetchValue() if selecting one column" | void | never));
    fetchValueOrUndefined(): (IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.FETCH> extends never ? ("Cannot FETCH here" | void | never) : DataT["selectTuple"] extends (Tuple<JoinableSelectTupleElement<DataT["columnReferences"]>> & {
        length: 1;
    }) ? Promise<SelectTupleElementType<DataT["selectTuple"][0]> | undefined> : ("You can only fetchValueOrUndefined() if selecting one column" | void | never));
    fetchValueArray(): (IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.FETCH> extends never ? ("Cannot FETCH here" | void | never) : DataT["selectTuple"] extends (Tuple<JoinableSelectTupleElement<DataT["columnReferences"]>> & {
        length: 1;
    }) ? Promise<SelectTupleElementType<DataT["selectTuple"][0]>[]> : ("You can only fetchValueArray() if selecting one column" | void | never));
    count(): Promise<number>;
    exists(): Promise<boolean>;
    paginate(paginationArgs?: RawPaginationArgs): (IsAllowedSelectBuilderOperation<DataT, SelectBuilderOperation.FETCH> extends never ? ("Cannot FETCH here" | void | never) : Promise<PaginateResult<FetchRowResult<DataT>>>);
}
export declare type AnySelectBuilder = ISelectBuilder<any>;
export declare type CreateSelectBuilderDelegate = (<TableT extends AnyAliasedTable>(table: TableT) => (ISelectBuilder<{
    allowed: (SelectBuilderOperation.JOIN | SelectBuilderOperation.NARROW | SelectBuilderOperation.WHERE | SelectBuilderOperation.SELECT | SelectBuilderOperation.DISTINCT | SelectBuilderOperation.SQL_CALC_FOUND_ROWS | SelectBuilderOperation.GROUP_BY | SelectBuilderOperation.HAVING | SelectBuilderOperation.ORDER_BY | SelectBuilderOperation.LIMIT | SelectBuilderOperation.OFFSET | SelectBuilderOperation.UNION_ORDER_BY | SelectBuilderOperation.UNION_LIMIT | SelectBuilderOperation.UNION_OFFSET)[];
    columnReferences: TableToReference<TableT>;
    joins: [Join<"FROM", TableT, TableToReference<TableT>, false>];
    selectReferences: {};
    selectTuple: undefined;
    distinct: false;
    sqlCalcFoundRows: false;
    groupByTuple: undefined;
    orderByTuple: undefined;
    limit: undefined;
    unionOrderByTuple: undefined;
    unionLimit: undefined;
    aggregateCallback: undefined;
}>));
export declare type CreateSubSelectBuilderDelegate<ColumnReferencesT extends ColumnReferences> = (<TableT extends AnyAliasedTable>(table: TableT) => (TableAlias<TableT> extends keyof ColumnReferencesT ? ("Duplicate alias" | TableAlias<TableT> | void) : ISelectBuilder<{
    allowed: (SelectBuilderOperation.JOIN | SelectBuilderOperation.NARROW | SelectBuilderOperation.WHERE | SelectBuilderOperation.SELECT | SelectBuilderOperation.DISTINCT | SelectBuilderOperation.SQL_CALC_FOUND_ROWS | SelectBuilderOperation.GROUP_BY | SelectBuilderOperation.HAVING | SelectBuilderOperation.ORDER_BY | SelectBuilderOperation.LIMIT | SelectBuilderOperation.OFFSET | SelectBuilderOperation.UNION_ORDER_BY | SelectBuilderOperation.UNION_LIMIT | SelectBuilderOperation.UNION_OFFSET)[];
    columnReferences: TableToReference<TableT> & ColumnReferencesT;
    joins: [Join<"FROM", TableT, TableToReference<TableT>, false>];
    selectReferences: {};
    selectTuple: undefined;
    distinct: false;
    sqlCalcFoundRows: false;
    groupByTuple: undefined;
    orderByTuple: undefined;
    limit: undefined;
    unionOrderByTuple: undefined;
    unionLimit: undefined;
    aggregateCallback: undefined;
}>));
