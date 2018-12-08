import { UnionQuery, Limit, IQuery, QueryData } from "../query";
import { JoinArrayUtil } from "../../join-array";
import { IJoin } from "../../join";
import { SelectItem } from "../../select-item";
import { IAliasedTable } from "../../aliased-table";
export declare function isUnionQuery(raw: any): raw is UnionQuery;
export declare function isUnionQueryArray(raw: any): raw is UnionQuery[];
export declare function isLimit(raw: any): raw is Limit;
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
export declare function isBeforeFromClause(query: IQuery): query is BeforeFromClause;
export declare function isAfterFromClause(query: IQuery): query is AfterFromClause;
export declare function isBeforeUnionClause(query: IQuery): query is BeforeUnionClause;
export declare function isAfterUnionClause(query: IQuery): query is AfterUnionClause;
export declare function isBeforeSelectClause(query: IQuery): query is BeforeSelectClause;
export declare function isAfterSelectClause(query: IQuery): query is AfterSelectClause;
export declare function isOneRowQuery(query: IQuery): query is OneRowQuery;
export declare function isZeroOrOneRowUnionQuery(query: IQuery): query is ZeroOrOneRowUnionQuery;
export declare function isZeroOrOneRowFromQuery(query: IQuery): query is ZeroOrOneRowFromQuery;
export declare function isZeroOrOneRowQuery(query: IQuery): query is ZeroOrOneRowQuery;
export declare type AssertUniqueJoinTarget<QueryT extends IQuery<QueryData>, AliasedTableT extends IAliasedTable> = (AliasedTableT & (QueryT["_joins"] extends IJoin[] ? (AliasedTableT["alias"] extends JoinArrayUtil.ToTableAliasUnion<QueryT["_joins"]> ? ["Alias", AliasedTableT["alias"], "already used in previous JOINs", JoinArrayUtil.ToTableAliasUnion<QueryT["_joins"]>] | void : unknown) : unknown) & (QueryT["_parentJoins"] extends IJoin[] ? (AliasedTableT["alias"] extends JoinArrayUtil.ToTableAliasUnion<QueryT["_parentJoins"]> ? ["Alias", AliasedTableT["alias"], "already used in parent JOINs", JoinArrayUtil.ToTableAliasUnion<QueryT["_parentJoins"]>] | void : unknown) : unknown));
export declare function assertUniqueJoinTarget(query: IQuery, aliasedTable: IAliasedTable): void;
//# sourceMappingURL=predicate.d.ts.map