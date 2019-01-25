import { ColumnMap } from "../../column-map";
import { Omit } from "../../../type";
export declare function omit<MapT extends ColumnMap, ArrT extends string[]>(map: MapT, arr: ArrT): Omit<MapT, ArrT[number]>;
