import {SortExpr} from "../../order";
import {ColumnUtil} from "../../../column";
import {ExprUtil} from "../../../expr";

export function isSortExpr (raw : any) : raw is SortExpr {
    return (
        ColumnUtil.isColumn(raw) ||
        ExprUtil.isExpr(raw)
    );
}