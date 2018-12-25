import {Table, ITable} from "../../table";
import {ColumnMap, ColumnMapUtil} from "../../../column-map";
import {StringArrayUtil} from "../../../string-array";

export type HasExplicitDefaultValueColumnMap<
    ColumnMapT extends ColumnMap,
    HasExplicitDefaultValueT extends string[]
> = (
    {
        [columnName in Exclude<keyof ColumnMapT, HasExplicitDefaultValueT[number]>] : (
            ColumnMapT[columnName]
        )
    }
);
export type HasExplicitDefaultValueDelegate<
    TableT extends ITable
> = (
    (columnMap : HasExplicitDefaultValueColumnMap<TableT["columns"], TableT["hasExplicitDefaultValue"]>) => (
        HasExplicitDefaultValueColumnMap<TableT["columns"], TableT["hasExplicitDefaultValue"]>[
            keyof HasExplicitDefaultValueColumnMap<TableT["columns"], TableT["hasExplicitDefaultValue"]>
        ][]
    )
);
export type AddHasExplicitDefaultValue<
    TableT extends ITable,
    DelegateT extends HasExplicitDefaultValueDelegate<TableT>
> = (
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
        readonly hasExplicitDefaultValue : (
            TableT["hasExplicitDefaultValue"][number] |
            ReturnType<DelegateT>[number]["name"]
        )[];
        readonly mutable : TableT["mutable"];

        readonly parents : TableT["parents"];
        readonly insertAllowed : TableT["insertAllowed"];
        readonly deleteAllowed : TableT["deleteAllowed"];
    }>
);
export function addHasExplicitDefaultValue<
    TableT extends ITable,
    DelegateT extends HasExplicitDefaultValueDelegate<TableT>
> (
    table : TableT,
    delegate : DelegateT
) : (
    AddHasExplicitDefaultValue<TableT, DelegateT>
) {
    //https://github.com/Microsoft/TypeScript/issues/28592
    const columns : TableT["columns"] = table.columns;
    //https://github.com/Microsoft/TypeScript/issues/24277
    const hasExplicitDefaultValueColumns : ReturnType<DelegateT> = delegate(columns) as any;

    for (let hasExplicitDefaultValueColumn of hasExplicitDefaultValueColumns) {
        if (table.hasExplicitDefaultValue.indexOf(hasExplicitDefaultValueColumn.name) >= 0) {
            throw new Error(`Column ${table.alias}.${hasExplicitDefaultValueColumn.name} already declared as having a default value`);
        }
        ColumnMapUtil.assertHasColumnIdentifier(table.columns, hasExplicitDefaultValueColumn);
    }
    const hasExplicitDefaultValue : (
        TableT["hasExplicitDefaultValue"][number] |
        ReturnType<DelegateT>[number]["name"]
    )[] = StringArrayUtil.uniqueString(
        [
            ...table.hasExplicitDefaultValue,
            ...hasExplicitDefaultValueColumns.map(column => column.name),
        ]
    );

    const {
        usedRef,
        alias,

        autoIncrement,
        id,
        primaryKey,
        candidateKeys,

        generated,
        isNullable,
        mutable,

        parents,
        insertAllowed,
        deleteAllowed,

        unaliasedQuery,
    } = table;

    const result : AddHasExplicitDefaultValue<TableT, DelegateT> = new Table(
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