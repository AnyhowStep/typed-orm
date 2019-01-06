import { ILog, Log } from "../../log";
import { ITable } from "../../../table";
export declare type LogMustSetEntity = (ILog<{
    readonly table: ITable;
    readonly entity: undefined;
    readonly entityIdentifier: undefined;
    readonly joinDeclaration: undefined;
    readonly latestOrder: undefined;
    readonly tracked: undefined;
    readonly doNotCopy: undefined;
    readonly copy: string[];
    readonly copyDefaultsDelegate: undefined;
    readonly trackedDefaults: undefined;
}>);
export declare type SetEntity<LogT extends LogMustSetEntity, EntityT extends ITable> = (Log<{
    readonly table: LogT["table"];
    readonly entity: EntityT;
    readonly entityIdentifier: undefined;
    readonly joinDeclaration: undefined;
    readonly latestOrder: undefined;
    readonly tracked: undefined;
    readonly doNotCopy: undefined;
    readonly copy: LogT["copy"];
    readonly copyDefaultsDelegate: undefined;
    readonly trackedDefaults: undefined;
}>);
export declare type AssertValidEntity<LogT extends LogMustSetEntity, EntityT extends ITable> = (EntityT & (EntityT["alias"] extends LogT["table"]["alias"] ? ["Cannot use alias", LogT["table"]["alias"], "for entity"] : unknown));
export declare function setEntity<LogT extends LogMustSetEntity, EntityT extends ITable>(log: LogT, entity: AssertValidEntity<LogT, EntityT>): (SetEntity<LogT, EntityT>);
//# sourceMappingURL=set-entity.d.ts.map