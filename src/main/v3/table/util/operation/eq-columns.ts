import * as sd from "schema-decorator";
import {ITable} from "../../table";
import * as exprLib from "../../../expr-library";
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
        usedColumns : ColumnUtil.FromColumnMap<TableT["columns"]>[],
        assertDelegate : sd.AssertDelegate<boolean>
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