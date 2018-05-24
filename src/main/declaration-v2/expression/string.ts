import {Expr} from "../expr";
import {RawExpr, RawExprUtil} from "../raw-expr";
import * as sd from "schema-decorator";
import {ColumnReferencesUtil} from "../column-references";
import * as variadicUtil from "./variadic-util";

export function concat<
    LeftT extends RawExpr<boolean|number|string|Date>,
    RightT extends RawExpr<boolean|number|string|Date>
> (left : LeftT, ...rightArr : RightT[]) : (
    Expr<
        ColumnReferencesUtil.Merge<
            RawExprUtil.UsedReferences<LeftT>,
            RawExprUtil.UsedReferences<RightT>
        >,
        string
    >
) {
    const q = variadicUtil.querifyNonNullable(left, ...rightArr);

    return new Expr(
        q.used,
        sd.string(),
        `CONCAT(${q.leftQuery}, ${q.rightQueries.join(",")})`
    ) as any;
}
