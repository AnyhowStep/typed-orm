import * as d from "../declaration";
import * as sd from "schema-decorator";
import {Expr} from "./expr";
import {usedColumns, querify} from "./expr-operation";
import {booleanExpr} from "./expr-factory";
import {copyReferences, combineReferences} from "./column-references-operation";

export function isNull<
    RawT extends d.RawExpr<any>
> (expr : RawT) : Expr<d.ExprUsedColumns<RawT>, boolean> {
    return booleanExpr(
        usedColumns(expr),
        `${querify(expr)} IS NULL`
    );
}

export function isNotNull<
    RawT extends d.RawExpr<any>
> (expr : RawT) : Expr<d.ExprUsedColumns<RawT>, boolean> {
    return booleanExpr(
        usedColumns(expr),
        `${querify(expr)} IS NOT NULL`
    );
}

//Does not allow NULL but only during compile time...
export function eq<
    LeftT extends d.RawExpr<any>,
    RightT extends d.RawExpr<any>
> (left : LeftT, right : RightT) : (
    null extends d.ExprType<LeftT> ?
        "Left expression is nullable, comparison with NULL yields NULL; consider narrowing" :
        null extends d.ExprType<RightT> ?
            "Right expression is nullable, comparison with NULL yields NULL; consider narrowing" :
            Expr<
                d.ExprUsedColumns<LeftT> & d.ExprUsedColumns<RightT>,
                boolean
            >
) {
    return booleanExpr(
        combineReferences(
            usedColumns(left),
            usedColumns(right)
        ),
        `${querify(left)} = ${querify(right)}`
    ) as any;
}

//Does not allow NULL but only during compile time...
export function notEq<
    LeftT extends d.RawExpr<any>,
    RightT extends d.RawExpr<any>
> (left : LeftT, right : RightT) : (
    null extends d.ExprType<LeftT> ?
        "Left expression is nullable, comparison with NULL yields NULL; consider narrowing" :
        null extends d.ExprType<RightT> ?
            "Right expression is nullable, comparison with NULL yields NULL; consider narrowing" :
            Expr<
                d.ExprUsedColumns<LeftT> & d.ExprUsedColumns<RightT>,
                boolean
            >
) {
    return booleanExpr(
        combineReferences(
            usedColumns(left),
            usedColumns(right)
        ),
        `${querify(left)} != ${querify(right)}`
    ) as any;
}

//Equality check with NULL yields NULL
export function eqAllowNull<
    LeftT extends d.RawExpr<any>,
    RightT extends d.RawExpr<any>
> (left : LeftT, right : RightT) : Expr<
    d.ExprUsedColumns<LeftT> & d.ExprUsedColumns<RightT>,
    boolean|null
> {
    return new Expr(
        combineReferences(
            usedColumns(left),
            usedColumns(right)
        ),
        sd.nullable(sd.numberToBoolean()),
        `${querify(left)} = ${querify(right)}`
    );
}

//Equality check with NULL yields NULL
export function notEqAllowNull<
    LeftT extends d.RawExpr<any>,
    RightT extends d.RawExpr<any>
> (left : LeftT, right : RightT) : Expr<
    d.ExprUsedColumns<LeftT> & d.ExprUsedColumns<RightT>,
    boolean|null
> {
    return new Expr(
        combineReferences(
            usedColumns(left),
            usedColumns(right)
        ),
        sd.nullable(sd.numberToBoolean()),
        `${querify(left)} != ${querify(right)}`
    );
}

//`in` is a reserved keyword
export function isIn<
    LeftT extends d.RawExpr<any>,
    RightT extends d.RawExpr<any>
> (left : LeftT, ...rightArr : RightT[]) : (
    null extends d.ExprType<LeftT> ?
        "Left expression is nullable, comparison with NULL yields NULL; consider narrowing" :
        null extends d.ExprType<RightT> ?
            "Right expression is nullable, comparison with NULL yields NULL; consider narrowing" :
            Expr<
                d.ExprUsedColumns<LeftT> & d.ExprUsedColumns<RightT>,
                boolean
            >
) {
    const rightQuery : string[] = [];
    let used : any = copyReferences(usedColumns(left));
    for (let r of rightArr) {
        rightQuery.push(querify(r));
        used = combineReferences(used, usedColumns(r));
    }
    return new Expr(
        used,
        sd.numberToBoolean(),
        `${querify(left)} IN(${rightQuery.join(",")})`
    ) as any;
}

//`in` is a reserved keyword
export function isInAllowNull<
    LeftT extends d.RawExpr<any>,
    RightT extends d.RawExpr<any>
> (left : LeftT, ...rightArr : RightT[]) : (
    Expr<
        d.ExprUsedColumns<LeftT> & d.ExprUsedColumns<RightT>,
        boolean|null
    >
) {
    const rightQuery : string[] = [];
    let used : any = copyReferences(usedColumns(left));
    for (let r of rightArr) {
        rightQuery.push(querify(r));
        used = combineReferences(used, usedColumns(r));
    }
    return new Expr(
        used,
        sd.nullable(sd.numberToBoolean()),
        `${querify(left)} IN(${rightQuery.join(",")})`
    ) as any;
}
