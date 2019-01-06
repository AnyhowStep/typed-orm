import {Log} from "../../log";
import {ITable} from "../../../table";

export function log<TableT extends ITable> (
    table : TableT
) : (
    Log<{
        readonly table : TableT,
        readonly entity : undefined,
        readonly entityIdentifier : undefined;
        readonly joinDeclaration : undefined;
        readonly latestOrder : undefined;
        readonly tracked : undefined;
        readonly doNotCopy : undefined;
        readonly copy : Exclude<
            Extract<keyof TableT["columns"], string>,
            TableT["generated"][number]
        >[];
        readonly copyDefaultsDelegate : undefined;
        readonly trackedDefaults : undefined;
    }>
) {
    return new Log({
        table,
        entity : undefined,
        entityIdentifier : undefined,
        joinDeclaration : undefined,
        latestOrder : undefined,
        tracked : undefined,
        doNotCopy : undefined,
        copy : Object.keys(table.columns)
            .filter(
                columnName => table.generated.indexOf(columnName) < 0
            ) as any,
        copyDefaultsDelegate : undefined,
        trackedDefaults : undefined,
    });
}