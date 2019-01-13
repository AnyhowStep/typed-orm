import * as sd from "schema-decorator";
import { Key } from "./key";
import { ColumnMap } from "./column-map";
import { CandidateKeyImpl } from "./candidate-key";
export declare namespace TypeMapUtil {
    type FromColumnMap<MapT extends ColumnMap> = (MapT extends ColumnMap ? {
        readonly [columnName in Extract<keyof MapT, string>]: (ReturnType<MapT[columnName]["assertDelegate"]>);
    } : never);
    type SuperKeyUnionFromCandidateKey<CandidateKeyT extends Key, ColumnMapT extends ColumnMap> = (CandidateKeyT extends Key ? (CandidateKeyImpl<ColumnMapT, CandidateKeyT> & {
        [columnName in Exclude<keyof ColumnMapT, CandidateKeyT[number]>]?: (ReturnType<ColumnMapT[columnName]["assertDelegate"]>);
    }) : never);
    type SuperKeyAssertDelegateFromCandidateKey<CandidateKeyT extends Key, ColumnMapT extends ColumnMap> = (sd.AssertDelegate<SuperKeyUnionFromCandidateKey<CandidateKeyT, ColumnMapT>>);
    function superKeyAssertDelegateFromCandidateKey<CandidateKeyT extends Key, ColumnMapT extends ColumnMap>(candidateKey: CandidateKeyT, columnMap: ColumnMapT): (SuperKeyAssertDelegateFromCandidateKey<CandidateKeyT, ColumnMapT>);
    type SuperKeyUnionFromCandidateKeyArray<CandidateKeyArrayT extends Key[], ColumnMapT extends ColumnMap> = (SuperKeyUnionFromCandidateKey<CandidateKeyArrayT[number], ColumnMapT>);
    type SuperKeyAssertDelegateFromCandidateKeyArray<CandidateKeyArrayT extends Key[], ColumnMapT extends ColumnMap> = (sd.AssertDelegate<SuperKeyUnionFromCandidateKeyArray<CandidateKeyArrayT, ColumnMapT>>);
    function superKeyAssertDelegateFromCandidateKeyArray<CandidateKeyArrayT extends Key[], ColumnMapT extends ColumnMap>(candidateKeyTuple: CandidateKeyArrayT, columnMap: ColumnMapT): (SuperKeyAssertDelegateFromCandidateKeyArray<CandidateKeyArrayT, ColumnMapT>);
}
//# sourceMappingURL=type-map.d.ts.map