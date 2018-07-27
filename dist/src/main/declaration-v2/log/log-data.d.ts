import { Tuple } from "../tuple";
import { AnyTable } from "../table";
import { AnyDefaultRowDelegate } from "./log-builder";
import { AnyColumn } from "../column";
export interface LogData {
    readonly table: AnyTable;
    readonly entityIdentifier: {
        [columnName: string]: true;
    };
    readonly isTrackable: {
        [columnName: string]: true;
    };
    readonly doNotCopyOnTrackableChanged: {
        [columnName: string]: true;
    };
    readonly orderByLatest: Tuple<[AnyColumn, boolean]>;
    readonly defaultRowDelegate: undefined | AnyDefaultRowDelegate;
}
