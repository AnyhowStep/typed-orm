import * as d from "../../declaration";
import {Expr} from "../expr";
import * as sd from "schema-decorator";
import {usedColumns, querify} from "../expr-operation";
import {combineReferences, copyReferences} from "../column-references-operation";

export function concat<
    LeftT extends d.RawExpr<boolean|number|string|Date>,
    RightT extends d.RawExpr<boolean|number|string|Date>
> (left : LeftT, ...rightArr : RightT[]) : (
    Expr<
        d.ExprUsedColumns<LeftT> & d.ExprUsedColumns<RightT>,
        string
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
        sd.string(),
        `CONCAT(${querify(left)}, ${rightQuery.join(",")})`
    ) as any;
}
