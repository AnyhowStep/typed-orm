import * as sd from "schema-decorator";
import { Key } from "./key";
import { ColumnMap } from "./column-map";
export declare namespace TypeMapUtil {
    type FromColumnMap<MapT extends ColumnMap> = (MapT extends ColumnMap ? {
        readonly [columnName in Extract<keyof MapT, string>]: (ReturnType<MapT[columnName]["assertDelegate"]>);
    } : never);
    type UnionFromCandidateKey<CandidateKeyT extends Key, ColumnMapT extends ColumnMap> = (CandidateKeyT extends Key ? {
        readonly [columnName in Extract<keyof ColumnMapT, CandidateKeyT[number]>]: (ReturnType<ColumnMapT[columnName]["assertDelegate"]>);
    } : never);
    type UnionFromCandidateKeyArray<CandidateKeyArrayT extends Key[], ColumnMapT extends ColumnMap> = (UnionFromCandidateKey<CandidateKeyArrayT[number], ColumnMapT>);
    type AssertDelegateFromCandidateKey<CandidateKeyT extends Key, ColumnMapT extends ColumnMap> = (sd.AssertDelegate<TypeMapUtil.UnionFromCandidateKey<CandidateKeyT, ColumnMapT>>);
    function assertDelegateFromCandidateKey<CandidateKeyT extends Key, ColumnMapT extends ColumnMap>(candidateKey: CandidateKeyT, columnMap: ColumnMapT): (AssertDelegateFromCandidateKey<CandidateKeyT, ColumnMapT>);
    type AssertDelegateFromCandidateKeyArray<CandidateKeyTupleT extends Key[], ColumnMapT extends ColumnMap> = (sd.AssertDelegate<UnionFromCandidateKeyArray<CandidateKeyTupleT, ColumnMapT>>);
    function assertDelegateFromCandidateKeyArray<CandidateKeyTupleT extends Key[], ColumnMapT extends ColumnMap>(candidateKeyTuple: CandidateKeyTupleT, columnMap: ColumnMapT): (AssertDelegateFromCandidateKeyArray<CandidateKeyTupleT, ColumnMapT>);
    type SuperKeyUnionFromCandidateKey<CandidateKeyT extends Key, ColumnMapT extends ColumnMap> = (CandidateKeyT extends Key ? (UnionFromCandidateKey<CandidateKeyT, ColumnMapT> & {
        [columnName in Exclude<keyof ColumnMapT, CandidateKeyT[number]>]?: (ReturnType<ColumnMapT[columnName]["assertDelegate"]>);
    }) : never);
    type SuperKeyAssertDelegateFromCandidateKey<CandidateKeyT extends Key, ColumnMapT extends ColumnMap> = (sd.AssertDelegate<SuperKeyUnionFromCandidateKey<CandidateKeyT, ColumnMapT>>);
    function superKeyAssertDelegateFromCandidateKey<CandidateKeyT extends Key, ColumnMapT extends ColumnMap>(candidateKey: CandidateKeyT, columnMap: ColumnMapT): (SuperKeyAssertDelegateFromCandidateKey<CandidateKeyT, ColumnMapT>);
    type SuperKeyUnionFromCandidateKeyArray<CandidateKeyArrayT extends Key[], ColumnMapT extends ColumnMap> = (SuperKeyUnionFromCandidateKey<CandidateKeyArrayT[number], ColumnMapT>);
    type SuperKeyAssertDelegateFromCandidateKeyArray<CandidateKeyArrayT extends Key[], ColumnMapT extends ColumnMap> = (sd.AssertDelegate<SuperKeyUnionFromCandidateKeyArray<CandidateKeyArrayT, ColumnMapT>>);
    function superKeyAssertDelegateFromCandidateKeyArray<CandidateKeyArrayT extends Key[], ColumnMapT extends ColumnMap>(candidateKeyTuple: CandidateKeyArrayT, columnMap: ColumnMapT): (SuperKeyAssertDelegateFromCandidateKeyArray<CandidateKeyArrayT, ColumnMapT>);
}
//# sourceMappingURL=type-map.d.ts.map