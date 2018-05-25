import { JoinCollection, JoinCollectionUtil } from "../join-collection";
import { Tuple, TupleWiden } from "../tuple";
import { AnyColumn } from "../column";
export declare type JoinFromDelegate<JoinsT extends JoinCollection> = ((columnReferences: JoinCollectionUtil.ToConvenientColumnReferences<JoinsT>) => (TupleWiden<Tuple<JoinCollectionUtil.NullableColumns<JoinsT>>, AnyColumn>));
