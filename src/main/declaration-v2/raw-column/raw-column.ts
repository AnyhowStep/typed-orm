import * as sd from "schema-decorator";
import {Column} from "../column";

export type RawColumn<T> = sd.AssertFunc<T>|Column<any, any, T>;
export type AnyRawColumn = RawColumn<any>;
