import * as sd from "schema-decorator";
import {Table, ITable} from "../../table";
import {KeyUtil} from "../../../key";
import {ColumnMapUtil} from "../../../column-map";
import {IAnonymousTypedColumn} from "../../../column";
import {NonNullPrimitiveExpr} from "../../../primitive-expr";

//This `id` will be a PK.
//So, it cannot be nullable.
export type IdColumnMap<TableT extends ITable> = (
    {
        [columnName in {
            [columnName in keyof TableT["columns"]] : (
                TableT["columns"][columnName] extends IAnonymousTypedColumn<NonNullPrimitiveExpr> ?
                (
                    columnName extends TableT["candidateKeys"][number][number] ?
                    never :
                    columnName
                ) :
                //Cannot be nullable
                never
            )
        }[keyof TableT["columns"]]] : (
            TableT["columns"][columnName]
        )
    }
);
export type IdDelegate<TableT extends ITable> = (
    (columnMap : IdColumnMap<TableT>) => (
        IdColumnMap<TableT>[
            keyof IdColumnMap<TableT>
        ]
    )
);
export type SetId<
    TableT extends ITable,
    DelegateT extends IdDelegate<TableT>
> = (
    Table<{
        readonly usedRef : TableT["usedRef"];
        readonly alias : TableT["alias"];
        readonly columns : TableT["columns"];

        readonly autoIncrement : TableT["autoIncrement"];
        readonly id : ReturnType<DelegateT>["name"];
        readonly primaryKey : ReturnType<DelegateT>["name"][];
        readonly candidateKeys : (
            TableT["candidateKeys"][number] |
            (ReturnType<DelegateT>["name"][])
        )[];

        readonly generated : TableT["generated"];
        readonly isNullable : TableT["isNullable"];
        readonly hasExplicitDefaultValue : TableT["hasExplicitDefaultValue"];
        readonly mutable : TableT["mutable"];

        readonly parents : TableT["parents"];
        readonly insertAllowed : TableT["insertAllowed"];
        readonly deleteAllowed : TableT["deleteAllowed"];
    }>
);
export function setId<
    TableT extends ITable,
    DelegateT extends IdDelegate<TableT>
> (
    table : TableT,
    delegate : DelegateT
) : (
    SetId<TableT, DelegateT>
) {
    //https://github.com/Microsoft/TypeScript/issues/28592
    const columns : TableT["columns"] = table.columns;
    //https://github.com/Microsoft/TypeScript/issues/24277
    const id : ReturnType<DelegateT> = delegate(columns) as any;

    if (sd.isNullable(id.assertDelegate)) {
        throw new Error(`A primary key cannot have a nullable column; ${id.tableAlias}.${id.name} is nullable`);
    }

    const key = [id.name];
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

    ColumnMapUtil.assertHasColumnIdentifier(table.columns, id);
    const candidateKeys : (
        TableT["candidateKeys"][number] |
        (ReturnType<DelegateT>["name"][])
    )[] = table.candidateKeys.concat([
        [id.name]
    ]);

    const {
        usedRef,
        alias,
        autoIncrement,
        generated,
        isNullable,
        hasExplicitDefaultValue,
        mutable,
        parents,
        insertAllowed,
        deleteAllowed,

        unaliasedQuery,
    } = table;

    const result : SetId<TableT, DelegateT> = new Table(
        {
            usedRef,
            alias,
            columns,

            autoIncrement,
            id : id.name,
            primaryKey : [id.name],
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