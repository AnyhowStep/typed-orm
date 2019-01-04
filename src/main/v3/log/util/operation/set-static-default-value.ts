import {ILog, Log} from "../../log";
import {ITable} from "../../../table";
import {IColumn} from "../../../column";
import {SortDirection} from "../../../order";

export type LogMustSetStaticDefaultValue = (
    ILog<{
        readonly table : ITable;
        readonly entityIdentifier : string[];
        readonly latestOrder : [IColumn, SortDirection];
        readonly tracked : string[];
        readonly doNotCopy : string[];
        readonly copy : string[];
        readonly staticDefaultValue : undefined;
        readonly dynamicDefaultValueDelegate : undefined;
    }>
);
export type StaticDefaultValueMap<
    LogT extends LogMustSetStaticDefaultValue
> = (
    {
        readonly [columnName in (
            LogT["tracked"][number] |
            LogT["copy"][number]
        )]? : (
            ReturnType<LogT["table"]["columns"][columnName]["assertDelegate"]>
        )
    }
);
export type SetStaticDefaultValue<
    LogT extends LogMustSetStaticDefaultValue,
    MapT extends StaticDefaultValueMap<LogT>
> = (
    Log<{
        readonly table : LogT["table"];
        readonly entityIdentifier : LogT["entityIdentifier"];
        readonly latestOrder : LogT["latestOrder"];
        readonly tracked : LogT["tracked"];
        readonly doNotCopy : LogT["doNotCopy"];
        readonly copy : LogT["copy"];
        readonly staticDefaultValue : {
            readonly [columnName in {
                [columnName in Extract<keyof MapT, string>] : (
                    undefined extends MapT[columnName] ?
                    never :
                    columnName
                )
            }[Extract<keyof MapT, string>]] : (
                MapT[columnName]
            )
        };
        readonly dynamicDefaultValueDelegate : undefined;
    }>
);
export function setStaticDefaultValue<
    LogT extends LogMustSetStaticDefaultValue,
    MapT extends StaticDefaultValueMap<LogT>
> (
    log : LogT,
    rawMap : MapT
) : (
    SetStaticDefaultValue<
        LogT,
        MapT
    >
) {
    const staticDefaultValue : any = {};
    for (let columnName of [
        ...log.tracked,
        ...log.copy,
    ]) {
        const rawValue = (rawMap as any)[columnName];
        if (rawValue === undefined) {
            continue;
        }
        const value = log.table.columns[columnName].assertDelegate(
            `${log.table.alias}.${columnName}`,
            rawValue
        );
        staticDefaultValue[columnName] = value;
    }
    const {
        table,
        entityIdentifier,
        latestOrder,
        tracked,
        doNotCopy,
        copy,
        dynamicDefaultValueDelegate,
    } = log;
    return new Log({
        table,
        entityIdentifier,
        latestOrder,
        tracked,
        doNotCopy,
        copy,
        staticDefaultValue,
        dynamicDefaultValueDelegate,
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
    .setStaticDefaultValue<{banned:true}>({
        banned : true,
    })
    .staticDefaultValue;
declare const t: undefined extends true ? "y" : "n";*/