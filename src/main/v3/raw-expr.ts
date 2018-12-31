import * as sd from "schema-decorator";
import {PrimitiveExpr} from "./primitive-expr";
import {IAnonymousTypedExpr, IExpr, ExprUtil} from "./expr";
import {IAnonymousTypedColumn, IColumn, ColumnUtil} from "./column";
import {ColumnRefUtil} from "./column-ref";
import {escape} from "sqlstring";
import {QueryTree} from "./query-tree";
import {Tuple} from "./tuple";
import {ColumnRef} from "./column-ref";
import {OneSelectItemQuery, ZeroOrOneRowQuery, OneRowQuery, MainQuery} from "./query/util";
import {IQuery, QueryUtil} from "./query";
import {IJoin} from "./join";
import {DateTimeUtil} from "./data-type";
import * as dataType from "./data-type";
import {IAnonymousTypedExprSelectItem, IExprSelectItem, ExprSelectItemUtil} from "./expr-select-item";
import {Parentheses} from "./query-tree";

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
    IAnonymousTypedExprSelectItem<TypeT>
);

export type RawExprNoUsedRef<TypeT> = (
    (
        TypeT extends PrimitiveExpr ?
            TypeT :
            never
    ) |
    IExpr<{
        usedRef : {},
        assertDelegate : sd.AssertDelegate<TypeT>,
    }> |
    (
        null extends TypeT ?
        (OneSelectItemQuery<TypeT> & ZeroOrOneRowQuery & MainQuery) :
        (OneSelectItemQuery<TypeT> & OneRowQuery & MainQuery)
    ) |
    IExprSelectItem<{
        usedRef : {},
        assertDelegate : sd.AssertDelegate<TypeT>,
        tableAlias : string,
        alias : string,
    }>
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
            ColumnRefUtil.FromJoinArray<Extract<
                RawExprT["_parentJoins"],
                IJoin[]
            >> :
            {}
        ) :
        RawExprT extends IExprSelectItem ?
        RawExprT["usedRef"] :
        never
    );
    export function usedRef<RawExprT extends RawExpr<any>> (
        rawExpr : RawExprT
    ) : UsedRef<RawExprT> {
        //Check primitive cases first
        if (typeof rawExpr == "number") {
            return {} as any;
        }
        if (typeof rawExpr == "bigint") {
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

        if (ExprUtil.isExpr(rawExpr)) {
            return rawExpr.usedRef as any;
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

        if (ExprSelectItemUtil.isExprSelectItem(rawExpr)) {
            return rawExpr.usedRef as any;
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
        RawExprT extends OneSelectItemQuery<any> & ZeroOrOneRowQuery ?
        QueryUtil.TypeOf<RawExprT> :
        RawExprT extends IExprSelectItem ?
        ReturnType<RawExprT["assertDelegate"]> :
        never
    );
    export type AssertDelegate<RawExprT extends RawExpr<any>> = (
        sd.AssertDelegate<TypeOf<RawExprT>>
    );
    export function assertDelegate<RawExprT extends RawExpr<any>> (
        rawExpr : RawExprT
    ) : AssertDelegate<RawExprT> {
        //Check primitive cases first
        if (typeof rawExpr == "number") {
            return dataType.double() as any;
        }
        if (typeof rawExpr == "bigint") {
            return dataType.bigint() as any;
        }
        if (typeof rawExpr == "string") {
            return sd.literal(rawExpr) as any;
        }
        if (typeof rawExpr == "boolean") {
            return (rawExpr ?
                dataType.true() :
                dataType.false()
            ) as any;
        }
        if (rawExpr instanceof Date) {
            return dataType.dateTime(3) as any;
        }
        if (rawExpr instanceof Buffer) {
            return sd.buffer() as any;
        }
        if (rawExpr === null) {
            return sd.nil() as any;
        }

        if (ExprUtil.isExpr(rawExpr)) {
            return rawExpr.assertDelegate as any;
        }

        if (ColumnUtil.isColumn(rawExpr)) {
            return rawExpr.assertDelegate as any;
        }

        if (
            QueryUtil.isQuery(rawExpr) &&
            QueryUtil.isOneSelectItemQuery(rawExpr) &&
            QueryUtil.isZeroOrOneRowQuery(rawExpr)
        ) {
            return QueryUtil.assertDelegate(rawExpr) as any;
        }

        if (ExprSelectItemUtil.isExprSelectItem(rawExpr)) {
            return rawExpr.assertDelegate as any;
        }

        throw new Error(`Unknown rawExpr ${sd.toTypeStr(rawExpr)}`);
    }

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