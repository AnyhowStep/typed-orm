import * as sd from "schema-decorator";
import {Table, ITable} from "../../table";
import {ColumnMapUtil} from "../../../column-map";
import {ColumnUtil} from "../../../column";

export type AddColumnsFromFieldTuple<
    TableT extends ITable,
    FieldsT extends sd.AnyField[]
> = (
    Table<{
        readonly usedRef : TableT["usedRef"];
        readonly alias : TableT["alias"];
        readonly columns : ColumnMapUtil.Intersect<
            TableT["columns"],
            ColumnMapUtil.FromFieldArray<TableT["alias"], FieldsT>
        >;

        readonly autoIncrement : TableT["autoIncrement"];
        readonly id : TableT["id"];
        readonly primaryKey : TableT["primaryKey"];
        readonly candidateKeys : TableT["candidateKeys"];

        readonly generated : TableT["generated"];
        readonly isNullable : ColumnUtil.Name.NullableFromColumnMap<
            ColumnMapUtil.Intersect<
                TableT["columns"],
                ColumnMapUtil.FromFieldArray<TableT["alias"], FieldsT>
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
export function addColumnsFromFieldTuple<
    TableT extends ITable,
    FieldsT extends sd.AnyField[]
> (
    table : TableT,
    fields : FieldsT
) : (
    AddColumnsFromFieldTuple<TableT, FieldsT>
) {
    //https://github.com/Microsoft/TypeScript/issues/28592
    const tableColumns: TableT["columns"] = table.columns;
    //https://github.com/Microsoft/TypeScript/issues/28592
    const columnMapFromFieldArray : (
        ColumnMapUtil.FromFieldArray<TableT["alias"], FieldsT>
    ) = ColumnMapUtil.fromFieldArray(table.alias, fields);
    const columns : ColumnMapUtil.Intersect<
        TableT["columns"],
        ColumnMapUtil.FromFieldArray<TableT["alias"], FieldsT>
    > = ColumnMapUtil.intersect(
        tableColumns,
        columnMapFromFieldArray
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

    const result : AddColumnsFromFieldTuple<TableT, FieldsT> = new Table(
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