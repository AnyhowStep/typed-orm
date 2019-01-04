import { ILog, Log } from "../../log";
import { ITable } from "../../../table";
import { ColumnUtil, IColumn } from "../../../column";
import { SortDirection } from "../../../order";
export declare type LogMustSetDoNotCopy = (ILog<{
    readonly table: ITable;
    readonly entityIdentifier: string[];
    readonly latestOrder: [IColumn, SortDirection];
    readonly tracked: string[];
    readonly doNotCopy: undefined;
    readonly copy: string[];
    readonly staticDefaultValue: undefined;
    readonly dynamicDefaultValueDelegate: undefined;
}>);
export declare type SetDoNotCopyDelegate<LogT extends LogMustSetDoNotCopy> = ((columns: Pick<LogT["table"]["columns"], LogT["copy"][number]>) => ColumnUtil.FromColumnMap<Pick<LogT["table"]["columns"], LogT["copy"][number]>>[]);
export declare type SetDoNotCopy<LogT extends LogMustSetDoNotCopy, DelegateT extends SetDoNotCopyDelegate<LogT>> = (Log<{
    readonly table: LogT["table"];
    readonly entityIdentifier: LogT["entityIdentifier"];
    readonly latestOrder: LogT["latestOrder"];
    readonly tracked: LogT["tracked"];
    readonly doNotCopy: ReturnType<DelegateT>[number]["name"][];
    readonly copy: Exclude<LogT["copy"][number], ReturnType<DelegateT>[number]["name"]>[];
    readonly staticDefaultValue: undefined;
    readonly dynamicDefaultValueDelegate: undefined;
}>);
export declare function setDoNotCopy<LogT extends LogMustSetDoNotCopy, DelegateT extends SetDoNotCopyDelegate<LogT>>(log: LogT, delegate: DelegateT): (SetDoNotCopy<LogT, DelegateT>);
//# sourceMappingURL=set-do-not-copy.d.ts.map