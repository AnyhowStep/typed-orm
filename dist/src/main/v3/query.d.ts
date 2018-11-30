import * as sd from "schema-decorator";
import { IJoin, Join } from "./join";
import { IAliasedTable } from "./aliased-table";
import { IColumn } from "./column";
import { SelectItem, SelectItemUtil } from "./select-item";
import { RawExpr, RawExprUtil } from "./raw-expr";
import { IExpr } from "./expr";
import { ColumnRefUtil } from "./column-ref";
import { ColumnMapUtil } from "./column-map";
import { JoinArrayUtil } from "./join-array";
import { NonEmptyTuple, TupleUtil } from "./tuple";
import { ColumnMap } from "./column-map";
import { SelectItemArrayUtil } from "./select-item-array";
import { IExprSelectItem } from "./expr-select-item";
import { ToUnknownIfAllFieldsNever } from "./type";
export interface UnionQuery {
    readonly distinct: boolean;
    readonly query: IQuery;
}
export interface Limit {
    readonly rowCount: number;
    readonly offset: number;
}
export interface QueryData {
    readonly joins: IJoin[] | undefined;
    readonly parentJoins: IJoin[] | undefined;
    readonly unions: UnionQuery[] | undefined;
    readonly selects: SelectItem[] | undefined;
    readonly limit: Limit | undefined;
    readonly unionLimit: Limit | undefined;
}
export interface ExtraQueryData {
    readonly where: IExpr | undefined;
}
export interface IQuery<DataT extends QueryData = QueryData> {
    readonly joins: DataT["joins"];
    readonly parentJoins: DataT["parentJoins"];
    readonly unions: DataT["unions"];
    readonly selects: DataT["selects"];
    readonly limit: DataT["limit"];
    readonly unionLimit: DataT["unionLimit"];
    readonly extraData: ExtraQueryData;
}
export declare class Query<DataT extends QueryData> {
    readonly joins: DataT["joins"];
    readonly parentJoins: DataT["parentJoins"];
    readonly unions: DataT["unions"];
    readonly selects: DataT["selects"];
    readonly limit: DataT["limit"];
    readonly unionLimit: DataT["unionLimit"];
    readonly extraData: ExtraQueryData;
    constructor(data: DataT, extraData: ExtraQueryData);
    from<AliasedTableT extends IAliasedTable>(this: Query.BeforeFromClause, aliasedTable: Query.AssertUniqueJoinTarget<this & Query.BeforeFromClause, AliasedTableT>): (Query.From<this & Query.BeforeFromClause, AliasedTableT>);
}
export declare namespace Query {
    type NewInstance = Query<{
        readonly joins: undefined;
        readonly parentJoins: undefined;
        readonly unions: undefined;
        readonly selects: undefined;
        readonly limit: undefined;
        readonly unionLimit: undefined;
    }>;
    function newInstance(): NewInstance;
    type AssertUniqueJoinTarget<QueryT extends IQuery<QueryData>, AliasedTableT extends IAliasedTable> = (AliasedTableT & (QueryT["joins"] extends IJoin[] ? (AliasedTableT["alias"] extends JoinArrayUtil.ToTableAliasUnion<QueryT["joins"]> ? ["Alias", AliasedTableT["alias"], "already used in previous JOINs", JoinArrayUtil.ToTableAliasUnion<QueryT["joins"]>] | void : unknown) : unknown) & (QueryT["parentJoins"] extends IJoin[] ? (AliasedTableT["alias"] extends JoinArrayUtil.ToTableAliasUnion<QueryT["parentJoins"]> ? ["Alias", AliasedTableT["alias"], "already used in parent JOINs", JoinArrayUtil.ToTableAliasUnion<QueryT["parentJoins"]>] | void : unknown) : unknown));
    function assertUniqueJoinTarget(query: IQuery, aliasedTable: IAliasedTable): void;
    type BeforeFromClause = IQuery<QueryData & {
        joins: undefined;
    }>;
    type AfterFromClause = IQuery<QueryData & {
        joins: IJoin[];
    }>;
    type BeforeUnionClause = IQuery<QueryData & {
        unions: undefined;
    }>;
    type AfterUnionClause = IQuery<QueryData & {
        unions: UnionQuery[];
    }>;
    type BeforeSelectClause = IQuery<QueryData & {
        selects: undefined;
    }>;
    type AfterSelectClause = IQuery<QueryData & {
        selects: SelectItem[];
    }>;
    type OneRowQuery = (BeforeFromClause & BeforeUnionClause);
    type ZeroOrOneRowUnionQuery = (AfterUnionClause & {
        unionLimit: {
            rowCount: 0 | 1;
        };
    });
    type ZeroOrOneRowFromQuery = (AfterFromClause & BeforeUnionClause & ({
        limit: {
            rowCount: 0 | 1;
        };
    } | {
        unionLimit: {
            rowCount: 0 | 1;
        };
    }));
    type ZeroOrOneRowQuery = (OneRowQuery | ZeroOrOneRowUnionQuery | ZeroOrOneRowFromQuery);
    function isBeforeFromClause(query: IQuery): query is BeforeFromClause;
    function isAfterFromClause(query: IQuery): query is AfterFromClause;
    function isBeforeUnionClause(query: IQuery): query is BeforeUnionClause;
    function isAfterUnionClause(query: IQuery): query is AfterUnionClause;
    function isBeforeSelectClause(query: IQuery): query is BeforeSelectClause;
    function isAfterSelectClause(query: IQuery): query is AfterSelectClause;
    function isOneRowQuery(query: IQuery): query is OneRowQuery;
    function isZeroOrOneRowUnionQuery(query: IQuery): query is ZeroOrOneRowUnionQuery;
    function isZeroOrOneRowFromQuery(query: IQuery): query is ZeroOrOneRowFromQuery;
    function isZeroOrOneRowQuery(query: IQuery): query is ZeroOrOneRowQuery;
    type From<QueryT extends BeforeFromClause, AliasedTableT extends IAliasedTable> = (Query<{
        readonly joins: Join<{
            aliasedTable: AliasedTableT;
            columns: AliasedTableT["columns"];
            nullable: false;
        }>[];
        readonly parentJoins: QueryT["parentJoins"];
        readonly unions: QueryT["unions"];
        readonly selects: QueryT["selects"];
        readonly limit: QueryT["limit"];
        readonly unionLimit: QueryT["unionLimit"];
    }>);
    function from<QueryT extends BeforeFromClause, AliasedTableT extends IAliasedTable>(query: QueryT, aliasedTable: AssertUniqueJoinTarget<QueryT, AliasedTableT>): (From<QueryT, AliasedTableT>);
    type JoinFromDelegate<JoinsT extends IJoin[]> = ((columns: ColumnRefUtil.ToConvenient<ColumnRefUtil.FromJoinArray<JoinsT>>) => (NonEmptyTuple<JoinArrayUtil.ToUnion<JoinsT>>));
    type JoinToColumn<AliasedTableT extends IAliasedTable, FromColumnT extends IColumn> = (IColumn<{
        tableAlias: AliasedTableT["alias"];
        name: Extract<keyof AliasedTableT["columns"], string>;
        assertDelegate: sd.AssertDelegate<ReturnType<FromColumnT["assertDelegate"]> | null>;
    }>);
    type JoinToDelegate<QueryT extends AfterFromClause, AliasedTableT extends IAliasedTable, FromDelegateT extends JoinFromDelegate<QueryT["joins"]>> = ((columns: AliasedTableT["columns"]) => (ColumnMapUtil.ToUnion<AliasedTableT["columns"]>[] & {
        length: ReturnType<FromDelegateT>["length"];
    } & {
        [index in Extract<keyof ReturnType<FromDelegateT>, "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9">]: (JoinToColumn<AliasedTableT, Extract<ReturnType<FromDelegateT>[index], IColumn>>);
    }));
    type InnerJoin<QueryT extends AfterFromClause, AliasedTableT extends IAliasedTable> = (Query<{
        readonly joins: (QueryT["joins"][number] | Join<{
            aliasedTable: AliasedTableT;
            columns: AliasedTableT["columns"];
            nullable: false;
        }>)[];
        readonly parentJoins: QueryT["parentJoins"];
        readonly unions: QueryT["unions"];
        readonly selects: QueryT["selects"];
        readonly limit: QueryT["limit"];
        readonly unionLimit: QueryT["unionLimit"];
    }>);
    function innerJoin<QueryT extends AfterFromClause, AliasedTableT extends IAliasedTable, FromDelegateT extends JoinFromDelegate<QueryT["joins"]>>(query: QueryT, aliasedTable: AssertUniqueJoinTarget<QueryT, AliasedTableT>, fromDelegate: FromDelegateT, toDelegate: JoinToDelegate<QueryT, AliasedTableT, FromDelegateT>): (InnerJoin<QueryT, AliasedTableT>);
    type LeftJoin<QueryT extends AfterFromClause, AliasedTableT extends IAliasedTable> = (Query<{
        readonly joins: (QueryT["joins"][number] | Join<{
            aliasedTable: AliasedTableT;
            columns: AliasedTableT["columns"];
            nullable: true;
        }>)[];
        readonly parentJoins: QueryT["parentJoins"];
        readonly unions: QueryT["unions"];
        readonly selects: QueryT["selects"];
        readonly limit: QueryT["limit"];
        readonly unionLimit: QueryT["unionLimit"];
    }>);
    function leftJoin<QueryT extends AfterFromClause, AliasedTableT extends IAliasedTable, FromDelegateT extends JoinFromDelegate<QueryT["joins"]>>(query: QueryT, aliasedTable: AssertUniqueJoinTarget<QueryT, AliasedTableT>, fromDelegate: FromDelegateT, toDelegate: JoinToDelegate<QueryT, AliasedTableT, FromDelegateT>): (LeftJoin<QueryT, AliasedTableT>);
    type WhereDelegate<QueryT extends AfterFromClause> = ((columns: ColumnRefUtil.ToConvenient<ColumnRefUtil.FromQuery<QueryT>>, query: QueryT) => RawExpr<boolean>);
    function where<QueryT extends AfterFromClause, WhereDelegateT extends WhereDelegate<QueryT>>(query: QueryT, delegate: (WhereDelegateT & (ColumnRefUtil.FromQuery<QueryT> extends RawExprUtil.UsedRef<ReturnType<WhereDelegateT>> ? unknown : ["WHERE expression contains some invalid columns; the following are not allowed:", Exclude<ColumnRefUtil.ToUnion<RawExprUtil.UsedRef<ReturnType<WhereDelegateT>>>, ColumnRefUtil.ToUnion<ColumnRefUtil.FromQuery<QueryT>>>] | void))): IQuery<QueryT>;
    type SelectDelegate<QueryT extends BeforeUnionClause> = ((columns: ColumnRefUtil.ToConvenient<ColumnRefUtil.FromQuery<QueryT>>) => NonEmptyTuple<SelectItem>);
    type Select<QueryT extends BeforeUnionClause, SelectDelegateT extends SelectDelegate<QueryT>> = (Query<{
        readonly joins: QueryT["joins"];
        readonly parentJoins: QueryT["parentJoins"];
        readonly unions: QueryT["unions"];
        readonly selects: (QueryT["selects"] extends SelectItem[] ? TupleUtil.Concat<QueryT["selects"], ReturnType<SelectDelegateT>> : ReturnType<SelectDelegateT>);
        readonly limit: QueryT["limit"];
        readonly unionLimit: QueryT["unionLimit"];
    }>);
    function select<QueryT extends BeforeUnionClause, SelectDelegateT extends SelectDelegate<QueryT>>(query: QueryT, delegate: (SelectDelegateT & ToUnknownIfAllFieldsNever<{
        [index in Extract<keyof ReturnType<SelectDelegateT>, string>]: (ReturnType<SelectDelegateT>[index] extends IExprSelectItem ? (ColumnRefUtil.FromQuery<QueryT> extends ReturnType<SelectDelegateT>[index]["usedRef"] ? never : ["Invalid IExprSelectItem", Exclude<ColumnRefUtil.ToUnion<ReturnType<SelectDelegateT>[index]["usedRef"]>, ColumnRefUtil.ToUnion<ColumnRefUtil.FromQuery<QueryT>>>] | void) : never);
    }> & ToUnknownIfAllFieldsNever<{
        [index in Extract<keyof ReturnType<SelectDelegateT>, string>]: (ReturnType<SelectDelegateT>[index] extends IColumn ? (ReturnType<SelectDelegateT>[index] extends ColumnRefUtil.ToUnion<ColumnRefUtil.FromQuery<QueryT>> ? never : ["Invalid IColumn", ReturnType<SelectDelegateT>[index]] | void) : never);
    }> & ToUnknownIfAllFieldsNever<{
        [index in Extract<keyof ReturnType<SelectDelegateT>, string>]: (ReturnType<SelectDelegateT>[index] extends ColumnMap ? (ColumnMapUtil.ToUnion<ReturnType<SelectDelegateT>[index]> extends ColumnRefUtil.ToUnion<ColumnRefUtil.FromQuery<QueryT>> ? never : ["Invalid ColumnMap", Exclude<ColumnMapUtil.ToUnion<ReturnType<SelectDelegateT>[index]>, ColumnRefUtil.ToUnion<ColumnRefUtil.FromQuery<QueryT>>>] | void) : never);
    }> & (QueryT["selects"] extends SelectItem[] ? (ToUnknownIfAllFieldsNever<{
        [index in Extract<keyof ReturnType<SelectDelegateT>, string>]: (ReturnType<SelectDelegateT>[index] extends SelectItem ? (Extract<SelectItemUtil.ToColumnIdentifierUnion<ReturnType<SelectDelegateT>[index]>, SelectItemArrayUtil.ToColumnIdentifierUnion<QueryT["selects"]>> extends never ? never : ["Duplicate columns in SELECT clause; consider aliasing", Extract<SelectItemUtil.ToColumnIdentifierUnion<ReturnType<SelectDelegateT>[index]>, SelectItemArrayUtil.ToColumnIdentifierUnion<QueryT["selects"]>>] | void) : never);
    }> & ToUnknownIfAllFieldsNever<{
        [index in Extract<keyof ReturnType<SelectDelegateT>, string>]: (ReturnType<SelectDelegateT>[index] extends SelectItem ? (Extract<SelectItemUtil.ToColumnIdentifierUnion<ReturnType<SelectDelegateT>[index]>, SelectItemArrayUtil.ToColumnIdentifierUnionIgnoreIndex<ReturnType<SelectDelegateT>, index>> extends never ? never : ["Duplicate columns in SELECT clause", Extract<SelectItemUtil.ToColumnIdentifierUnion<ReturnType<SelectDelegateT>[index]>, SelectItemArrayUtil.ToColumnIdentifierUnionIgnoreIndex<ReturnType<SelectDelegateT>, index>>] | void) : never);
    }>) : unknown))): Select<QueryT, SelectDelegateT>;
}
export declare function from<AliasedTableT extends IAliasedTable>(aliasedTable: Query.AssertUniqueJoinTarget<Query.NewInstance, AliasedTableT>): (Query.From<Query.NewInstance, AliasedTableT>);
//# sourceMappingURL=query.d.ts.map