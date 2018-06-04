import * as sd from "schema-decorator";
import {LogData} from "./log-data";
import {PooledDatabase} from "../PooledDatabase";
import {ColumnCollectionUtil} from "../column-collection";
import {RawExprUtil} from "../raw-expr";
import {TableRow} from "../table";

export namespace LogDataUtil {
    export type EntityIdentifier<DataT extends LogData> = (
        {
            [columnName in Extract<
                Extract<
                    keyof DataT["table"]["columns"],
                    keyof DataT["entityIdentifier"]
                >,
                string
            >] : (
                ReturnType<DataT["table"]["columns"][columnName]["assertDelegate"]>
            )
        }
    );
    export function entityIdentifierAssertDelegate<DataT extends LogData> (
        data : DataT
    ) : sd.AssertDelegate<EntityIdentifier<DataT>> {
        return ColumnCollectionUtil.assertDelegate(
            data.table.columns,
            Object.keys(data.entityIdentifier)
        ) as any;
    }
    export type Trackable<DataT extends LogData> = (
        {
            [columnName in Extract<
                Extract<
                    keyof DataT["table"]["columns"],
                    keyof DataT["isTrackable"]
                >,
                string
            >]? : (
                ReturnType<DataT["table"]["columns"][columnName]["assertDelegate"]>
            )
        }
    );
    export function trackableAssertDelegate<DataT extends LogData> (
        data : DataT
    ) : sd.AssertDelegate<Trackable<DataT>> {
        return ColumnCollectionUtil.partialAssertDelegate(
            data.table.columns,
            Object.keys(data.isTrackable)
        ) as any;
    }
    export function fetchLatestOrError<
        DataT extends LogData
    > (
        db : PooledDatabase,
        data : DataT,
        entityIdentifier : EntityIdentifier<DataT>
    ) : Promise<TableRow<DataT["table"]>> {
        entityIdentifier = entityIdentifierAssertDelegate(data)(`${data.table.alias} entity identifier`, entityIdentifier);
        return (db.from(data.table) as any)
            .where(() => RawExprUtil.toEqualityCondition(
                data.table,
                entityIdentifier
            ))
            .orderBy((c : any) => {
                return data.orderByLatest.map(orderBy => [
                    c[orderBy[0]],
                    orderBy[1]
                ]);
            })
            .limit(1)
            .selectAll()
            .fetchOne();
    }
    export function fetchLatestOrUndefined<
        DataT extends LogData
    > (
        db : PooledDatabase,
        data : DataT,
        entityIdentifier : EntityIdentifier<DataT>
    ) : Promise<TableRow<DataT["table"]>|undefined> {
        entityIdentifier = entityIdentifierAssertDelegate(data)(`${data.table.alias} entity identifier`, entityIdentifier);
        return (db.from(data.table) as any)
            .where(() => RawExprUtil.toEqualityCondition(
                data.table,
                entityIdentifier
            ))
            .orderBy((c : any) => {
                return data.orderByLatest.map(orderBy => [
                    c[orderBy[0]],
                    orderBy[1]
                ]);
            })
            .limit(1)
            .selectAll()
            .fetchZeroOrOne();
    }
    export async function fetchLatestOrDefault<
        DataT extends LogData
    > (
        db : PooledDatabase,
        data : DataT,
        entityIdentifier : EntityIdentifier<DataT>
    ) : Promise<TableRow<DataT["table"]>> {
        entityIdentifier = entityIdentifierAssertDelegate(data)(`${data.table.alias} entity identifier`, entityIdentifier);
        const result = await fetchLatestOrUndefined(db, data, entityIdentifier);
        if (result != undefined) {
            return result;
        }

        if (data.defaultRowDelegate == undefined) {
            throw new Error(`Could not fetch latest log for ${data.table.alias}, ${JSON.stringify(entityIdentifier)}, and no default row has been specified`);
        }
        return data.defaultRowDelegate(entityIdentifier, db);
    }

    export function insertIfDifferentAndFetch<
        DataT extends LogData
    > (
        db : PooledDatabase,
        data : DataT,
        entityIdentifier : EntityIdentifier<DataT>,
        newValues : Trackable<DataT>
    ) : Promise<{
        latest : TableRow<DataT["table"]>,
        wasInserted : boolean,
    }> {
        return db.transactionIfNotInOne(async (db) => {
            newValues = trackableAssertDelegate(data)(`${data.table.alias} trackable`, newValues);

            let differenceFound = false;
            const curValues = await fetchLatestOrDefault(db, data, entityIdentifier);
            for (let columnName in newValues) {
                const newValue = (newValues as any)[columnName];
                if (newValue === undefined) {
                    continue;
                }

                const curValue = (curValues as any)[columnName];
                if (newValue !== curValue) {
                    differenceFound = true;
                    break;
                }
            }

            if (!differenceFound) {
                return {
                    latest : curValues,
                    wasInserted : false,
                };
            }

            const toInsert : any = {};
            for (let columnName in curValues) {
                if (data.table.data.isGenerated[columnName] === true) {
                    continue;
                }
                if (
                    data.entityIdentifier[columnName] === true ||
                    data.isTrackable[columnName] === true ||
                    data.table.data.hasDefaultValue[columnName] !== true
                ) {
                    toInsert[columnName] = (curValues as any)[columnName];
                }
            }
            //Overwrite with new values
            for (let columnName in newValues) {
                const newValue = (newValues as any)[columnName];
                if (newValue === undefined) {
                    continue;
                }
                toInsert[columnName] = newValue;
            }

            return {
                latest : await db.insertValueAndFetch(
                    data.table,
                    toInsert
                ) as any,
                wasInserted : true,
            };
        });
    }
}