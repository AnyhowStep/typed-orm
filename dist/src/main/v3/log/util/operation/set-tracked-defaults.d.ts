import { ILog, Log } from "../../log";
import { ITable } from "../../../table";
import { IColumn } from "../../../column";
import { SortDirection } from "../../../order";
import { IConnection } from "../../../execution";
import { IJoinDeclaration } from "../../../join-declaration";
export declare type LogMustSetTrackedDefaults = (ILog<{
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
    readonly trackedDefaults: undefined;
}>);
export declare type TrackedDefaultsMap<LogT extends LogMustSetTrackedDefaults> = ({
    readonly [columnName in (LogT["tracked"][number])]: (ReturnType<LogT["table"]["columns"][columnName]["assertDelegate"]>);
});
export declare type SetTrackedDefaults<LogT extends LogMustSetTrackedDefaults, MapT extends TrackedDefaultsMap<LogT>> = (Log<{
    readonly table: LogT["table"];
    readonly entity: LogT["entity"];
    readonly entityIdentifier: LogT["entityIdentifier"];
    readonly joinDeclaration: LogT["joinDeclaration"];
    readonly latestOrder: LogT["latestOrder"];
    readonly tracked: LogT["tracked"];
    readonly doNotCopy: LogT["doNotCopy"];
    readonly copy: LogT["copy"];
    readonly copyDefaultsDelegate: LogT["copyDefaultsDelegate"];
    readonly trackedDefaults: {
        readonly [columnName in LogT["tracked"][number]]: (MapT[columnName]);
    };
}>);
export declare function setTrackedDefaults<LogT extends LogMustSetTrackedDefaults, MapT extends TrackedDefaultsMap<LogT>>(log: LogT, rawMap: MapT): (SetTrackedDefaults<LogT, MapT>);
//# sourceMappingURL=set-tracked-defaults.d.ts.map