import {RawExpr, RawExprUtil} from "../raw-expr";
import { Expr } from "../expr/expr";
import * as sd from "schema-decorator";

export function loadFile<RawT extends RawExpr<string>> (
    raw : RawT
) : (
    Expr<RawExprUtil.UsedReferences<RawT>, null|Buffer>
) {
    return new Expr(
        RawExprUtil.usedReferences(raw),
        sd.nullable(sd.buffer()),
        `LOAD_FILE(${RawExprUtil.querify(raw)})`
    );
}