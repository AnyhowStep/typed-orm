import * as sd from "schema-decorator";
import {LogData} from "./log-data";
import {PooledDatabase} from "../PooledDatabase";
import {ColumnCollectionUtil} from "../column-collection";
import {RawExprUtil, AllowedExprConstant} from "../raw-expr";
import {Table, TableRow, TableUtil} from "../table";
import {Column} from "../column";
//import {SelectValue} from "../select-value";
import {Expr} from "../expr";
import {ColumnReferencesUtil} from "../column-references";
import {coalesce} from "../expression/coalesce";
import {and} from "../expression/logical-connective/and";
import {isNotNullAndEq} from "../expression/type-check";
import {SelectBuilderUtil} from "../select-builder-util";
import {RawInsertValueRow} from "../insert-value-builder";
import * as mysql from "typed-mysql";

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
    //Like Trackable, but all trackable fields are required
    export type FullOverwriteTrackable<DataT extends LogData> = (
        {
            [columnName in Extract<
                Extract<
                    keyof DataT["table"]["columns"],
                    keyof DataT["isTrackable"]
                >,
                string
            >] : (
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
    export function fullOverwriteTrackableAssertDelegate<DataT extends LogData> (
        data : DataT
    ) : sd.AssertDelegate<FullOverwriteTrackable<DataT>> {
        return ColumnCollectionUtil.assertDelegate(
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
    export type DoNotModifyOnTrackableChanged<DataT extends LogData> = (
        {
            [name in Extract<
                Exclude<
                    keyof DataT["table"]["columns"],
                    (
                        (keyof DataT["doNotCopyOnTrackableChanged"])|
                        (keyof DataT["isTrackable"])|
                        (keyof DataT["entityIdentifier"])
                    )
                >,
                string
            >] : (
                ReturnType<DataT["table"]["columns"][name]["assertDelegate"]>
            )
        }
    );
    export function doNotModifyOnTrackableChangedAssertDelegate<DataT extends LogData> (
        data : DataT
    ) : sd.AssertDelegate<DoNotModifyOnTrackableChanged<DataT>> {
        const columnCollection = ColumnCollectionUtil.excludeColumnNames(
            data.table.columns,
            Object.keys(data.doNotCopyOnTrackableChanged)
                .concat(...Object.keys(data.isTrackable))
                .concat(...Object.keys(data.entityIdentifier))
        );
        return sd.schema(
            ...Object.keys(columnCollection)
                .map((columnName) => {
                    const column = (columnCollection as any)[columnName];
                    return sd.field(column.name, column.assertDelegate);
                })
        ) as any;
    }
    export type InsertIfDifferentRow<DataT extends LogData> = (
        Trackable<DataT> &
        DoNotCopyOnTrackableChanged<DataT>
    );
    export type FullOverwriteInsertIfDifferentRow<DataT extends LogData> = (
        FullOverwriteTrackable<DataT> &
        DoNotCopyOnTrackableChanged<DataT>
    );
    export function insertIfDifferentRowAssertDelegate<DataT extends LogData> (
        data : DataT
    ) : sd.AssertDelegate<InsertIfDifferentRow<DataT>> {
        return sd.intersect(
            trackableAssertDelegate(data),
            doNotCopyOnTrackableChangedAssertDelegate(data),
            doNotModifyOnTrackableChangedAssertDelegate(data)
        ) as any;
    }
    export function fullOverwriteInsertIfDifferentRowAssertDelegate<DataT extends LogData> (
        data : DataT
    ) : sd.AssertDelegate<FullOverwriteInsertIfDifferentRow<DataT>> {
        return sd.intersect(
            fullOverwriteTrackableAssertDelegate(data),
            doNotCopyOnTrackableChangedAssertDelegate(data),
            doNotModifyOnTrackableChangedAssertDelegate(data)
        ) as any;
    }
    export function fetchLatestQuery<
        DataT extends LogData
    > (
        db : PooledDatabase,
        data : DataT,
        entityIdentifier : EntityIdentifier<DataT>
    ) : SelectBuilderUtil.CleanToFrom<DataT["table"]> {
        entityIdentifier = entityIdentifierAssertDelegate(data)(`${data.table.alias} entity identifier`, entityIdentifier);
        return (db.from(data.table) as any)
            .where(() => RawExprUtil.toEqualityCondition(
                data.table,
                //https://github.com/Microsoft/TypeScript/issues/27399
                entityIdentifier as any
            ))
            .orderBy(() => {
                return data.orderByLatest;
            })
            .limit(1);
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
                //https://github.com/Microsoft/TypeScript/issues/27399
                entityIdentifier as any
            ))
            .orderBy(() => {
                return data.orderByLatest;
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
                entityIdentifier as any
            ))
            .orderBy(() => {
                return data.orderByLatest;
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
            if (db.willPrintQueryOnRowCountError()) {
                console.error(
                    data.table.name,
                    entityIdentifier
                );
            }
            throw new mysql.RowNotFoundError(`Could not fetch latest log for ${data.table.alias}, ${JSON.stringify(entityIdentifier)}, and no default row has been specified`);
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
            const curValues = await fetchLatestOrDefault(db, data, entityIdentifier);

            let differenceFound = false;
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
                toInsert[columnName] = (curValues as any)[columnName];
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

    /*
        If a row exists for the entity,
        then it behaves the same as insertIfDifferentAndFetch()

        If a row *does not* exist for the entity,
        then it will try to insert the row;
        this requires all trackable fields to be set or
        it will throw an error.
    */
    export function insertIfDifferentOrFirstAndFetch<
        DataT extends LogData
    > (
        db : PooledDatabase,
        data : DataT,
        entityIdentifier : EntityIdentifier<DataT>,
        insertIfDifferentRow : InsertIfDifferentRow<DataT>,
        onFirstDelegate : (db : PooledDatabase, row : InsertIfDifferentRow<DataT>) => Promise<RawInsertValueRow<DataT["table"]>>
    ) : Promise<{
        latest : TableRow<DataT["table"]>,
        wasInserted : boolean,
    }> {
        return db.transactionIfNotInOne(async (db) => {
            if (await rowsExistForEntity(db, data, entityIdentifier)) {
                return insertIfDifferentAndFetch(
                    db,
                    data,
                    entityIdentifier,
                    insertIfDifferentRow
                );
            } else {
                return {
                    latest : await db.insertValueAndFetch(
                        data.table,
                        await onFirstDelegate(db, insertIfDifferentRow)
                    ) as any,
                    wasInserted : true,
                };
            }
        });
    }

    export type LatestValueExpressionEntityTable<DataT extends LogData> = (
        Table<
            any,
            any,
            {
                [entityKey in keyof DataT["entityIdentifier"]] : (
                    entityKey extends keyof DataT["table"]["columns"] ?
                    Column<
                        any,
                        any,
                        sd.TypeOf<
                            DataT["table"]["columns"][entityKey]["assertDelegate"]
                        >
                    > :
                    never
                )
            },
            any
        >
    );
    export type LatestValueExpressionValueDelegate<
        DataT extends LogData,
        EntityT extends LatestValueExpressionEntityTable<DataT>
    > = (
        (
            c : (
                ColumnCollectionUtil.ToColumnReferences<EntityT["columns"]> &
                ColumnCollectionUtil.ToColumnReferences<DataT["table"]["columns"]>
            )
        ) => (
            ColumnReferencesUtil.Columns<
                ColumnCollectionUtil.ToColumnReferences<EntityT["columns"]> &
                ColumnCollectionUtil.ToColumnReferences<DataT["table"]["columns"]>
            > |
            Expr<
                ColumnReferencesUtil.Partial<
                    ColumnCollectionUtil.ToColumnReferences<EntityT["columns"]> &
                    ColumnCollectionUtil.ToColumnReferences<DataT["table"]["columns"]>
                >,
                any
            > |
            AllowedExprConstant
        )
    );
    export type LatestValueExpressionDefaultValueDelegate<
        DataT extends LogData,
        EntityT extends LatestValueExpressionEntityTable<DataT>
    > = (
        (
            c : ColumnCollectionUtil.ToColumnReferences<EntityT["columns"]>
        ) => (
            ColumnReferencesUtil.Columns<
                ColumnCollectionUtil.ToColumnReferences<EntityT["columns"]>
            > |
            Expr<
                ColumnReferencesUtil.Partial<
                    ColumnCollectionUtil.ToColumnReferences<EntityT["columns"]>
                >,
                any
            > |
            AllowedExprConstant
        )
    );
    export type LatestValueExpression<
        DataT extends LogData,
        EntityT extends LatestValueExpressionEntityTable<DataT>,
        ValueDelegateT extends LatestValueExpressionValueDelegate<
            DataT,
            EntityT
        >,
        DefaultValueDelegateT extends LatestValueExpressionDefaultValueDelegate<
            DataT,
            EntityT
        >
    > = (
        Expr<
            (
                {
                    [table in Exclude<
                        keyof RawExprUtil.UsedReferences<ReturnType<ValueDelegateT>>,
                        //The variables used should not include this
                        //because this table is part of the subquery
                        /*
                            SELECT
                                (
                                    SELECT
                                        log.value
                                    FROM
                                        log
                                    WHERE
                                        log.userId = user.userId
                                    LIMIT 1
                                )
                            FROM
                                user
                        */
                       //While `log.value` is used in the inner query,
                       //It is not considered "used" by the outer query
                       //because the `log.value` references `log` of the
                       //inner query, and not a table ofthe outer query
                        DataT["table"]["alias"]
                    >] : (
                        RawExprUtil.UsedReferences<ReturnType<ValueDelegateT>>[table]
                    )
                } &
                RawExprUtil.UsedReferences<ReturnType<DefaultValueDelegateT>> &
                //These columns are used in equality checks
                {
                    [table in EntityT["alias"]] : {
                        [columnName in keyof DataT["entityIdentifier"]] : (
                            EntityT["columns"][columnName]
                        )
                    }
                }
            ),
            (
                RawExprUtil.Type<ReturnType<ValueDelegateT>>|
                RawExprUtil.Type<ReturnType<DefaultValueDelegateT>>
            )
        >
    );
    export function latestValueExpression<
        DataT extends LogData,
        EntityT extends LatestValueExpressionEntityTable<DataT>,
        ValueDelegateT extends LatestValueExpressionValueDelegate<
            DataT,
            EntityT
        >,
        DefaultValueDelegateT extends LatestValueExpressionDefaultValueDelegate<
            DataT,
            EntityT
        >
    > (
        db : PooledDatabase,
        data : DataT,
        entity : EntityT,
        valueDelegate : ValueDelegateT,
        defaultValueDelegate : DefaultValueDelegateT
    ) : LatestValueExpression<
        DataT,
        EntityT,
        ValueDelegateT,
        DefaultValueDelegateT
    > {
        const entityRefs = {
            [entity.alias] : entity.columns
        };
        const refs = {
            ...{
                [data.table.alias] : data.table.columns
            },
            ...entityRefs,
        };

        let value = valueDelegate(refs as any);
        if (value instanceof Expr) {
            ColumnReferencesUtil.assertHasColumnReferences(
                refs,
                value.usedReferences as any
            );
        } else if (value instanceof Column) {
            ColumnReferencesUtil.assertHasColumn(
                refs,
                value
            );
        } else {
            value = RawExprUtil.toExpr(value as any)
            //throw new Error(`Expected value expression to be an Expr or Column`);
        }
        let defaultValue = defaultValueDelegate(entityRefs as any);
        if (defaultValue instanceof Expr) {
            ColumnReferencesUtil.assertHasColumnReferences(
                entityRefs,
                defaultValue.usedReferences as any
            );
        } else if (defaultValue instanceof Column) {
            ColumnReferencesUtil.assertHasColumn(
                entityRefs,
                defaultValue
            );
        } else {
            defaultValue = RawExprUtil.toExpr(defaultValue as any);
            //throw new Error(`Expected defaultValue expression to be an Expr or Column`);
        }
        const equalityArr = Object.keys(data.entityIdentifier)
            .map((columnName) => isNotNullAndEq(
                entity.columns[columnName],
                data.table.columns[columnName]
            ));
        return coalesce(
            (db.from(entity)
                .subQuery()
                .from(data.table) as any
            )
                .where(() => and(
                    equalityArr[0],
                    ...equalityArr.slice(1)
                ))
                .orderBy(() => data.orderByLatest)
                .limit(1)
                .select(() => [value]),
            defaultValue
        ) as any;
    }
    export function rowsExistForEntity<
        DataT extends LogData
    > (
        db : PooledDatabase,
        data : DataT,
        entityIdentifier : EntityIdentifier<DataT>
    ) : Promise<boolean> {
        entityIdentifier = entityIdentifierAssertDelegate(data)(`${data.table.alias} entity identifier`, entityIdentifier);
        return db.from(data.table)
            .where(() => RawExprUtil.toEqualityCondition(
                data.table,
                entityIdentifier as any
            ))
            .exists();
    }
}
export type Trackable<DataT extends LogData> = LogDataUtil.Trackable<DataT>;