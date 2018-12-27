import {RawExprNoUsedRef} from "../../../raw-expr";
import {ITable, TableUtil} from "../../../table";
import {RequiredColumnNames, OptionalColumnNames, uniqueGeneratedColumnNames, tryGetGeneratedNonAutoIncrementColumn, assertDelegate, ColumnType, TypeMap} from "../query";
import {IConnection} from "../../../execution";
import {InsertUtil} from "../../../insert";
import * as informationSchema from "../../../information-schema";

export type InsertRow<TableT extends ITable> = (
    {
        [name in RequiredColumnNames<TableT>] : (
            RawExprNoUsedRef<
                ColumnType<TableT, name>
            >
        )
    } &
    {
        [name in OptionalColumnNames<TableT>]? : (
            RawExprNoUsedRef<
                ColumnType<TableT, name>
            >
        )
    }
);
export type InsertRowLiteral<TableT extends ITable> = (
    {
        [name in RequiredColumnNames<TableT>] : (
            ColumnType<TableT, name>
        )
    } &
    {
        [name in OptionalColumnNames<TableT>]? : (
            ColumnType<TableT, name>
        )
    }
);
export async function insertAndFetch<
    TableT extends ITable & { insertAllowed : true }
> (
    connection : IConnection & TableUtil.AssertHasCandidateKey<TableT>,
    table : TableT,
    rawInsertRow : InsertRow<TableT>
) : Promise<TypeMap<TableT>> {
    if (table.parents.length == 0) {
        return InsertUtil.insertAndFetch(
            connection,
            table,
            rawInsertRow as any
        ) as any;
    }
    let insertRow : any = {...rawInsertRow};
    for (let g of uniqueGeneratedColumnNames(table)) {
        const column = tryGetGeneratedNonAutoIncrementColumn(table, g);
        if (column == undefined) {
            continue;
        } else {
            const generationExpression = await informationSchema.fetchGenerationExpression(
                connection,
                column
            );
            //This will be a `string`.
            //It's up to the individual assert delegates to
            //cast this to the appropriate data types.
            insertRow[g] = generationExpression;
        }
    }

    return connection.transactionIfNotInOne(async (connection) => {
        //In the event of diamond inheritance,
        //don't insert multiple rows for the base type
        const alreadyInserted = new Set<string>();

        for (let p of table.parents) {
            if (alreadyInserted.has(p.alias)) {
                continue;
            }
            alreadyInserted.add(p.alias);

            const result : any = await InsertUtil.insertAndFetch(
                connection as any,
                p as any,
                insertRow as any
            );
            insertRow = {
                ...(insertRow as any),
                //We want to overwrite any Expr<> instances with
                //actual values, if applicable
                ...result,
            };
        }
        //We *should* have gotten rid of any Expr<> instances by now
        const result = {
            ...(insertRow as any),
            ...(
                await InsertUtil.insertAndFetch(
                    connection as any,
                    table,
                    insertRow as any
                )
            ) as any,
        };
        //One final effort to check we really have all the correct values
        return assertDelegate(table)(
            `${table.alias}`,
            result
        );
    });
}