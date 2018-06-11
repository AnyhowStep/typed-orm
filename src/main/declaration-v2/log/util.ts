import * as sd from "schema-decorator";
import {LogData} from "./log-data";
import {PooledDatabase} from "../PooledDatabase";
import {ColumnCollectionUtil} from "../column-collection";
import {RawExprUtil} from "../raw-expr";
import {TableRow, TableUtil} from "../table";

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
    export type DoNotCopyOnTrackableChanged<DataT extends LogData> = (
        {
            [name in Extract<
                TableUtil.RequiredColumnNames<DataT["table"]>,
                Extract<
                    keyof DataT["doNotCopyOnTrackableChanged"],
                    string
                >
            >] : (
                ReturnType<DataT["table"]["columns"][name]["assertDelegate"]>
            )
        } &
        {
            [name in Extract<
                TableUtil.OptionalColumnNames<DataT["table"]>,
                Extract<
                    keyof DataT["doNotCopyOnTrackableChanged"],
                    string
                >
            >]? : (
                ReturnType<DataT["table"]["columns"][name]["assertDelegate"]>
            )
        }
    );
    export function doNotCopyOnTrackableChangedAssertDelegate<DataT extends LogData> (
        data : DataT
    ) : sd.AssertDelegate<DoNotCopyOnTrackableChanged<DataT>> {
        const columnCollection = ColumnCollectionUtil.extractColumnNames(
            data.table.columns,
            Object.keys(data.doNotCopyOnTrackableChanged)
        );
        return sd.schema(
            ...Object.keys(columnCollection)
                .map((columnName) => {
                    const column = columnCollection[columnName];
                    if (data.table.data.hasDefaultValue[columnName] === true) {
                        //Is optional
                        return sd.field(column.name, column.assertDelegate).optional();
                    } else {
                        //Required
                        return sd.field(column.name, column.assertDelegate);
                    }
                })
        ) as any;
    }
    export type InsertIfDifferentRow<DataT extends LogData> = (
        Trackable<DataT> &
        DoNotCopyOnTrackableChanged<DataT>
    );
    export function insertIfDifferentRowAssertDelegate<DataT extends LogData> (
        data : DataT
    ) : sd.AssertDelegate<InsertIfDifferentRow<DataT>> {
        return sd.intersect(
            trackableAssertDelegate(data),
            doNotCopyOnTrackableChangedAssertDelegate(data)
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
        insertIfDifferentRow : InsertIfDifferentRow<DataT>
    ) : Promise<{
        latest : TableRow<DataT["table"]>,
        wasInserted : boolean,
    }> {
        return db.transactionIfNotInOne(async (db) => {
            const trackable = trackableAssertDelegate(data)(`${data.table.alias} trackable`, insertIfDifferentRow);
            const doNotCopy = doNotCopyOnTrackableChangedAssertDelegate(data)(`${data.table.alias} do not copy`, insertIfDifferentRow);

            let differenceFound = false;
            const curValues = await fetchLatestOrDefault(db, data, entityIdentifier);
            for (let columnName in trackable) {
                const newTrackableValue = (trackable as any)[columnName];
                if (newTrackableValue === undefined) {
                    continue;
                }

                const curValue = (curValues as any)[columnName];
                if (newTrackableValue !== curValue) {
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
                if (data.doNotCopyOnTrackableChanged[columnName] === true) {
                    continue;
                }
                if (
                    data.entityIdentifier[columnName] === true ||
                    data.isTrackable[columnName] === true// ||
                    //Deprecated, pass the column to doNotCopyOnTrackableChanged
                    //data.table.data.hasDefaultValue[columnName] !== true
                ) {
                    toInsert[columnName] = (curValues as any)[columnName];
                }
            }
            //Overwrite with new values
            for (let columnName in trackable) {
                const newTrackableValue = (trackable as any)[columnName];
                if (newTrackableValue === undefined) {
                    continue;
                }
                toInsert[columnName] = newTrackableValue;
            }
            for (let columnName in doNotCopy) {
                const newValue = (doNotCopy as any)[columnName];
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
export type Trackable<DataT extends LogData> = LogDataUtil.Trackable<DataT>;