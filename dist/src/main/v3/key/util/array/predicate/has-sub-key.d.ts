import { Key } from "../../../key";
import { IsSubKey } from "../../predicate";
export declare type HasSubKey<ArrT extends Key[], KeyT extends Key> = (true extends IsSubKey<ArrT[number], KeyT> ? true : false);
export declare function hasSubKey<ArrT extends Key[], KeyT extends Key>(arr: ArrT, key: KeyT): HasSubKey<ArrT, KeyT>;
