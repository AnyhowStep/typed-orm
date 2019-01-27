import * as sd from "schema-decorator";
import {Table, ITable} from "../../table";
import {IAnonymousTypedColumn} from "../../../column";
import {KeyUtil} from "../../../key";
import {ColumnMapUtil} from "../../../column-map";
import {StringArrayUtil} from "../../../string-array";

//Auto-increment columns cannot be nullable
//The `number|string|bigint` requirement is only a compile-time constraint
//TODO-DEBATE Consider having run-time checks to see if it allows 1,2,3,4,5,... ?
export type AutoIncrementColumnMap<TableT extends ITable> = (
    {
        [columnName in {
            [columnName in keyof TableT["columns"]] : (
                TableT["columns"][columnName] extends IAnonymousTypedColumn<number|string|bigint> ?
                (
                    columnName extends TableT["candidateKeys"][number][number] ?
                    never :
                    columnName
                ) :
                never
            )
        }[keyof TableT["columns"]]] : (
            TableT["columns"][columnName]
        )
    }
);
export type AutoIncrementDelegate<TableT extends ITable> = (
    (columnMap : AutoIncrementColumnMap<TableT>) => (
        AutoIncrementColumnMap<TableT>[
            keyof AutoIncrementColumnMap<TableT>
        ]
    )
);
export type SetAutoIncrement<
    TableT extends ITable,
    DelegateT extends AutoIncrementDelegate<TableT>
> = (
    Table<{
        readonly usedColumns : TableT["usedColumns"];
        readonly alias : TableT["alias"];
        readonly columns : TableT["columns"];

        readonly autoIncrement : ReturnType<DelegateT>["name"];
        readonly id : ReturnType<DelegateT>["name"];
        readonly primaryKey : ReturnType<DelegateT>["name"][];
        readonly candidateKeys : (
            TableT["candidateKeys"][number] |
            (ReturnType<DelegateT>["name"][])
        )[];

        readonly generated : (
            TableT["generated"][number] |
            ReturnType<DelegateT>["name"]
        )[];
        readonly isNullable : TableT["isNullable"];
        readonly hasExplicitDefaultValue : (
            TableT["hasExplicitDefaultValue"][number] |
            ReturnType<DelegateT>["name"]
        )[];
        //Generated columns cannot be mutable
        readonly mutable : Exclude<
            TableT["mutable"][number],
            ReturnType<DelegateT>["name"]
        >[];

        readonly parents : TableT["parents"];
        readonly insertAllowed : TableT["insertAllowed"];
        readonly deleteAllowed : TableT["deleteAllowed"];
    }>
);
export function setAutoIncrement<
    TableT extends ITable,
    DelegateT extends AutoIncrementDelegate<TableT>
> (
    table : TableT,
    delegate : DelegateT
) : (
    SetAutoIncrement<TableT, DelegateT>
) {
    //https://github.com/Microsoft/TypeScript/issues/28592
    const columns : TableT["columns"] = table.columns;
    //https://github.com/Microsoft/TypeScript/issues/24277
    const autoIncrement : ReturnType<DelegateT> = delegate(columns) as any;

    if (sd.isNullable(autoIncrement.assertDelegate)) {
        throw new Error(`A primary key cannot have a nullable column; ${autoIncrement.tableAlias}.${autoIncrement.name} is nullable`);
    }

    const key = [autoIncrement.name];
    if (KeyUtil.Array.hasSubKey(
        table.candidateKeys,
        key
    )) {
        throw new Error(`Cannot add ${key.join("|")} as candidate key of ${table.alias}; it is a super key of some candidate key`);
    }
    if (KeyUtil.Array.hasSuperKey(
        table.candidateKeys,
        key
    )) {
        throw new Error(`Cannot add ${key.join("|")} as candidate key of ${table.alias}; it is a sub key of some candidate key`);
    }

    ColumnMapUtil.assertHasColumnIdentifier(table.columns, autoIncrement);
    const candidateKeys : (
        TableT["candidateKeys"][number] |
        (ReturnType<DelegateT>["name"][])
    )[] = StringArrayUtil.uniqueStringArray(
        table.candidateKeys.concat([
            [autoIncrement.name]
        ])
    );

    const generated : (
        TableT["generated"][number] |
        ReturnType<DelegateT>["name"]
    )[] = (table.generated.indexOf(autoIncrement.name) >= 0) ?
        table.generated :
        [
            ...table.generated,
            autoIncrement.name
        ];
    const hasExplicitDefaultValue : (
        TableT["hasExplicitDefaultValue"][number] |
        ReturnType<DelegateT>["name"]
    )[] = (table.hasExplicitDefaultValue.indexOf(autoIncrement.name) >= 0) ?
        table.hasExplicitDefaultValue :
        [
            ...table.hasExplicitDefaultValue,
            autoIncrement.name,
        ];
    const mutable : Exclude<
        TableT["mutable"][number],
        ReturnType<DelegateT>["name"]
    >[] = table.mutable.filter(
        (columnName) : columnName is Exclude<
            TableT["mutable"][number],
            ReturnType<DelegateT>["name"]
        > => {
            return (columnName != autoIncrement.name);
        }
    );
    const {
        usedColumns,
        alias,
        isNullable,
        parents,
        insertAllowed,
        deleteAllowed,

        unaliasedQuery,
    } = table;

    const result : SetAutoIncrement<TableT, DelegateT> = new Table(
        {
            usedColumns,
            alias,
            columns,

            autoIncrement : autoIncrement.name,
            id : autoIncrement.name,
            primaryKey : [autoIncrement.name],
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