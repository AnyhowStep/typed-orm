import { IColumn } from "../../column";
import { DESC } from "../../../order";
export declare type Desc<ColumnT extends IColumn> = ([ColumnT, typeof DESC]);
export declare function desc<ColumnT extends IColumn>(column: ColumnT): Desc<ColumnT>;
//# sourceMappingURL=desc.d.ts.map