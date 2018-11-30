import * as sd from "schema-decorator";
import { CandidateKey } from "./candidate-key";
import { ColumnMap } from "./column-map";
import { SuperKeyUtil } from "./super-key";
export declare namespace SuperKeyTupleUtil {
    type ToTypeMapUnion<CandidateKeyTupleT extends CandidateKey[], ColumnMapT extends ColumnMap> = ({
        [index in keyof CandidateKeyTupleT]: (SuperKeyUtil.ToTypeMap<Extract<CandidateKeyTupleT[index], CandidateKey>, ColumnMapT>);
    }[number]);
    type ToUnionAssertDelegate<CandidateKeyTupleT extends CandidateKey[], ColumnMapT extends ColumnMap> = (sd.AssertDelegate<ToTypeMapUnion<CandidateKeyTupleT, ColumnMapT>>);
    function toUnionAssertDelegate<CandidateKeyTupleT extends CandidateKey[], ColumnMapT extends ColumnMap>(candidateKeyTuple: CandidateKeyTupleT, columnMap: ColumnMapT): (ToUnionAssertDelegate<CandidateKeyTupleT, ColumnMapT>);
}
//# sourceMappingURL=super-key-tuple.d.ts.map