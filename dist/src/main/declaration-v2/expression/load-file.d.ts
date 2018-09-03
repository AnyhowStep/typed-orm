/// <reference types="node" />
import { RawExpr, RawExprUtil } from "../raw-expr";
import { Expr } from "../expr/expr";
export declare function loadFile<RawT extends RawExpr<string>>(raw: RawT): (Expr<RawExprUtil.UsedReferences<RawT>, null | Buffer>);
//# sourceMappingURL=load-file.d.ts.map