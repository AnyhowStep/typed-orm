import {JoinCollection, JoinCollectionUtil} from "../join-collection";

export type TypeNarrowDelegate<
    JoinsT extends JoinCollection
> = (
    (columnReferences : JoinCollectionUtil.ToConvenientColumnReferences<JoinsT>) => (
        JoinCollectionUtil.Columns<JoinsT>
    )
);
