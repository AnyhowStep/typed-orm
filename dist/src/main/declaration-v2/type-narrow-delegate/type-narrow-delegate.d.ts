import { JoinCollection, JoinCollectionUtil } from "../join-collection";
export declare type TypeNarrowDelegate<JoinsT extends JoinCollection> = ((columnReferences: JoinCollectionUtil.ToConvenientColumnReferences<JoinsT>) => (JoinCollectionUtil.NullableColumns<JoinsT>));
//# sourceMappingURL=type-narrow-delegate.d.ts.map