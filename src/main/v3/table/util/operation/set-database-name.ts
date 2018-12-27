import {escapeId} from "sqlstring";
import {Table, ITable} from "../../table";

export type SetDatabaseName<TableT extends ITable> = (
    Table<{
        readonly usedRef : TableT["usedRef"];
        readonly alias : TableT["alias"];
        readonly columns : TableT["columns"];

        readonly autoIncrement : TableT["autoIncrement"];
        readonly id : TableT["id"];
        readonly primaryKey : TableT["primaryKey"];
        readonly candidateKeys : TableT["candidateKeys"];

        readonly generated : TableT["generated"];
        readonly isNullable : TableT["isNullable"];
        readonly hasExplicitDefaultValue : TableT["hasExplicitDefaultValue"];
        readonly mutable : TableT["mutable"];

        readonly parents : TableT["parents"];
        readonly insertAllowed : TableT["insertAllowed"];
        readonly deleteAllowed : TableT["deleteAllowed"];
    }>
);
export function setDatabaseName<TableT extends ITable> (
    table : TableT,
    newDatabaseName : string
) : (
    SetDatabaseName<TableT>
) {
    const {
        usedRef,
        alias,
        columns,
        autoIncrement,
        id,
        primaryKey,
        candidateKeys,

        generated,
        isNullable,
        hasExplicitDefaultValue,
        mutable,

        parents,
        insertAllowed,
        deleteAllowed,
    } = table;

    return new Table(
        {
            usedRef,
            alias,
            columns,

            autoIncrement,
            id,
            primaryKey,
            candidateKeys,

            generated,
            isNullable,
            hasExplicitDefaultValue,
            mutable,

            parents,
            insertAllowed,
            deleteAllowed,
        },
        {
            unaliasedQuery : [
                escapeId(newDatabaseName),
                ".",
                escapeId(alias),
            ],
        }
    );
}