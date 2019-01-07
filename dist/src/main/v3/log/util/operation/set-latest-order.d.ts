import { ILog, Log } from "../../log";
import { ITable } from "../../../table";
import { ColumnUtil } from "../../../column";
import { SortDirection } from "../../../order";
import { CandidateKeyUtil } from "../../../candidate-key";
import { IJoinDeclaration } from "../../../join-declaration";
export declare type LogMustSetLatestOrder = (ILog<{
    readonly table: ITable;
    readonly entity: ITable;
    readonly entityIdentifier: string[];
    readonly joinDeclaration: IJoinDeclaration<{
        readonly fromTable: ITable;
        readonly toTable: ITable;
        readonly nullable: false;
    }>;
    readonly latestOrder: undefined;
    readonly tracked: undefined;
    readonly doNotCopy: undefined;
    readonly copy: string[];
    readonly copyDefaultsDelegate: undefined;
    readonly trackedDefaults: undefined;
}>);
export declare type SetLatestOrderDelegate<LogT extends LogMustSetLatestOrder> = ((columns: Pick<LogT["table"]["columns"], LogT["copy"][number]>) => [ColumnUtil.FromColumnMap<Pick<LogT["table"]["columns"], LogT["copy"][number]>>, SortDirection]);
export declare type AssertValidSetOrderDelegateImpl<LogT extends LogMustSetLatestOrder, DelegateT extends SetLatestOrderDelegate<LogT>> = (CandidateKeyUtil.Array.HasKey<LogT["table"]["candidateKeys"], (LogT["entityIdentifier"][number] | ReturnType<DelegateT>[0]["name"])[]> extends true ? unknown : [(LogT["entityIdentifier"][number] | ReturnType<DelegateT>[0]["name"])[], "must be a candidate key of", LogT["table"]["alias"]]);
export declare type AssertValidSetLatestOrderDelegate_Hack<LogT extends LogMustSetLatestOrder, DelegateT extends SetLatestOrderDelegate<LogT>, ResultT> = (CandidateKeyUtil.Array.HasKey<LogT["table"]["candidateKeys"], (LogT["entityIdentifier"][number] | ReturnType<DelegateT>[0]["name"])[]> extends true ? ResultT : [(LogT["entityIdentifier"][number] | ReturnType<DelegateT>[0]["name"])[], "must be a candidate key of", LogT["table"]["alias"]] | void);
export declare type SetLatestOrder<LogT extends LogMustSetLatestOrder, DelegateT extends SetLatestOrderDelegate<LogT>> = (Log<{
    readonly table: LogT["table"];
    readonly entity: LogT["entity"];
    readonly entityIdentifier: LogT["entityIdentifier"];
    readonly joinDeclaration: LogT["joinDeclaration"];
    readonly latestOrder: ReturnType<DelegateT>;
    readonly tracked: undefined;
    readonly doNotCopy: undefined;
    readonly copy: Exclude<LogT["copy"][number], ReturnType<DelegateT>[0]["name"]>[];
    readonly copyDefaultsDelegate: undefined;
    readonly trackedDefaults: undefined;
}>);
export declare function setLatestOrder<LogT extends LogMustSetLatestOrder, DelegateT extends SetLatestOrderDelegate<LogT>>(log: LogT, delegate: DelegateT): (AssertValidSetLatestOrderDelegate_Hack<LogT, DelegateT, SetLatestOrder<LogT, DelegateT>>);
//# sourceMappingURL=set-latest-order.d.ts.map