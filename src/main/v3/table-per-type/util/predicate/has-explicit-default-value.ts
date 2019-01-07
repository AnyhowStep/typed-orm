import {ITable, TableUtil} from "../../../table";
import {parentsHaveColumnName, ParentsHaveColumnName} from "./parents-have-column-name";
import {ParentAliases, FindParent} from "../query";

//All parents must have it as explicit default value.
//If the column does not exist with the parents,
//then the table must have it as explicit default value.
export type HasExplicitDefaultValue<TableT extends ITable, NameT extends string> = (
    ParentsHaveColumnName<TableT, NameT> extends true ?
    (
        {
            [tableAlias in ParentAliases<TableT>] : (
                NameT extends keyof FindParent<TableT, tableAlias>["columns"] ?
                (
                    NameT extends FindParent<TableT, tableAlias>["hasExplicitDefaultValue"][number] ?
                    true :
                    false
                ) :
                never
            )
        }[ParentAliases<TableT>] extends true ?
        true :
        false
    ) :
    TableUtil.HasExplicitDefaultValue<TableT, NameT>
    /*TableUtil.HasExplicitDefaultValue<TableT["parents"][number], NameT> extends never ?
    (
        TableUtil.HasExplicitDefaultValue<TableT, NameT>
    ) :
    TableUtil.HasExplicitDefaultValue<TableT["parents"][number], NameT> extends true ?
    true :
    false*/
);
export function hasExplicitDefaultValue<TableT extends ITable, NameT extends string> (
    table : TableT,
    name : NameT
) : HasExplicitDefaultValue<TableT, NameT> {
    if (parentsHaveColumnName(table, name)) {
        for (let p of table.parents) {
            if (
                (name in p.columns) &&
                p.hasExplicitDefaultValue.indexOf(name) < 0
            ) {
                return false as HasExplicitDefaultValue<TableT, NameT>;
            }
        }
        return true as HasExplicitDefaultValue<TableT, NameT>;
    } else {
        return (
            table.hasExplicitDefaultValue.indexOf(name) >= 0
        ) as HasExplicitDefaultValue<TableT, NameT>;
    }
}