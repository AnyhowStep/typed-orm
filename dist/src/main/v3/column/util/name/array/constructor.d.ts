import * as Ctor from "../constructor";
import { ColumnMap } from "../../../../column-map";
import { ColumnRef } from "../../../../column-ref";
export declare type FromColumnMap<ColumnMapT extends ColumnMap> = (Ctor.FromColumnMap<ColumnMapT>[]);
export declare function fromColumnMap<ColumnMapT extends ColumnMap>(columnMap: ColumnMapT): FromColumnMap<ColumnMapT>;
export declare type FromColumnRef<ColumnRefT extends ColumnRef> = (Ctor.FromColumnRef<ColumnRefT>[]);
export declare function fromColumnRef<ColumnRefT extends ColumnRef>(columnRef: ColumnRefT): FromColumnRef<ColumnRefT>;
export declare type NullableFromColumnMap<ColumnMapT extends ColumnMap> = (Ctor.NullableFromColumnMap<ColumnMapT>[]);
export declare function nullableFromColumnMap<ColumnMapT extends ColumnMap>(columnMap: ColumnMapT): NullableFromColumnMap<ColumnMapT>;
//# sourceMappingURL=constructor.d.ts.map