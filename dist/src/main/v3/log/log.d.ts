import { ITable } from "../table";
import { SortDirection } from "../order";
import { IConnection } from "../execution";
import { IColumn } from "../column";
import { IJoinDeclaration } from "../join-declaration";
import { TypeMapUtil } from "../type-map";
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
    latestQuery(this: Extract<this, LogNoTrackedDefaults>, entityIdentifier: EntityIdentifier<Extract<this, LogNoTrackedDefaults>>): LogUtil.LatestQuery<Extract<this, LogNoTrackedDefaults>>;
    fetchLatestOrUndefined(this: Extract<this, LogNoTrackedDefaults>, entityIdentifier: EntityIdentifier<Extract<this, LogNoTrackedDefaults>>, connection: IConnection): Promise<TypeMapUtil.FromTable<Extract<this, LogNoTrackedDefaults>["table"]> | undefined>;
}
//# sourceMappingURL=log.d.ts.map