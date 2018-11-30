import * as sd from "schema-decorator";
import { CandidateKey } from "./candidate-key";
import { ColumnMap } from "../column-map";
export declare namespace CandidateKeyUtil {
    type ToTypeMap<CandidateKeyT extends CandidateKey, ColumnMapT extends ColumnMap> = ({
        readonly [columnName in Extract<keyof ColumnMapT, CandidateKeyT[number]>]: (ReturnType<ColumnMapT[columnName]["assertDelegate"]>);
    });
    type ToAssertDelegate<CandidateKeyT extends CandidateKey, ColumnMapT extends ColumnMap> = (sd.AssertDelegate<ToTypeMap<CandidateKeyT, ColumnMapT>>);
    function toAssertDelegate<CandidateKeyT extends CandidateKey, ColumnMapT extends ColumnMap>(candidateKey: CandidateKeyT, columnMap: ColumnMapT): (ToAssertDelegate<CandidateKeyT, ColumnMapT>);
    function isEqual(a: CandidateKey, b: CandidateKey): boolean;
}
//# sourceMappingURL=util.d.ts.map