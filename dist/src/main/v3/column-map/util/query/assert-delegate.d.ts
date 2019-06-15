import * as sd from "type-mapping";
import { ColumnMap } from "../../column-map";
import { TypeMapUtil } from "../../../type-map";
export declare type AssertDelegate<MapT extends ColumnMap> = (MapT extends ColumnMap ? sd.SafeMapper<TypeMapUtil.FromColumnMap<MapT>> : never);
export declare function assertDelegate<MapT extends ColumnMap>(map: MapT): AssertDelegate<MapT>;
