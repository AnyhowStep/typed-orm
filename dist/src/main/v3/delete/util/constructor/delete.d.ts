import { DeletableQuery, Delete, DeleteModifier } from "../../delete";
import { DeletableTable } from "../../../table";
import { NonEmptyTuple } from "../../../tuple";
import { QueryUtil } from "../../../query";
export declare type DeletableTableMap<QueryT extends DeletableQuery> = ({
    [tableAlias in QueryUtil.DeletableTables<QueryT>["alias"]]: ({
        alias: tableAlias;
    });
});
export declare type DeleteDelegate<QueryT extends DeletableQuery> = ((tables: DeletableTableMap<QueryT>) => NonEmptyTuple<{
    alias: QueryUtil.DeletableTables<QueryT>["alias"];
}>);
declare function del<QueryT extends DeletableQuery, ModifierT extends DeleteModifier | undefined>(query: QueryT, modifier: ModifierT, delegate: DeleteDelegate<QueryT>): (Delete<{
    _query: DeletableQuery;
    _tables: DeletableTable[];
    _modifier: ModifierT;
}>);
export { del as delete };
//# sourceMappingURL=delete.d.ts.map