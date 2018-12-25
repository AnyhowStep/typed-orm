import {escapeId} from "sqlstring";
import {Table, ITable} from "../../table";
import {ColumnMapUtil} from "../../../column-map";

export type SetAlias<TableT extends ITable, NewAliasT extends string> = (
    Table<{
        readonly usedRef : TableT["usedRef"];
        readonly alias : NewAliasT;
        readonly columns : ColumnMapUtil.WithTableAlias<
            TableT["columns"],
            NewAliasT
        >;

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
export function setAlias<TableT extends ITable, NewAliasT extends string> (
    table : TableT,
    newAlias : NewAliasT
) : (
    SetAlias<TableT, NewAliasT>
) {
    //https://github.com/Microsoft/TypeScript/issues/28592
    const columns : TableT["columns"] = table.columns;

    const {
        usedRef,
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
            alias : newAlias,
            columns : ColumnMapUtil.withTableAlias(
                columns,
                newAlias
            ),

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
            unaliasedQuery : escapeId(newAlias),
        }
    );
}