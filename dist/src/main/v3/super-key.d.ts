import * as sd from "schema-decorator";
import { CandidateKey, CandidateKeyUtil } from "./candidate-key";
import { ColumnMap } from "./column-map";
export declare namespace SuperKeyUtil {
    type ToTypeMap<CandidateKeyT extends CandidateKey, ColumnMapT extends ColumnMap> = (CandidateKeyUtil.ToTypeMap<CandidateKeyT, ColumnMapT> & {
        [columnName in Exclude<keyof ColumnMapT, CandidateKeyT[number]>]?: (ReturnType<ColumnMapT[columnName]["assertDelegate"]>);
    });
    type ToAssertDelegate<CandidateKeyT extends CandidateKey, ColumnMapT extends ColumnMap> = (sd.AssertDelegate<ToTypeMap<CandidateKeyT, ColumnMapT>>);
    function toAssertDelegate<CandidateKeyT extends CandidateKey, ColumnMapT extends ColumnMap>(candidateKey: CandidateKeyT, columnMap: ColumnMapT): (ToAssertDelegate<CandidateKeyT, ColumnMapT>);
}
//# sourceMappingURL=super-key.d.ts.map