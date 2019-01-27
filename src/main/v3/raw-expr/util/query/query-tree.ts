import * as sd from "schema-decorator";
import {RawExpr} from "../../raw-expr";
import {ExprUtil} from "../../../expr";
import {ColumnUtil} from "../../../column";
import {escape} from "sqlstring";
import {QueryTree} from "../../../query-tree";
import {QueryUtil} from "../../../query";
import {DateTimeUtil} from "../../../data-type";
import {ExprSelectItemUtil} from "../../../expr-select-item";
import {Parentheses} from "../../../query-tree";

export function queryTree (rawExpr : RawExpr<any>) : QueryTree {
    //Check primitive cases first
    if (typeof rawExpr == "number") {
        //This technically gives us DECIMAL in MySQL,
        //Not double
        return rawExpr.toString();
    }
    if (typeof rawExpr == "bigint") {
        return rawExpr.toString();
    }
    if (typeof rawExpr == "string") {
        return escape(rawExpr);
    }
    if (typeof rawExpr == "boolean") {
        return escape(rawExpr);
    }
    if (rawExpr instanceof Date) {
        return DateTimeUtil.toSqlUtc(rawExpr, 3);
    }
    if (rawExpr instanceof Buffer) {
        //escape(Buffer.from("hello")) == "X'68656c6c6f'"
        return escape(rawExpr);
    }
    if (rawExpr === null) {
        return escape(rawExpr);
    }

    if (ExprUtil.isExpr(rawExpr)) {
        return rawExpr.queryTree;
    }

    if (ColumnUtil.isColumn(rawExpr)) {
        return ColumnUtil.queryTree(rawExpr);
    }

    if (QueryUtil.isQuery(rawExpr) && QueryUtil.isOneSelectItemQuery(rawExpr)) {
        return QueryUtil.queryTree_RawExpr(rawExpr);
    }

    if (ExprSelectItemUtil.isExprSelectItem(rawExpr)) {
        return Parentheses.Create(rawExpr.unaliasedQuery);
    }

    throw new Error(`Unknown rawExpr ${sd.toTypeStr(rawExpr)}`);
}