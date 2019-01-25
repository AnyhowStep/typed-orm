import { Key } from "../../../key";
import { ExtractSuperKey } from "../../query";
export declare type FindSuperKey<ArrT extends Key[], KeyT extends Key> = (ExtractSuperKey<ArrT[number], KeyT>);
export declare function findSuperKeys<ArrT extends Key[], KeyT extends Key>(arr: ArrT, key: KeyT): FindSuperKey<ArrT, KeyT>[];
