import {Expr} from "../expr";
import {RawExpr, AnyRawExpr, RawExprUtil} from "../raw-expr";
import * as sd from "schema-decorator";

//https://dev.mysql.com/doc/refman/8.0/en/group-by-functions.html#function_sum
//If there are no matching rows, SUM() returns NULL.
export function sum<RawT extends RawExpr<number>> (raw : RawT) : (
    Expr<
        RawExprUtil.UsedReferences<RawT>,
        RawExprUtil.Type<null|number>
    > & {
        distinct : () => Expr<
            RawExprUtil.UsedReferences<RawT>,
            RawExprUtil.Type<null|number>
        >
    }
) {
    RawExprUtil.assertNonNullable(raw);

    const usedReferences = RawExprUtil.usedReferences(raw);
    const query = RawExprUtil.querify(raw);
    const expr = new Expr(
        usedReferences,
        sd.nullable(sd.number()),
        `SUM(${query})`
    );
    (expr as any).distinct = () => {
        return new Expr(
            usedReferences,
            sd.nullable(sd.number()),
            `SUM(DISTINCT ${query})`
        );
    }
    return expr as any;
}

/*
https://dev.mysql.com/doc/refman/8.0/en/group-by-functions.html#function_sum
If you sum over a string column, you get zero.
If you sum over a boolean, true is one, false is zero.
If you sum over a DATETIME, you get the sum of their UNIX timestamps.
If you sum over NULL, you get NULL.
If you sum over a nullable column, you MAY get NULL, or you may get a number that ignores the NULL columns.
If there are no matching rows, SUM() returns NULL.
*/
export function sumUnsafe<RawT extends AnyRawExpr> (raw : RawT) : (
    Expr<
        RawExprUtil.UsedReferences<RawT>,
        RawExprUtil.Type<null|number>
    > & {
        distinct : () => Expr<
            RawExprUtil.UsedReferences<RawT>,
            RawExprUtil.Type<null|number>
        >
    }
) {
    const usedReferences = RawExprUtil.usedReferences(raw);
    const query = RawExprUtil.querify(raw);
    const expr = new Expr(
        usedReferences,
        sd.nullable(sd.number()),
        `SUM(${query})`
    );
    (expr as any).distinct = () => {
        return new Expr(
            usedReferences,
            sd.nullable(sd.number()),
            `SUM(DISTINCT ${query})`
        );
    }
    return expr as any;
}