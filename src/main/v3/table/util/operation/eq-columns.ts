import * as sd from "schema-decorator";
import {ITable} from "../../table";
import * as exprLib from "../../../expr-library";
import {ColumnRefUtil} from "../../../column-ref";
import {ColumnUtil} from "../../../column";
import {Expr} from "../../../expr";
import { TypeMapUtil } from "../../../type-map";

export function eqColumns<
    TableT extends ITable
> (
    table : TableT,
    columns : Partial<TypeMapUtil.FromTable<TableT>>
) : (
    Expr<{
        usedRef : ColumnRefUtil.FromColumnArray<
            ColumnUtil.FromColumnMap<TableT["columns"]>[]
        >,
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