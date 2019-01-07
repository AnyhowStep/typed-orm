export * from "./operation";
export * from "./predicate";
import { CandidateKey } from "../../candidate-key";
import { IsSubKey } from "../predicate";
import { ExtractSubKey, ExtractSuperKey } from "../query";
export declare type FindSubKey<ArrT extends CandidateKey[], KeyT extends CandidateKey> = (ExtractSubKey<ArrT[number], KeyT>);
export declare type HasSubKey<ArrT extends CandidateKey[], KeyT extends CandidateKey> = (true extends IsSubKey<ArrT[number], KeyT> ? true : false);
export declare function hasSubKey<ArrT extends CandidateKey[], KeyT extends CandidateKey>(arr: ArrT, key: KeyT): HasSubKey<ArrT, KeyT>;
export declare type FindSuperKey<ArrT extends CandidateKey[], KeyT extends CandidateKey> = (ExtractSuperKey<ArrT[number], KeyT>);
export declare type HasSuperKey<ArrT extends CandidateKey[], KeyT extends CandidateKey> = (true extends IsSubKey<KeyT, ArrT[number]> ? true : false);
export declare function hasSuperKey<ArrT extends CandidateKey[], KeyT extends CandidateKey>(arr: ArrT, key: KeyT): HasSuperKey<ArrT, KeyT>;
export declare type HasKey<ArrT extends CandidateKey[], KeyT extends CandidateKey> = (KeyT extends ArrT[number] ? (Extract<ArrT[number], KeyT> extends never ? false : true) : false);
export declare function hasKey<ArrT extends CandidateKey[], KeyT extends CandidateKey>(arr: ArrT, key: KeyT): HasKey<ArrT, KeyT>;
export declare function isCandidateKeyArray(raw: any): raw is CandidateKey[];
//# sourceMappingURL=index.d.ts.map