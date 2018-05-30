/*
This whole thing is just to hack in support for table polymorphism...

TODO Improve support for polymorphism
TODO Require the very first parent to have a unique key that is not an Expr<>?
*/
import {AnyTable} from "./table";
import {RawExprNoUsedRef} from "./raw-expr";
import {PooledDatabase} from "./PooledDatabase";
import {TableParentCollectionUtil} from "./table-parent-collection";
import * as sd from "schema-decorator";

export type PolymorphicRawInsertValueRow<TableT extends AnyTable> = (
    {
        [name in TableParentCollectionUtil.RequiredColumnNames<TableT>] : (
            RawExprNoUsedRef<TableParentCollectionUtil.ColumnType<TableT, name>>
        )
    } &
    {
        [name in TableParentCollectionUtil.OptionalColumnNames<TableT>]? : (
            RawExprNoUsedRef<TableParentCollectionUtil.ColumnType<TableT, name>>
        )
    }
);
export type PolymorphicInsertLiteralRow<TableT extends AnyTable> = (
    {
        [name in TableParentCollectionUtil.RequiredColumnNames<TableT>] : (
            TableParentCollectionUtil.ColumnType<TableT, name>
        )
    } &
    {
        [name in TableParentCollectionUtil.OptionalColumnNames<TableT>]? : (
            TableParentCollectionUtil.ColumnType<TableT, name>
        )
    }
);

export async function polymorphicInsertValueAndFetch<
    TableT extends AnyTable
> (
    db : PooledDatabase,
    table : TableT,
    row : PolymorphicRawInsertValueRow<TableT>
) : Promise<TableParentCollectionUtil.TableRow<TableT>> {
    if (table.data.parentTables == undefined) {
        //No parents, just a regular insertion
        return db.insertValueAndFetch(table, row as any) as any;
    } else {
        row = {...(row as any)};
        //Find all values of generated columns
        //They must be numeric natural number strings, because they
        //must represent enum values
        for (let g of TableParentCollectionUtil.generatedColumnNames(table)) {
            const column = TableParentCollectionUtil.tryGetGeneratedNonAutoIncrementColumn(table, g);
            if (column == undefined) {
                //TODO insert a check for auto-increment columns
                //If it is an auto-increment column, we don't want the column.
                //If it is not auto-increment, it is an error to not have a value.
                //For now, the lack of a value will cause insertion to fail anyway
                continue;
            }
            const expression = await db.getGenerationExpression(column);
            console.log(expression);
            console.log(column.tableAlias, column.name);
            (row as any)[g] = sd.stringToNaturalNumber()(g, expression);
        }

        return db.transaction(async (db) => {
            //In the event of diamond inheritance,
            //don't insert multiple rows for the base type
            const alreadyInserted = new Set<string>();
            for (let p of table.data.parentTables) {
                if (alreadyInserted.has(p.alias)) {
                    continue;
                }
                alreadyInserted.add(p.alias);

                const result : any = await db.insertValueAndFetch(p, row);
                row = {
                    ...(row as any),
                    //We want to overwrite any Expr<> instances with
                    //actual values, if applicable
                    ...result,
                };
            }
            //We *should* have gotten rid of any Expr<> instances by now
            const result = {
                ...(row as any),
                ...(await db.insertValueAndFetch(table, row as any)) as any,
            };
            //One final effort to check we really have all the correct values
            return TableParentCollectionUtil.assertDelegate(table)(
                `${table.alias}`,
                result
            );
        });
    }
}