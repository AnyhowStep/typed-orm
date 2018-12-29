import {ITable} from "../../../../table";
import {DeletableQuery, DeleteUtil, Delete} from "../../../../delete";

function del<
    QueryT extends DeletableQuery
> (
    query : QueryT,
    delegate : DeleteUtil.DeleteDelegate<QueryT>
) : (
    Delete<{
        _query : DeletableQuery,
        _tables : (ITable & { deleteAllowed : true })[],
        _modifier : undefined,
    }>
) {
    return DeleteUtil.delete(
        query,
        undefined,
        delegate
    );
}
export {del as delete};