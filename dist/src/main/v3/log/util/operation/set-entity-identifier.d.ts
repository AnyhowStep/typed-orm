import { ILog, Log } from "../../log";
import { ITable } from "../../../table";
import { NonEmptyTuple } from "../../../tuple";
import { ColumnUtil } from "../../../column";
export declare type LogMustSetEntityIdentifier = (ILog<{
    readonly table: ITable;
    readonly entityIdentifier: undefined;
    readonly latestOrder: undefined;
    readonly tracked: undefined;
    readonly doNotCopy: undefined;
    readonly copy: string[];
    readonly staticDefaultValue: undefined;
    readonly dynamicDefaultValueDelegate: undefined;
}>);
export declare type SetEntityIdentifierDelegate<LogT extends LogMustSetEntityIdentifier> = ((columns: Pick<LogT["table"]["columns"], LogT["copy"][number]>) => NonEmptyTuple<ColumnUtil.FromColumnMap<Pick<LogT["table"]["columns"], LogT["copy"][number]>>>);
export declare type SetEntityIdentifier<LogT extends LogMustSetEntityIdentifier, DelegateT extends SetEntityIdentifierDelegate<LogT>> = (Log<{
    readonly table: LogT["table"];
    readonly entityIdentifier: ReturnType<DelegateT>[number]["name"][];
    readonly latestOrder: undefined;
    readonly tracked: undefined;
    readonly doNotCopy: undefined;
    readonly copy: Exclude<LogT["copy"][number], ReturnType<DelegateT>[number]["name"]>[];
    readonly staticDefaultValue: undefined;
    readonly dynamicDefaultValueDelegate: undefined;
}>);
export declare function setEntityIdentifier<LogT extends LogMustSetEntityIdentifier, DelegateT extends SetEntityIdentifierDelegate<LogT>>(log: LogT, delegate: DelegateT): (SetEntityIdentifier<LogT, DelegateT>);
//# sourceMappingURL=set-entity-identifier.d.ts.map