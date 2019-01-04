import { ILog, Log } from "../../log";
import { ITable } from "../../../table";
import { IColumn } from "../../../column";
import { SortDirection } from "../../../order";
export declare type LogMustSetStaticDefaultValue = (ILog<{
    readonly table: ITable;
    readonly entityIdentifier: string[];
    readonly latestOrder: [IColumn, SortDirection];
    readonly tracked: string[];
    readonly doNotCopy: string[];
    readonly copy: string[];
    readonly staticDefaultValue: undefined;
    readonly dynamicDefaultValueDelegate: undefined;
}>);
export declare type StaticDefaultValueMap<LogT extends LogMustSetStaticDefaultValue> = ({
    readonly [columnName in (LogT["tracked"][number] | LogT["copy"][number])]?: (ReturnType<LogT["table"]["columns"][columnName]["assertDelegate"]>);
});
export declare type SetStaticDefaultValue<LogT extends LogMustSetStaticDefaultValue, MapT extends StaticDefaultValueMap<LogT>> = (Log<{
    readonly table: LogT["table"];
    readonly entityIdentifier: LogT["entityIdentifier"];
    readonly latestOrder: LogT["latestOrder"];
    readonly tracked: LogT["tracked"];
    readonly doNotCopy: LogT["doNotCopy"];
    readonly copy: LogT["copy"];
    readonly staticDefaultValue: {
        readonly [columnName in {
            [columnName in Extract<keyof MapT, string>]: (undefined extends MapT[columnName] ? never : columnName);
        }[Extract<keyof MapT, string>]]: (MapT[columnName]);
    };
    readonly dynamicDefaultValueDelegate: undefined;
}>);
export declare function setStaticDefaultValue<LogT extends LogMustSetStaticDefaultValue, MapT extends StaticDefaultValueMap<LogT>>(log: LogT, rawMap: MapT): (SetStaticDefaultValue<LogT, MapT>);
//# sourceMappingURL=set-static-default-value.d.ts.map