import { CandidateKey } from "../../../candidate-key";
import { IsSubKey } from "../../predicate";
export declare type HasSuperKey<ArrT extends CandidateKey[], KeyT extends CandidateKey> = (true extends IsSubKey<KeyT, ArrT[number]> ? true : false);
export declare function hasSuperKey<ArrT extends CandidateKey[], KeyT extends CandidateKey>(arr: ArrT, key: KeyT): HasSuperKey<ArrT, KeyT>;
//# sourceMappingURL=has-super-key.d.ts.map