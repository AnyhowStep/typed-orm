import { CandidateKey } from "../candidate-key";
import { ExtractEqual } from "../type";
export declare namespace CandidateKeyArrayUtil {
    type ToUnion<CandidateKeyArrayT extends CandidateKey[]> = (CandidateKeyArrayT[number]);
    type CommonCandidateKeyUnion<ArrayA extends CandidateKey[], ArrayB extends CandidateKey[]> = (ExtractEqual<ToUnion<ArrayA>, ToUnion<ArrayB>>);
    function hasCommonCandidateKeys(arrayA: CandidateKey[], arrayB: CandidateKey[]): boolean;
    function commonCandidateKeys<ArrayA extends CandidateKey[], ArrayB extends CandidateKey[]>(arrayA: ArrayA, arrayB: ArrayB): (CommonCandidateKeyUnion<ArrayA, ArrayB>[]);
}
//# sourceMappingURL=util.d.ts.map