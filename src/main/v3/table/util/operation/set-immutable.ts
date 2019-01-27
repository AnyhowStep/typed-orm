import {Table, ITable} from "../../table";

export type SetImmutable<TableT extends ITable> = (
    Table<{
        readonly usedColumns : TableT["usedColumns"];
        readonly alias : TableT["alias"];
        readonly columns : TableT["columns"];

        readonly autoIncrement : TableT["autoIncrement"];
        readonly id : TableT["id"];
        readonly primaryKey : TableT["primaryKey"];
        readonly candidateKeys : TableT["candidateKeys"];

        readonly generated : TableT["generated"];
        readonly isNullable : TableT["isNullable"];
        readonly hasExplicitDefaultValue : TableT["hasExplicitDefaultValue"];
        readonly mutable : [];

        readonly parents : TableT["parents"];
        readonly insertAllowed : TableT["insertAllowed"];
        readonly deleteAllowed : TableT["deleteAllowed"];
    }>
);
export function setImmutable<TableT extends ITable> (table : TableT) : (
    SetImmutable<TableT>
) {
    const {
        usedColumns,
        alias,
        columns,

        autoIncrement,
        id,
        primaryKey,
        candidateKeys,

        generated,
        isNullable,
        hasExplicitDefaultValue,

        parents,
        insertAllowed,
        deleteAllowed,

        unaliasedQuery,
    } = table;

    return new Table(
        {
            usedColumns,
            alias,
            columns,

            autoIncrement,
            id,
            primaryKey,
            candidateKeys,

            generated,
            isNullable,
            hasExplicitDefaultValue,
            mutable : [] as [],

            parents,
            insertAllowed,
            deleteAllowed,
        },
        {unaliasedQuery}
    );
}