import {ITable} from "../../../table";
import {HasColumnName} from "./parents-have-column-name";
import {TableAliases, FindTable} from "../query";

//All tables must have it as mutable.
export type IsMutable<TableT extends ITable, NameT extends string> = (
    HasColumnName<TableT, NameT> extends true ?
    (
        {
            [tableAlias in TableAliases<TableT>] : (
                NameT extends keyof FindTable<TableT, tableAlias>["columns"] ?
                (
                    NameT extends FindTable<TableT, tableAlias>["mutable"][number] ?
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
export function isMutable<TableT extends ITable, NameT extends string> (
    table : TableT,
    name : NameT
) : IsMutable<TableT, NameT> {
    if (
        (name in table.columns) &&
        table.mutable.indexOf(name) < 0
    ) {
        return false as IsMutable<TableT, NameT>;
    }

    for (let p of table.parents) {
        if (
            (name in p.columns) &&
            //TODO-DEBATE Consider naming it isMutable?
            //TODO-DEBATE or renaming isNullable to nullable?
            p.mutable.indexOf(name) < 0
        ) {
            return false as IsMutable<TableT, NameT>;
        }
    }
    return true as IsMutable<TableT, NameT>;
}