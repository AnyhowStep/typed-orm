import * as d from "../declaration";
import * as sd from "schema-decorator";
import {booleanExpr} from "./expr-factory";
import {usedColumns, querify} from "./expr-operation";
import {spread} from "@anyhowstep/type-util";
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
            spread(
                usedColumns(left),
                usedColumns(right)
            ),
            `${querify(left)} ${operator} ${querify(right)}`
        );
    }
    Object.defineProperty(result, "name", {
        value : operator,
    });
    return result;
}

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
