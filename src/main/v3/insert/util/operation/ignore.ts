import {IInsert, Insert, InsertModifier} from "../../insert";

export type Ignore<InsertT extends IInsert> = (
    Insert<{
        _table : InsertT["_table"],
        _values : InsertT["_values"],
        _modifier : InsertModifier.IGNORE,
    }>
);
export function ignore<InsertT extends IInsert> (
    insert : InsertT
) : Ignore<InsertT> {
    const {
        _table,
        _values,
    } = insert;
    return new Insert({
        _table,
        _values,
        _modifier : InsertModifier.IGNORE,
    });
}