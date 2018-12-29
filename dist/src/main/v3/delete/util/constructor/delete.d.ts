import { DeletableQuery, Delete, DeleteModifier } from "../../delete";
import { ITable } from "../../../table";
import { NonEmptyTuple } from "../../../tuple";
export declare type DeletableTable<QueryT extends DeletableQuery> = (Extract<QueryT["_joins"][number]["aliasedTable"], ITable & {
    deleteAllowed: true;
}>);
export declare function deletableTableArray<QueryT extends DeletableQuery>(query: QueryT): DeletableTable<QueryT>[];
export declare type DeletableTableMap<QueryT extends DeletableQuery> = ({
    [tableAlias in DeletableTable<QueryT>["alias"]]: ({
        alias: tableAlias;
    });
});
export declare type DeleteDelegate<QueryT extends DeletableQuery> = ((tables: DeletableTableMap<QueryT>) => NonEmptyTuple<{
    alias: DeletableTable<QueryT>["alias"];
}>);
declare function del<QueryT extends DeletableQuery, ModifierT extends DeleteModifier | undefined>(query: QueryT, modifier: ModifierT, delegate: DeleteDelegate<QueryT>): (Delete<{
    _query: DeletableQuery;
    _tables: (ITable & {
        deleteAllowed: true;
    })[];
    _modifier: ModifierT;
}>);
export { del as delete };
//# sourceMappingURL=delete.d.ts.map