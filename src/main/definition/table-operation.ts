import * as d from "../declaration";

export function tableToReference<TableT extends d.AnyAliasedTable> (
    table : TableT
) : d.TableToReference<TableT> {
    const columns : d.TableToReference<TableT>[TableT["alias"]] = {} as any;
    for (let name in table.columns) {
        if (table.columns.hasOwnProperty(name)) {
            columns[name] = table.columns[name];
        }
    }
    //Some day, we will have REAL string-literal types.
    //For now, the best we have is `TypeT extends string`,
    //Which has a lot of drawbacks...
    const result : d.TableToReference<TableT> = {
        [table.alias] : columns
    } as any;
    return result;
}
