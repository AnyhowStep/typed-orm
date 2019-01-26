import {JoinCollection, JoinCollectionUtil} from "../join-collection"
import {Tuple, TupleWiden} from "../tuple";
import {AnyColumn} from "../column";

export type JoinFromDelegate<JoinsT extends JoinCollection> = (
    (columnReferences : JoinCollectionUtil.ToConvenientColumnReferences<JoinsT>) => (
        //We use NullableColumns because when using left/right joins,
        //the columns can become `null`, and we still want to allow joining
        //`null` with `int` columns
        TupleWiden<Tuple<JoinCollectionUtil.NullableColumns<JoinsT>>, AnyColumn>
    )
);

export type JoinFromDelegateUnsafe<JoinsT extends JoinCollection> = (
    (columnReferences : JoinCollectionUtil.ToConvenientColumnReferences<JoinsT>) => (
        //Yikes. But does make the checking go faster
        any[]
    )
);
