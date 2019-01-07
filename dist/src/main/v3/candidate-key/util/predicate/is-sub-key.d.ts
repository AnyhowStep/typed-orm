import { CandidateKey } from "../../candidate-key";
export declare type IsSubKey<A extends CandidateKey, B extends CandidateKey> = (A extends CandidateKey ? (B extends CandidateKey ? (A[number] extends B[number] ? true : false) : never) : never);
export declare function isSubKey<A extends CandidateKey, B extends CandidateKey>(a: A, b: B): IsSubKey<A, B>;
//# sourceMappingURL=is-sub-key.d.ts.map