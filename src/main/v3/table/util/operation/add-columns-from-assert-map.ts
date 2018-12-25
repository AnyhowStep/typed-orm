import {Table, ITable} from "../../table";
import {AssertMap} from "../../../assert-map";
import {ColumnMapUtil} from "../../../column-map";
import {ColumnUtil} from "../../../column";

export type AddColumnsFromAssertMap<
    TableT extends ITable,
    AssertMapT extends AssertMap
> = (
    Table<{
        readonly usedRef : TableT["usedRef"];
        readonly alias : TableT["alias"];
        readonly columns : ColumnMapUtil.Intersect<
            TableT["columns"],
            ColumnMapUtil.FromAssertMap<TableT["alias"], AssertMapT>
        >;

        readonly autoIncrement : TableT["autoIncrement"];
        readonly id : TableT["id"];
        readonly primaryKey : TableT["primaryKey"];
        readonly candidateKeys : TableT["candidateKeys"];

        readonly generated : TableT["generated"];
        readonly isNullable : ColumnUtil.Name.NullableFromColumnMap<
            ColumnMapUtil.Intersect<
                TableT["columns"],
                ColumnMapUtil.FromAssertMap<TableT["alias"], AssertMapT>
            >
        >[];
        readonly hasExplicitDefaultValue : TableT["hasExplicitDefaultValue"];
        /*
            TODO-DEBATE Debate whether new columns should be mutable
        */
        readonly mutable : TableT["mutable"];

        readonly parents : TableT["parents"];
        readonly insertAllowed : TableT["insertAllowed"];
        readonly deleteAllowed : TableT["deleteAllowed"];
    }>
);
export function addColumnsFromAssertMap<
    TableT extends ITable,
    AssertMapT extends AssertMap
> (
    table : TableT,
    assertMap : AssertMapT
) : (
    AddColumnsFromAssertMap<TableT, AssertMapT>
) {
    //https://github.com/Microsoft/TypeScript/issues/28592
    const tableColumns: TableT["columns"] = table.columns;
    const columns : ColumnMapUtil.Intersect<
        TableT["columns"],
        ColumnMapUtil.FromAssertMap<TableT["alias"], AssertMapT>
    > = ColumnMapUtil.intersect(
        tableColumns,
        ColumnMapUtil.fromAssertMap(table.alias, assertMap)
    );
    const isNullable = ColumnUtil.Name.Array.nullableFromColumnMap(columns);

    const {
        usedRef,
        alias,

        autoIncrement,
        id,
        primaryKey,
        candidateKeys,

        generated,
        hasExplicitDefaultValue,
        mutable,

        parents,
        insertAllowed,
        deleteAllowed,

        unaliasedQuery,
    } = table;

    const result : AddColumnsFromAssertMap<TableT, AssertMapT> = new Table(
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
        {unaliasedQuery}
    );
    return result;
}