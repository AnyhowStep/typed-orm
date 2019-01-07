import { CandidateKey } from "../../../candidate-key";
import { ExtractSubKey } from "../../query";
export declare type FindSubKey<ArrT extends CandidateKey[], KeyT extends CandidateKey> = (ExtractSubKey<ArrT[number], KeyT>);
export declare function findSubKeys<ArrT extends CandidateKey[], KeyT extends CandidateKey>(arr: ArrT, key: KeyT): FindSubKey<ArrT, KeyT>[];
//# sourceMappingURL=find-sub-key.d.ts.map