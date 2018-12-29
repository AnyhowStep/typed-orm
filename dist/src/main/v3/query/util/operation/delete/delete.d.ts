import { ITable } from "../../../../table";
import { DeletableQuery, DeleteUtil, Delete } from "../../../../delete";
declare function del<QueryT extends DeletableQuery>(query: QueryT, delegate: DeleteUtil.DeleteDelegate<QueryT>): (Delete<{
    _query: DeletableQuery;
    _tables: (ITable & {
        deleteAllowed: true;
    })[];
    _modifier: undefined;
}>);
export { del as delete };
//# sourceMappingURL=delete.d.ts.map