import * as sd from "schema-decorator";
import {AnyRawColumn} from "./raw-column";
import {Column} from "../column";

export namespace RawColumnUtil {
    export declare type TypeOf<RawColumnT extends AnyRawColumn> = (
        RawColumnT extends sd.AssertFunc<infer T> ?
        T :
        RawColumnT extends Column<any, any, infer T> ?
        T :
        never
    )
    
}
