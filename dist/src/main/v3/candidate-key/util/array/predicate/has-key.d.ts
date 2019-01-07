import { CandidateKey } from "../../../candidate-key";
export declare type HasKey<ArrT extends CandidateKey[], KeyT extends CandidateKey> = (KeyT extends ArrT[number] ? (Extract<ArrT[number], KeyT> extends never ? false : true) : false);
export declare function hasKey<ArrT extends CandidateKey[], KeyT extends CandidateKey>(arr: ArrT, key: KeyT): HasKey<ArrT, KeyT>;
//# sourceMappingURL=has-key.d.ts.map