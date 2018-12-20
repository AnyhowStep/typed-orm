import * as sd from "schema-decorator";
import {PrimitiveExpr} from "./primitive-expr";
import {IAnonymousTypedExpr, IExpr, ExprUtil} from "./expr";
import {IAnonymousTypedColumn, IColumn, ColumnUtil} from "./column";
import {TableSubquery} from "./table-subquery";
import {ColumnRefUtil} from "./column-ref";
import {escape} from "sqlstring";
import {QueryTree, Parentheses} from "./query-tree";
import {Tuple} from "./tuple";
import {ColumnRef} from "./column-ref";
import {OneSelectItemQuery, ZeroOrOneRowQuery, OneRowQuery} from "./query/util";
import { IQuery, QueryUtil } from "./query";
import { IJoin } from "./join";
import {SelectItemUtil} from "./select-item";
import {MySqlDateTime, dateTime} from "./data-type";

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
        (OneSelectItemQuery<TypeT> & ZeroOrOneRowQuery) :
        (OneSelectItemQuery<TypeT> & OneRowQuery)
    ) |
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
        RawExprT extends IQuery ?
        (
            RawExprT["_parentJoins"] extends IJoin[] ?
            ColumnRefUtil.FromJoinArray<RawExprT["_parentJoins"]> :
            {}
        ) :
        //TableSubquery have parentJoins as usedRef
        //Query, too
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
        if (rawExpr instanceof MySqlDateTime) {
            return {} as any;
        }

        if (ExprUtil.isExpr(rawExpr)) {
            return rawExpr.usedRef;
        }

        if (ColumnUtil.isColumn(rawExpr)) {
            return ColumnRefUtil.fromColumn(rawExpr) as any;
        }

        if (QueryUtil.isQuery(rawExpr)) {
            if (rawExpr._parentJoins == undefined) {
                return {} as any;
            } else {
                return ColumnRefUtil.fromJoinArray(rawExpr._parentJoins) as any;
            }
        }

        if (TableSubquery.isSingleValueOrEmpty(rawExpr)) {
            return {} as any;
        }

        throw new Error(`Unknown rawExpr ${sd.toTypeStr(rawExpr)}`);
    }
    export type TypeOf<RawExprT extends RawExpr<any>> = (
        RawExprT extends PrimitiveExpr ?
        RawExprT :
        RawExprT extends IExpr ?
        ReturnType<RawExprT["assertDelegate"]> :
        RawExprT extends IColumn ?
        ReturnType<RawExprT["assertDelegate"]> :
        RawExprT extends OneSelectItemQuery<any> ?
        (
            RawExprT extends OneRowQuery ?
            SelectItemUtil.TypeOf<RawExprT["_selects"][0]> :
            null|SelectItemUtil.TypeOf<RawExprT["_selects"][0]>
        ) :
        RawExprT extends TableSubquery.SingleValueOrEmpty<any> ?
        TableSubquery.TypeOf<RawExprT> :
        never
    );
    export type AssertDelegate<RawExprT extends RawExpr<any>> = (
        RawExprT extends PrimitiveExpr ?
        sd.AssertDelegate<RawExprT> :
        RawExprT extends IExpr ?
        RawExprT["assertDelegate"] :
        RawExprT extends IColumn ?
        RawExprT["assertDelegate"] :
        RawExprT extends OneSelectItemQuery<any> ?
        (
            RawExprT extends OneRowQuery ?
            sd.AssertDelegate<
                SelectItemUtil.TypeOf<RawExprT["_selects"][0]>
            > :
            sd.AssertDelegate<
                null|
                SelectItemUtil.TypeOf<RawExprT["_selects"][0]>
            >
        ) :
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
        if (rawExpr instanceof MySqlDateTime) {
            return dateTime as any;
        }

        if (ExprUtil.isExpr(rawExpr)) {
            return rawExpr.assertDelegate;
        }

        if (ColumnUtil.isColumn(rawExpr)) {
            return rawExpr.assertDelegate;
        }

        if (QueryUtil.isQuery(rawExpr) && QueryUtil.isOneSelectItemQuery(rawExpr)) {
            if (QueryUtil.isOneRowQuery(rawExpr)) {
                return rawExpr._selects[0].assertDelegate;
            } else {
                return sd.nullable(rawExpr._selects[0].assertDelegate) as any;
            }
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
        if (rawExpr instanceof MySqlDateTime) {
            return escape(rawExpr.mySqlString());
        }

        if (ExprUtil.isExpr(rawExpr)) {
            return rawExpr.queryTree;
        }

        if (ColumnUtil.isColumn(rawExpr)) {
            return ColumnUtil.queryTree(rawExpr);
        }

        if (QueryUtil.isQuery(rawExpr) && QueryUtil.isOneSelectItemQuery(rawExpr)) {
            return Parentheses.Create(QueryUtil.queryTree_RawExpr(rawExpr));
        }

        if (TableSubquery.isSingleValueOrEmpty(rawExpr)) {
            return TableSubquery.queryTree(rawExpr);
        }

        throw new Error(`Unknown rawExpr ${sd.toTypeStr(rawExpr)}`);
    }

    /*
        //This is if we want to get a Tuple of UsedRef
        items = [];
        arr = [];
        for (let i=0; i<21; ++i) {
            arr.push(`[${items.join(", ")}]`);
            items.push(`UsedRef<ArrT[${i}]>`);
        }

        arr2 = [];
        for (let i=0; i<arr.length; ++i) {
            arr2.push(`ArrT["length"] extends ${i} ?\n        ${arr[i]} :`);
        }
        arr2.join("\n        ")

        //However, the current use-case only covers merging the UsedRef
        items = [];
        arr = [];
        for (let i=0; i<21; ++i) {
            if (i == 0) {
                arr.push("{}");
            } else {
                arr.push(items.join(" & "));
            }
            items.push(`UsedRef<ArrT[${i}]>`);
        }

        arr2 = [];
        for (let i=0; i<arr.length; ++i) {
            arr2.push(`ArrT["length"] extends ${i} ?\n        ${arr[i]} :`);
        }
        arr2.join("\n        ")
    */
    export type IntersectUsedRefTuple<ArrT extends Tuple<RawExpr<any>>> = (
        ArrT["length"] extends 0 ?
        {} :
        ArrT["length"] extends 1 ?
        UsedRef<ArrT[0]> :
        ArrT["length"] extends 2 ?
        UsedRef<ArrT[0]> & UsedRef<ArrT[1]> :
        ArrT["length"] extends 3 ?
        UsedRef<ArrT[0]> & UsedRef<ArrT[1]> & UsedRef<ArrT[2]> :
        ArrT["length"] extends 4 ?
        UsedRef<ArrT[0]> & UsedRef<ArrT[1]> & UsedRef<ArrT[2]> & UsedRef<ArrT[3]> :
        ArrT["length"] extends 5 ?
        UsedRef<ArrT[0]> & UsedRef<ArrT[1]> & UsedRef<ArrT[2]> & UsedRef<ArrT[3]> & UsedRef<ArrT[4]> :
        ArrT["length"] extends 6 ?
        UsedRef<ArrT[0]> & UsedRef<ArrT[1]> & UsedRef<ArrT[2]> & UsedRef<ArrT[3]> & UsedRef<ArrT[4]> & UsedRef<ArrT[5]> :
        ArrT["length"] extends 7 ?
        UsedRef<ArrT[0]> & UsedRef<ArrT[1]> & UsedRef<ArrT[2]> & UsedRef<ArrT[3]> & UsedRef<ArrT[4]> & UsedRef<ArrT[5]> & UsedRef<ArrT[6]> :
        ArrT["length"] extends 8 ?
        UsedRef<ArrT[0]> & UsedRef<ArrT[1]> & UsedRef<ArrT[2]> & UsedRef<ArrT[3]> & UsedRef<ArrT[4]> & UsedRef<ArrT[5]> & UsedRef<ArrT[6]> & UsedRef<ArrT[7]> :
        ArrT["length"] extends 9 ?
        UsedRef<ArrT[0]> & UsedRef<ArrT[1]> & UsedRef<ArrT[2]> & UsedRef<ArrT[3]> & UsedRef<ArrT[4]> & UsedRef<ArrT[5]> & UsedRef<ArrT[6]> & UsedRef<ArrT[7]> & UsedRef<ArrT[8]> :
        ArrT["length"] extends 10 ?
        UsedRef<ArrT[0]> & UsedRef<ArrT[1]> & UsedRef<ArrT[2]> & UsedRef<ArrT[3]> & UsedRef<ArrT[4]> & UsedRef<ArrT[5]> & UsedRef<ArrT[6]> & UsedRef<ArrT[7]> & UsedRef<ArrT[8]> & UsedRef<ArrT[9]> :
        ArrT["length"] extends 11 ?
        UsedRef<ArrT[0]> & UsedRef<ArrT[1]> & UsedRef<ArrT[2]> & UsedRef<ArrT[3]> & UsedRef<ArrT[4]> & UsedRef<ArrT[5]> & UsedRef<ArrT[6]> & UsedRef<ArrT[7]> & UsedRef<ArrT[8]> & UsedRef<ArrT[9]> & UsedRef<ArrT[10]> :
        ArrT["length"] extends 12 ?
        UsedRef<ArrT[0]> & UsedRef<ArrT[1]> & UsedRef<ArrT[2]> & UsedRef<ArrT[3]> & UsedRef<ArrT[4]> & UsedRef<ArrT[5]> & UsedRef<ArrT[6]> & UsedRef<ArrT[7]> & UsedRef<ArrT[8]> & UsedRef<ArrT[9]> & UsedRef<ArrT[10]> & UsedRef<ArrT[11]> :
        ArrT["length"] extends 13 ?
        UsedRef<ArrT[0]> & UsedRef<ArrT[1]> & UsedRef<ArrT[2]> & UsedRef<ArrT[3]> & UsedRef<ArrT[4]> & UsedRef<ArrT[5]> & UsedRef<ArrT[6]> & UsedRef<ArrT[7]> & UsedRef<ArrT[8]> & UsedRef<ArrT[9]> & UsedRef<ArrT[10]> & UsedRef<ArrT[11]> & UsedRef<ArrT[12]> :
        ArrT["length"] extends 14 ?
        UsedRef<ArrT[0]> & UsedRef<ArrT[1]> & UsedRef<ArrT[2]> & UsedRef<ArrT[3]> & UsedRef<ArrT[4]> & UsedRef<ArrT[5]> & UsedRef<ArrT[6]> & UsedRef<ArrT[7]> & UsedRef<ArrT[8]> & UsedRef<ArrT[9]> & UsedRef<ArrT[10]> & UsedRef<ArrT[11]> & UsedRef<ArrT[12]> & UsedRef<ArrT[13]> :
        ArrT["length"] extends 15 ?
        UsedRef<ArrT[0]> & UsedRef<ArrT[1]> & UsedRef<ArrT[2]> & UsedRef<ArrT[3]> & UsedRef<ArrT[4]> & UsedRef<ArrT[5]> & UsedRef<ArrT[6]> & UsedRef<ArrT[7]> & UsedRef<ArrT[8]> & UsedRef<ArrT[9]> & UsedRef<ArrT[10]> & UsedRef<ArrT[11]> & UsedRef<ArrT[12]> & UsedRef<ArrT[13]> & UsedRef<ArrT[14]> :
        ArrT["length"] extends 16 ?
        UsedRef<ArrT[0]> & UsedRef<ArrT[1]> & UsedRef<ArrT[2]> & UsedRef<ArrT[3]> & UsedRef<ArrT[4]> & UsedRef<ArrT[5]> & UsedRef<ArrT[6]> & UsedRef<ArrT[7]> & UsedRef<ArrT[8]> & UsedRef<ArrT[9]> & UsedRef<ArrT[10]> & UsedRef<ArrT[11]> & UsedRef<ArrT[12]> & UsedRef<ArrT[13]> & UsedRef<ArrT[14]> & UsedRef<ArrT[15]> :
        ArrT["length"] extends 17 ?
        UsedRef<ArrT[0]> & UsedRef<ArrT[1]> & UsedRef<ArrT[2]> & UsedRef<ArrT[3]> & UsedRef<ArrT[4]> & UsedRef<ArrT[5]> & UsedRef<ArrT[6]> & UsedRef<ArrT[7]> & UsedRef<ArrT[8]> & UsedRef<ArrT[9]> & UsedRef<ArrT[10]> & UsedRef<ArrT[11]> & UsedRef<ArrT[12]> & UsedRef<ArrT[13]> & UsedRef<ArrT[14]> & UsedRef<ArrT[15]> & UsedRef<ArrT[16]> :
        ArrT["length"] extends 18 ?
        UsedRef<ArrT[0]> & UsedRef<ArrT[1]> & UsedRef<ArrT[2]> & UsedRef<ArrT[3]> & UsedRef<ArrT[4]> & UsedRef<ArrT[5]> & UsedRef<ArrT[6]> & UsedRef<ArrT[7]> & UsedRef<ArrT[8]> & UsedRef<ArrT[9]> & UsedRef<ArrT[10]> & UsedRef<ArrT[11]> & UsedRef<ArrT[12]> & UsedRef<ArrT[13]> & UsedRef<ArrT[14]> & UsedRef<ArrT[15]> & UsedRef<ArrT[16]> & UsedRef<ArrT[17]> :
        ArrT["length"] extends 19 ?
        UsedRef<ArrT[0]> & UsedRef<ArrT[1]> & UsedRef<ArrT[2]> & UsedRef<ArrT[3]> & UsedRef<ArrT[4]> & UsedRef<ArrT[5]> & UsedRef<ArrT[6]> & UsedRef<ArrT[7]> & UsedRef<ArrT[8]> & UsedRef<ArrT[9]> & UsedRef<ArrT[10]> & UsedRef<ArrT[11]> & UsedRef<ArrT[12]> & UsedRef<ArrT[13]> & UsedRef<ArrT[14]> & UsedRef<ArrT[15]> & UsedRef<ArrT[16]> & UsedRef<ArrT[17]> & UsedRef<ArrT[18]> :
        ArrT["length"] extends 20 ?
        UsedRef<ArrT[0]> & UsedRef<ArrT[1]> & UsedRef<ArrT[2]> & UsedRef<ArrT[3]> & UsedRef<ArrT[4]> & UsedRef<ArrT[5]> & UsedRef<ArrT[6]> & UsedRef<ArrT[7]> & UsedRef<ArrT[8]> & UsedRef<ArrT[9]> & UsedRef<ArrT[10]> & UsedRef<ArrT[11]> & UsedRef<ArrT[12]> & UsedRef<ArrT[13]> & UsedRef<ArrT[14]> & UsedRef<ArrT[15]> & UsedRef<ArrT[16]> & UsedRef<ArrT[17]> & UsedRef<ArrT[18]> & UsedRef<ArrT[19]> :
        //Add more lengths
        //Too many to handle...
        ColumnRef
    );

    export function intersectUsedRefTuple<ArrT extends Tuple<RawExpr<any>>> (
        ...arr : ArrT
    ) : IntersectUsedRefTuple<ArrT> {
        return ColumnRefUtil.intersectTuple(...(arr.map(usedRef) as any));
    }
}