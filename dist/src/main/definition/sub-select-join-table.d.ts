import * as d from "../declaration";
export declare type SelectBuilderToRawColumnReferences<SelectBuilderT extends d.AnySelectBuilder> = (SelectBuilderT extends d.ISelectBuilder<infer DataT> ? (DataT["selectTuple"] extends d.Tuple<d.JoinableSelectTupleElement<DataT["columnReferences"]>> ? (true extends d.JoinableSelectTupleHasDuplicateColumnName<DataT["selectTuple"]> ? never : d.JoinableSelectTupleToRawColumnCollection<DataT["selectTuple"]>) : never) : never);
export declare class SubSelectJoinTable<AliasT extends string, SelectBuilderT extends d.AnySelectBuilder> implements d.AliasedTable<AliasT, AliasT, SelectBuilderToRawColumnReferences<SelectBuilderT>> {
    readonly alias: AliasT;
    readonly name: AliasT;
    readonly columns: d.ColumnCollection<AliasT, SelectBuilderToRawColumnReferences<SelectBuilderT>>;
    readonly selectBuilder: SelectBuilderT;
    constructor(alias: AliasT, selectBuilder: SelectBuilderT);
    querify(sb: d.IStringBuilder): void;
}
