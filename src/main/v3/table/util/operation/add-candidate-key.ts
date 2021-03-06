import {Table, ITable} from "../../table";
import {ColumnMapUtil} from "../../../column-map";
import {ColumnUtil} from "../../../column";
import {KeyUtil} from "../../../key";
import {StringArrayUtil} from "../../../string-array";

export type CandidateKeyDelegate<
    TableT extends ITable
> = (
    (columnMap : TableT["columns"]) => (
        //ColumnUtil.FromColumnMap<TableT["columns"]>[]
        TableT["columns"][string][]
        //IColumn[]
    )
);
export type AssertValidCandidateKeyDelegate<
    TableT extends ITable,
    DelegateT extends CandidateKeyDelegate<TableT>
> = (
    DelegateT &
    (
        KeyUtil.Array.FindSubKey<
            TableT["candidateKeys"],
            ReturnType<DelegateT>[number]["name"][]
        > extends never ?
        (
            KeyUtil.Array.FindSuperKey<
                TableT["candidateKeys"],
                ReturnType<DelegateT>[number]["name"][]
            > extends never ?
            unknown :
            [
                "Cannot add key as candidate key",
                ReturnType<DelegateT>[number]["name"],
                "is a sub key of",
                KeyUtil.Array.FindSuperKey<
                    TableT["candidateKeys"],
                    ReturnType<DelegateT>[number]["name"][]
                >
            ]
        ) :
        [
            "Cannot add key as candidate key",
            ReturnType<DelegateT>[number]["name"],
            "is a super key of",
            KeyUtil.Array.FindSubKey<
                TableT["candidateKeys"],
                ReturnType<DelegateT>[number]["name"][]
            >
        ]
    )
);

//https://github.com/Microsoft/TypeScript/issues/29133
export type AssertValidCandidateKeyDelegate_Hack<
    TableT extends ITable,
    DelegateT extends CandidateKeyDelegate<TableT>,
    ResultT
> = (
    ReturnType<DelegateT>[number] extends ColumnUtil.FromColumnMap<TableT["columns"]> ?
    (
        KeyUtil.Array.FindSubKey<
            TableT["candidateKeys"],
            ReturnType<DelegateT>[number]["name"][]
        > extends never ?
        (
            KeyUtil.Array.FindSuperKey<
                TableT["candidateKeys"],
                ReturnType<DelegateT>[number]["name"][]
            > extends never ?
            ResultT :
            [
                "Cannot add key as candidate key",
                ReturnType<DelegateT>[number]["name"],
                "is a sub key of",
                KeyUtil.Array.FindSuperKey<
                    TableT["candidateKeys"],
                    ReturnType<DelegateT>[number]["name"][]
                >
            ]|void
        ) :
        [
            "Cannot add key as candidate key",
            ReturnType<DelegateT>[number]["name"],
            "is a super key of",
            KeyUtil.Array.FindSubKey<
                TableT["candidateKeys"],
                ReturnType<DelegateT>[number]["name"][]
            >
        ]|void
    ) :
    [
        Exclude<
            ReturnType<DelegateT>[number],
            ColumnUtil.FromColumnMap<TableT["columns"]>
        >,
        "is not a column of",
        TableT["alias"]
    ]|void
);
export type AddCandidateKey<
    TableT extends ITable,
    DelegateT extends CandidateKeyDelegate<TableT>
> = (
    Table<{
        readonly usedRef : TableT["usedRef"];
        readonly alias : TableT["alias"];
        readonly columns : TableT["columns"];

        readonly autoIncrement : TableT["autoIncrement"];
        readonly id : TableT["id"];
        readonly primaryKey : TableT["primaryKey"];
        readonly candidateKeys : (
            TableT["candidateKeys"][number] |
            (ReturnType<DelegateT>[number]["name"][])
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
export function addCandidateKey<
    TableT extends ITable,
    DelegateT extends CandidateKeyDelegate<TableT>
> (
    table : TableT,
    delegate : AssertValidCandidateKeyDelegate<
        TableT,
        DelegateT
    >
) : (
    AssertValidCandidateKeyDelegate_Hack<
        TableT,
        DelegateT,
        AddCandidateKey<TableT, DelegateT>
    >
    //AddCandidateKey<TableT, DelegateT>
) {
    //https://github.com/Microsoft/TypeScript/issues/28592
    const columns : TableT["columns"] = table.columns;
    //https://github.com/Microsoft/TypeScript/issues/24277
    const candidateKeyColumns : ReturnType<DelegateT> = delegate(columns) as any;

    for (let candidateKeyColumn of candidateKeyColumns) {
        ColumnMapUtil.assertHasColumnIdentifier(table.columns, candidateKeyColumn);
    }

    const key = StringArrayUtil.uniqueString(
        candidateKeyColumns.map(
            candidateKeyColumn => candidateKeyColumn.name
        )
    );
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

    const candidateKeys : (
        TableT["candidateKeys"][number] |
        (ReturnType<DelegateT>[number]["name"][])
    )[] = table.candidateKeys.concat([key]);

    const {
        usedRef,
        alias,

        autoIncrement,
        id,
        primaryKey,

        generated,
        isNullable,
        hasExplicitDefaultValue,
        mutable,

        parents,
        insertAllowed,
        deleteAllowed,

        unaliasedQuery,
    } = table;

    const result : AddCandidateKey<TableT, DelegateT> = new Table(
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
    return result as any;
}