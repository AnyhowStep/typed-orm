/*
For now, only supports simple updates.

UPDATE
    `base`,
    `derived`
FROM
    `derived`
JOIN
    `base`
ON
    `commonUniqueKey`
SET
    `column` = `value`
WHERE
    `derivedUniqueKeyCondition`
*/
import {AnyTable, UniqueKeys} from "./table";
import {AllowedExprConstant, SelectValueBuilder, RawExprUtil} from "./raw-expr";
import {Expr} from "./expr";
import {ColumnReferencesUtil} from "./column-references";
import {Column} from "./column";
import {PooledDatabase} from "./PooledDatabase";
import {TableParentCollectionUtil} from "./table-parent-collection";
import {UniqueKeyCollectionUtil} from "./unique-key-collection";
import {TableData} from "./table-data";
import {UpdateResult} from "./update-builder";

export type PolymorphicUpdateResult = (
    UpdateResult &
    {
        exists : boolean,
    }
);

export type PolymorphicRawUpdateAssignmentType<
    TableT extends AnyTable,
    ColumnNameT extends string
> = (
    Extract<
        TableParentCollectionUtil.ColumnType<TableT, ColumnNameT>,
        AllowedExprConstant
    >
);

export type PolymorphicRawUpdateAssignment<
    TableT extends AnyTable,
    ColumnNameT extends string
> = (
    PolymorphicRawUpdateAssignmentType<TableT, ColumnNameT> |
    Extract<
        ColumnReferencesUtil.Columns<
            TableParentCollectionUtil.ToColumnReferences<TableT>
        >,
        Column<any, any, PolymorphicRawUpdateAssignmentType<TableT, ColumnNameT>>
    > |
    Expr<
        ColumnReferencesUtil.Partial<
            TableParentCollectionUtil.ToColumnReferences<TableT>
        >,
        PolymorphicRawUpdateAssignmentType<TableT, ColumnNameT>
    > |
    SelectValueBuilder<PolymorphicRawUpdateAssignmentType<TableT, ColumnNameT>>
);

export type PolymorphicRawUpdateAssignmentCollection<
    TableT extends AnyTable
> = (
    {
        [columnName in TableParentCollectionUtil.MutableColumnNames<TableT>]? : (
            PolymorphicRawUpdateAssignment<TableT, columnName>
        )
    }
);

export type PolymorphicUpdateAssignmentCollectionDelegate<
    TableT extends AnyTable
> = (
    (
        c : ColumnReferencesUtil.ToConvenient<
            TableParentCollectionUtil.ToColumnReferences<TableT>
        >,
        //TODO Support inheriting parent scope for subqueries in polymorphic updates
        //s : SelectBuilderT
    ) => (
        PolymorphicRawUpdateAssignmentCollection<TableT>
    )
);

export async function polymorphicUpdateZeroOrOneByUniqueKey<
    TableT extends AnyTable
> (
    db : PooledDatabase,
    table : TableT,
    uniqueKey : UniqueKeys<TableT>,
    setDelegate : PolymorphicUpdateAssignmentCollectionDelegate<TableT>
) : Promise<PolymorphicUpdateResult> {
    return db.transactionIfNotInOne(async (db) => {
        let s : any = db.from(table);


        if (table.data.parentTables != undefined) {
            //So we don't join to the same table multiple times
            const alreadyJoined = new Set<string>();
            alreadyJoined.add(table.alias);

            let prv = table;
            for (let i=table.data.parentTables.length-1; i>=0; --i) {
                const cur = table.data.parentTables[i];
                if (alreadyJoined.has(cur.alias)) {
                    continue;
                }
                alreadyJoined.add(cur.alias);

                const prvUniqueKeys = (prv.data as TableData).uniqueKeys;
                const curUniqueKeys = (cur.data as TableData).uniqueKeys;

                if (prvUniqueKeys == undefined) {
                    throw new Error(`${prv.alias} has no unique keys`);
                }
                if (curUniqueKeys == undefined) {
                    throw new Error(`${cur.alias} has no unique keys`);
                }

                const commonUniqueKeys = UniqueKeyCollectionUtil.commonUniqueKeys(
                    prvUniqueKeys,
                    curUniqueKeys
                );
                if (commonUniqueKeys.length == 0) {
                    throw new Error(`${prv.alias} and ${cur.alias} have no unique keys in common`);
                }
                const uniqueKey = commonUniqueKeys[0];
                if (i == table.data.parentTables.length-1) {
                    s = s.joinUsing(
                        cur,
                        (c : any) => Object.keys(uniqueKey)
                            .map((columnName) => c[columnName])
                    );
                } else {
                    s = s.joinUsing(
                        cur,
                        (c : any) => Object.keys(uniqueKey)
                            .map((columnName) => {
                                //Find the best table to use for the join
                                if (table.columns.hasOwnProperty(columnName)) {
                                    return c[table.alias][columnName];
                                } else {
                                    for (let j=table.data.parentTables.length-1; j>=0; --j) {
                                        const p = table.data.parentTables[j];
                                        if (p.columns.hasOwnProperty(columnName)) {
                                            return c[p.alias][columnName];
                                        }
                                    }
                                    throw new Error(`No table in the inheritance hierarchy of ${table.alias} has column ${columnName}`);
                                }
                            })
                    );
                }

                prv = cur;
            }
        }
        s = s.where(() => RawExprUtil.toUniqueKeyEqualityCondition(
            table,
            uniqueKey
        ));

        const tablesToUpdate = new Set<string>();

        const updateResult = await s.set((c : any) => {
            const assignments = setDelegate(c);
            const result : any = {};
            const tables : AnyTable[] = [table];
            if (table.data.parentTables != undefined) {
                tables.push(...table.data.parentTables);
            }
            for (let columnName in assignments) {
                const value = (assignments as any)[columnName];
                for (let t of tables) {
                    if (t.columns.hasOwnProperty(columnName)) {
                        if (result[t.alias] == undefined) {
                            result[t.alias] = {};
                        }
                        result[t.alias][columnName] = value;
                        if (value !== undefined) {
                            tablesToUpdate.add(t.alias);
                        }
                    }
                }
            }
            return result;
        }).execute();

        const expectedFoundRowCount = tablesToUpdate.size;

        if (
            updateResult.foundRowCount > 0 &&
            updateResult.foundRowCount != expectedFoundRowCount
        ) {
            //Should not be possible
            throw new Error(`Expected to find zero or ${expectedFoundRowCount} rows from the inheritance hierarchy of ${table.alias}, with unique key ${Object.keys(uniqueKey).join(", ")}; found ${updateResult.foundRowCount} rows`);
        }

        if (updateResult.foundRowCount < 0) {
            //No update was even attempted, probably an empty SET clause
            const exists = await s.exists();
            if (exists) {
                return {
                    ...updateResult,
                    exists : true,
                };
            } else {
                return {
                    ...updateResult,
                    exists : false,
                };
            }
        }

        return {
            ...updateResult,
            exists : (updateResult.foundRowCount > 0) ?
                true :
                false
        };
    });
}