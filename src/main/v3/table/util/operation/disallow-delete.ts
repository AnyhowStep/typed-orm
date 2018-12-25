import {Table, ITable} from "../../table";

export type DisallowDelete<TableT extends ITable> = (
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
        readonly insertAllowed : TableT["insertAllowed"];
        readonly deleteAllowed : false;
    }>
);
export function disallowDelete<TableT extends ITable> (table : TableT) : (
    DisallowDelete<TableT>
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
        insertAllowed,

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
            insertAllowed,
            deleteAllowed : false,
        },
        {unaliasedQuery}
    );
}