import {ITable} from "../../../table";
import {HasColumnName} from "./parents-have-column-name";
import {TableAliases, FindTable} from "../query";

//All tables must have it as nullable.
export type IsNullable<TableT extends ITable, NameT extends string> = (
    HasColumnName<TableT, NameT> extends true ?
    (
        {
            [tableAlias in TableAliases<TableT>] : (
                NameT extends keyof FindTable<TableT, tableAlias>["columns"] ?
                (
                    NameT extends FindTable<TableT, tableAlias>["isNullable"][number] ?
                    true :
                    false
                ) :
                never
            )
        }[TableAliases<TableT>] extends true ?
        true :
        false
    ) :
    false
);
export function isNullable<TableT extends ITable, NameT extends string> (
    table : TableT,
    name : NameT
) : IsNullable<TableT, NameT> {
    if (
        (name in table.columns) &&
        table.isNullable.indexOf(name) < 0
    ) {
        return false as IsNullable<TableT, NameT>;
    }

    for (let p of table.parents) {
        if (
            (name in p.columns) &&
            //TODO-DEBATE Consider using Set<string> instead
            //of string[] ?
            p.isNullable.indexOf(name) < 0
        ) {
            return false as IsNullable<TableT, NameT>;
        }
    }
    return true as IsNullable<TableT, NameT>;
}