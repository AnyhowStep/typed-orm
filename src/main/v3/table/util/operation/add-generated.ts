import {Table, ITable} from "../../table";
import {ColumnMap, ColumnMapUtil} from "../../../column-map";
import {StringArrayUtil} from "../../../string-array";

export type GeneratedColumnMap<
    ColumnMapT extends ColumnMap,
    GeneratedT extends string[]
> = (
    {
        [columnName in Exclude<keyof ColumnMapT, GeneratedT[number]>] : (
            ColumnMapT[columnName]
        )
    }
);
export type GeneratedDelegate<
    TableT extends ITable
> = (
    (columnMap : GeneratedColumnMap<TableT["columns"], TableT["generated"]>) => (
        GeneratedColumnMap<TableT["columns"], TableT["generated"]>[
            keyof GeneratedColumnMap<TableT["columns"], TableT["generated"]>
        ][]
    )
);
export type AddGenerated<
    TableT extends ITable,
    DelegateT extends GeneratedDelegate<TableT>
> = (
    Table<{
        readonly usedColumns : TableT["usedColumns"];
        readonly alias : TableT["alias"];
        readonly columns : TableT["columns"];

        readonly autoIncrement : TableT["autoIncrement"];
        readonly id : TableT["id"];
        readonly primaryKey : TableT["primaryKey"];
        readonly candidateKeys : TableT["candidateKeys"];

        readonly generated : (
            TableT["generated"][number] |
            ReturnType<DelegateT>[number]["name"]
        )[];
        readonly isNullable : TableT["isNullable"];
        readonly hasExplicitDefaultValue : (
            TableT["hasExplicitDefaultValue"][number] |
            ReturnType<DelegateT>[number]["name"]
        )[];
        //Generated columns cannot be mutable
        readonly mutable : Exclude<
            TableT["mutable"][number],
            ReturnType<DelegateT>[number]["name"]
        >[];

        readonly parents : TableT["parents"];
        readonly insertAllowed : TableT["insertAllowed"];
        readonly deleteAllowed : TableT["deleteAllowed"];
    }>
);
export function addGenerated<
    TableT extends ITable,
    DelegateT extends GeneratedDelegate<TableT>
> (
    table : TableT,
    delegate : DelegateT
) : (
    AddGenerated<TableT, DelegateT>
) {
    //https://github.com/Microsoft/TypeScript/issues/28592
    const columns : TableT["columns"] = table.columns;
    //https://github.com/Microsoft/TypeScript/issues/24277
    const generatedColumns : ReturnType<DelegateT> = delegate(columns) as any;

    for (let generatedColumn of generatedColumns) {
        if (table.generated.indexOf(generatedColumn.name) >= 0) {
            throw new Error(`Column ${table.alias}.${generatedColumn.name} already declared generated`);
        }
        ColumnMapUtil.assertHasColumnIdentifier(table.columns, generatedColumn);
    }
    const generated : (
        TableT["generated"][number] |
        ReturnType<DelegateT>[number]["name"]
    )[] = StringArrayUtil.uniqueString(
        [
            ...table.generated,
            ...generatedColumns.map(column => column.name),
        ]
    );
    const hasExplicitDefaultValue : (
        TableT["hasExplicitDefaultValue"][number] |
        ReturnType<DelegateT>[number]["name"]
    )[] = StringArrayUtil.uniqueString(
        [
            ...table.hasExplicitDefaultValue,
            ...generatedColumns.map(column => column.name),
        ]
    );
    const mutable : Exclude<
        TableT["mutable"][number],
        ReturnType<DelegateT>[number]["name"]
    >[] = StringArrayUtil.uniqueString(
        table.mutable.filter(
            (columnName) : columnName is Exclude<
                TableT["mutable"][number],
                ReturnType<DelegateT>[number]["name"]
            > => {
                return generatedColumns.every(
                    column => column.name != columnName
                );
            }
        )
    );

    const {
        usedColumns,
        alias,

        autoIncrement,
        id,
        primaryKey,
        candidateKeys,

        isNullable,

        parents,
        insertAllowed,
        deleteAllowed,

        unaliasedQuery,
    } = table;

    const result : AddGenerated<TableT, DelegateT> = new Table(
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
            mutable,

            parents,
            insertAllowed,
            deleteAllowed,
        },
        {unaliasedQuery}
    );
    return result;
}