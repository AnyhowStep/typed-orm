import { CandidateKey } from "./candidate-key";
export declare namespace CandidateKeyUtil {
    type ExtractSubKey<A extends CandidateKey, B extends CandidateKey> = (A extends CandidateKey ? (B extends CandidateKey ? (A[number] extends B[number] ? A : never) : never) : never);
    type IsSubKey<A extends CandidateKey, B extends CandidateKey> = (A extends CandidateKey ? (B extends CandidateKey ? (A[number] extends B[number] ? true : false) : never) : never);
    function isSubKey<A extends CandidateKey, B extends CandidateKey>(a: A, b: B): IsSubKey<A, B>;
    function isEqual(a: CandidateKey, b: CandidateKey): boolean;
}
//# sourceMappingURL=util.d.ts.map