import {Table, ITable} from "../../table";

export type DisallowInsert<TableT extends ITable> = (
    Table<{
        readonly usedRef : TableT["usedRef"];
        readonly alias : TableT["alias"];
        readonly columns : TableT["columns"];

        readonly autoIncrement : TableT["autoIncrement"];
        readonly id : TableT["id"];
        readonly candidateKeys : TableT["candidateKeys"];

        readonly generated : TableT["generated"];
        readonly isNullable : TableT["isNullable"];
        readonly hasExplicitDefaultValue : TableT["hasExplicitDefaultValue"];
        readonly mutable : TableT["mutable"];

        readonly parents : TableT["parents"];
        readonly insertAllowed : false;
        readonly deleteAllowed : TableT["deleteAllowed"];
    }>
);
export function disallowInsert<TableT extends ITable> (table : TableT) : (
    DisallowInsert<TableT>
) {
    const {
        usedRef,
        alias,
        columns,

        autoIncrement,
        id,
        candidateKeys,

        generated,
        isNullable,
        hasExplicitDefaultValue,
        mutable,

        parents,
        deleteAllowed,

        unaliasedQuery,
    } = table;

    return new Table(
        {
            usedRef,
            alias,
            columns,

            autoIncrement,
            id,
            candidateKeys,

            generated,
            isNullable,
            hasExplicitDefaultValue,
            mutable,

            parents,
            insertAllowed : false,
            deleteAllowed,
        },
        {unaliasedQuery}
    );
}