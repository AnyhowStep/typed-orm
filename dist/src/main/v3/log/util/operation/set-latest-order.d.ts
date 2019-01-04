import { ILog, Log } from "../../log";
import { ITable } from "../../../table";
import { ColumnUtil } from "../../../column";
import { SortDirection } from "../../../order";
import { Omit } from "../../../type";
import { CandidateKeyArrayUtil } from "../../../candidate-key-array";
export declare type LogMustSetLatestOrder = (ILog<{
    readonly table: ITable;
    readonly entityIdentifier: string[];
    readonly latestOrder: undefined;
    readonly tracked: undefined;
    readonly doNotCopy: undefined;
    readonly copy: string[];
    readonly staticDefaultValue: undefined;
    readonly dynamicDefaultValueDelegate: undefined;
}>);
export declare type SetLatestOrderDelegate<LogT extends LogMustSetLatestOrder> = ((columns: Omit<LogT["table"]["columns"], LogT["entityIdentifier"][number]>) => [ColumnUtil.FromColumnMap<Omit<LogT["table"]["columns"], LogT["entityIdentifier"][number]>>, SortDirection]);
export declare type AssertValidSetOrderDelegateImpl<LogT extends LogMustSetLatestOrder, DelegateT extends SetLatestOrderDelegate<LogT>> = (CandidateKeyArrayUtil.HasKey<LogT["table"]["candidateKeys"], (LogT["entityIdentifier"][number] | ReturnType<DelegateT>[0]["name"])[]> extends true ? unknown : [(LogT["entityIdentifier"][number] | ReturnType<DelegateT>[0]["name"])[], "must be a candidate key of", LogT["table"]["alias"]]);
export declare type AssertValidSetOrderDelegate_Hack<LogT extends LogMustSetLatestOrder, DelegateT extends SetLatestOrderDelegate<LogT>, ResultT> = (CandidateKeyArrayUtil.HasKey<LogT["table"]["candidateKeys"], (LogT["entityIdentifier"][number] | ReturnType<DelegateT>[0]["name"])[]> extends true ? ResultT : [(LogT["entityIdentifier"][number] | ReturnType<DelegateT>[0]["name"])[], "must be a candidate key of", LogT["table"]["alias"]]);
export declare type SetLatestOrder<LogT extends LogMustSetLatestOrder, DelegateT extends SetLatestOrderDelegate<LogT>> = (Log<{
    readonly table: LogT["table"];
    readonly entityIdentifier: LogT["entityIdentifier"];
    readonly latestOrder: ReturnType<DelegateT>;
    readonly tracked: undefined;
    readonly doNotCopy: undefined;
    readonly copy: Exclude<LogT["copy"][number], ReturnType<DelegateT>[0]["name"]>[];
    readonly staticDefaultValue: undefined;
    readonly dynamicDefaultValueDelegate: undefined;
}>);
export declare function setLatestOrder<LogT extends LogMustSetLatestOrder, DelegateT extends SetLatestOrderDelegate<LogT>>(log: LogT, delegate: DelegateT): (AssertValidSetOrderDelegate_Hack<LogT, DelegateT, SetLatestOrder<LogT, DelegateT>>);
//# sourceMappingURL=set-latest-order.d.ts.map