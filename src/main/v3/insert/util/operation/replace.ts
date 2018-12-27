import {IInsert, Insert, InsertModifier} from "../../insert";

export type Replace<InsertT extends IInsert> = (
    Insert<{
        _table : InsertT["_table"],
        _values : InsertT["_values"],
        _modifier : InsertModifier.REPLACE,
    }>
);
export function replace<InsertT extends IInsert> (
    insert : InsertT
) : Replace<InsertT> {
    const {
        _table,
        _values,
    } = insert;
    return new Insert({
        _table,
        _values,
        _modifier : InsertModifier.REPLACE,
    });
}