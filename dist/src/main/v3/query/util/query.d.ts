import * as sd from "type-mapping";
import { IQuery } from "../query";
import { QueryTreeArray, QueryTree } from "../../query-tree";
import { AfterSelectClause, BeforeSelectClause, OneSelectItemQuery, OneRowQuery, ZeroOrOneRowQuery } from "./predicate";
import { SelectItemUtil } from "../../select-item";
import { DeletableQuery } from "../../delete";
import { DeletableTable } from "../../table";
export declare function queryTreeSelects(query: AfterSelectClause): QueryTreeArray;
export declare function queryTreeSelects_RawExpr(query: OneSelectItemQuery<any>): QueryTreeArray;
export declare function queryTreeSelects_RawExprNoUnalias(query: OneSelectItemQuery<any>): QueryTreeArray;
export declare function queryTreeSelects_As(query: AfterSelectClause): QueryTreeArray;
export declare function queryTreeJoins(query: IQuery): QueryTreeArray;
export declare function queryTreeFrom(query: IQuery): QueryTreeArray;
export declare function queryTreeWhere(query: IQuery): QueryTreeArray;
export declare function queryTreeGroupBy(query: IQuery): QueryTreeArray;
export declare function queryTreeHaving(query: IQuery): QueryTreeArray;
export declare function queryTreeOrderBy(query: IQuery): QueryTreeArray;
export declare function queryTreeLimit(query: IQuery): QueryTreeArray;
export declare function queryTree_RawExpr(query: OneSelectItemQuery<any>): QueryTreeArray;
export declare function queryTree_As(query: AfterSelectClause): QueryTree;
export declare function queryTree_SelectStar(query: BeforeSelectClause): QueryTree;
export declare function queryTree(query: AfterSelectClause): QueryTreeArray;
export declare function queryTreeUnion(query: IQuery): QueryTreeArray;
export declare function queryTreeUnionOrderBy(query: IQuery): QueryTreeArray;
export declare function queryTreeUnionLimit(query: IQuery): QueryTreeArray;
export declare type TypeOf<QueryT extends OneSelectItemQuery<any> & ZeroOrOneRowQuery> = (QueryT extends OneRowQuery ? SelectItemUtil.TypeOf<QueryT["_selects"][0]> : null | SelectItemUtil.TypeOf<QueryT["_selects"][0]>);
export declare type AssertDelegate<QueryT extends OneSelectItemQuery<any> & ZeroOrOneRowQuery> = (sd.SafeMapper<TypeOf<QueryT>>);
export declare function assertDelegate<QueryT extends OneSelectItemQuery<any> & ZeroOrOneRowQuery>(rawExpr: QueryT): AssertDelegate<QueryT>;
export declare function printSql(query: AfterSelectClause): void;
export declare function printSqlPretty(query: AfterSelectClause): void;
export declare type DeletableTables<QueryT extends DeletableQuery> = (Extract<QueryT["_joins"][number]["aliasedTable"], DeletableTable>);
export declare function deletableTableArray<QueryT extends DeletableQuery>(query: QueryT): DeletableTables<QueryT>[];
