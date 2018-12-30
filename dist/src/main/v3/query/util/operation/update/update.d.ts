import { UpdateUtil, Update, Assignment, UpdatableQuery } from "../../../../update";
export declare type Set<QueryT extends UpdatableQuery> = (Update<{
    _query: QueryT;
    _assignments: Assignment[];
    _modifier: undefined;
}>);
export declare function set<QueryT extends UpdatableQuery, DelegateT extends UpdateUtil.SingleTableSetDelegate<QueryT>>(query: (QueryT & UpdateUtil.AssertValidSingleTableSetDelegate_Hack<QueryT, DelegateT> & UpdateUtil.AssertValidSingleTableUpdatableQuery<QueryT>), delegate: DelegateT): (Set<QueryT>);
export declare function set<QueryT extends UpdatableQuery, DelegateT extends UpdateUtil.SetDelegate<QueryT>>(query: QueryT & UpdateUtil.AssertValidSetDelegate_Hack<QueryT, DelegateT>, delegate: DelegateT): (Set<QueryT>);
//# sourceMappingURL=update.d.ts.map