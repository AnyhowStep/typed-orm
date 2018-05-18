import * as d from "../declaration";
import * as sd from "schema-decorator";
import {booleanExpr} from "./expr-factory";
import {usedColumns, querify} from "./expr-operation";
import {combineReferences} from "./column-references-operation";
import {Expr} from "./expr";

function booleanBinaryOp (operator : string) {
    function result<
        LeftT extends d.RawExpr<boolean>,
        RightT extends d.RawExpr<boolean>
    > (left : LeftT, right : RightT) : Expr<
        d.ExprUsedColumns<LeftT> & d.ExprUsedColumns<RightT>,
        boolean
    > {
        return booleanExpr(
            combineReferences(
                usedColumns(left),
                usedColumns(right)
            ),
            //TODO More readable queries
            `${querify(left)} ${operator}\n${querify(right)}`
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

export function not<RawT extends d.RawExpr<boolean>> (
    raw : RawT
) : Expr<d.ExprUsedColumns<RawT>, boolean> {
    return new Expr(
        usedColumns(raw),
        sd.numberToBoolean(),
        `NOT ${querify(raw)}`
    );
}
