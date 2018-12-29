import { CandidateKey } from "./candidate-key";
export declare namespace CandidateKeyUtil {
    type ExtractSubKey<A extends CandidateKey, B extends CandidateKey> = (A extends CandidateKey ? (B extends CandidateKey ? (A[number] extends B[number] ? A : never) : never) : never);
    type ExtractSuperKey<A extends CandidateKey, B extends CandidateKey> = (A extends CandidateKey ? (B extends CandidateKey ? (B[number] extends A[number] ? A : never) : never) : never);
    type IsSubKey<A extends CandidateKey, B extends CandidateKey> = (A extends CandidateKey ? (B extends CandidateKey ? (A[number] extends B[number] ? true : false) : never) : never);
    function isSubKey<A extends CandidateKey, B extends CandidateKey>(a: A, b: B): IsSubKey<A, B>;
    function isEqual(a: CandidateKey, b: CandidateKey): boolean;
    function isCandidateKey(raw: any): raw is CandidateKey;
}
//# sourceMappingURL=util.d.ts.map