import { Key } from "../../../key";
import { IsSubKey } from "../../predicate";
export declare type HasSuperKey<ArrT extends Key[], KeyT extends Key> = (true extends IsSubKey<KeyT, ArrT[number]> ? true : false);
export declare function hasSuperKey<ArrT extends Key[], KeyT extends Key>(arr: ArrT, key: KeyT): HasSuperKey<ArrT, KeyT>;
//# sourceMappingURL=has-super-key.d.ts.map