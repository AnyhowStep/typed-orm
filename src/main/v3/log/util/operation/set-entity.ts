import {ILog, Log} from "../../log";
import {ITable} from "../../../table";

export type LogMustSetEntity = (
    ILog<{
        readonly table : ITable;
        readonly entity : undefined;
        readonly entityIdentifier : undefined;
        readonly joinDeclaration : undefined;
        readonly latestOrder : undefined;
        readonly tracked : undefined;
        readonly doNotCopy : undefined;
        readonly copy : string[];
        readonly copyDefaultsDelegate : undefined;
        readonly trackedDefaults : undefined;
    }>
);
export type SetEntity<
    LogT extends LogMustSetEntity,
    EntityT extends ITable
> = (
    Log<{
        readonly table : LogT["table"];
        readonly entity : EntityT;
        readonly entityIdentifier : undefined;
        readonly joinDeclaration : undefined;
        readonly latestOrder : undefined;
        readonly tracked : undefined;
        readonly doNotCopy : undefined;
        readonly copy : LogT["copy"];
        readonly copyDefaultsDelegate : undefined;
        readonly trackedDefaults : undefined;
    }>
);
export type AssertValidEntity<
    LogT extends LogMustSetEntity,
    EntityT extends ITable
> = (
    EntityT &
    (
        EntityT["alias"] extends LogT["table"]["alias"] ?
        [
            "Cannot use alias",
            LogT["table"]["alias"],
            "for entity"
        ] :
        unknown
    )
);
export function setEntity<
    LogT extends LogMustSetEntity,
    EntityT extends ITable
> (
    log : LogT,
    entity : AssertValidEntity<LogT, EntityT>
) : (
    SetEntity<
        LogT,
        EntityT
    >
) {
    if (log.table.alias == entity.alias) {
        throw new Error(`Cannot use alias ${entity.alias} for entity`);
    }
    const {
        table,
        entityIdentifier,
        joinDeclaration,
        latestOrder,
        tracked,
        doNotCopy,
        copy,
        copyDefaultsDelegate,
        trackedDefaults,
    } = log;
    return new Log({
        table,
        entity,
        entityIdentifier,
        joinDeclaration,
        latestOrder,
        tracked,
        doNotCopy,
        copy,
        copyDefaultsDelegate,
        trackedDefaults,
    }) as any;
}