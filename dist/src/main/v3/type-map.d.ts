import * as sd from "schema-decorator";
import { CandidateKey } from "./candidate-key";
import { ColumnMap } from "./column-map";
import { ITable } from "./table";
export declare namespace TypeMapUtil {
    type UnionFromCandidateKey<CandidateKeyT extends CandidateKey, ColumnMapT extends ColumnMap> = (CandidateKeyT extends CandidateKey ? {
        readonly [columnName in Extract<keyof ColumnMapT, CandidateKeyT[number]>]: (ReturnType<ColumnMapT[columnName]["assertDelegate"]>);
    } : never);
    type UnionFromCandidateKeyArray<CandidateKeyArrayT extends CandidateKey[], ColumnMapT extends ColumnMap> = (UnionFromCandidateKey<CandidateKeyArrayT[number], ColumnMapT>);
    type AssertDelegateFromCandidateKey<CandidateKeyT extends CandidateKey, ColumnMapT extends ColumnMap> = (sd.AssertDelegate<TypeMapUtil.UnionFromCandidateKey<CandidateKeyT, ColumnMapT>>);
    function assertDelegateFromCandidateKey<CandidateKeyT extends CandidateKey, ColumnMapT extends ColumnMap>(candidateKey: CandidateKeyT, columnMap: ColumnMapT): (AssertDelegateFromCandidateKey<CandidateKeyT, ColumnMapT>);
    type AssertDelegateFromCandidateKeyArray<CandidateKeyTupleT extends CandidateKey[], ColumnMapT extends ColumnMap> = (sd.AssertDelegate<UnionFromCandidateKeyArray<CandidateKeyTupleT, ColumnMapT>>);
    function assertDelegateFromCandidateKeyArray<CandidateKeyTupleT extends CandidateKey[], ColumnMapT extends ColumnMap>(candidateKeyTuple: CandidateKeyTupleT, columnMap: ColumnMapT): (AssertDelegateFromCandidateKeyArray<CandidateKeyTupleT, ColumnMapT>);
    type SuperKeyUnionFromCandidateKey<CandidateKeyT extends CandidateKey, ColumnMapT extends ColumnMap> = (CandidateKeyT extends CandidateKey ? (UnionFromCandidateKey<CandidateKeyT, ColumnMapT> & {
        [columnName in Exclude<keyof ColumnMapT, CandidateKeyT[number]>]?: (ReturnType<ColumnMapT[columnName]["assertDelegate"]>);
    }) : never);
    type SuperKeyAssertDelegateFromCandidateKey<CandidateKeyT extends CandidateKey, ColumnMapT extends ColumnMap> = (sd.AssertDelegate<SuperKeyUnionFromCandidateKey<CandidateKeyT, ColumnMapT>>);
    function superKeyAssertDelegateFromCandidateKey<CandidateKeyT extends CandidateKey, ColumnMapT extends ColumnMap>(candidateKey: CandidateKeyT, columnMap: ColumnMapT): (SuperKeyAssertDelegateFromCandidateKey<CandidateKeyT, ColumnMapT>);
    type SuperKeyUnionFromCandidateKeyArray<CandidateKeyArrayT extends CandidateKey[], ColumnMapT extends ColumnMap> = (SuperKeyUnionFromCandidateKey<CandidateKeyArrayT[number], ColumnMapT>);
    type SuperKeyAssertDelegateFromCandidateKeyArray<CandidateKeyArrayT extends CandidateKey[], ColumnMapT extends ColumnMap> = (sd.AssertDelegate<SuperKeyUnionFromCandidateKeyArray<CandidateKeyArrayT, ColumnMapT>>);
    function superKeyAssertDelegateFromCandidateKeyArray<CandidateKeyArrayT extends CandidateKey[], ColumnMapT extends ColumnMap>(candidateKeyTuple: CandidateKeyArrayT, columnMap: ColumnMapT): (SuperKeyAssertDelegateFromCandidateKeyArray<CandidateKeyArrayT, ColumnMapT>);
    type FromTable<TableT extends ITable> = ({
        readonly [columnName in Extract<keyof TableT["columns"], string>]: (ReturnType<TableT["columns"][columnName]["assertDelegate"]>);
    });
}
//# sourceMappingURL=type-map.d.ts.map