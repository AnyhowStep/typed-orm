import {UpdateUtil, Update, Assignment} from "../../../../update";

export type Set<
    QueryT extends UpdateUtil.UpdatableQuery
> = (
    Update<{
        _query : QueryT,
        _assignments : Assignment[],
        _modifier : undefined,
    }>
);
export function set<
    QueryT extends UpdateUtil.UpdatableQuery,
    DelegateT extends UpdateUtil.SetDelegate<QueryT>,
> (
    query : QueryT & UpdateUtil.AssertValidSetDelegate_Hack<QueryT, DelegateT>,
    delegate : DelegateT
) : (
    Set<QueryT>
) {
    return UpdateUtil.update<
        QueryT,
        undefined,
        DelegateT
    >(
        query,
        undefined,
        delegate
    );
}