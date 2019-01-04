import { Log } from "../../log";
import { ITable } from "../../../table";
export declare function log<TableT extends ITable>(table: TableT): (Log<{
    readonly table: TableT;
    readonly entityIdentifier: undefined;
    readonly latestOrder: undefined;
    readonly tracked: undefined;
    readonly doNotCopy: undefined;
    readonly copy: Exclude<Extract<keyof TableT["columns"], string>, TableT["generated"][number]>[];
    readonly staticDefaultValue: undefined;
    readonly dynamicDefaultValueDelegate: undefined;
}>);
//# sourceMappingURL=log.d.ts.map