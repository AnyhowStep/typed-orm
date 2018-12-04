import * as sd from "schema-decorator";
import {PrimitiveExpr} from "./primitive-expr";
import {IAnonymousTypedExpr, IExpr, Expr} from "./expr";
import {IAnonymousTypedColumn, IColumn, ColumnUtil} from "./column";
import {TableSubquery} from "./table-subquery";
import {ColumnRefUtil} from "./column-ref";
import {escape} from "sqlstring";
import {QueryTree} from "./query-tree";

export type RawExpr<TypeT> = (
    (
        TypeT extends PrimitiveExpr ?
            TypeT :
            never
    ) |
    IAnonymousTypedExpr<TypeT> |
    IAnonymousTypedColumn<TypeT> |
    (
        null extends TypeT ?
        TableSubquery.SingleValueOrEmpty<TypeT> :
        TableSubquery.SingleValue<TypeT>
    )
);

export namespace RawExprUtil {
    export type UsedRef<RawExprT extends RawExpr<any>> = (
        RawExprT extends PrimitiveExpr ?
        {} :
        RawExprT extends IExpr ?
        RawExprT["usedRef"] :
        RawExprT extends IColumn ?
        ColumnRefUtil.FromColumn<RawExprT> :
        //TableSubquery do not use any outside references...
        //I think
        RawExprT extends TableSubquery.SingleValueOrEmpty<any> ?
        {} :
        never
    );
    export function usedRef<RawExprT extends RawExpr<any>> (
        rawExpr : RawExprT
    ) : UsedRef<RawExprT> {
        //Check primitive cases first
        if (typeof rawExpr == "number") {
            return {} as any;
        }
        if (typeof rawExpr == "string") {
            return {} as any;
        }
        if (typeof rawExpr == "boolean") {
            return {} as any;
        }
        if (rawExpr instanceof Date) {
            return {} as any;
        }
        if (rawExpr instanceof Buffer) {
            return {} as any;
        }
        if (rawExpr === null) {
            return {} as any;
        }

        if (Expr.isExpr(rawExpr)) {
            return rawExpr.usedRef;
        }

        if (ColumnUtil.isColumn(rawExpr)) {
            return ColumnRefUtil.fromColumn(rawExpr) as any;
        }

        if (TableSubquery.isSingleValueOrEmpty(rawExpr)) {
            return {} as any;
        }

        throw new Error(`Unknown rawExpr ${sd.toTypeStr(rawExpr)}`);
    }
    export type AssertDelegate<RawExprT extends RawExpr<any>> = (
        RawExprT extends PrimitiveExpr ?
        sd.AssertDelegate<RawExprT> :
        RawExprT extends IExpr ?
        RawExprT["assertDelegate"] :
        RawExprT extends IColumn ?
        RawExprT["assertDelegate"] :
        RawExprT extends TableSubquery.SingleValueOrEmpty<any> ?
        TableSubquery.AssertDelegate<RawExprT> :
        never
    );
    export function assertDelegate<RawExprT extends RawExpr<any>> (
        rawExpr : RawExprT
    ) : AssertDelegate<RawExprT> {
        //Check primitive cases first
        if (typeof rawExpr == "number") {
            return sd.literal(rawExpr) as any;
        }
        if (typeof rawExpr == "string") {
            return sd.literal(rawExpr) as any;
        }
        if (typeof rawExpr == "boolean") {
            //MySQL returns `number` instead of `boolean`
            return (rawExpr ?
                sd.numberToTrue() :
                sd.numberToFalse()
            ) as any;
        }
        if (rawExpr instanceof Date) {
            //TODO Have a delegate that checks for the exact date given?
            return sd.date() as any;
        }
        if (rawExpr instanceof Buffer) {
            //TODO Have a delegate that checks for the exact buffer given?
            //May not be desirable if the buffer is large...
            return sd.buffer() as any;
        }
        if (rawExpr === null) {
            return sd.nil() as any;
        }

        if (Expr.isExpr(rawExpr)) {
            return rawExpr.assertDelegate;
        }

        if (ColumnUtil.isColumn(rawExpr)) {
            return rawExpr.assertDelegate;
        }

        if (TableSubquery.isSingleValueOrEmpty(rawExpr)) {
            return TableSubquery.assertDelegate(rawExpr) as any;
        }

        throw new Error(`Unknown rawExpr ${sd.toTypeStr(rawExpr)}`);
    }

    function zeroPad (num : number, length : number) {
        const str = num.toString();
        if (str.length < length) {
            return "0".repeat(length-str.length) + str;
        } else {
            return str;
        }
    }

    export function queryTree (rawExpr : RawExpr<any>) : QueryTree {
        //Check primitive cases first
        if (typeof rawExpr == "number") {
            return escape(rawExpr);
        }
        if (typeof rawExpr == "string") {
            return escape(rawExpr);
        }
        if (typeof rawExpr == "boolean") {
            return escape(rawExpr);
        }
        if (rawExpr instanceof Date) {
            const year = zeroPad(rawExpr.getUTCFullYear(), 4);
            const month = zeroPad(rawExpr.getUTCMonth() + 1, 2);
            const day = zeroPad(rawExpr.getUTCDate(), 2);
            const hour = zeroPad(rawExpr.getUTCHours(), 2);
            const minute = zeroPad(rawExpr.getUTCMinutes(), 2);
            const second = zeroPad(rawExpr.getUTCSeconds(), 2);
            const ms = zeroPad(rawExpr.getMilliseconds(), 3);
            return escape(`${year}-${month}-${day} ${hour}:${minute}:${second}.${ms}`);
        }
        if (rawExpr instanceof Buffer) {
            //escape(Buffer.from("hello")) == "X'68656c6c6f'"
            return escape(rawExpr);
        }
        if (rawExpr === null) {
            return escape(rawExpr);
        }

        if (Expr.isExpr(rawExpr)) {
            return rawExpr.queryTree;
        }

        if (ColumnUtil.isColumn(rawExpr)) {
            return ColumnUtil.queryTree(rawExpr);
        }

        if (TableSubquery.isSingleValueOrEmpty(rawExpr)) {
            return TableSubquery.queryTree(rawExpr);
        }

        throw new Error(`Unknown rawExpr ${sd.toTypeStr(rawExpr)}`);
    }
}