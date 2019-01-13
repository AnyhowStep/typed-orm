import { Key } from "../../../key";
import { ExtractSubKey } from "../../query";
export declare type FindSubKey<ArrT extends Key[], KeyT extends Key> = (ExtractSubKey<ArrT[number], KeyT>);
export declare function findSubKeys<ArrT extends Key[], KeyT extends Key>(arr: ArrT, key: KeyT): FindSubKey<ArrT, KeyT>[];
//# sourceMappingURL=find-sub-key.d.ts.map