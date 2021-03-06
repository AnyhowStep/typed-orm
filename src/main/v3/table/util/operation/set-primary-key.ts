import * as sd from "type-mapping";
//import {IColumn} from "../../../column";
import {Table, ITable} from "../../table";
import {IAnonymousTypedColumn} from "../../../column";
import {NonNullPrimitiveExpr} from "../../../primitive-expr";
import {AssertValidCandidateKeyDelegate, AssertValidCandidateKeyDelegate_Hack, addCandidateKey, AddCandidateKey} from "./add-candidate-key";

export type PrimaryKeyColumnMap<TableT extends ITable> = (
    {
        [columnName in {
            [columnName in keyof TableT["columns"]] : (
                TableT["columns"][columnName] extends IAnonymousTypedColumn<NonNullPrimitiveExpr> ?
                columnName :
                //Cannot be nullable
                never
            )
        }[keyof TableT["columns"]]] : (
            TableT["columns"][columnName]
        )
    }
);
export type PrimaryKeyDelegate<
    TableT extends ITable
> = (
    (columnMap : PrimaryKeyColumnMap<TableT>) => (
        //ColumnUtil.FromColumnMap<TableT["columns"]>[]
        /*(
            PrimaryKeyColumnMap<TableT>[
                keyof PrimaryKeyColumnMap<TableT>
            ]
        )[]*/
        TableT["columns"][string][]
        //IColumn[]
    )
);
export type SetPrimaryKey<
    TableT extends ITable,
    DelegateT extends PrimaryKeyDelegate<TableT>
> = (
    Table<{
        readonly usedRef : TableT["usedRef"];
        readonly alias : TableT["alias"];
        readonly columns : TableT["columns"];

        readonly autoIncrement : TableT["autoIncrement"];
        readonly id : TableT["id"];
        readonly primaryKey : (
            (ReturnType<DelegateT>[number]["name"][])
        );
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
export function setPrimaryKey<
    TableT extends ITable,
    DelegateT extends PrimaryKeyDelegate<TableT>
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
        SetPrimaryKey<TableT, DelegateT>
    >
    //SetPrimaryKey<TableT, DelegateT>
) {
    //https://github.com/Microsoft/TypeScript/issues/28592
    const columns : TableT["columns"] = table.columns;
    //https://github.com/Microsoft/TypeScript/issues/24277
    const primaryKeyColumns : ReturnType<DelegateT> = delegate(columns) as any;

    for (let c of primaryKeyColumns) {
        if (sd.canOutputNull(c.assertDelegate)) {
            throw new Error(`A primary key cannot have a nullable column; ${c.tableAlias}.${c.name} is nullable`);
        }
    }

    const withCandidateKey = addCandidateKey(
        table,
        (() => primaryKeyColumns) as any
    ) as AddCandidateKey<TableT, DelegateT>;

    const {
        usedRef,
        alias,

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

        unaliasedQuery,
    } = withCandidateKey;

    const result : SetPrimaryKey<TableT, DelegateT> = new Table(
        {
            usedRef,
            alias,
            columns,

            autoIncrement,
            id,
            primaryKey : (
                primaryKeyColumns.map(c => c.name)
            ),
            candidateKeys,

            generated,
            isNullable,
            hasExplicitDefaultValue,
            mutable,

            parents,
            insertAllowed,
            deleteAllowed,
        },
        { unaliasedQuery }
    );
    return result as any;
}