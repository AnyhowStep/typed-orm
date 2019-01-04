import { ITable } from "../table";
import { SortDirection } from "../order";
import { IConnection } from "../execution";
import { IColumn } from "../column";
import * as LogUtil from "./util";
import { TypeMapUtil } from "../type-map";
export interface LogData {
    readonly table: ITable;
    readonly entityIdentifier: string[] | undefined;
    readonly latestOrder: [IColumn, SortDirection] | undefined;
    readonly tracked: string[] | undefined;
    readonly doNotCopy: string[] | undefined;
    readonly copy: string[];
    readonly staticDefaultValue: {
        readonly [columnName: string]: any;
    } | undefined;
    readonly dynamicDefaultValueDelegate: ((...args: any[]) => any) | undefined;
}
export interface ILog<DataT extends LogData = LogData> {
    readonly table: DataT["table"];
    readonly entityIdentifier: DataT["entityIdentifier"];
    readonly latestOrder: DataT["latestOrder"];
    readonly tracked: DataT["tracked"];
    readonly doNotCopy: DataT["doNotCopy"];
    readonly copy: DataT["copy"];
    readonly staticDefaultValue: DataT["staticDefaultValue"];
    readonly dynamicDefaultValueDelegate: DataT["dynamicDefaultValueDelegate"];
}
export interface CompletedLog {
    readonly table: ITable;
    readonly entityIdentifier: string[];
    readonly latestOrder: [IColumn, SortDirection];
    readonly tracked: string[];
    readonly doNotCopy: string[];
    readonly copy: string[];
    readonly staticDefaultValue: {
        readonly [columnName: string]: any;
    };
    readonly dynamicDefaultValueDelegate: (entityIdentifier: any, connection: IConnection) => Promise<{}>;
}
export declare type EntityIdentifier<LogT extends ILog & {
    entityIdentifier: string[];
}> = ({
    readonly [columnName in LogT["entityIdentifier"][number]]: (ReturnType<LogT["table"]["columns"][columnName]["assertDelegate"]>);
});
export declare class Log<DataT extends LogData> implements ILog<DataT> {
    readonly table: DataT["table"];
    readonly entityIdentifier: DataT["entityIdentifier"];
    readonly latestOrder: DataT["latestOrder"];
    readonly tracked: DataT["tracked"];
    readonly doNotCopy: DataT["doNotCopy"];
    readonly copy: DataT["copy"];
    readonly staticDefaultValue: DataT["staticDefaultValue"];
    readonly dynamicDefaultValueDelegate: DataT["dynamicDefaultValueDelegate"];
    constructor(data: DataT);
    setEntityIdentifier<DelegateT extends LogUtil.SetEntityIdentifierDelegate<Extract<this, LogUtil.LogMustSetEntityIdentifier>>>(this: Extract<this, LogUtil.LogMustSetEntityIdentifier>, delegate: DelegateT): (LogUtil.SetEntityIdentifier<Extract<this, LogUtil.LogMustSetEntityIdentifier>, DelegateT>);
    setLatestOrder<DelegateT extends LogUtil.SetLatestOrderDelegate<Extract<this, LogUtil.LogMustSetLatestOrder>>>(this: Extract<this, LogUtil.LogMustSetLatestOrder>, delegate: DelegateT): (LogUtil.AssertValidSetOrderDelegate_Hack<Extract<this, LogUtil.LogMustSetLatestOrder>, DelegateT, LogUtil.SetLatestOrder<Extract<this, LogUtil.LogMustSetLatestOrder>, DelegateT>>);
    setTracked<DelegateT extends LogUtil.SetTrackedDelegate<Extract<this, LogUtil.LogMustSetTracked>>>(this: Extract<this, LogUtil.LogMustSetTracked>, delegate: DelegateT): (LogUtil.SetTracked<Extract<this, LogUtil.LogMustSetTracked>, DelegateT>);
    setDoNotCopy<DelegateT extends LogUtil.SetDoNotCopyDelegate<Extract<this, LogUtil.LogMustSetDoNotCopy>>>(this: Extract<this, LogUtil.LogMustSetDoNotCopy>, delegate: DelegateT): (LogUtil.SetDoNotCopy<Extract<this, LogUtil.LogMustSetDoNotCopy>, DelegateT>);
    setStaticDefaultValue<MapT extends LogUtil.StaticDefaultValueMap<Extract<this, LogUtil.LogMustSetStaticDefaultValue>>>(this: Extract<this, LogUtil.LogMustSetStaticDefaultValue>, rawMap: MapT): (LogUtil.SetStaticDefaultValue<Extract<this, LogUtil.LogMustSetStaticDefaultValue>, MapT>);
    setDynamicDefaultValueDelegate(this: Extract<this, LogUtil.LogMustSetDynamicDefaultValueDelegate>, dynamicDefaultValueDelegate: LogUtil.DynamicDefaultValueDelegate<Extract<this, LogUtil.LogMustSetDynamicDefaultValueDelegate>>): (LogUtil.SetDynamicDefaultValueDelegate<Extract<this, LogUtil.LogMustSetDynamicDefaultValueDelegate>>);
    latestQuery(this: Extract<this, CompletedLog>, entityIdentifier: EntityIdentifier<Extract<this, CompletedLog>>): LogUtil.LatestQuery<Extract<this, CompletedLog>>;
    fetchLatestOrUndefined(this: Extract<this, CompletedLog>, entityIdentifier: EntityIdentifier<Extract<this, CompletedLog>>, connection: IConnection): Promise<TypeMapUtil.FromTable<Extract<this, CompletedLog>["table"]> | undefined>;
}
//# sourceMappingURL=log.d.ts.map