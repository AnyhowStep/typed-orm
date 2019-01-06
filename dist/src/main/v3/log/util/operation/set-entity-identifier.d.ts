import { ILog, Log } from "../../log";
import { ITable } from "../../../table";
import { NonEmptyTuple } from "../../../tuple";
import { ColumnUtil } from "../../../column";
import { JoinDeclaration } from "../../../join-declaration";
import { CandidateKeyArrayUtil } from "../../../candidate-key-array";
export declare type LogMustSetEntityIdentifier = (ILog<{
    readonly table: ITable;
    readonly entity: ITable;
    readonly entityIdentifier: undefined;
    readonly joinDeclaration: undefined;
    readonly latestOrder: undefined;
    readonly tracked: undefined;
    readonly doNotCopy: undefined;
    readonly copy: string[];
    readonly copyDefaultsDelegate: undefined;
    readonly trackedDefaults: undefined;
}>);
export declare type SetEntityIdentifierDelegate<LogT extends LogMustSetEntityIdentifier> = ((columns: Pick<LogT["table"]["columns"], LogT["copy"][number]>) => NonEmptyTuple<ColumnUtil.FromColumnMap<Pick<LogT["table"]["columns"], LogT["copy"][number]>>>);
export declare type SetEntityIdentifier<LogT extends LogMustSetEntityIdentifier, DelegateT extends SetEntityIdentifierDelegate<LogT>> = (Log<{
    readonly table: LogT["table"];
    readonly entity: LogT["entity"];
    readonly entityIdentifier: ReturnType<DelegateT>[number]["name"][];
    readonly joinDeclaration: JoinDeclaration<{
        fromTable: LogT["table"];
        toTable: LogT["entity"];
        nullable: false;
    }>;
    readonly latestOrder: undefined;
    readonly tracked: undefined;
    readonly doNotCopy: undefined;
    readonly copy: Exclude<LogT["copy"][number], ReturnType<DelegateT>[number]["name"]>[];
    readonly copyDefaultsDelegate: undefined;
    readonly trackedDefaults: undefined;
}>);
export declare type AssertValidSetEntityIdentifierDelegate_Hack<LogT extends LogMustSetEntityIdentifier, DelegateT extends SetEntityIdentifierDelegate<LogT>, ResultT> = (CandidateKeyArrayUtil.HasKey<LogT["entity"]["candidateKeys"], (ReturnType<DelegateT>[number]["name"])[]> extends true ? ResultT : [(ReturnType<DelegateT>[number]["name"])[], "must be a candidate key of", LogT["entity"]["alias"]] | void);
export declare function setEntityIdentifier<LogT extends LogMustSetEntityIdentifier, DelegateT extends SetEntityIdentifierDelegate<LogT>>(log: LogT, delegate: DelegateT): (AssertValidSetEntityIdentifierDelegate_Hack<LogT, DelegateT, SetEntityIdentifier<LogT, DelegateT>>);
//# sourceMappingURL=set-entity-identifier.d.ts.map