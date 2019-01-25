import { ILog, Log, EntityIdentifier } from "../../log";
import { ITable } from "../../../table";
import { ColumnUtil, IColumn } from "../../../column";
import { SortDirection } from "../../../order";
import { IJoinDeclaration } from "../../../join-declaration";
import { IConnection } from "../../../execution";
export declare type LogMustSetDoNotCopy = (ILog<{
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
    readonly doNotCopy: undefined;
    readonly copy: string[];
    readonly copyDefaultsDelegate: undefined;
    readonly trackedDefaults: undefined;
}>);
export declare type SetDoNotCopyDelegate<LogT extends LogMustSetDoNotCopy> = ((columns: Pick<LogT["table"]["columns"], LogT["copy"][number]>) => ColumnUtil.FromColumnMap<Pick<LogT["table"]["columns"], LogT["copy"][number]>>[]);
export declare type SetDoNotCopy<LogT extends LogMustSetDoNotCopy, DelegateT extends SetDoNotCopyDelegate<LogT>> = (Log<{
    readonly table: LogT["table"];
    readonly entity: LogT["entity"];
    readonly entityIdentifier: LogT["entityIdentifier"];
    readonly joinDeclaration: LogT["joinDeclaration"];
    readonly latestOrder: LogT["latestOrder"];
    readonly tracked: LogT["tracked"];
    readonly doNotCopy: ReturnType<DelegateT>[number]["name"][];
    readonly copy: Exclude<LogT["copy"][number], ReturnType<DelegateT>[number]["name"]>[];
    readonly copyDefaultsDelegate: (Exclude<LogT["copy"][number], ReturnType<DelegateT>[number]["name"]> extends never ? (args: {
        entityIdentifier: EntityIdentifier<LogT>;
        connection: IConnection;
    }) => Promise<{}> : undefined);
    readonly trackedDefaults: undefined;
}>);
export declare function setDoNotCopy<LogT extends LogMustSetDoNotCopy, DelegateT extends SetDoNotCopyDelegate<LogT>>(log: LogT, delegate: DelegateT): (SetDoNotCopy<LogT, DelegateT>);
