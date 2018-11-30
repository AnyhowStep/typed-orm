import * as sd from "schema-decorator";
import { CandidateKey, CandidateKeyUtil } from "../candidate-key";
import { CandidateKeyTuple } from "./candidate-key-tuple";
import { ColumnMap } from "../column-map";
import { ExtractEqual } from "../type";
export declare namespace CandidateKeyTupleUtil {
    type ToTypeMapUnion<CandidateKeyTupleT extends CandidateKey[], ColumnMapT extends ColumnMap> = ({
        [index in keyof CandidateKeyTupleT]: (CandidateKeyUtil.ToTypeMap<Extract<CandidateKeyTupleT[index], CandidateKey>, ColumnMapT>);
    }[number]);
    type ToUnionAssertDelegate<CandidateKeyTupleT extends CandidateKey[], ColumnMapT extends ColumnMap> = (sd.AssertDelegate<ToTypeMapUnion<CandidateKeyTupleT, ColumnMapT>>);
    function toUnionAssertDelegate<CandidateKeyTupleT extends CandidateKey[], ColumnMapT extends ColumnMap>(candidateKeyTuple: CandidateKeyTupleT, columnMap: ColumnMapT): (ToUnionAssertDelegate<CandidateKeyTupleT, ColumnMapT>);
    type ToUnion<CandidateKeyTupleT extends CandidateKeyTuple> = (CandidateKeyTupleT[number]);
    type CommonCandidateKeyUnion<TupleA extends CandidateKeyTuple, TupleB extends CandidateKeyTuple> = (ExtractEqual<ToUnion<TupleA>, ToUnion<TupleB>>);
    function commonCandidateKeys<TupleA extends CandidateKeyTuple, TupleB extends CandidateKeyTuple>(tupleA: TupleA, tupleB: TupleB): (CommonCandidateKeyUnion<TupleA, TupleB>[]);
}
//# sourceMappingURL=util.d.ts.map