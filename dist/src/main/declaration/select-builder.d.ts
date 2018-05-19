import * as sd from "schema-decorator";
import { ColumnReferences } from "./column-references";
import { Join, AnyJoin, JoinFromTupleCallback, JoinFromTupleOfCallback, JoinToTupleCallback, MatchesJoinFromTuple, ToNullableJoinTuple, ReplaceColumnOfJoinTuple } from "./join";
import { Tuple, TuplePush, TupleConcat } from "./tuple";
import { AliasedTable, AnyAliasedTable } from "./aliased-table";
import { IColumn } from "./column";
import { TableAlias, TableToReference } from "./table-operation";
import { ToNullableColumnReferences, ReplaceColumnOfReference, ColumnReferencesToSchemaWithJoins } from "./column-references-operation";
import { TypeNarrowCallback } from "./type-narrow";
import { WhereCallback } from "./where";
import { SelectCallback, SelectTupleHasDuplicateColumn, SelectTupleToReferences, AnySelectTupleElement, ReplaceColumnOfSelectTuple, JoinTupleToSelectTuple } from "./select";
import { GroupByCallback } from "./group-by";
import { HavingCallback } from "./having";
import { OrderByCallback } from "./order-by";
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
export declare type AggregateCallback<DataT extends AnySelectBuilderData> = ((row: ColumnReferencesToSchemaWithJoins<DataT["selectReferences"], DataT["joins"]>) => Promise<any> | any);
export declare type FetchRowResult<DataT extends AnySelectBuilderData> = (DataT["aggregateCallback"] extends ((row: any) => infer R) ? (R extends Promise<infer P> ? P : R) : ColumnReferencesToSchemaWithJoins<DataT["selectReferences"], DataT["joins"]>);
export interface AnySelectBuilderData {
    readonly hasSelect: boolean;
    readonly hasUnion: boolean;
    readonly columnReferences: ColumnReferences;
    readonly joins: Tuple<AnyJoin>;
    readonly selectReferences: ColumnReferences;
    readonly selectTuple: undefined | Tuple<AnySelectTupleElement>;
    readonly aggregateCallback: undefined | ((row: any) => Promise<any>);
}
export interface ISelectBuilder<DataT extends AnySelectBuilderData> extends Querify {
    readonly data: DataT;
    join<ToTableT extends AnyAliasedTable, FromTupleT extends JoinFromTupleCallback<DataT["columnReferences"]>>(toTable: ToTableT, from: FromTupleT, to: JoinToTupleCallback<ToTableT, JoinFromTupleOfCallback<FromTupleT>>): (TableAlias<ToTableT> extends keyof DataT["columnReferences"] ? ("Duplicate alias" | TableAlias<ToTableT> | void) : (JoinFromTupleOfCallback<FromTupleT> extends MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>> ? (ISelectBuilder<{
        hasSelect: DataT["hasSelect"];
        hasUnion: DataT["hasUnion"];
        columnReferences: (DataT["columnReferences"] & TableToReference<ToTableT>);
        joins: (TuplePush<DataT["joins"], Join<"INNER", ToTableT, TableToReference<ToTableT>, false>>);
        selectReferences: DataT["selectReferences"];
        selectTuple: DataT["selectTuple"];
        aggregateCallback: DataT["aggregateCallback"];
    }>) : (MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>> | void)));
    rightJoin<ToTableT extends AnyAliasedTable, FromTupleT extends JoinFromTupleCallback<DataT["columnReferences"]>>(toTable: ToTableT, from: FromTupleT, to: JoinToTupleCallback<ToTableT, JoinFromTupleOfCallback<FromTupleT>>): (TableAlias<ToTableT> extends keyof DataT["columnReferences"] ? ("Duplicate alias" | TableAlias<ToTableT> | void) : (JoinFromTupleOfCallback<FromTupleT> extends MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>> ? (ISelectBuilder<{
        hasSelect: DataT["hasSelect"];
        hasUnion: DataT["hasUnion"];
        columnReferences: (ToNullableColumnReferences<DataT["columnReferences"]> & TableToReference<ToTableT>);
        joins: (TuplePush<ToNullableJoinTuple<DataT["joins"]>, Join<"RIGHT", ToTableT, TableToReference<ToTableT>, false>>);
        selectReferences: DataT["selectReferences"];
        selectTuple: DataT["selectTuple"];
        aggregateCallback: DataT["aggregateCallback"];
    }>) : (MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>> | void)));
    leftJoin<ToTableT extends AnyAliasedTable, FromTupleT extends JoinFromTupleCallback<DataT["columnReferences"]>>(toTable: ToTableT, from: FromTupleT, to: JoinToTupleCallback<ToTableT, JoinFromTupleOfCallback<FromTupleT>>): (TableAlias<ToTableT> extends keyof DataT["columnReferences"] ? ("Duplicate alias" | TableAlias<ToTableT> | void) : (JoinFromTupleOfCallback<FromTupleT> extends MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>> ? (ISelectBuilder<{
        hasSelect: DataT["hasSelect"];
        hasUnion: DataT["hasUnion"];
        columnReferences: (DataT["columnReferences"] & ToNullableColumnReferences<TableToReference<ToTableT>>);
        joins: (TuplePush<DataT["joins"], Join<"LEFT", ToTableT, TableToReference<ToTableT>, true>>);
        selectReferences: DataT["selectReferences"];
        selectTuple: DataT["selectTuple"];
        aggregateCallback: DataT["aggregateCallback"];
    }>) : (MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>> | void)));
    joinUsing<ToTableT extends AnyAliasedTable, FromTupleT extends JoinFromTupleCallback<DataT["columnReferences"]>>(toTable: ToTableT, from: FromTupleT): (TableAlias<ToTableT> extends keyof DataT["columnReferences"] ? ("Duplicate alias" | TableAlias<ToTableT> | void) : (JoinFromTupleOfCallback<FromTupleT> extends MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>> ? (RenameTableOfColumns<JoinFromTupleOfCallback<FromTupleT>, ToTableT["alias"]> extends JoinToTupleCallback<ToTableT, JoinFromTupleOfCallback<FromTupleT>> ? ISelectBuilder<{
        hasSelect: DataT["hasSelect"];
        hasUnion: DataT["hasUnion"];
        columnReferences: (DataT["columnReferences"] & TableToReference<ToTableT>);
        joins: (TuplePush<DataT["joins"], Join<"INNER", ToTableT, TableToReference<ToTableT>, false>>);
        selectReferences: DataT["selectReferences"];
        selectTuple: DataT["selectTuple"];
        aggregateCallback: DataT["aggregateCallback"];
    }> : ("Cannot JOIN USING; to table is missing columns or types do not match" | void | never)) : (MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>> | void)));
    rightJoinUsing<ToTableT extends AnyAliasedTable, FromTupleT extends JoinFromTupleCallback<DataT["columnReferences"]>>(toTable: ToTableT, from: FromTupleT): (TableAlias<ToTableT> extends keyof DataT["columnReferences"] ? ("Duplicate alias" | TableAlias<ToTableT> | void) : (JoinFromTupleOfCallback<FromTupleT> extends MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>> ? (RenameTableOfColumns<JoinFromTupleOfCallback<FromTupleT>, ToTableT["alias"]> extends JoinToTupleCallback<ToTableT, JoinFromTupleOfCallback<FromTupleT>> ? ISelectBuilder<{
        hasSelect: DataT["hasSelect"];
        hasUnion: DataT["hasUnion"];
        columnReferences: (ToNullableColumnReferences<DataT["columnReferences"]> & TableToReference<ToTableT>);
        joins: (TuplePush<ToNullableJoinTuple<DataT["joins"]>, Join<"RIGHT", ToTableT, TableToReference<ToTableT>, false>>);
        selectReferences: DataT["selectReferences"];
        selectTuple: DataT["selectTuple"];
        aggregateCallback: DataT["aggregateCallback"];
    }> : ("Cannot RIGHT JOIN USING; to table is missing columns or types do not match" | void | never)) : (MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>> | void)));
    leftJoinUsing<ToTableT extends AnyAliasedTable, FromTupleT extends JoinFromTupleCallback<DataT["columnReferences"]>>(toTable: ToTableT, from: FromTupleT): (TableAlias<ToTableT> extends keyof DataT["columnReferences"] ? ("Duplicate alias" | TableAlias<ToTableT> | void) : (JoinFromTupleOfCallback<FromTupleT> extends MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>> ? (RenameTableOfColumns<JoinFromTupleOfCallback<FromTupleT>, ToTableT["alias"]> extends JoinToTupleCallback<ToTableT, JoinFromTupleOfCallback<FromTupleT>> ? ISelectBuilder<{
        hasSelect: DataT["hasSelect"];
        hasUnion: DataT["hasUnion"];
        columnReferences: (DataT["columnReferences"] & ToNullableColumnReferences<TableToReference<ToTableT>>);
        joins: (TuplePush<DataT["joins"], Join<"LEFT", ToTableT, TableToReference<ToTableT>, true>>);
        selectReferences: DataT["selectReferences"];
        selectTuple: DataT["selectTuple"];
        aggregateCallback: DataT["aggregateCallback"];
    }> : ("Cannot LEFT JOIN USING; to table is missing columns or types do not match" | void | never)) : (MatchesJoinFromTuple<DataT["columnReferences"], JoinFromTupleOfCallback<FromTupleT>> | void)));
    whereIsNotNull<TypeNarrowCallbackT extends TypeNarrowCallback<DataT["columnReferences"]>>(this: ISelectBuilder<{
        hasSelect: any;
        hasUnion: false;
        columnReferences: any;
        joins: any;
        selectReferences: any;
        selectTuple: any;
        aggregateCallback: any;
    }>, typeNarrowCallback: TypeNarrowCallbackT): (ReturnType<TypeNarrowCallbackT> extends IColumn<infer TableNameT, infer NameT, infer TypeT> ? ISelectBuilder<{
        hasSelect: DataT["hasSelect"];
        hasUnion: DataT["hasUnion"];
        columnReferences: ReplaceColumnOfReference<DataT["columnReferences"], TableNameT, NameT, Exclude<TypeT, null | undefined>>;
        joins: ReplaceColumnOfJoinTuple<DataT["joins"], TableNameT, NameT, Exclude<TypeT, null | undefined>>;
        selectReferences: ReplaceColumnOfReference<DataT["selectReferences"], TableNameT, NameT, Exclude<TypeT, null | undefined>>;
        selectTuple: (DataT["selectTuple"] extends Tuple<any> ? ReplaceColumnOfSelectTuple<DataT["selectTuple"], TableNameT, NameT, Exclude<TypeT, null | undefined>> : undefined);
        aggregateCallback: DataT["aggregateCallback"];
    }> : ("Invalid ColumnT or cannot infer TableNameT/NameT/TypeT" | void | never));
    whereIsNull<TypeNarrowCallbackT extends TypeNarrowCallback<DataT["columnReferences"]>>(this: ISelectBuilder<{
        hasSelect: any;
        hasUnion: false;
        columnReferences: any;
        joins: any;
        selectReferences: any;
        selectTuple: any;
        aggregateCallback: any;
    }>, typeNarrowCallback: TypeNarrowCallbackT): (ReturnType<TypeNarrowCallbackT> extends IColumn<infer TableNameT, infer NameT, infer TypeT> ? ISelectBuilder<{
        hasSelect: DataT["hasSelect"];
        hasUnion: DataT["hasUnion"];
        columnReferences: ReplaceColumnOfReference<DataT["columnReferences"], TableNameT, NameT, null>;
        joins: ReplaceColumnOfJoinTuple<DataT["joins"], TableNameT, NameT, null>;
        selectReferences: ReplaceColumnOfReference<DataT["selectReferences"], TableNameT, NameT, null>;
        selectTuple: (DataT["selectTuple"] extends Tuple<any> ? ReplaceColumnOfSelectTuple<DataT["selectTuple"], TableNameT, NameT, null> : undefined);
        aggregateCallback: DataT["aggregateCallback"];
    }> : ("Invalid ColumnT or cannot infer TableNameT/NameT/TypeT" | void | never));
    whereIsEqual<ConstT extends boolean | number | string, TypeNarrowCallbackT extends TypeNarrowCallback<DataT["columnReferences"]>>(this: ISelectBuilder<{
        hasSelect: any;
        hasUnion: false;
        columnReferences: any;
        joins: any;
        selectReferences: any;
        selectTuple: any;
        aggregateCallback: any;
    }>, value: ConstT, typeNarrowCallback: TypeNarrowCallbackT): (ReturnType<TypeNarrowCallbackT> extends IColumn<infer TableNameT, infer NameT, infer TypeT> ? ISelectBuilder<{
        hasSelect: DataT["hasSelect"];
        hasUnion: DataT["hasUnion"];
        columnReferences: ReplaceColumnOfReference<DataT["columnReferences"], TableNameT, NameT, ConstT>;
        joins: ReplaceColumnOfJoinTuple<DataT["joins"], TableNameT, NameT, ConstT>;
        selectReferences: ReplaceColumnOfReference<DataT["selectReferences"], TableNameT, NameT, ConstT>;
        selectTuple: (DataT["selectTuple"] extends Tuple<any> ? ReplaceColumnOfSelectTuple<DataT["selectTuple"], TableNameT, NameT, ConstT> : undefined);
        aggregateCallback: DataT["aggregateCallback"];
    }> : ("Invalid ColumnT or cannot infer TableNameT/NameT/TypeT" | void | never));
    where<WhereCallbackT extends WhereCallback<ISelectBuilder<DataT>>>(whereCallback: WhereCallbackT): ISelectBuilder<DataT>;
    andWhere<WhereCallbackT extends WhereCallback<ISelectBuilder<DataT>>>(whereCallback: WhereCallbackT): ISelectBuilder<DataT>;
    select<SelectCallbackT extends SelectCallback<ISelectBuilder<DataT>>>(this: ISelectBuilder<{
        hasSelect: any;
        hasUnion: false;
        columnReferences: any;
        joins: any;
        selectReferences: any;
        selectTuple: any;
        aggregateCallback: any;
    }>, selectCallback: SelectCallbackT): (true extends SelectTupleHasDuplicateColumn<(DataT["selectTuple"] extends Tuple<any> ? TupleConcat<DataT["selectTuple"], ReturnType<SelectCallbackT>> : ReturnType<SelectCallbackT>)> ? ("Duplicate columns found in SELECT, consider aliasing" | void | never) : ISelectBuilder<{
        hasSelect: true;
        hasUnion: DataT["hasUnion"];
        columnReferences: DataT["columnReferences"];
        joins: DataT["joins"];
        selectReferences: (DataT["selectReferences"] & SelectTupleToReferences<ReturnType<SelectCallbackT>>);
        selectTuple: (DataT["selectTuple"] extends Tuple<any> ? TupleConcat<DataT["selectTuple"], ReturnType<SelectCallbackT>> : ReturnType<SelectCallbackT>);
        aggregateCallback: DataT["aggregateCallback"];
    }>);
    selectAll(this: ISelectBuilder<{
        hasSelect: false;
        hasUnion: false;
        columnReferences: any;
        joins: any;
        selectReferences: any;
        selectTuple: any;
        aggregateCallback: any;
    }>): (DataT["selectTuple"] extends undefined ? ISelectBuilder<{
        hasSelect: true;
        hasUnion: DataT["hasUnion"];
        columnReferences: DataT["columnReferences"];
        joins: DataT["joins"];
        selectReferences: DataT["columnReferences"];
        selectTuple: JoinTupleToSelectTuple<DataT["joins"]>;
        aggregateCallback: DataT["aggregateCallback"];
    }> : ("selectAll() must be called before select()" | void | never));
    distinct(distinct?: boolean): ISelectBuilder<DataT>;
    sqlCalcFoundRows(sqlCalcFoundRows?: boolean): ISelectBuilder<DataT>;
    groupBy<GroupByCallbackT extends GroupByCallback<ISelectBuilder<DataT>>>(groupByCallback: GroupByCallbackT): ISelectBuilder<DataT>;
    appendGroupBy<GroupByCallbackT extends GroupByCallback<ISelectBuilder<DataT>>>(groupByCallback: GroupByCallbackT): ISelectBuilder<DataT>;
    unsetGroupBy(): ISelectBuilder<DataT>;
    having<HavingCallbackT extends HavingCallback<ISelectBuilder<DataT>>>(havingCallback: HavingCallbackT): ISelectBuilder<DataT>;
    andHaving<HavingCallbackT extends HavingCallback<ISelectBuilder<DataT>>>(havingCallback: HavingCallbackT): ISelectBuilder<DataT>;
    orderBy<OrderByCallbackT extends OrderByCallback<ISelectBuilder<DataT>>>(orderByCallback: OrderByCallbackT): ISelectBuilder<DataT>;
    appendOrderBy<OrderByCallbackT extends OrderByCallback<ISelectBuilder<DataT>>>(orderByCallback: OrderByCallbackT): ISelectBuilder<DataT>;
    unsetOrderBy(): ISelectBuilder<DataT>;
    limit(rowCount: number): ISelectBuilder<DataT>;
    offset(offset: number): ISelectBuilder<DataT>;
    unsetLimit(): ISelectBuilder<DataT>;
    widen<TypeWidenCallbackT extends TypeWidenCallback<DataT["selectReferences"]>, WidenT>(this: ISelectBuilder<{
        hasSelect: true;
        hasUnion: any;
        columnReferences: any;
        joins: any;
        selectReferences: any;
        selectTuple: any;
        aggregateCallback: undefined;
    }>, typeWidenCallback: TypeWidenCallbackT, assertWidened: sd.AssertFunc<WidenT>): (ReturnType<TypeWidenCallbackT> extends IColumn<infer TableNameT, infer NameT, infer TypeT> ? ISelectBuilder<{
        hasSelect: DataT["hasSelect"];
        hasUnion: DataT["hasUnion"];
        columnReferences: DataT["columnReferences"];
        joins: ReplaceColumnOfJoinTuple<DataT["joins"], TableNameT, NameT, TypeT | WidenT>;
        selectReferences: ReplaceColumnOfReference<DataT["selectReferences"], TableNameT, NameT, TypeT | WidenT>;
        selectTuple: (DataT["selectTuple"] extends Tuple<any> ? ReplaceColumnOfSelectTuple<DataT["selectTuple"], TableNameT, NameT, TypeT | WidenT> : undefined);
        aggregateCallback: DataT["aggregateCallback"];
    }> : ("Invalid ColumnT or cannot infer TableNameT/NameT/TypeT" | void | never));
    union<SelectBuilderT extends ISelectBuilder<{
        hasSelect: true;
        hasUnion: any;
        columnReferences: any;
        joins: any;
        selectReferences: any;
        selectTuple: any;
        aggregateCallback: any;
    }>>(this: ISelectBuilder<{
        hasSelect: true;
        hasUnion: any;
        columnReferences: any;
        joins: any;
        selectReferences: any;
        selectTuple: any;
        aggregateCallback: any;
    }>, selectBuilder: SelectBuilderT): (SelectBuilderT extends ISelectBuilder<infer OtherT> ? (OtherT["selectTuple"] extends Tuple<any> ? (DataT["selectTuple"] extends Tuple<any> ? (SelectTupleToType<OtherT["selectTuple"]> extends SelectTupleToType<DataT["selectTuple"]> ? ISelectBuilder<{
        hasSelect: DataT["hasSelect"];
        hasUnion: true;
        columnReferences: DataT["columnReferences"];
        joins: DataT["joins"];
        selectReferences: DataT["selectReferences"];
        selectTuple: DataT["selectTuple"];
        aggregateCallback: DataT["aggregateCallback"];
    }> : ("Cannot UNION; SELECT tuples have incompatible types" | void | never | ("self" & SelectTupleToType<DataT["selectTuple"]>) | ("other" & SelectTupleToType<DataT["selectTuple"]>))) : ("Cannot UNION; Invalid selectTuple, does SELECT clause exist?" | void | never)) : ("Cannot UNION; sub-select has invalid selectTuple; does SELECT clause exist?" | void | never)) : ("Invalid sub-select, or could not infer OtherT" | void | never));
    unionOrderBy<OrderByCallbackT extends OrderByCallback<ISelectBuilder<DataT>>>(orderByCallback: OrderByCallbackT): ISelectBuilder<DataT>;
    appendUnionOrderBy<OrderByCallbackT extends OrderByCallback<ISelectBuilder<DataT>>>(orderByCallback: OrderByCallbackT): ISelectBuilder<DataT>;
    unsetUnionOrderBy(): ISelectBuilder<DataT>;
    unionLimit(rowCount: number): ISelectBuilder<DataT>;
    unionOffset(offset: number): ISelectBuilder<DataT>;
    unsetUnionLimit(): ISelectBuilder<DataT>;
    readonly from: CreateSubSelectBuilderDelegate<DataT["columnReferences"]>;
    as<AliasT extends string>(this: ISelectBuilder<{
        hasSelect: true;
        hasUnion: any;
        columnReferences: any;
        joins: any;
        selectReferences: any;
        selectTuple: any;
        aggregateCallback: any;
    }>, alias: AliasT): (DataT["selectTuple"] extends Tuple<JoinableSelectTupleElement<DataT["columnReferences"]>> ? (true extends JoinableSelectTupleHasDuplicateColumnName<DataT["selectTuple"]> ? "Cannot have duplicate column names in SELECT clause when aliasing" | void | never : AliasedTable<AliasT, AliasT, JoinableSelectTupleToRawColumnCollection<DataT["selectTuple"]>>) : ("Cannot use tables in SELECT clause when aliasing" | void | never));
    asExpr<AliasT extends string>(this: ISelectBuilder<{
        hasSelect: true;
        hasUnion: any;
        columnReferences: any;
        joins: any;
        selectReferences: any;
        selectTuple: any;
        aggregateCallback: any;
    }>, alias: AliasT): (this extends SelectBuilderValueQuery<infer TypeT> ? IColumnExpr<{}, "__expr", AliasT, TypeT | null> : ("Cannot be used as an expression" | void | never));
    aggregate<AggregateCallbackT extends AggregateCallback<DataT>>(this: ISelectBuilder<{
        hasSelect: true;
        hasUnion: any;
        columnReferences: any;
        joins: any;
        selectReferences: any;
        selectTuple: any;
        aggregateCallback: any;
    }>, aggregateCallback: AggregateCallbackT): (ISelectBuilder<{
        hasSelect: DataT["hasSelect"];
        hasUnion: DataT["hasUnion"];
        columnReferences: DataT["columnReferences"];
        joins: DataT["joins"];
        selectReferences: DataT["selectReferences"];
        selectTuple: DataT["selectTuple"];
        aggregateCallback: AggregateCallbackT;
    }>);
    querifyColumnReferences(sb: IStringBuilder): void;
    querifyWhere(sb: IStringBuilder): void;
    fetchAll(this: ISelectBuilder<{
        hasSelect: true;
        hasUnion: any;
        columnReferences: any;
        joins: any;
        selectReferences: any;
        selectTuple: any;
        aggregateCallback: any;
    }>): Promise<FetchRowResult<DataT>[]>;
    fetchOne(this: ISelectBuilder<{
        hasSelect: true;
        hasUnion: any;
        columnReferences: any;
        joins: any;
        selectReferences: any;
        selectTuple: any;
        aggregateCallback: any;
    }>): Promise<FetchRowResult<DataT>>;
    fetchZeroOrOne(this: ISelectBuilder<{
        hasSelect: true;
        hasUnion: any;
        columnReferences: any;
        joins: any;
        selectReferences: any;
        selectTuple: any;
        aggregateCallback: any;
    }>): Promise<FetchRowResult<DataT> | undefined>;
    fetchValue(this: ISelectBuilder<{
        hasSelect: true;
        hasUnion: any;
        columnReferences: any;
        joins: any;
        selectReferences: any;
        selectTuple: any;
        aggregateCallback: any;
    }>): (DataT["selectTuple"] extends (Tuple<JoinableSelectTupleElement<DataT["columnReferences"]>> & {
        length: 1;
    }) ? Promise<SelectTupleElementType<DataT["selectTuple"][0]>> : ("You can only fetchValue() if selecting one column" | void | never));
    fetchValueOrUndefined(this: ISelectBuilder<{
        hasSelect: true;
        hasUnion: any;
        columnReferences: any;
        joins: any;
        selectReferences: any;
        selectTuple: any;
        aggregateCallback: any;
    }>): (DataT["selectTuple"] extends (Tuple<JoinableSelectTupleElement<DataT["columnReferences"]>> & {
        length: 1;
    }) ? Promise<SelectTupleElementType<DataT["selectTuple"][0]> | undefined> : ("You can only fetchValueOrUndefined() if selecting one column" | void | never));
    fetchValueArray(this: ISelectBuilder<{
        hasSelect: true;
        hasUnion: any;
        columnReferences: any;
        joins: any;
        selectReferences: any;
        selectTuple: any;
        aggregateCallback: any;
    }>): (DataT["selectTuple"] extends (Tuple<JoinableSelectTupleElement<DataT["columnReferences"]>> & {
        length: 1;
    }) ? Promise<SelectTupleElementType<DataT["selectTuple"][0]>[]> : ("You can only fetchValueArray() if selecting one column" | void | never));
    count(): Promise<number>;
    exists(): Promise<boolean>;
    paginate(this: ISelectBuilder<{
        hasSelect: true;
        hasUnion: any;
        columnReferences: any;
        joins: any;
        selectReferences: any;
        selectTuple: any;
        aggregateCallback: any;
    }>, paginationArgs?: RawPaginationArgs): Promise<PaginateResult<FetchRowResult<DataT>>>;
}
export declare type AnySelectBuilder = ISelectBuilder<any>;
export declare type CreateSelectBuilderDelegate = (<TableT extends AnyAliasedTable>(table: TableT) => (ISelectBuilder<{
    hasSelect: false;
    hasUnion: false;
    columnReferences: TableToReference<TableT>;
    joins: [Join<"FROM", TableT, TableToReference<TableT>, false>];
    selectReferences: {};
    selectTuple: undefined;
    aggregateCallback: undefined;
}>));
export declare type CreateSubSelectBuilderDelegate<ColumnReferencesT extends ColumnReferences> = (<TableT extends AnyAliasedTable>(table: TableT) => (TableAlias<TableT> extends keyof ColumnReferencesT ? ("Duplicate alias" | TableAlias<TableT> | void) : ISelectBuilder<{
    hasSelect: false;
    hasUnion: false;
    columnReferences: TableToReference<TableT> & ColumnReferencesT;
    joins: [Join<"FROM", TableT, TableToReference<TableT>, false>];
    selectReferences: {};
    selectTuple: undefined;
    aggregateCallback: undefined;
}>));
