import {UpdateUtil, Update, Assignment, UpdatableQuery} from "../../../../update";

export type Set<
    QueryT extends UpdatableQuery
> = (
    Update<{
        _query : QueryT,
        _assignments : Assignment[],
        _modifier : undefined,
    }>
);
export function set<
    QueryT extends UpdatableQuery,
    DelegateT extends UpdateUtil.SingleTableSetDelegate<QueryT>
> (
    query : (
        QueryT &
        UpdateUtil.AssertValidSingleTableSetDelegate_Hack<QueryT, DelegateT> &
        UpdateUtil.AssertValidSingleTableUpdatableQuery<QueryT>
    ),
    delegate : DelegateT
) : (
    Set<QueryT>
);
export function set<
    QueryT extends UpdatableQuery,
    DelegateT extends UpdateUtil.SetDelegate<QueryT>,
> (
    query : QueryT & UpdateUtil.AssertValidSetDelegate_Hack<QueryT, DelegateT>,
    delegate : DelegateT
) : (
    Set<QueryT>
);
export function set (
    query : UpdatableQuery,
    delegate : () => any
) : (
    Set<UpdatableQuery>
) {
    if (UpdateUtil.isSingleTableUpdatableQuery(query)) {
        return UpdateUtil.singleTableUpdate(
            query as any,
            undefined,
            delegate
        );
    } else {
        return UpdateUtil.multiTableUpdate(
            query as any,
            undefined,
            delegate
        );
    }
}