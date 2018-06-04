import {Tuple} from "../tuple";
import {AnyTable} from "../table";
import {AnyDefaultRowDelegate} from "./log-builder";

export interface LogData {
    readonly table : AnyTable,
    readonly entityIdentifier : {
        [columnName : string] : true
    },
    readonly isTrackable : {
        [columnName : string] : true
    },
    readonly orderByLatest : Tuple<[string, boolean]>,
    readonly defaultRowDelegate : undefined|AnyDefaultRowDelegate,
}