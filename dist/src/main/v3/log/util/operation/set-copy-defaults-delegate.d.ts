import { ILog, Log, EntityIdentifier } from "../../log";
import { ITable, TableUtil } from "../../../table";
import { IColumn } from "../../../column";
import { SortDirection } from "../../../order";
import { IConnection } from "../../../execution";
import { IJoinDeclaration } from "../../../join-declaration";
export declare type LogMustSetCopyDefaultsDelegate = (ILog<{
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
    readonly copyDefaultsDelegate: undefined;
    readonly trackedDefaults: undefined;
}>);
export declare type CopyDefaultsDelegate<LogT extends LogMustSetCopyDefaultsDelegate> = ((args: {
    entityIdentifier: EntityIdentifier<LogT>;
    connection: IConnection;
}) => Promise<({
    readonly [columnName in Extract<TableUtil.RequiredColumnNames<LogT["table"]>, LogT["copy"][number]>]: (ReturnType<LogT["table"]["columns"][columnName]["assertDelegate"]>);
} & {
    readonly [columnName in Extract<TableUtil.OptionalColumnNames<LogT["table"]>, LogT["copy"][number]>]?: (ReturnType<LogT["table"]["columns"][columnName]["assertDelegate"]>);
})>);
export declare type SetCopyDefaultsDelegate<LogT extends LogMustSetCopyDefaultsDelegate> = (Log<{
    readonly table: LogT["table"];
    readonly entity: LogT["entity"];
    readonly entityIdentifier: LogT["entityIdentifier"];
    readonly joinDeclaration: LogT["joinDeclaration"];
    readonly latestOrder: LogT["latestOrder"];
    readonly tracked: LogT["tracked"];
    readonly doNotCopy: LogT["doNotCopy"];
    readonly copy: LogT["copy"];
    readonly copyDefaultsDelegate: CopyDefaultsDelegate<LogT>;
    readonly trackedDefaults: undefined;
}>);
export declare function setCopyDefaultsDelegate<LogT extends LogMustSetCopyDefaultsDelegate>(log: LogT, rawCopyDefaultsDelegate: CopyDefaultsDelegate<LogT>): (SetCopyDefaultsDelegate<LogT>);
//# sourceMappingURL=set-copy-defaults-delegate.d.ts.map