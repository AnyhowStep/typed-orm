import { UpdateUtil, Update, Assignment } from "../../../../update";
export declare type Set<QueryT extends UpdateUtil.UpdatableQuery> = (Update<{
    _query: QueryT;
    _assignments: Assignment[];
    _modifier: undefined;
}>);
export declare function set<QueryT extends UpdateUtil.UpdatableQuery, DelegateT extends UpdateUtil.SetDelegate<QueryT>>(query: QueryT & UpdateUtil.AssertValidSetDelegate_Hack<QueryT, DelegateT>, delegate: DelegateT): (Set<QueryT>);
//# sourceMappingURL=update.d.ts.map