import { CandidateKey } from "../../../candidate-key";
import { ExtractEqual } from "../../../../type";
import { FromCandidateKeyArray } from "../../constructor";
export declare type Intersect<ArrayA extends CandidateKey[], ArrayB extends CandidateKey[]> = (ExtractEqual<FromCandidateKeyArray<ArrayA>, FromCandidateKeyArray<ArrayB>>);
export declare function intersect<ArrayA extends CandidateKey[], ArrayB extends CandidateKey[]>(arrayA: ArrayA, arrayB: ArrayB): (Intersect<ArrayA, ArrayB>[]);
//# sourceMappingURL=intersect.d.ts.map