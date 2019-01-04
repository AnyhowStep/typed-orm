import { ILog, Log } from "../../log";
import { ITable } from "../../../table";
import { NonEmptyTuple } from "../../../tuple";
import { ColumnUtil, IColumn } from "../../../column";
import { SortDirection } from "../../../order";
export declare type LogMustSetTracked = (ILog<{
    readonly table: ITable;
    readonly entityIdentifier: string[];
    readonly latestOrder: [IColumn, SortDirection];
    readonly tracked: undefined;
    readonly doNotCopy: undefined;
    readonly copy: string[];
    readonly staticDefaultValue: undefined;
    readonly dynamicDefaultValueDelegate: undefined;
}>);
export declare type SetTrackedDelegate<LogT extends LogMustSetTracked> = ((columns: Pick<LogT["table"]["columns"], LogT["copy"][number]>) => NonEmptyTuple<ColumnUtil.FromColumnMap<Pick<LogT["table"]["columns"], LogT["copy"][number]>>>);
export declare type SetTracked<LogT extends LogMustSetTracked, DelegateT extends SetTrackedDelegate<LogT>> = (Log<{
    readonly table: LogT["table"];
    readonly entityIdentifier: LogT["entityIdentifier"];
    readonly latestOrder: LogT["latestOrder"];
    readonly tracked: ReturnType<DelegateT>[number]["name"][];
    readonly doNotCopy: undefined;
    readonly copy: Exclude<LogT["copy"][number], ReturnType<DelegateT>[number]["name"]>[];
    readonly staticDefaultValue: undefined;
    readonly dynamicDefaultValueDelegate: undefined;
}>);
export declare function setTracked<LogT extends LogMustSetTracked, DelegateT extends SetTrackedDelegate<LogT>>(log: LogT, delegate: DelegateT): (SetTracked<LogT, DelegateT>);
//# sourceMappingURL=set-tracked.d.ts.map