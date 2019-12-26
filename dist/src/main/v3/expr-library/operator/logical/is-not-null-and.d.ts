import * as sd from "type-mapping";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
import { ColumnRefUtil } from "../../../column-ref";
import { IColumn, ColumnUtil } from "../../../column";
export declare function isNotNullAnd<ColumnT extends IColumn, RawExprT extends RawExpr<boolean>>(column: ColumnT, exprDelegate: (narrowedColumns: {
    [columnAlias in ColumnT["name"]]: ColumnUtil.ToNonNullable<ColumnT>;
}) => RawExprT): (Expr<{
    usedRef: (ColumnRefUtil.FromColumnArray<(ColumnT | Exclude<ColumnUtil.FromColumnRef<RawExprUtil.UsedRef<RawExprT>>, ColumnUtil.ToNonNullable<ColumnT>>)[]>);
    assertDelegate: sd.SafeMapper<boolean>;
}>);
