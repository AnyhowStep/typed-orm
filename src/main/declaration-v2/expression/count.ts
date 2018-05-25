import {Expr} from "../expr";
import {AnyRawExpr, RawExprUtil} from "../raw-expr";
import * as sd from "schema-decorator";
import * as variadicUtil from "./variadic-util";
import {ColumnReferencesUtil} from "../column-references";

export const COUNT_ALL = new Expr(
    {},
    sd.naturalNumber(),
    "COUNT(*)"
);

export function count<RawT extends AnyRawExpr> (raw : RawT) : (
    Expr<
        RawExprUtil.UsedReferences<RawT>,
        number
    >
) {
    return new Expr(
        RawExprUtil.usedReferences(raw),
        sd.naturalNumber(),
        `COUNT(${RawExprUtil.querify(raw)})`
    );
}

export function countDistinct<
    LeftT extends AnyRawExpr,
    RightT extends AnyRawExpr
> (left : LeftT, ...rightArr : RightT[]) : (
    Expr<
        ColumnReferencesUtil.Merge<
            RawExprUtil.UsedReferences<LeftT>,
            RawExprUtil.UsedReferences<RightT>
        >,
        number
    >
) {
    const q = variadicUtil.querifyNullable(left, ...rightArr);
    return new Expr(
        q.used,
        sd.naturalNumber(),
        `COUNT(DISTINCT ${q.leftQuery}, ${q.rightQueries.join(",")})`
    );
}