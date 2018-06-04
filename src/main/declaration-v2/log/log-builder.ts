import {AnyTable, TableRow} from "../table";
import {Tuple, TupleKeys, TupleLength} from "../tuple";
import {ColumnCollectionUtil} from "../column-collection";
import {AnyColumn} from "../column";
import { PooledDatabase } from "../PooledDatabase";
import {LogDataUtil} from "./util";

/*
== Desired Usage ==

const person = o.table(
    "person",
    {
        personId : sd.naturalNumber(),
        createdAt : sd.date(),
    }
)
    .setAutoIncrement(c => c.personId)
    //Defaults to CURRENT_TIMESTAMP
    .setHasDefaultValue(c => [c.createdAt])
    .build();

const personActivity = o.table(
    "personActivity",
    {
        personActivityId : sd.naturalNumber(),
        personId : sd.naturalNumber(),
        description : sd.varChar(1, 256),
        motivation : sd.varChar(1, 256),
        loggedAt : sd.date()
    }
)
    .setAutoIncrement(c => c.personActivityId)
    //Defaults to CURRENT_TIMESTAMP
    .setHasDefaultValue(c => [c.loggedAt])
    .build();

const personActivityLog = o.log(personActivity)

    //We are tracking an entity that is uniquely identified
    //by `personId`.
    //However, `personActivity` itself is uniquely identified
    //by `personActivityId`
    .setEntityIdentifier(c => [c.personId])

    //We are tracking these two columns over time.
    //If either of these columns change, we want to insert a new row
    //to `personActivity`.
    .setIsTrackable(c => [
        c.description,
        c.motivation
    ])

    //We specify how we find the latest log for the entity
    .setOrderByLatest(c => [
        [c.loggedAt, false],
        [c.personActivityId, false]
    ])

    .setDefaultRow(async (entityIdentifier, db) => {
        return {
            personActivityId : 0,
            ...entityIdentifier,
            description : "- No activity has been logged yet -",
            motivation : "Neutral",
            loggedAt : await db.from(person)
                .whereIsEqual(c => c.personId, entityIdentifier.personId)
                .select(c => [c.createdAt])
                .fetchValue(),
        };
    })
    .build();

//Performs the following,
//+ Fetches the latest row for `{ personId : 99 }`
//+ If no such row exists, it tries to call the delegate passed to `setDefaultRow()`
//+ If the delegate does not exist, it throws an error.
db.fetchLatestOrDefault(
    personActivityLog,
    {
        personId : 99,
    }
);

//Performs the following,
//+ Fetches the latest row for `{ personId : 99 }`
//+ If no such row exists, returns undefined.
db.fetchLatestOrUndefined(
    personActivityLog,
    {
        personId : 99,
    }
);

//Performs the following,
//+ Fetches the latest row for `{ personId : 99 }`
//+ If no such row exists, it throws an error.
db.fetchLatestOrError(
    personActivityLog,
    {
        personId : 99,
    }
);

//Performs the following,
//+ Fetches the latest row for `{ personId : 99 }`
//+ Compares the new `motivation : "Bored"` value with the latest `motivation` value
//+ If they are different, a new row is created,
//  {
//    personActivityId : - will be automatically incremented -
//    personId : 99
//    description : latest.description,
//    motivation : "Bored",
//    updatedAt : - is not tracked, and has default value, willl be automatically generated -
//  }
db.insertIfDifferentAndFetch(
    personActivityLog,
    {
        personId : 99,
    },
    {
        motivation : "Bored",
    }
);
*/

export interface LogBuilderData {
    /*
        Must have a unique key, to fetch individually inserted logs
    */
    readonly table : AnyTable,
    /*
        Different from `autoIncrement`, `id`, and `uniqueKeys`.

        The `entityIdentifier` here is not required to be a unique key.
        It is used to identify the entity the log is tracking.
    */
    readonly entityIdentifier : {
        readonly [columnName : string] : true
    },
    /*
        Different from `isMutable`.
        Mutable columns can be modified with an UPDATE.

        Trackable columns are used for `insertIfDifferentAndFetch()`

        These columns are tracked over time, and new rows are inserted
        when the values change.

        Trackable columns all
        + Do not have default values.

          If you track a column that can have a default value,
          you still need to provide a value when using `insertIfDifferentAndFetch()`

        + Cannot be generated

          Generated columns cannot have their values specified.

        + Cannot be part of `entityIdentifier`

          The owner of the log cannot change.
    */
    readonly isTrackable : {
        readonly [columnName : string] : true
    },
    /*
        This will be used to sort the result set, and get the latest row.
        The latest row must be sorted to the top of the result set (the first row).
    */
    readonly orderByLatest : undefined|Tuple<[string, boolean]>,
    /*

    */
    readonly defaultRowDelegate : undefined|AnyDefaultRowDelegate,
}

