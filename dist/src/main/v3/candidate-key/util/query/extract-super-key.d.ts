import { CandidateKey } from "../../candidate-key";
export declare type ExtractSuperKey<A extends CandidateKey, B extends CandidateKey> = (A extends CandidateKey ? (B extends CandidateKey ? (B[number] extends A[number] ? A : never) : never) : never);
//# sourceMappingURL=extract-super-key.d.ts.map