import {booleanExpr} from "./boolean-expr";
import {RawExpr, RawExprUtil} from "../raw-expr";
import {ColumnReferencesUtil} from "../column-references";
import {Expr} from "../expr";
import * as sd from "schema-decorator";
import * as variadicUtil from "./variadic-util";

import {SelectBuilder} from "../select-builder";
import {Column} from "../column";
import {AliasedExpr} from "../aliased-expr";
import {Join} from "../join";
import {AliasedTable} from "../aliased-table";
SelectBuilder;
Column;
AliasedExpr;
Join;
AliasedTable;

function booleanBinaryOp (operator : string) {
    function result<
        LeftT extends RawExpr<boolean>,
        RightT extends RawExpr<boolean>
    > (left : LeftT, right : RightT) : (
        Expr<
            ColumnReferencesUtil.Merge<
                RawExprUtil.UsedReferences<LeftT>,
                RawExprUtil.UsedReferences<RightT>
            >,
            boolean
        >
    ) {
        RawExprUtil.assertNonNullable(left);
        RawExprUtil.assertNonNullable(right);

        return booleanExpr(
            ColumnReferencesUtil.merge(
                RawExprUtil.usedReferences(left),
                RawExprUtil.usedReferences(right)
            ),
            //TODO More readable queries
            `${RawExprUtil.querify(left)} ${operator}\n${RawExprUtil.querify(right)}`
        );
    }
    Object.defineProperty(result, "name", {
        value : operator,
    });
    return result;
}

export const TRUE = new Expr({}, (name : string, mixed : any) : true => {
    const b = sd.numberToBoolean()(name, mixed);
    return sd.oneOf(true)(name, b);
}, "TRUE");
export const FALSE = new Expr({}, (name : string, mixed : any) : false => {
    const b = sd.numberToBoolean()(name, mixed);
    return sd.oneOf(false)(name, b);
}, "FALSE");

//export const and = booleanBinaryOp("AND");
export const or = booleanBinaryOp("OR");
export const xor = booleanBinaryOp("XOR");

export function and<
    LeftT extends RawExpr<boolean>,
    R0 extends RawExpr<boolean>,
    R1 extends RawExpr<boolean>
> (left : LeftT, r0 : R0, r1 : R1) : (
    Expr<
        ColumnReferencesUtil.Merge<
            ColumnReferencesUtil.Merge<
                RawExprUtil.UsedReferences<LeftT>,
                RawExprUtil.UsedReferences<R0>
            >,
            RawExprUtil.UsedReferences<R1>
        >,
        boolean
    >
);
export function and<
    LeftT extends RawExpr<boolean>,
    RightT extends RawExpr<boolean>
> (left : LeftT, right : RightT) : (
    Expr<
        ColumnReferencesUtil.Merge<
            RawExprUtil.UsedReferences<LeftT>,
            RawExprUtil.UsedReferences<RightT>
        >,
        boolean
    >
);
export function and<
    LeftT extends RawExpr<boolean>,
    RightT extends RawExpr<boolean>
> (left : LeftT, ...rightArr : RightT[]) : (
    Expr<
        ColumnReferencesUtil.Merge<
            RawExprUtil.UsedReferences<LeftT>,
            RawExprUtil.UsedReferences<RightT>
        >,
        boolean
    >
);
export function and<
    LeftT extends RawExpr<boolean>,
    RightT extends RawExpr<boolean>
> (left : LeftT, ...rightArr : RightT[]) : (
    Expr<
        ColumnReferencesUtil.Merge<
            RawExprUtil.UsedReferences<LeftT>,
            RawExprUtil.UsedReferences<RightT>
        >,
        boolean
    >
) {
    const q = variadicUtil.querifyNonNullable(left, ...rightArr);

    return booleanExpr(
        q.used,
        `\n\t${[q.leftQuery, ...q.rightQueries].join(" AND\n\t")}\n`
    ) as any;
}


export function not<RawT extends RawExpr<boolean>> (
    raw : RawT
) : Expr<RawExprUtil.UsedReferences<RawT>, boolean> {
    return booleanExpr(
        RawExprUtil.usedReferences(raw),
        `NOT (${RawExprUtil.querify(raw)})`
    );
}
export function implies <
    LeftT extends RawExpr<boolean>,
    RightT extends RawExpr<boolean>
> (left : LeftT, right : RightT) : (
    Expr<
        ColumnReferencesUtil.Merge<
            RawExprUtil.UsedReferences<LeftT>,
            RawExprUtil.UsedReferences<RightT>
        >,
        boolean
    >
) {
    return or(
        not(left),
        right
    ) as any;
}
//Internally,
//expression = condition ?
//    expression :
//    not(expression);
export function negateIfFalse<RawT extends RawExpr<boolean>> (
    condition : boolean,
    raw : RawT
) : Expr<RawExprUtil.UsedReferences<RawT>, boolean> {
    if (condition) {
        return RawExprUtil.toExpr(raw);
    } else {
        return not(raw);
    }
}