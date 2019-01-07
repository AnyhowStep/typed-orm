import { CandidateKey } from "../../../candidate-key";
import { IsSubKey } from "../../predicate";
export declare type HasSubKey<ArrT extends CandidateKey[], KeyT extends CandidateKey> = (true extends IsSubKey<ArrT[number], KeyT> ? true : false);
export declare function hasSubKey<ArrT extends CandidateKey[], KeyT extends CandidateKey>(arr: ArrT, key: KeyT): HasSubKey<ArrT, KeyT>;
//# sourceMappingURL=has-sub-key.d.ts.map