import { ITable, InsertableTable } from "../table";
import { SortDirection } from "../order";
import { IConnection } from "../execution";
import { IColumn } from "../column";
import { IJoinDeclaration } from "../join-declaration";
import { Row } from "../row";
import { TrackRow } from "../track-row";
import * as LogUtil from "./util";
export interface LogData {
    readonly table: ITable;
    readonly entity: ITable | undefined;
    readonly joinDeclaration: IJoinDeclaration<{
        readonly fromTable: ITable;
        readonly toTable: ITable;
        readonly nullable: false;
    }> | undefined;
    readonly entityIdentifier: string[] | undefined;
    readonly latestOrder: [IColumn, SortDirection] | undefined;
    readonly tracked: string[] | undefined;
    readonly doNotCopy: string[] | undefined;
    readonly copy: string[];
    readonly copyDefaultsDelegate: ((args: {
        entityIdentifier: any;
        connection: IConnection;
    }) => Promise<{}>) | undefined;
    readonly trackedDefaults: {
        readonly [columnName: string]: any;
    } | undefined;
}
export interface ILog<DataT extends LogData = LogData> {
    readonly table: DataT["table"];
    readonly entity: DataT["entity"];
    readonly entityIdentifier: DataT["entityIdentifier"];
    readonly joinDeclaration: DataT["joinDeclaration"];
    readonly latestOrder: DataT["latestOrder"];
    readonly tracked: DataT["tracked"];
    readonly doNotCopy: DataT["doNotCopy"];
    readonly copy: DataT["copy"];
    readonly copyDefaultsDelegate: DataT["copyDefaultsDelegate"];
    readonly trackedDefaults: DataT["trackedDefaults"];
}
export interface InsertableLog {
    readonly table: InsertableTable;
    readonly entity: ITable;
    readonly entityIdentifier: string[];
    readonly joinDeclaration: IJoinDeclaration<{
        readonly fromTable: ITable;
        readonly toTable: ITable;
        readonly nullable: false;
    }>;
    readonly latestOrder: [IColumn, SortDirection];
    readonly tracked: string[];
    readonly doNotCopy: string[];
    readonly copy: string[];
    readonly copyDefaultsDelegate: (args: {
        entityIdentifier: any;
        connection: IConnection;
    }) => Promise<{}>;
    readonly trackedDefaults: {
        readonly [columnName: string]: any;
    } | undefined;
}
export interface LogNoTrackedDefaults {
    readonly table: ITable;
    readonly entity: ITable;
    readonly entityIdentifier: string[];
    readonly joinDeclaration: IJoinDeclaration<{
        readonly fromTable: ITable;
        readonly toTable: ITable;
        readonly nullable: false;
    }>;
    readonly latestOrder: [IColumn, SortDirection];
    readonly tracked: string[];
    readonly doNotCopy: string[];
    readonly copy: string[];
    readonly copyDefaultsDelegate: (args: {
        entityIdentifier: any;
        connection: IConnection;
    }) => Promise<{}>;
    readonly trackedDefaults: {
        readonly [columnName: string]: any;
    } | undefined;
}
export interface CompletedLog {
    readonly table: ITable;
    readonly entity: ITable;
    readonly entityIdentifier: string[];
    readonly joinDeclaration: IJoinDeclaration<{
        readonly fromTable: ITable;
        readonly toTable: ITable;
        readonly nullable: false;
    }>;
    readonly latestOrder: [IColumn, SortDirection];
    readonly tracked: string[];
    readonly doNotCopy: string[];
    readonly copy: string[];
    readonly copyDefaultsDelegate: (args: {
        entityIdentifier: any;
        connection: IConnection;
    }) => Promise<{}>;
    readonly trackedDefaults: {
        readonly [columnName: string]: any;
    };
}
export declare type EntityIdentifier<LogT extends ILog & {
    entityIdentifier: string[];
}> = ({
    readonly [columnName in LogT["entityIdentifier"][number]]: (ReturnType<LogT["table"]["columns"][columnName]["assertDelegate"]>);
});
export declare type PreviousRow<LogT extends LogNoTrackedDefaults> = ({
    readonly [columnName in (LogT["entityIdentifier"][number] | LogT["tracked"][number] | LogT["copy"][number])]: ReturnType<LogT["table"]["columns"][columnName]["assertDelegate"]>;
});
export declare class Log<DataT extends LogData> implements ILog<DataT> {
    readonly table: DataT["table"];
    readonly entity: DataT["entity"];
    readonly entityIdentifier: DataT["entityIdentifier"];
    readonly joinDeclaration: DataT["joinDeclaration"];
    readonly latestOrder: DataT["latestOrder"];
    readonly tracked: DataT["tracked"];
    readonly doNotCopy: DataT["doNotCopy"];
    readonly copy: DataT["copy"];
    readonly copyDefaultsDelegate: DataT["copyDefaultsDelegate"];
    readonly trackedDefaults: DataT["trackedDefaults"];
    constructor(data: DataT);
    setEntity<EntityT extends ITable>(this: Extract<this, LogUtil.LogMustSetEntity>, entity: LogUtil.AssertValidEntity<Extract<this, LogUtil.LogMustSetEntity>, EntityT>): (LogUtil.SetEntity<Extract<this, LogUtil.LogMustSetEntity>, EntityT>);
    setEntityIdentifier<DelegateT extends LogUtil.SetEntityIdentifierDelegate<Extract<this, LogUtil.LogMustSetEntityIdentifier>>>(this: Extract<this, LogUtil.LogMustSetEntityIdentifier>, delegate: DelegateT): (LogUtil.AssertValidSetEntityIdentifierDelegate_Hack<Extract<this, LogUtil.LogMustSetEntityIdentifier>, DelegateT, LogUtil.SetEntityIdentifier<Extract<this, LogUtil.LogMustSetEntityIdentifier>, DelegateT>>);
    setLatestOrder<DelegateT extends LogUtil.SetLatestOrderDelegate<Extract<this, LogUtil.LogMustSetLatestOrder>>>(this: Extract<this, LogUtil.LogMustSetLatestOrder>, delegate: DelegateT): (LogUtil.AssertValidSetLatestOrderDelegate_Hack<Extract<this, LogUtil.LogMustSetLatestOrder>, DelegateT, LogUtil.SetLatestOrder<Extract<this, LogUtil.LogMustSetLatestOrder>, DelegateT>>);
    setTracked<DelegateT extends LogUtil.SetTrackedDelegate<Extract<this, LogUtil.LogMustSetTracked>>>(this: Extract<this, LogUtil.LogMustSetTracked>, delegate: DelegateT): (LogUtil.SetTracked<Extract<this, LogUtil.LogMustSetTracked>, DelegateT>);
    setDoNotCopy<DelegateT extends LogUtil.SetDoNotCopyDelegate<Extract<this, LogUtil.LogMustSetDoNotCopy>>>(this: Extract<this, LogUtil.LogMustSetDoNotCopy>, delegate: DelegateT): (LogUtil.SetDoNotCopy<Extract<this, LogUtil.LogMustSetDoNotCopy>, DelegateT>);
    setCopyDefaultsDelegate(this: Extract<this, LogUtil.LogMustSetCopyDefaultsDelegate>, dynamicDefaultValueDelegate: LogUtil.CopyDefaultsDelegate<Extract<this, LogUtil.LogMustSetCopyDefaultsDelegate>>): (LogUtil.SetCopyDefaultsDelegate<Extract<this, LogUtil.LogMustSetCopyDefaultsDelegate>>);
    setTrackedDefaults<MapT extends LogUtil.TrackedDefaultsMap<Extract<this, LogUtil.LogMustSetTrackedDefaults>>>(this: Extract<this, LogUtil.LogMustSetTrackedDefaults>, rawMap: MapT): (LogUtil.SetTrackedDefaults<Extract<this, LogUtil.LogMustSetTrackedDefaults>, MapT>);
    exists(this: Extract<this, LogNoTrackedDefaults>, connection: IConnection, entityIdentifier: EntityIdentifier<Extract<this, LogNoTrackedDefaults>>): Promise<boolean>;
    fetchDefault(this: Extract<this, CompletedLog>, connection: IConnection, entityIdentifier: EntityIdentifier<Extract<this, CompletedLog>>): Promise<PreviousRow<Extract<this, CompletedLog>>>;
    fetchLatestOrDefault(this: Extract<this, CompletedLog>, connection: IConnection, entityIdentifier: EntityIdentifier<Extract<this, CompletedLog>>): Promise<LogUtil.FetchLatestOrDefaultResult<Extract<this, CompletedLog>>>;
    fetchLatestOrError(this: Extract<this, LogNoTrackedDefaults>, connection: IConnection, entityIdentifier: EntityIdentifier<Extract<this, LogNoTrackedDefaults>>): Promise<Row<Extract<this, LogNoTrackedDefaults>["table"]>>;
    fetchLatestOrUndefined(this: Extract<this, LogNoTrackedDefaults>, connection: IConnection, entityIdentifier: EntityIdentifier<Extract<this, LogNoTrackedDefaults>>): Promise<Row<Extract<this, LogNoTrackedDefaults>["table"]> | undefined>;
    fetchLatestOrderOrError(this: Extract<this, LogNoTrackedDefaults>, connection: IConnection, entityIdentifier: EntityIdentifier<Extract<this, LogNoTrackedDefaults>>): Promise<ReturnType<Extract<this, LogNoTrackedDefaults>["latestOrder"][0]["assertDelegate"]>>;
    fetchLatestOrderOrUndefined(this: Extract<this, LogNoTrackedDefaults>, connection: IConnection, entityIdentifier: EntityIdentifier<Extract<this, LogNoTrackedDefaults>>): Promise<ReturnType<Extract<this, LogNoTrackedDefaults>["latestOrder"][0]["assertDelegate"]> | undefined>;
    fetchLatestValueOrDefault<DelegateT extends LogUtil.LatestValueDelegate<Extract<this, CompletedLog>>>(this: Extract<this, CompletedLog>, connection: IConnection, entityIdentifier: EntityIdentifier<Extract<this, CompletedLog>>, delegate: DelegateT): Promise<ReturnType<Extract<this, CompletedLog>["table"]["columns"][ReturnType<DelegateT>["name"]]["assertDelegate"]>>;
    fetchLatestValueOrError<DelegateT extends LogUtil.LatestValueDelegate<Extract<this, LogNoTrackedDefaults>>>(this: Extract<this, LogNoTrackedDefaults>, connection: IConnection, entityIdentifier: EntityIdentifier<Extract<this, LogNoTrackedDefaults>>, delegate: DelegateT): Promise<ReturnType<Extract<this, LogNoTrackedDefaults>["table"]["columns"][ReturnType<DelegateT>["name"]]["assertDelegate"]>>;
    fetchLatestValueOrUndefined<DelegateT extends LogUtil.LatestValueDelegate<Extract<this, LogNoTrackedDefaults>>>(this: Extract<this, LogNoTrackedDefaults>, connection: IConnection, entityIdentifier: EntityIdentifier<Extract<this, LogNoTrackedDefaults>>, delegate: DelegateT): Promise<ReturnType<Extract<this, LogNoTrackedDefaults>["table"]["columns"][ReturnType<DelegateT>["name"]]["assertDelegate"]> | undefined>;
    existsOfEntity(this: Extract<this, LogNoTrackedDefaults>): (LogUtil.ExistsOfEntity<Extract<this, LogNoTrackedDefaults>>);
    latestOfEntity(this: Extract<this, LogNoTrackedDefaults>): (LogUtil.LatestOfEntity<Extract<this, LogNoTrackedDefaults>>);
    latestOrderOfEntityOrNull(this: Extract<this, LogNoTrackedDefaults>): (LogUtil.LatestOrderOfEntityOrNull<Extract<this, LogNoTrackedDefaults>>);
    latestValueOfEntityOrNull<DelegateT extends LogUtil.LatestValueDelegate<Extract<this, LogNoTrackedDefaults>>>(this: Extract<this, LogNoTrackedDefaults>, delegate: DelegateT): (LogUtil.LatestValueOfEntityOrNull<Extract<this, LogNoTrackedDefaults>, DelegateT>);
    latestValueOfEntity<DelegateT extends LogUtil.LatestValueDelegate<Extract<this, CompletedLog>>>(this: Extract<this, CompletedLog>, delegate: DelegateT): (LogUtil.LatestValueOfEntity<Extract<this, CompletedLog>, DelegateT>);
    trackOrError(this: Extract<this, LogNoTrackedDefaults & InsertableLog>, connection: IConnection, entityIdentifier: EntityIdentifier<Extract<this, LogNoTrackedDefaults & InsertableLog>>, trackRow: TrackRow<Extract<this, LogNoTrackedDefaults & InsertableLog>>): (Promise<LogUtil.TrackResult<Extract<this, LogNoTrackedDefaults & InsertableLog>>>);
    track(this: Extract<this, CompletedLog & InsertableLog>, connection: IConnection, entityIdentifier: EntityIdentifier<Extract<this, CompletedLog & InsertableLog>>, trackRow: TrackRow<Extract<this, CompletedLog & InsertableLog>>): (Promise<LogUtil.TrackResult<Extract<this, CompletedLog & InsertableLog>>>);
    latest(this: Extract<this, LogNoTrackedDefaults>, entityIdentifier: EntityIdentifier<Extract<this, LogNoTrackedDefaults>>): (LogUtil.Latest<Extract<this, LogNoTrackedDefaults>>);
}
//# sourceMappingURL=log.d.ts.map