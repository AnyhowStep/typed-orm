import * as sd from "type-mapping";
import { ColumnMap } from "../../column-map";
import { TypeMapUtil } from "../../../type-map";
export declare type PartialAssertDelegate<MapT extends ColumnMap> = (MapT extends ColumnMap ? sd.SafeMapper<Partial<TypeMapUtil.FromColumnMap<MapT>>> : never);
export declare function partialAssertDelegate<MapT extends ColumnMap>(map: MapT): PartialAssertDelegate<MapT>;
