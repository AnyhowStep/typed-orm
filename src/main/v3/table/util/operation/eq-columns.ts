import * as sd from "type-mapping";
import {ITable} from "../../table";
import * as exprLib from "../../../expr-library";
import {ColumnRefUtil} from "../../../column-ref";
import {ColumnUtil} from "../../../column";
import {Expr} from "../../../expr";
import {Row} from "../../../row";

export function eqColumns<
    TableT extends ITable
> (
    table : TableT,
    columns : Partial<Row<TableT>>
) : (
    Expr<{
        usedRef : ColumnRefUtil.FromColumnArray<
            ColumnUtil.FromColumnMap<TableT["columns"]>[]
        >,
        assertDelegate : sd.SafeMapper<boolean>
    }>
) {
    const arr = Object.keys(columns)
        .filter(columnName => (
            (columnName in table.columns) &&
            ((columns as any)[columnName] !== undefined)
        ))
        .sort()
        .map(columnName => exprLib.nullSafeEq(
            table.columns[columnName],
            (columns as any)[columnName]
        ));
    const condition = exprLib.and(...(arr as any));
    return condition;
}