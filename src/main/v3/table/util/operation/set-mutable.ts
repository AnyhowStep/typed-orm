import {Table, ITable} from "../../table";
import {ColumnMap, ColumnMapUtil} from "../../../column-map";
import {StringArrayUtil} from "../../../string-array";

//Generated keys cannot be mutable
export type MutableColumnMap<
    ColumnMapT extends ColumnMap,
    GeneratedT extends string[]
> = (
    {
        [columnName in Exclude<keyof ColumnMapT, GeneratedT[number]>] : (
            ColumnMapT[columnName]
        )
    }
);
export type MutableDelegate<
    TableT extends ITable
> = (
    (columnMap : MutableColumnMap<TableT["columns"], TableT["generated"]>) => (
        MutableColumnMap<TableT["columns"], TableT["generated"]>[
            keyof MutableColumnMap<TableT["columns"], TableT["generated"]>
        ][]
    )
);
/*
    TODO-FEATURE Implement addMutable(), removeMutable() ?
*/
export type SetMutable<
    TableT extends ITable,
    DelegateT extends MutableDelegate<TableT>
> = (
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
        readonly mutable : ReturnType<DelegateT>[number]["name"][];

        readonly parents : TableT["parents"];
        readonly insertAllowed : TableT["insertAllowed"];
        readonly deleteAllowed : TableT["deleteAllowed"];
    }>
);
export function setMutable<
    TableT extends ITable,
    DelegateT extends MutableDelegate<TableT>
> (
    table : TableT,
    delegate : DelegateT
) : (
    SetMutable<TableT, DelegateT>
) {
    //https://github.com/Microsoft/TypeScript/issues/28592
    const columns : TableT["columns"] = table.columns;
    //https://github.com/Microsoft/TypeScript/issues/24277
    const mutableColumns : ReturnType<DelegateT> = delegate(columns) as any;

    for (let mutableColumn of mutableColumns) {
        if (table.generated.indexOf(mutableColumn.name) >= 0) {
            throw new Error(`Column ${table.alias}.${mutableColumn.name} is generated and cannot be mutable`);
        }
        ColumnMapUtil.assertHasColumnIdentifier(table.columns, mutableColumn);
    }

    //TODO-FEATURE Make other arrays of strings always
    //have unique elements?
    const mutable : ReturnType<DelegateT>[number]["name"][] = (
        StringArrayUtil.uniqueString(
            mutableColumns.map(column => column.name)
        )
    );

    const {
        usedRef,
        alias,

        autoIncrement,
        id,
        candidateKeys,

        generated,
        isNullable,
        hasExplicitDefaultValue,

        parents,
        insertAllowed,
        deleteAllowed,

        unaliasedQuery,
    } = table;

    const result : SetMutable<TableT, DelegateT> = new Table(
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
            deleteAllowed,
        },
        {unaliasedQuery}
    );
    return result;
}