export type DefaultRowDelegate<DataT extends LogBuilderData> = (
    (entityIdentifier : {
        [columnName in Extract<
            Extract<
                keyof DataT["table"]["columns"],
                keyof DataT["entityIdentifier"]
            >,
            string
        >] : (
            ReturnType<DataT["table"]["columns"][columnName]["assertDelegate"]>
        )
    }, db : PooledDatabase) => (
        TableRow<DataT["table"]>|Promise<TableRow<DataT["table"]>>
    )
);
export type AnyDefaultRowDelegate = (
    (entityIdentifier : any, db : PooledDatabase) => any
);

export type EntityIdentifierDelegate<DataT extends LogBuilderData> = (
    (columns : ColumnCollectionUtil.ExcludeColumnNames<
        DataT["table"]["columns"],
        //Entity identifier columns are not trackable or generated columns
        Extract<keyof DataT["isTrackable"], string>|
        Extract<keyof DataT["table"]["data"]["isGenerated"], string>
    >) => Tuple<
        ColumnCollectionUtil.Columns<
            ColumnCollectionUtil.ExcludeColumnNames<
                DataT["table"]["columns"],
                Extract<keyof DataT["isTrackable"], string>|
                Extract<keyof DataT["table"]["data"]["isGenerated"], string>
            >
        >
    >
);

export type IsTrackableDelegate<DataT extends LogBuilderData> = (
    (columns : ColumnCollectionUtil.ExcludeColumnNames<
        DataT["table"]["columns"],
        //Trackable columns are cannot be entity identifiers or generated columns
        Extract<keyof DataT["isTrackable"], string>|
        Extract<keyof DataT["table"]["data"]["isGenerated"], string>
    >) => Tuple<
        ColumnCollectionUtil.Columns<
            ColumnCollectionUtil.ExcludeColumnNames<
                DataT["table"]["columns"],
                Extract<keyof DataT["isTrackable"], string>|
                Extract<keyof DataT["table"]["data"]["isGenerated"], string>
            >
        >
    >
);

export type OrderByLatestDelegate<DataT extends LogBuilderData> = (
    (columns : DataT["table"]["columns"]) => (
        Tuple<
            [ColumnCollectionUtil.Columns<DataT["table"]["columns"]>, boolean]
        >
    )
)

export class LogBuilder<DataT extends LogBuilderData> {
    readonly data : DataT;
    constructor (data : DataT) {
        this.data = data;
    }

