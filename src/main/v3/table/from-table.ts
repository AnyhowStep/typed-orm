import {ITable, Table} from "./table";

export function tableFromTable<TableT extends ITable> (
    table : TableT
) : (
    Table<{
        readonly usedRef : {};
        readonly alias : TableT["alias"];
        readonly columns : TableT["columns"];

        readonly autoIncrement : TableT["autoIncrement"];
        readonly generated : TableT["generated"];
        readonly isNullable : TableT["isNullable"];
        readonly hasExplicitDefaultValue : TableT["hasExplicitDefaultValue"];
        readonly mutable : TableT["mutable"];
        readonly id : TableT["id"];
        readonly candidateKeys : TableT["candidateKeys"];
        readonly parents : TableT["parents"];
        readonly insertAllowed : TableT["insertAllowed"];
        readonly deleteAllowed : TableT["deleteAllowed"];
    }>
) {
    const {
        usedRef,
        alias,
        columns,

        autoIncrement,
        generated,
        isNullable,
        hasExplicitDefaultValue,
        mutable,
        id,
        candidateKeys,
        parents,
        insertAllowed,
        deleteAllowed,

        unaliasedQuery,
    } = table;
    return new Table(
        {
            usedRef,
            alias,
            columns,

            autoIncrement,
            generated,
            isNullable,
            hasExplicitDefaultValue,
            mutable,
            id,
            candidateKeys,
            parents,
            insertAllowed,
            deleteAllowed,
        },
        {
            unaliasedQuery,
        }
    );
}