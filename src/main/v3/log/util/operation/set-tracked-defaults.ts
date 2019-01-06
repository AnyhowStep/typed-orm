import {ILog, Log} from "../../log";
import {ITable} from "../../../table";
import {IColumn} from "../../../column";
import {SortDirection} from "../../../order";
import {IConnection} from "../../../execution";
import {IJoinDeclaration} from "../../../join-declaration";

export type LogMustSetTrackedDefaults = (
    ILog<{
        readonly table : ITable;
        readonly entity : ITable;
        readonly entityIdentifier : string[];
        readonly joinDeclaration : IJoinDeclaration<{
            //From `table`
            readonly fromTable : ITable,
            //To `entity`
            readonly toTable : ITable,
            readonly nullable : false,
        }>;
        readonly latestOrder : [IColumn, SortDirection];
        readonly tracked : string[];
        readonly doNotCopy : string[];
        readonly copy : string[];
        readonly copyDefaultsDelegate : (
            args : {
                entityIdentifier : any,
                connection : IConnection,
            }
        ) => Promise<{}>;
        readonly trackedDefaults : undefined;
    }>
);
export type TrackedDefaultsMap<
    LogT extends LogMustSetTrackedDefaults
> = (
    {
        readonly [columnName in (
            LogT["tracked"][number]
        )] : (
            ReturnType<LogT["table"]["columns"][columnName]["assertDelegate"]>
        )
    }
);
export type SetTrackedDefaults<
    LogT extends LogMustSetTrackedDefaults,
    MapT extends TrackedDefaultsMap<LogT>
> = (
    Log<{
        readonly table : LogT["table"];
        readonly entity : LogT["entity"];
        readonly entityIdentifier : LogT["entityIdentifier"];
        readonly joinDeclaration : LogT["joinDeclaration"];
        readonly latestOrder : LogT["latestOrder"];
        readonly tracked : LogT["tracked"];
        readonly doNotCopy : LogT["doNotCopy"];
        readonly copy : LogT["copy"];
        readonly copyDefaultsDelegate : LogT["copyDefaultsDelegate"];
        readonly trackedDefaults : {
            readonly [columnName in LogT["tracked"][number]] : (
                MapT[columnName]
            )
        };
    }>
);
export function setTrackedDefaults<
    LogT extends LogMustSetTrackedDefaults,
    MapT extends TrackedDefaultsMap<LogT>
> (
    log : LogT,
    rawMap : MapT
) : (
    SetTrackedDefaults<
        LogT,
        MapT
    >
) {
    const trackedDefaults : any = {};
    for (let columnName of log.tracked) {
        const value = log.table.columns[columnName].assertDelegate(
            `${log.table.alias}.${columnName}`,
            (rawMap as any)[columnName]
        );
        trackedDefaults[columnName] = value;
    }
    const {
        table,
        entity,
        entityIdentifier,
        joinDeclaration,
        latestOrder,
        tracked,
        doNotCopy,
        copy,
        copyDefaultsDelegate,
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
    });
}
/*
import * as o from "../../../index";

const entity = o.table(
    "entity",
    {
        entityId : o.bigint(),
    }
).setAutoIncrement(c => c.entityId);

const entityBanned = o.table(
    "entityBanned",
    {
        entityId : o.bigint(),
        updatedAt : o.dateTime(),
        banned : o.boolean(),
    }
).addCandidateKey(
    c => [c.entityId, c.updatedAt]
).addHasExplicitDefaultValue(
    c => [c.updatedAt]
);
const test = o.log(entityBanned)
    .setEntityIdentifier(c => [c.entityId])
    .setLatestOrder(c => c.updatedAt.desc())
    .setTracked(c => [c.banned])
    .setDoNotCopy(() => []);
declare const wtf : {
    readonly [columnName in {
        [columnName in Extract<keyof { banned : true }, string>] : (
            undefined extends { banned : true }[columnName] ?
            never :
            columnName
        )
    }[Extract<keyof { banned : true }, string>]] : (
        { banned : true }[columnName]
    )
};
const entityBannedLog = o.log(entityBanned)
    .setEntityIdentifier(c => [c.entityId])
    .setLatestOrder(c => c.updatedAt.desc())
    .setTracked(c => [c.banned])
    .setDoNotCopy(() => [])
    .setTrackedDefaults<{banned:true}>({
        banned : true,
    })
    .staticDefaultValue;
declare const t: undefined extends true ? "y" : "n";*/