    setEntityIdentifier<
        DelegateT extends EntityIdentifierDelegate<this["data"]>
    > (delegate : DelegateT) : (
        LogBuilder<{
            readonly [key in keyof this["data"]] : (
                key extends "entityIdentifier" ?
                (
                    ReturnType<DelegateT>[TupleKeys<ReturnType<DelegateT>>] extends AnyColumn ?
                        {
                            readonly [columnName in ReturnType<DelegateT>[TupleKeys<ReturnType<DelegateT>>]["name"]] : true
                        } :
                        never
                ) :
                key extends "defaultRowDelegate" ?
                undefined :
                this["data"][key]
            )
        }>
    ) {
        const columnCollection = ColumnCollectionUtil.excludeColumnNames(
            this.data.table.columns,
            Object.keys(this.data.isTrackable)
                .concat(Object.keys(this.data.table.data.isGenerated))
        );
        const result = delegate(columnCollection as any);
        ColumnCollectionUtil.assertHasColumns(
            columnCollection,
            result
        );
        const entityIdentifier = result.reduce<{ [columnName : string] : true }>((memo, column) => {
            memo[column.name] = true;
            return memo;
        }, {});

        return new LogBuilder({
            ...(this.data as any),
            entityIdentifier : entityIdentifier,
            defaultRowDelegate : undefined,
        }) as any;
    }
    setIsTrackable<
        DelegateT extends IsTrackableDelegate<this["data"]>
    > (delegate : DelegateT) : (
        LogBuilder<{
            readonly [key in keyof this["data"]] : (
                key extends "isTrackable" ?
                (
                    ReturnType<DelegateT>[TupleKeys<ReturnType<DelegateT>>] extends AnyColumn ?
                        {
                            readonly [columnName in ReturnType<DelegateT>[TupleKeys<ReturnType<DelegateT>>]["name"]] : true
                        } :
                        never
                ) :
                this["data"][key]
            )
        }>
    ) {
        const columnCollection = ColumnCollectionUtil.excludeColumnNames(
            this.data.table.columns,
            Object.keys(this.data.entityIdentifier)
                .concat(Object.keys(this.data.table.data.isGenerated))
        );
        const result = delegate(columnCollection as any);
        ColumnCollectionUtil.assertHasColumns(
            columnCollection,
            result
        );
        const isTrackable = result.reduce<{ [columnName : string] : true }>((memo, column) => {
            memo[column.name] = true;
            return memo;
        }, {});

        return new LogBuilder({
            ...(this.data as any),
            isTrackable : isTrackable
        }) as any;
    }
    setOrderByLatest<
        DelegateT extends OrderByLatestDelegate<this["data"]>
    > (delegate : DelegateT) : (
        LogBuilder<{
            readonly [key in keyof this["data"]] : (
                key extends "orderByLatest" ?
                (
                    ReturnType<DelegateT>[TupleKeys<ReturnType<DelegateT>>] extends [AnyColumn, boolean] ?
                        (
                            {
                                [index in TupleKeys<ReturnType<DelegateT>>] : (
                                    ReturnType<DelegateT>[index] extends [AnyColumn, boolean] ?
                                        [
                                            ReturnType<DelegateT>[index]["0"]["name"],
                                            ReturnType<DelegateT>[index]["1"]
                                        ] :
                                        never
                                )
                            } &
                            { length : TupleLength<ReturnType<DelegateT>> } &
                            { "0" : [
                                ReturnType<DelegateT>["0"]["0"]["name"],
                                ReturnType<DelegateT>["0"]["1"]
                            ] } &
                            ([string, boolean])[]
                        ) :
                        never
                ) :
                this["data"][key]
            )
        }>
    ) {
        const columnCollection = this.data.table.columns;
        const result = delegate(columnCollection as any);
        ColumnCollectionUtil.assertHasColumns(
            columnCollection,
            result.map(i => i[0])
        );
        const orderByLatest = result.map(i => [i[0].name, i[1]]);

        return new LogBuilder({
            ...(this.data as any),
            orderByLatest : orderByLatest
        }) as any;
    }
    setDefaultRow(delegate : DefaultRowDelegate<this["data"]>) : (
        LogBuilder<{
            readonly [key in keyof this["data"]] : (
                key extends "defaultRowDelegate" ?
                (
                    DefaultRowDelegate<this["data"]>
                ) :
                this["data"][key]
            )
        }>
    ) {
        return new LogBuilder({
            ...(this.data as any),
            defaultRowDelegate : (entityIdentifier : any, db : PooledDatabase) => {
                entityIdentifier = LogDataUtil.entityIdentifierAssertDelegate(this.data as any)(`${this.data.table.alias} entity identifier`, entityIdentifier);
                return delegate(entityIdentifier, db);
            }
        }) as any;
    }

    build (this : (
        DataT["orderByLatest"] extends Tuple<any> ?
        (
            keyof DataT["entityIdentifier"] extends never ?
                never :
                (
                    any
                )
        ) :
        never
    )) : (
        //*Should* extend LogData, if it doesn't, hack it till it extends LogData
        DataT
    ) {
        return this.data;
    }
}

export function log<TableT extends AnyTable> (table : TableT) : LogBuilder<{
    readonly table : TableT,
    readonly entityIdentifier : {},
    readonly isTrackable : {},
    readonly orderByLatest : undefined,
    readonly defaultRowDelegate : undefined,
}> {
    return new LogBuilder({
        table : table,
        entityIdentifier : {},
        isTrackable : {},
        orderByLatest : undefined,
        defaultRowDelegate : undefined,
    });
}
