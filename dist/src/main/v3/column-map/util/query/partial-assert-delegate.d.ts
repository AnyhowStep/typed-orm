import * as sd from "schema-decorator";
import { ColumnMap } from "../../column-map";
import { TypeMapUtil } from "../../../type-map";
export declare type PartialAssertDelegate<MapT extends ColumnMap> = (MapT extends ColumnMap ? sd.AssertDelegate<Partial<TypeMapUtil.FromColumnMap<MapT>>> : never);
export declare function partialAssertDelegate<MapT extends ColumnMap>(map: MapT): PartialAssertDelegate<MapT>;
//# sourceMappingURL=partial-assert-delegate.d.ts.map