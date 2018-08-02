import * as sd from "schema-decorator";
import { Column } from "../column";
export declare type RawColumn<T> = sd.AssertFunc<T> | Column<any, any, T>;
export declare type AnyRawColumn = RawColumn<any>;
//# sourceMappingURL=raw-column.d.ts.map