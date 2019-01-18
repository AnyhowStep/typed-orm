import {IInsert, Insert, InsertRow} from "../../insert";
import {PrimitiveExprUtil} from "../../../primitive-expr";

export type Values<InsertT extends IInsert> = (
    Insert<{
        _table : InsertT["_table"],
        _values : InsertRow<InsertT["_table"]>[],
        _modifier : InsertT["_modifier"],
    }>
);
export function values<InsertT extends IInsert> (
    insert : InsertT,
    ...values : InsertRow<InsertT["_table"]>[]
) : Values<InsertT> {
    for (let i=0; i<values.length; ++i) {
        const v = values[i];
        for (let columnName in v) {
            const column = insert._table.columns[columnName];
            if (column == undefined) {
                continue;
            }
            const rawValue = (v as any)[columnName];
            if (PrimitiveExprUtil.isPrimitiveExpr(rawValue)) {
                column.assertDelegate(
                    `${insert._table.alias}.values[${i}].${columnName}`,
                    rawValue
                );
            }
        }
    }
    const {
        _table,
        _modifier,
    } = insert;
    return new Insert({
        _table,
        _values : (insert._values == undefined) ?
            values :
            [...insert._values, ...values] as any,
        _modifier,
    });
}