import { JoinCollection, JoinCollectionUtil } from "../join-collection";
import { Tuple, TupleWiden } from "../tuple";
import { AnyColumn } from "../column";
export declare type JoinFromDelegate<JoinsT extends JoinCollection> = ((columnReferences: JoinCollectionUtil.ToConvenientColumnReferences<JoinsT>) => (TupleWiden<Tuple<JoinCollectionUtil.NullableColumns<JoinsT>>, AnyColumn>));
export declare type JoinFromDelegateUnsafe<JoinsT extends JoinCollection> = ((columnReferences: JoinCollectionUtil.ToConvenientColumnReferences<JoinsT>) => (any[]));
//# sourceMappingURL=join-from-delegate.d.ts.map