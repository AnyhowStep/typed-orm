import * as sd from "schema-decorator";
import { CandidateKey, CandidateKeyUtil } from "../candidate-key";
import { ColumnMap } from "../column-map";
import { ExtractEqual } from "../type";
export declare namespace CandidateKeyArrayUtil {
    type ToTypeMapUnion<CandidateKeyArrayT extends CandidateKey[], ColumnMapT extends ColumnMap> = ({
        [index in keyof CandidateKeyArrayT]: (CandidateKeyUtil.ToTypeMap<Extract<CandidateKeyArrayT[index], CandidateKey>, ColumnMapT>);
    }[number]);
    type ToUnionAssertDelegate<CandidateKeyTupleT extends CandidateKey[], ColumnMapT extends ColumnMap> = (sd.AssertDelegate<ToTypeMapUnion<CandidateKeyTupleT, ColumnMapT>>);
    function toUnionAssertDelegate<CandidateKeyTupleT extends CandidateKey[], ColumnMapT extends ColumnMap>(candidateKeyTuple: CandidateKeyTupleT, columnMap: ColumnMapT): (ToUnionAssertDelegate<CandidateKeyTupleT, ColumnMapT>);
    type ToUnion<CandidateKeyArrayT extends CandidateKey[]> = (CandidateKeyArrayT[number]);
    type CommonCandidateKeyUnion<ArrayA extends CandidateKey[], ArrayB extends CandidateKey[]> = (ExtractEqual<ToUnion<ArrayA>, ToUnion<ArrayB>>);
    function hasCommonCandidateKeys(arrayA: CandidateKey[], arrayB: CandidateKey[]): boolean;
    function commonCandidateKeys<ArrayA extends CandidateKey[], ArrayB extends CandidateKey[]>(arrayA: ArrayA, arrayB: ArrayB): (CommonCandidateKeyUnion<ArrayA, ArrayB>[]);
}
//# sourceMappingURL=util.d.ts.map