import {Log} from "../../log";
import {ITable} from "../../../table";

export function log<TableT extends ITable> (
    table : TableT
) : (
    Log<{
        readonly table : TableT,
        readonly entityIdentifier : undefined;
        readonly latestOrder : undefined;
        readonly tracked : undefined;
        readonly doNotCopy : undefined;
        readonly copy : Exclude<
            Extract<keyof TableT["columns"], string>,
            TableT["generated"][number]
        >[];
        readonly staticDefaultValue : undefined;
        readonly dynamicDefaultValueDelegate : undefined;
    }>
) {
    return new Log({
        table,
        entityIdentifier : undefined,
        latestOrder : undefined,
        tracked : undefined,
        doNotCopy : undefined,
        copy : Object.keys(table.columns)
            .filter(
                columnName => table.generated.indexOf(columnName) < 0
            ) as any,
        staticDefaultValue : undefined,
        dynamicDefaultValueDelegate : undefined,
    });
}