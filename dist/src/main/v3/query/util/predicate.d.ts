import { UnionQuery, LimitData, IQuery, QueryData } from "../query";
import { IAnonymousTypedExpr } from "../../expr";
import { IJoin, JoinUtil } from "../../join";
import { SelectItem, AnonymousTypedSingleValueSelectItem } from "../../select-item";
import { IAliasedTable } from "../../aliased-table";
import { ColumnIdentifierUtil } from "../../column-identifier";
import { Order } from "../../order";
import { ColumnUtil } from "../../column";
export declare function isUnionQuery(raw: any): raw is UnionQuery;
export declare function isUnionQueryArray(raw: any): raw is UnionQuery[];
export declare function isLimitData(raw: any): raw is LimitData;
export declare function isQuery(raw: any): raw is IQuery;
export declare type BeforeFromClause = IQuery<QueryData & {
    _joins: undefined;
}>;
export declare type AfterFromClause = IQuery<QueryData & {
    _joins: IJoin[];
}>;
export declare type BeforeUnionClause = IQuery<QueryData & {
    _unions: undefined;
}>;
export declare type AfterUnionClause = IQuery<QueryData & {
    _unions: UnionQuery[];
}>;
export declare type BeforeSelectClause = IQuery<QueryData & {
    _selects: undefined;
}>;
export declare type AfterSelectClause = IQuery<QueryData & {
    _selects: SelectItem[];
}>;
export declare type BeforeWhereClause = IQuery<QueryData & {
    _where: undefined;
}>;
export declare type AfterWhereClause = IQuery<QueryData & {
    _where: IAnonymousTypedExpr<boolean>;
}>;
export declare type BeforeHavingClause = IQuery<QueryData & {
    _where: undefined;
}>;
export declare type AfterHavingClause = IQuery<QueryData & {
    _where: IAnonymousTypedExpr<boolean>;
}>;
export declare type BeforeOrderByClause = IQuery<QueryData & {
    _orders: undefined;
}>;
export declare type AfterOrderByClause = IQuery<QueryData & {
    _orders: Order[];
}>;
export declare type BeforeUnionOrderByClause = IQuery<QueryData & {
    _unionOrders: undefined;
}>;
export declare type AfterUnionOrderByClause = IQuery<QueryData & {
    _unionOrders: Order[];
}>;
export declare type CanWidenColumnTypes = IQuery<QueryData & {
    _selects: undefined;
    _where: undefined;
    _having: undefined;
    _orders: undefined;
    _unionOrders: undefined;
}>;
export declare type MainQuery = IQuery<QueryData & {
    _parentJoins: undefined;
}>;
export declare type SubQuery = IQuery<QueryData & {
    _parentJoins: IJoin[];
}>;
export declare type OneRowQuery = (BeforeFromClause & BeforeUnionClause);
export declare type ZeroOrOneRowUnionQuery = (AfterUnionClause & {
    _unionLimit: {
        maxRowCount: 0 | 1;
    };
});
export declare type ZeroOrOneRowFromQuery = (AfterFromClause & BeforeUnionClause & ({
    _limit: {
        maxRowCount: 0 | 1;
    };
} | {
    _unionLimit: {
        maxRowCount: 0 | 1;
    };
}));
export declare type ZeroOrOneRowQuery = (OneRowQuery | ZeroOrOneRowUnionQuery | ZeroOrOneRowFromQuery);
export declare type OneSelectItemQuery<TypeT> = (QueryData & {
    _selects: [AnonymousTypedSingleValueSelectItem<TypeT>];
});
export declare function isBeforeFromClause(query: IQuery): query is BeforeFromClause;
export declare function isAfterFromClause(query: IQuery): query is AfterFromClause;
export declare function isBeforeUnionClause(query: IQuery): query is BeforeUnionClause;
export declare function isAfterUnionClause(query: IQuery): query is AfterUnionClause;
export declare function isBeforeSelectClause(query: IQuery): query is BeforeSelectClause;
export declare function isAfterSelectClause(query: IQuery): query is AfterSelectClause;
export declare function isBeforeWhereClause(query: IQuery): query is BeforeWhereClause;
export declare function isAfterWhereClause(query: IQuery): query is AfterWhereClause;
export declare function isBeforeHavingClause(query: IQuery): query is BeforeHavingClause;
export declare function isAfterHavingClause(query: IQuery): query is AfterHavingClause;
export declare function isBeforeOrderByClause(query: IQuery): query is BeforeOrderByClause;
export declare function isAfterOrderByClause(query: IQuery): query is AfterOrderByClause;
export declare function isBeforeUnionOrderByClause(query: IQuery): query is BeforeUnionOrderByClause;
export declare function isAfterUnionOrderByClause(query: IQuery): query is AfterUnionOrderByClause;
export declare function canWidenColumnTypes(query: IQuery): query is CanWidenColumnTypes;
export declare function isMainQuery(query: IQuery): query is MainQuery;
export declare function isSubQuery(query: IQuery): query is SubQuery;
export declare function isOneRowQuery(query: IQuery): query is OneRowQuery;
export declare function isZeroOrOneRowUnionQuery(query: IQuery): query is ZeroOrOneRowUnionQuery;
export declare function isZeroOrOneRowFromQuery(query: IQuery): query is ZeroOrOneRowFromQuery;
export declare function isZeroOrOneRowQuery(query: IQuery): query is ZeroOrOneRowQuery;
export declare function isOneSelectItemQuery(query: IQuery): query is OneSelectItemQuery<any>;
export declare type AssertValidJoinTargetImpl<QueryT extends IQuery, AliasedTableT extends IAliasedTable> = ((QueryT["_joins"] extends IJoin[] ? (Extract<AliasedTableT["alias"], JoinUtil.Array.TableAliases<QueryT["_joins"]>> extends never ? unknown : ["Alias", Extract<AliasedTableT["alias"], JoinUtil.Array.TableAliases<QueryT["_joins"]>>, "already used in previous JOINs", JoinUtil.Array.TableAliases<QueryT["_joins"]>] | void) : unknown) & (QueryT["_parentJoins"] extends IJoin[] ? (Extract<AliasedTableT["alias"], JoinUtil.Array.TableAliases<QueryT["_parentJoins"]>> extends never ? unknown : ["Alias", Extract<AliasedTableT["alias"], JoinUtil.Array.TableAliases<QueryT["_parentJoins"]>>, "already used in parent JOINs", JoinUtil.Array.TableAliases<QueryT["_parentJoins"]>] | void) : unknown) & (Extract<keyof AliasedTableT["usedRef"], string> extends never ? unknown : (QueryT["_parentJoins"] extends IJoin[] ? (Exclude<ColumnUtil.FromColumnRef<AliasedTableT["usedRef"]>, ColumnUtil.FromJoinArray<QueryT["_parentJoins"]>> extends never ? unknown : ["Incompatible usedRef", Exclude<ColumnUtil.FromColumnRef<AliasedTableT["usedRef"]>, ColumnUtil.FromJoinArray<QueryT["_parentJoins"]>>]) : ["Incompatible usedRef", ColumnIdentifierUtil.FromColumnRef<AliasedTableT["usedRef"]>])));
export declare type AssertValidJoinTarget<QueryT extends IQuery, AliasedTableT extends IAliasedTable> = (AliasedTableT & AssertValidJoinTargetImpl<QueryT, AliasedTableT>);
export declare function assertValidJoinTarget(query: IQuery, aliasedTable: IAliasedTable): void;
//# sourceMappingURL=predicate.d.ts.map