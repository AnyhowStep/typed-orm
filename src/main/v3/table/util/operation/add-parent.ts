import * as sd from "schema-decorator";
import {Table, ITable} from "../../table";
import {ToUnknownIfAllFieldsNever} from "../../../type";
import {KeyUtil} from "../../../key";

export type Parent<
    TableT extends ITable,
    ParentT extends ITable
> = (
    ParentT &
    (
        KeyUtil.Array.Intersect<
            TableT["candidateKeys"],
            ParentT["candidateKeys"]
        > extends never ?
        [
            "No common candidate keys found between table and parent",
            "Candidate keys: ",
            TableT["candidateKeys"][number],
            "Parent candidate keys: ",
            ParentT["candidateKeys"][number]
        ]|void :
        unknown
    ) &
    (
        //TODO-FEATURE Recursively find incompatible types
        ToUnknownIfAllFieldsNever<
            {
                [columnName in Extract<
                    keyof TableT["columns"],
                    keyof ParentT["columns"]
                >] : (
                    ReturnType<TableT["columns"][columnName]["assertDelegate"]> extends
                    ReturnType<ParentT["columns"][columnName]["assertDelegate"]> ?
                        never :
                        [
                            "Column",
                            columnName,
                            "has incompatible types",
                            ReturnType<TableT["columns"][columnName]["assertDelegate"]>,
                            ReturnType<ParentT["columns"][columnName]["assertDelegate"]>
                        ]|void
                )
            }
        >
    ) &
    (
        ParentT["alias"] extends TableT["alias"] ?
        "Parent cannot have same alias as table"|void :
        unknown
    ) &
    (
        ParentT["alias"] extends TableT["parents"][number]["alias"] ?
        "Parent already added to table"|void :
        unknown
    )
);
export type AddParent<
    TableT extends ITable,
    ParentT extends ITable
> = (
    Table<{
        readonly usedColumns : TableT["usedColumns"];
        readonly alias : TableT["alias"];
        readonly columns : TableT["columns"];

        readonly autoIncrement : TableT["autoIncrement"];
        readonly id : TableT["id"];
        readonly primaryKey : TableT["primaryKey"];
        readonly candidateKeys : TableT["candidateKeys"];

        readonly generated : TableT["generated"];
        readonly isNullable : TableT["isNullable"];
        readonly hasExplicitDefaultValue : TableT["hasExplicitDefaultValue"];
        readonly mutable : TableT["mutable"];

        readonly parents : (
            TableT["parents"][number] |
            ParentT["parents"][number] |
            ParentT
        )[];
        readonly insertAllowed : TableT["insertAllowed"];
        readonly deleteAllowed : TableT["deleteAllowed"];
    }>
);
//+ Must share at least one unique key
//+ Duplicate columns must be assignable from child to parent
//  Example: child.type = "red"|"blue", parent.type = "red"|"blue"|"green"
//+ No duplicates
export function addParent<
    TableT extends ITable,
    ParentT extends ITable
> (
    table : TableT,
    parent : Parent<TableT, ParentT>
) : (
    AddParent<TableT, ParentT>
) {
    if (KeyUtil.Array.isDisjoint(
        table.candidateKeys,
        parent.candidateKeys
    )) {
        throw new Error(`No common candidate keys found between table ${table.alias} and parent ${parent.alias}`);
    };
    if (table.alias == parent.alias) {
        throw new Error(`Parent ${table.alias} cannot have same alias as table`);
    }
    for (let otherParent of table.parents) {
        if (otherParent.alias == parent.alias) {
            throw new Error(`Parent ${parent.alias} already added to table`);
        }
    }
    //TODO-FEATURE Recursively find incompatible types
    for (let columnName in table.columns) {
        const parentColumn = parent.columns[columnName];
        if (parentColumn == undefined) {
            continue;
        }
        if (
            sd.isNullable(table.columns[columnName].assertDelegate) !=
            sd.isNullable(parentColumn.assertDelegate)
        ) {
            throw new Error(`Parent ${parent.alias}.${columnName} and ${table.alias}.${columnName} have incompatible types; one is nullable, the other is not`);
        }
    }

    const parents : (
        TableT["parents"][number] |
        ParentT["parents"][number] |
        ParentT
    )[] = [
        ...table.parents,
        ...parent.parents,
        parent
    ];

    const {
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

        insertAllowed,
        deleteAllowed,

        unaliasedQuery,
    } = table;

    return new Table(
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
}