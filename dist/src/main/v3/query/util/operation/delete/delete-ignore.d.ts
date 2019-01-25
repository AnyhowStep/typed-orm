import { ITable } from "../../../../table";
import { DeletableQuery, DeleteUtil, Delete, DeleteModifier } from "../../../../delete";
export declare function deleteIgnore<QueryT extends DeletableQuery>(query: QueryT, delegate: DeleteUtil.DeleteDelegate<QueryT>): (Delete<{
    _query: DeletableQuery;
    _tables: (ITable & {
        deleteAllowed: true;
    })[];
    _modifier: DeleteModifier.IGNORE;
}>);
