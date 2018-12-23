import { CandidateKey, CandidateKeyUtil } from "../candidate-key";
import { ExtractEqual } from "../type";
export declare namespace CandidateKeyArrayUtil {
    type ToUnion<CandidateKeyArrayT extends CandidateKey[]> = (CandidateKeyArrayT[number]);
    type CommonCandidateKeyUnion<ArrayA extends CandidateKey[], ArrayB extends CandidateKey[]> = (ExtractEqual<ToUnion<ArrayA>, ToUnion<ArrayB>>);
    function hasCommonCandidateKeys(arrayA: CandidateKey[], arrayB: CandidateKey[]): boolean;
    function commonCandidateKeys<ArrayA extends CandidateKey[], ArrayB extends CandidateKey[]>(arrayA: ArrayA, arrayB: ArrayB): (CommonCandidateKeyUnion<ArrayA, ArrayB>[]);
    type FindSubKey<ArrT extends CandidateKey[], KeyT extends CandidateKey> = (CandidateKeyUtil.ExtractSubKey<ArrT[number], KeyT>);
    type HasSubKey<ArrT extends CandidateKey[], KeyT extends CandidateKey> = (true extends CandidateKeyUtil.IsSubKey<ArrT[number], KeyT> ? true : false);
    function hasSubKey<ArrT extends CandidateKey[], KeyT extends CandidateKey>(arr: ArrT, key: KeyT): HasSubKey<ArrT, KeyT>;
    type HasKey<ArrT extends CandidateKey[], KeyT extends CandidateKey> = (KeyT extends ArrT[number] ? (Extract<ArrT[number], KeyT> extends never ? false : true) : false);
    function hasKey<ArrT extends CandidateKey[], KeyT extends CandidateKey>(arr: ArrT, key: KeyT): HasKey<ArrT, KeyT>;
}
//# sourceMappingURL=util.d.ts.map