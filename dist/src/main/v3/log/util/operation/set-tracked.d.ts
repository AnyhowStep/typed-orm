import { ILog, Log } from "../../log";
import { ITable } from "../../../table";
import { NonEmptyTuple } from "../../../tuple";
import { ColumnUtil, IColumn } from "../../../column";
import { SortDirection } from "../../../order";
import { IJoinDeclaration } from "../../../join-declaration";
export declare type LogMustSetTracked = (ILog<{
    readonly table: ITable;
    readonly entity: ITable;
    readonly entityIdentifier: string[];
    readonly joinDeclaration: IJoinDeclaration<{
        readonly fromTable: ITable;
        readonly toTable: ITable;
        readonly nullable: false;
    }>;
    readonly latestOrder: [IColumn, SortDirection];
    readonly tracked: undefined;
    readonly doNotCopy: undefined;
    readonly copy: string[];
    readonly copyDefaultsDelegate: undefined;
    readonly trackedDefaults: undefined;
}>);
export declare type SetTrackedDelegate<LogT extends LogMustSetTracked> = ((columns: Pick<LogT["table"]["columns"], LogT["copy"][number]>) => NonEmptyTuple<ColumnUtil.FromColumnMap<Pick<LogT["table"]["columns"], LogT["copy"][number]>>>);
export declare type SetTracked<LogT extends LogMustSetTracked, DelegateT extends SetTrackedDelegate<LogT>> = (Log<{
    readonly table: LogT["table"];
    readonly entity: LogT["entity"];
    readonly entityIdentifier: LogT["entityIdentifier"];
    readonly joinDeclaration: LogT["joinDeclaration"];
    readonly latestOrder: LogT["latestOrder"];
    readonly tracked: ReturnType<DelegateT>[number]["name"][];
    readonly doNotCopy: undefined;
    readonly copy: Exclude<LogT["copy"][number], ReturnType<DelegateT>[number]["name"]>[];
    readonly copyDefaultsDelegate: undefined;
    readonly trackedDefaults: undefined;
}>);
export declare function setTracked<LogT extends LogMustSetTracked, DelegateT extends SetTrackedDelegate<LogT>>(log: LogT, delegate: DelegateT): (SetTracked<LogT, DelegateT>);
//# sourceMappingURL=set-tracked.d.ts.map