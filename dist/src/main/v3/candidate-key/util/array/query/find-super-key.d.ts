import { CandidateKey } from "../../../candidate-key";
import { ExtractSuperKey } from "../../query";
export declare type FindSuperKey<ArrT extends CandidateKey[], KeyT extends CandidateKey> = (ExtractSuperKey<ArrT[number], KeyT>);
export declare function findSuperKeys<ArrT extends CandidateKey[], KeyT extends CandidateKey>(arr: ArrT, key: KeyT): FindSuperKey<ArrT, KeyT>[];
//# sourceMappingURL=find-super-key.d.ts.map