import {IInsert, Insert, InsertRow} from "../../insert";

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