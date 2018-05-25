import {booleanExpr} from "./boolean-expr";
import {RawExpr, RawExprUtil} from "../raw-expr";
import {ColumnReferencesUtil} from "../column-references";
import {Expr} from "../expr";
import * as sd from "schema-decorator";

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

export const and = booleanBinaryOp("AND");
export const or = booleanBinaryOp("OR");
export const xor = booleanBinaryOp("XOR");

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