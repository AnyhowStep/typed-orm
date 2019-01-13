import * as sd from "schema-decorator";
import { ColumnMap } from "../../column-map";
import { TypeMapUtil } from "../../../type-map";
export declare type AssertDelegate<MapT extends ColumnMap> = (MapT extends ColumnMap ? sd.AssertDelegate<TypeMapUtil.FromColumnMap<MapT>> : never);
export declare function assertDelegate<MapT extends ColumnMap>(map: MapT): AssertDelegate<MapT>;
//# sourceMappingURL=assert-delegate.d.ts.map