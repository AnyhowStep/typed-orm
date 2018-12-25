import {Table, ITable} from "../../table";
import {CandidateKeyArrayUtil} from "../../../candidate-key-array";
import {ColumnMapUtil} from "../../../column-map";

export type IdColumnMap<TableT extends ITable> = (
    {
        [columnName in {
            [columnName in keyof TableT["columns"]] : (
                (
                    columnName extends TableT["candidateKeys"][number][number] ?
                    never :
                    columnName
                )
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

    const key = [id.name];
    if (CandidateKeyArrayUtil.hasSubKey(
        table.candidateKeys,
        key
    )) {
        throw new Error(`Cannot add ${key.join("|")} as candidate key of ${table.alias}; it is a super key of some candidate key`);
    }
    if (CandidateKeyArrayUtil.hasSuperKey(
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