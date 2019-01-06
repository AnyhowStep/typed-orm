import { Log } from "../../log";
import { ITable } from "../../../table";
export declare function log<TableT extends ITable>(table: TableT): (Log<{
    readonly table: TableT;
    readonly entity: undefined;
    readonly entityIdentifier: undefined;
    readonly joinDeclaration: undefined;
    readonly latestOrder: undefined;
    readonly tracked: undefined;
    readonly doNotCopy: undefined;
    readonly copy: Exclude<Extract<keyof TableT["columns"], string>, TableT["generated"][number]>[];
    readonly copyDefaultsDelegate: undefined;
    readonly trackedDefaults: undefined;
}>);
//# sourceMappingURL=log.d.ts.map