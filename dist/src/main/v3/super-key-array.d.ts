import * as sd from "schema-decorator";
import { CandidateKey } from "./candidate-key";
import { ColumnMap } from "./column-map";
import { SuperKeyUtil } from "./super-key";
export declare namespace SuperKeyArrayUtil {
    type ToTypeMapUnion<CandidateKeyArrayT extends CandidateKey[], ColumnMapT extends ColumnMap> = ({
        [index in keyof CandidateKeyArrayT]: (SuperKeyUtil.ToTypeMap<Extract<CandidateKeyArrayT[index], CandidateKey>, ColumnMapT>);
    }[number]);
    type ToUnionAssertDelegate<CandidateKeyArrayT extends CandidateKey[], ColumnMapT extends ColumnMap> = (sd.AssertDelegate<ToTypeMapUnion<CandidateKeyArrayT, ColumnMapT>>);
    function toUnionAssertDelegate<CandidateKeyArrayT extends CandidateKey[], ColumnMapT extends ColumnMap>(candidateKeyTuple: CandidateKeyArrayT, columnMap: ColumnMapT): (ToUnionAssertDelegate<CandidateKeyArrayT, ColumnMapT>);
}
//# sourceMappingURL=super-key-array.d.ts.map