/*
Every time you see a return type of `this`, it is an ugly hack.
It doesn't actually return `this`.

It returns a new instance with the same `DataT` as `this`.
Required because TypeScript gets confused with generics.
*/
import {
    JoinCollection,
    JoinCollectionUtil
} from "./join-collection";
import {JoinFromDelegate} from "./join-from-delegate";
import {JoinToDelegate} from "./join-to-delegate";
import {AliasedTable, AnyAliasedTable} from "./aliased-table";
import {spread} from "@anyhowstep/type-util";
import {Join, JoinType} from "./join";
import {SelectCollection, SelectCollectionUtil} from "./select-collection";
import {SelectDelegate} from "./select-delegate";
import {FetchRowUtil} from "./fetch-row";
import {AggregateDelegate} from "./aggregate-delegate";
import {TypeNarrowDelegate, TypeNarrowDelegateUtil} from "./type-narrow-delegate";
import {Column, AnyColumn} from "./column";
import * as invalid from "./invalid";
import {WhereDelegate, WhereDelegateUtil} from "./where-delegate";
import {GroupByDelegate, GroupByDelegateUtil} from "./group-by-delegate";
import {HavingDelegate, HavingDelegateUtil} from "./having-delegate";
import {OrderByDelegate, OrderByDelegateUtil} from "./order-by-delegate";
import {TypeWidenDelegate, TypeWidenDelegateUtil} from "./type-widen-delegate";
import * as sd from "schema-decorator";
import {FetchValueCheck, FetchValueType} from "./fetch-value";
import {table, AnyTable} from "./table";
import {AnyGroupBy} from "./group-by";
import {AnyOrderBy} from "./order-by";
import {Expr} from "./expr";
import {PooledDatabase} from "./PooledDatabase";
import {Querify} from "./querify";
import {StringBuilder} from "./StringBuilder";
import * as e from "./expression";
import {AliasedExpr} from "./aliased-expr";
import * as mysql from "typed-mysql";
import {SubqueryTable} from "./subquery-table";
import {RawExprUtil} from "./raw-expr";
import {
    UpdateBuilder,
    UpdateAssignmentReferencesDelegate,
    RawUpdateAssignmentReferences
} from "./update-builder";
import {
    InsertAssignmentCollectionDelegate,
    RawInsertSelectAssignmentCollection,
    InsertSelectBuilder
} from "./insert-select-builder";
import {
    DeleteTables,
    DeleteBuilder,
    DeleteTablesDelegate
} from "./delete-builder";
import {TupleWConcat} from "./tuple";
import {AnyJoin} from "./join";
import {SelectBuilderUtil} from "./select-builder-util";

import {Table} from "./table";
Table;

//TODO Move elsewhere
export const ARBITRARY_ROW_COUNT = 999999999;

export interface LimitData {
    readonly rowCount : number,
    readonly offset   : number,
}
export interface ExtraSelectBuilderData {
    readonly db : PooledDatabase;
    readonly narrowExpr? : Expr<any, boolean>;
    readonly whereExpr? : Expr<any, boolean>;
    readonly havingExpr? : Expr<any, boolean>;
    readonly union? : {
        target : SelectBuilder<any>,
        distinct : boolean,
    }[];

    readonly distinct : boolean,
    readonly sqlCalcFoundRows : boolean,
    readonly groupBy? : AnyGroupBy[],
    readonly orderBy? : AnyOrderBy[],
    readonly limit? : LimitData,
    readonly unionOrderBy? : AnyOrderBy[],
    readonly unionLimit? : LimitData,
    readonly aggregateDelegates? : AggregateDelegate<any>[],
}

//TODO Move elsewhere
export interface RawPaginationArgs {
    page? : number|null|undefined;
    itemsPerPage? : number|null|undefined;
}
export interface PaginateInfo {
    itemsFound : number,
    pagesFound : number,
    page : number,
    itemsPerPage : number,
}
export interface PaginateResult<T> {
    info : PaginateInfo,
    rows : T[],
}
export interface SelectBuilderData {
    readonly hasSelect : boolean,
    readonly hasFrom : boolean,
    readonly hasUnion : boolean,

    readonly joins : JoinCollection,

    readonly selects : undefined|SelectCollection,

    readonly aggregateDelegate : undefined|AggregateDelegate<any>,

    readonly hasParentJoins : boolean,
    readonly parentJoins : JoinCollection,
}

export const __DUMMY_FROM_TABLE = table(
    "__DUMMY_FROM_TABLE",
    {}
).build();

export class SelectBuilder<DataT extends SelectBuilderData> implements Querify {
    readonly data : DataT;
    readonly extraData : ExtraSelectBuilderData;

    public constructor (data : DataT, extraData : ExtraSelectBuilderData) {
        this.data = data;
        this.extraData = extraData;
    }

    assertAfterFrom () {
        if (!this.data.hasFrom) {
            throw new Error(`Must be called after FROM clause`);
        }
    }
    assertBeforeSelect () {
        if (this.data.hasSelect) {
            throw new Error(`Must be called before SELECT clause`);
        }
    }
    assertAfterSelect () {
        if (!this.data.hasSelect) {
            throw new Error(`Must be called after SELECT clause`);
        }
    }
    assertBeforeUnion () {
        if (this.data.hasUnion) {
            throw new Error(`Must be called before UNION clause`);
        }
    }

    //Must be done before any JOINs, as per MySQL
    from<ToTableT extends AnyAliasedTable> (
        this : SelectBuilder<{
            hasSelect : any,
            hasFrom : false,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,

            hasParentJoins : any,
            parentJoins : any,
        }>,
        toTable : ToTableT
    ) : (
        SelectBuilderUtil.From<this, ToTableT>
    ) {
        return SelectBuilderUtil.from(this, toTable) as any;
    }
    join<
        ToTableT extends AnyAliasedTable,
        FromDelegateT extends JoinFromDelegate<this["data"]["joins"]>
    > (
        this : SelectBuilder<{
            hasSelect : any,
            hasFrom : true,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,

            hasParentJoins : any,
            parentJoins : any,
        }>,
        toTable : ToTableT,
        fromDelegate : FromDelegateT,
        toDelegate : JoinToDelegate<ToTableT, ReturnType<FromDelegateT>>
    ) : (
        SelectBuilderUtil.DoJoin<this, ToTableT>
    ) {
        return SelectBuilderUtil.doJoin(this, toTable, fromDelegate as any, toDelegate) as any;
    }
    joinUsing<
        ToTableT extends AnyAliasedTable,
        FromDelegateT extends JoinFromDelegate<DataT["joins"]>
    > (
        this : SelectBuilder<{
            hasSelect : any,
            hasFrom : true,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,

            hasParentJoins : any,
            parentJoins : any,
        }>,
        toTable : ToTableT,
        fromDelegate : FromDelegateT
    ) : (
        Error extends JoinCollectionUtil.InnerJoinUsing<SelectBuilder<DataT>, ToTableT, FromDelegateT> ?
            JoinCollectionUtil.InnerJoinUsing<SelectBuilder<DataT>, ToTableT, FromDelegateT> :
            SelectBuilder<{
                readonly [key in keyof DataT] : (
                    key extends "joins" ?
                    JoinCollectionUtil.InnerJoinUnsafe<DataT["joins"], ToTableT> :
                    DataT[key]
                )
            }>
    ) {
        this.assertAfterFrom();
        return new SelectBuilder(spread(
            this.data,
            {
                joins : JoinCollectionUtil.innerJoinUsing(
                    this,
                    toTable,
                    fromDelegate as any
                )
            }
        ), this.extraData) as any;
    }
    //We don't allow right joins after selecting
    //because it'll narrow the data type of selected columns
    rightJoin<
        ToTableT extends AnyAliasedTable,
        FromDelegateT extends JoinFromDelegate<DataT["joins"]>
    > (
        this : SelectBuilder<{
            hasSelect : false,
            hasFrom : true,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,

            hasParentJoins : any,
            parentJoins : any,
        }>,
        toTable : ToTableT,
        fromDelegate : FromDelegateT,
        toDelegate : JoinToDelegate<ToTableT, ReturnType<FromDelegateT>>
    ) : (
        Error extends JoinCollectionUtil.RightJoin<SelectBuilder<DataT>, ToTableT> ?
            JoinCollectionUtil.RightJoin<SelectBuilder<DataT>, ToTableT> :
            SelectBuilder<{
                readonly [key in keyof DataT] : (
                    key extends "joins" ?
                    JoinCollectionUtil.RightJoinUnsafe<DataT["joins"], ToTableT> :
                    DataT[key]
                )
            }>
    ) {
        this.assertBeforeSelect();
        this.assertAfterFrom();
        return new SelectBuilder(spread(
            this.data,
            {
                joins : JoinCollectionUtil.rightJoin(
                    this,
                    toTable,
                    fromDelegate as any,
                    toDelegate
                )
            }
        ), this.extraData) as any;
    }
    //We don't allow right joins after selecting
    //because it'll narrow the data type of selected columns
    rightJoinUsing<
        ToTableT extends AnyAliasedTable,
        FromDelegateT extends JoinFromDelegate<DataT["joins"]>
    > (
        this : SelectBuilder<{
            hasSelect : false,
            hasFrom : true,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,

            hasParentJoins : any,
            parentJoins : any,
        }>,
        toTable : ToTableT,
        fromDelegate : FromDelegateT
    ) : (
        Error extends JoinCollectionUtil.RightJoinUsing<SelectBuilder<DataT>, ToTableT, FromDelegateT> ?
            JoinCollectionUtil.RightJoinUsing<SelectBuilder<DataT>, ToTableT, FromDelegateT> :
            SelectBuilder<{
                readonly [key in keyof DataT] : (
                    key extends "joins" ?
                    JoinCollectionUtil.RightJoinUnsafe<DataT["joins"], ToTableT> :
                    DataT[key]
                )
            }>
    ) {
        this.assertBeforeSelect();
        this.assertAfterFrom();
        return new SelectBuilder(spread(
            this.data,
            {
                joins : JoinCollectionUtil.rightJoinUsing(
                    this,
                    toTable,
                    fromDelegate as any
                )
            }
        ), this.extraData) as any;
    }
    leftJoin<
        ToTableT extends AnyAliasedTable,
        FromDelegateT extends JoinFromDelegate<DataT["joins"]>
    > (
        this : SelectBuilder<{
            hasSelect : any,
            hasFrom : true,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,

            hasParentJoins : any,
            parentJoins : any,
        }>,
        toTable : ToTableT,
        fromDelegate : FromDelegateT,
        toDelegate : JoinToDelegate<ToTableT, ReturnType<FromDelegateT>>
    ) : (
        Error extends JoinCollectionUtil.LeftJoin<SelectBuilder<DataT>, ToTableT> ?
            JoinCollectionUtil.LeftJoin<SelectBuilder<DataT>, ToTableT> :
            SelectBuilder<{
                readonly [key in keyof DataT] : (
                    key extends "joins" ?
                    JoinCollectionUtil.LeftJoinUnsafe<DataT["joins"], ToTableT> :
                    DataT[key]
                )
            }>
    ) {
        this.assertAfterFrom();
        return new SelectBuilder(spread(
            this.data,
            {
                joins : JoinCollectionUtil.leftJoin(
                    this,
                    toTable,
                    fromDelegate as any,
                    toDelegate
                )
            }
        ), this.extraData) as any;
    }
    leftJoinUsing<
        ToTableT extends AnyAliasedTable,
        FromDelegateT extends JoinFromDelegate<DataT["joins"]>
    > (
        this : SelectBuilder<{
            hasSelect : any,
            hasFrom : true,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,

            hasParentJoins : any,
            parentJoins : any,
        }>,
        toTable : ToTableT,
        fromDelegate : FromDelegateT
    ) : (
        Error extends JoinCollectionUtil.LeftJoinUsing<SelectBuilder<DataT>, ToTableT, FromDelegateT> ?
            JoinCollectionUtil.LeftJoinUsing<SelectBuilder<DataT>, ToTableT, FromDelegateT> :
            SelectBuilder<{
                readonly [key in keyof DataT] : (
                    key extends "joins" ?
                    JoinCollectionUtil.LeftJoinUnsafe<DataT["joins"], ToTableT> :
                    DataT[key]
                )
            }>
    ) {
        this.assertAfterFrom();
        return new SelectBuilder(spread(
            this.data,
            {
                joins : JoinCollectionUtil.leftJoinUsing(
                    this,
                    toTable,
                    fromDelegate as any
                )
            }
        ), this.extraData) as any;
    }

    //Must be called before UNION because it will change the number of
    //columns expected.
    select<
        SelectDelegateT extends SelectDelegate<this>
    > (
        this : SelectBuilder<{
            hasSelect : any,
            hasFrom : any,
            hasUnion : false,
            joins : any,
            selects : any,
            aggregateDelegate : any,

            hasParentJoins : any,
            parentJoins : any,
        }>,
        selectDelegate : SelectDelegateT
    ) : (
        SelectBuilderUtil.Select<this, SelectDelegateT>
    ) {
        this.assertBeforeUnion();
        const selects = SelectCollectionUtil.appendSelect<
            DataT["selects"],
            SelectBuilder<DataT>,
            SelectDelegateT
        >(
            this.data.selects,
            this as any,
            selectDelegate
        );
        return new SelectBuilder(spread(
            this.data,
            {
                hasSelect : true,
                selects : selects
            }
        ), this.extraData) as any;
    }
    //Must be called before any other `SELECT` methods
    //because it'll set the select clause to whatever is at the joins,
    //We never want to overwrite the select clause, only append.
    //Must be called after `FROM` to have tables to select from.
    //Must be called before `UNION` because it will change the number of
    //columns expected.
    selectAll (
        this : SelectBuilder<{
            hasSelect : false,
            hasFrom : true,
            hasUnion : false,
            joins : any,
            selects : any,
            aggregateDelegate : any,

            hasParentJoins : any,
            parentJoins : any,
        }>
    ) : (
        SelectBuilderUtil.SelectAll<this>
    ) {
        return SelectBuilderUtil.selectAll(this) as any;
    }

    //Must be called after `FROM`; makes no sense
    //to replace tables if there aren't any...
    replaceTable<
        TableA extends AnyAliasedTable,
        TableB extends AnyAliasedTable
    > (
        this : SelectBuilder<{
            hasSelect : any,
            hasFrom : true,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,

            hasParentJoins : any,
            parentJoins : any,
        }>,
        tableA : TableA,
        tableB : TableB
    ) : (
        //TODO evaluate if this affects safety in any way
        TableB extends AliasedTable<any, any, TableA["columns"]> ?
            SelectBuilder<{
                readonly [key in keyof DataT] : (
                    key extends "joins" ?
                    JoinCollectionUtil.ReplaceTableUnsafe<DataT["joins"], TableA, TableB> :
                    DataT[key]
                )
            }> :
            Error extends JoinCollectionUtil.ReplaceTable<DataT["joins"], TableA, TableB> ?
                JoinCollectionUtil.ReplaceTable<DataT["joins"], TableA, TableB> :
                SelectBuilder<{
                    readonly [key in keyof DataT] : (
                        key extends "joins" ?
                        JoinCollectionUtil.ReplaceTableUnsafe<DataT["joins"], TableA, TableB> :
                        DataT[key]
                    )
                }>
    ) {
        this.assertAfterFrom();
        const replaced = JoinCollectionUtil.replaceTable(this.data.joins, tableA, tableB);
        return new SelectBuilder(spread(
            this.data,
            {
                joins : replaced
            }
        ), this.extraData) as any;
    }

    //Must be called after `SELECT` or there will be
    //no columns to aggregate...
    aggregate<
        AggregateDelegateT extends AggregateDelegate<
            SelectBuilderUtil.AggregatedRow<this>
            /*FetchRow<
                this["data"]["joins"],
                SelectCollectionUtil.ToColumnReferences<this["data"]["selects"]>
            >*/
        >
    > (
        this : SelectBuilder<{
            hasSelect : true,
            hasFrom : any,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,

            //Makes no sense to aggregate a subquery
            //because you cannot fetch() it
            hasParentJoins : false,
            parentJoins : any,
        }>,
        aggregateDelegate : AggregateDelegateT
    ) : (
        SelectBuilder<{
            readonly [key in keyof DataT] : (
                key extends "aggregateDelegate" ?
                AggregateDelegateT :
                DataT[key]
            )
        }>
    ) {
        this.assertAfterSelect();
        return new SelectBuilder(
            spread(
                this.data,
                {
                    aggregateDelegate : aggregateDelegate
                }
            ),
            spread(
                this.extraData,
                {
                    aggregateDelegates : (
                        (this.extraData.aggregateDelegates == undefined) ?
                            [aggregateDelegate] :
                            this.extraData.aggregateDelegates.concat(
                                aggregateDelegate
                            )
                    )
                }
            )
        ) as any;
    }
    unsetAggregate () : (
        SelectBuilder<{
            readonly [key in keyof DataT] : (
                key extends "aggregateDelegate" ?
                undefined :
                DataT[key]
            )
        }>
    ) {
        return new SelectBuilder(
            spread(
                this.data,
                {
                    aggregateDelegate : undefined
                }
            ),
            spread(
                this.extraData,
                {
                    aggregateDelegates : undefined
                }
            )
        ) as any;
    }

    private rowAssertDelegate : sd.AssertDelegate<any> | undefined = undefined;
    private getRowAssertDelegate () : sd.AssertDelegate<any> {
        if (this.rowAssertDelegate == undefined) {
            this.rowAssertDelegate = FetchRowUtil.assertDelegate(
                this.data.joins,
                SelectCollectionUtil.toColumnReferences(this.data.selects)
            );
        }
        return this.rowAssertDelegate;
    }
    readonly processRow = (rawRow : any) => {
        let result = {} as any;
        for (let mangledName in rawRow) {
            const names  = mangledName.split("--");
            const table  = names[0];
            const column = names[1];
            if (result[table] == undefined) {
                result[table] = {};
            }
            result[table][column] = rawRow[mangledName];
        }
        const tableAliases = Object.keys(result);
        if (tableAliases.length == 1) {
            result = result[tableAliases[0]];
        }
        result = this.getRowAssertDelegate()("row", result);
        return result;
    };
    readonly aggregateRow = (rawRow : any) => {
        let result = this.processRow(rawRow);
        if (this.extraData.aggregateDelegates == undefined) {
            return result;
        } else {
            for (let d of this.extraData.aggregateDelegates) {
                result = d(result);
            }
            return result;
        }
    }
    fetchAll(
        this : SelectBuilder<{
            hasSelect : true,
            hasFrom : any,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,

            //Makes no sense to fetch a subquery
            //because it may require data from
            //parent joins
            hasParentJoins : false,
            parentJoins : any,
        }>,
    ) : (
        Promise<SelectBuilderUtil.AggregatedRow<this>[]>
    ) {
        this.assertAfterSelect();

        return this.extraData.db.selectAllAny(this.getQuery())
            .then(({rows}) => {
                return Promise.all(rows.map(this.aggregateRow));
            });
    }
    fetchOne(
        this : SelectBuilder<{
            hasSelect : true,
            hasFrom : any,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,

            //Makes no sense to fetch a subquery
            //because it may require data from
            //parent joins
            hasParentJoins : false,
            parentJoins : any,
        }>,
    ) : (
        Promise<SelectBuilderUtil.AggregatedRow<this>>
    ) {
        this.assertAfterSelect();

        return this.extraData.db.selectOneAny(this.getQuery())
            .then(({row}) => {
                return this.aggregateRow(row);
            });
    }
    fetchZeroOrOne(
        this : SelectBuilder<{
            hasSelect : true,
            hasFrom : any,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,

            //Makes no sense to fetch a subquery
            //because it may require data from
            //parent joins
            hasParentJoins : false,
            parentJoins : any,
        }>,
    ) : (
        Promise<
            undefined|
            SelectBuilderUtil.AggregatedRow<this>
        >
    ) {
        this.assertAfterSelect();

        return this.extraData.db.selectZeroOrOneAny(this.getQuery())
            .then(({row}) => {
                if (row == undefined) {
                    return undefined;
                }
                return this.aggregateRow(row);
            });
    }

    //TODO May not always work if GROUP BY, HAVING clauses use a select-expression,
    //TODO May not work as intended with UNION selects
    //Maybe just unset UNION LIMIT, or LIMIT
    //Must be called after `FROM` or there will be no tables to count from
    count (
        this : SelectBuilder<{
            hasSelect : any,
            hasFrom : true,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,

            //Makes no sense to fetch a subquery
            //because it may require data from
            //parent joins
            hasParentJoins : false,
            parentJoins : any,
        }>
    ) : Promise<number> {
        this.assertAfterFrom();

        if (this.extraData.unionLimit != undefined) {
            return this.unsetUnionLimit()
                .count();
        }
        if (this.extraData.limit != undefined && this.extraData.union == undefined) {
            return this.unsetLimit()
                .count();
        }
        //We should now have one of the following,
        //+ (SELECT ...)
        //+ (SELECT ... LIMIT) UNION (SELECT ...)
        //+ (SELECT ...) UNION (SELECT ...)
        //+ (... FROM ...); If count() is called before select()

        if (this.data.selects == undefined) {
            //We have not called select() yet
            return (this.select(() => [e.COUNT_ALL.as("count")]) as any)
                .fetchValue();
        } else {
            //Already called select
            return this.extraData.db.selectNaturalNumber(`
                SELECT
                    COUNT(*) AS count
                FROM
                    (${this.getQuery()}) AS tmp
            `);
        }
    }

    //Must be called after `FROM` or there will be no tables to check existence from
    exists (
        this : SelectBuilder<{
            hasSelect : any,
            hasFrom : true,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,

            //Makes no sense to fetch a subquery
            //because it may require data from
            //parent joins
            hasParentJoins : false,
            parentJoins : any,
        }>
    ) : Promise<boolean> {
        this.assertAfterFrom();

        if (this.data.selects == undefined) {
            return this.extraData.db.selectBoolean(`
                SELECT EXISTS (
                    SELECT
                        *
                    ${this.getQuery()}
                )
            `);
        } else {
            return this.extraData.db.selectBoolean(`
                SELECT EXISTS (
                    ${this.getQuery()}
                )
            `);
        }
    }

    //Uses count() internally
    paginate (
        this : SelectBuilder<{
            hasSelect : true,
            hasFrom : any,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,

            //Makes no sense to fetch a subquery
            //because it may require data from
            //parent joins
            hasParentJoins : false,
            parentJoins : any,
        }>,
        rawPaginationArgs : RawPaginationArgs = {}
    ) : (
        Promise<PaginateResult<
            SelectBuilderUtil.AggregatedRow<this>
        >>
    ) {
        this.assertAfterSelect();

        const paginationArgs = mysql.toPaginationArgs(
            rawPaginationArgs,
            this.extraData.db.getPaginationConfiguration()
        );
        return this.count()
            .then((itemsFound) => {
                const pagesFound = mysql.calculatePagesFound(
                    paginationArgs,
                    itemsFound
                );
                if (this.extraData.union == undefined) {
                    return this
                        .limit(paginationArgs.itemsPerPage)
                        .offset(mysql.getPaginationStart(paginationArgs))
                        .fetchAll()
                        .then((rows : any[]) => {
                            return {
                                info : {
                                    itemsFound : itemsFound,
                                    pagesFound : pagesFound,
                                    ...paginationArgs,
                                },
                                rows : rows,
                            };
                        });
                } else {
                    return this
                        .unionLimit(paginationArgs.itemsPerPage)
                        .unionOffset(mysql.getPaginationStart(paginationArgs))
                        .fetchAll()
                        .then((rows : any[]) => {
                            return {
                                info : {
                                    itemsFound : itemsFound,
                                    pagesFound : pagesFound,
                                    ...paginationArgs,
                                },
                                rows : rows,
                            };
                        });
                }
            }) as any;
    }

    fetchValue (
        this : SelectBuilder<{
            hasSelect : true,
            hasFrom : any,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,

            //Makes no sense to fetch a subquery
            //because it may require data from
            //parent joins
            hasParentJoins : false,
            parentJoins : any,
        }>
    ) : (
        FetchValueCheck<this["data"], FetchValueType<this["data"]>>
    ) {
        this.assertAfterSelect();

        return this.extraData.db.selectOneAny(this.getQuery())
            .then(({row, fields}) => {
                if (fields.length != 1) {
                    throw new Error(`Expected one field, received ${fields.length}`);
                }
                const result = this.processRow(row);
                return result[Object.keys(result)[0]];
            }) as any;
    }
    fetchValueOrUndefined (
        this : SelectBuilder<{
            hasSelect : true,
            hasFrom : any,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,

            //Makes no sense to fetch a subquery
            //because it may require data from
            //parent joins
            hasParentJoins : false,
            parentJoins : any,
        }>
    ) : (
        FetchValueCheck<this["data"], undefined|FetchValueType<this["data"]>>
    ) {
        this.assertAfterSelect();

        return this.extraData.db.selectZeroOrOneAny(this.getQuery())
            .then(({row, fields}) => {
                if (fields.length != 1) {
                    throw new Error(`Expected one field, received ${fields.length}`);
                }
                if (row == undefined) {
                    return undefined;
                }
                const result = this.processRow(row);
                return result[Object.keys(result)[0]];
            }) as any;
    }
    fetchValueArray (
        this : SelectBuilder<{
            hasSelect : true,
            hasFrom : any,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,

            //Makes no sense to fetch a subquery
            //because it may require data from
            //parent joins
            hasParentJoins : false,
            parentJoins : any,
        }>
    ) : (
        FetchValueCheck<this["data"], FetchValueType<this["data"]>[]>
    ) {
        this.assertAfterSelect();

        return this.extraData.db.selectAllAny(this.getQuery())
            .then(({rows, fields}) => {
                if (fields.length != 1) {
                    throw new Error(`Expected one field, received ${fields.length}`);
                }
                const columnName = fields[0].name.split("--")[1];

                return rows
                    .map(this.processRow)
                    .map((row) => row[columnName]);
            }) as any;
    }

    private narrow (column : AnyColumn, condition : Expr<any, boolean>) {
        const joins = JoinCollectionUtil.replaceColumnType(
            this.data.joins,
            column.tableAlias,
            column.name,
            column.assertDelegate
        );
        const selects = SelectCollectionUtil.replaceSelectType(
            this.data.selects,
            column.tableAlias,
            column.name,
            column.assertDelegate
        );

        let narrowExpr = this.extraData.narrowExpr;
        if (narrowExpr == undefined) {
            narrowExpr = condition;
        } else {
            narrowExpr = e.and(narrowExpr, condition);
        }
        let whereExpr = this.extraData.whereExpr;
        if (whereExpr == undefined) {
            whereExpr = condition;
        } else {
            whereExpr = e.and(condition, whereExpr);
        }

        return new SelectBuilder(
            spread(
                this.data,
                {
                    joins : joins,
                    selects : selects,
                }
            ),
            {
                ...this.extraData,
                narrowExpr : narrowExpr,
                whereExpr : whereExpr,
            }
        );
    }
    //Narrowing is only allowed before UNION
    //because columns of the UNION may require
    //a data type that could become disallowed by narrowing.
    //Cannot un-narrow; should not be allowed to un-narrow,
    //other expressions may rely on the narrowed type.
    //Must be called after `FROM` or there will be no columns
    //to narrow.
    whereIsNotNull<
        TypeNarrowDelegateT extends TypeNarrowDelegate<this["data"]["joins"]>
    > (
        this : SelectBuilder<{
            hasSelect : any,
            hasFrom : true,
            hasUnion : false,
            joins : any,
            selects : any,
            aggregateDelegate : any,

            hasParentJoins : any,
            parentJoins : any,
        }>,
        typeNarrowDelegate : TypeNarrowDelegateT
    ) : (
        SelectBuilderUtil.WhereIsNotNull<
            this,
            TypeNarrowDelegateT
        >
    ) {
        this.assertAfterFrom();
        this.assertBeforeUnion();

        const column = TypeNarrowDelegateUtil.getColumn(this.data.joins, typeNarrowDelegate as any);

        return this.narrow(
            new Column(
                column.tableAlias,
                column.name,
                sd.notNullable(column.assertDelegate),
                column.subTableName,
                column.isSelectReference
            ),
            e.isNotNull(column)
        ) as any;
    };
    whereIsNull<
        TypeNarrowDelegateT extends TypeNarrowDelegate<this["data"]["joins"]>
    > (
        this : SelectBuilder<{
            hasSelect : any,
            hasFrom : true,
            hasUnion : false,
            joins : any,
            selects : any,
            aggregateDelegate : any,

            hasParentJoins : any,
            parentJoins : any,
        }>,
        typeNarrowDelegate : TypeNarrowDelegateT
    ) : (
        SelectBuilderUtil.WhereIsNull<
            this,
            TypeNarrowDelegateT
        >
    ) {
        this.assertAfterFrom();
        this.assertBeforeUnion();

        const column = TypeNarrowDelegateUtil.getColumn(this.data.joins, typeNarrowDelegate as any);

        return this.narrow(
            new Column(
                column.tableAlias,
                column.name,
                sd.nil(),
                column.subTableName,
                column.isSelectReference
            ),
            e.isNull(column)
        ) as any;
    };
    whereIsEqual<
        TypeNarrowDelegateT extends TypeNarrowDelegate<this["data"]["joins"]>,
        ConstT extends boolean|number|string
    > (
        this : SelectBuilder<{
            hasSelect : any,
            hasFrom : true,
            hasUnion : false,
            joins : any,
            selects : any,
            aggregateDelegate : any,

            hasParentJoins : any,
            parentJoins : any,
        }>,
        typeNarrowDelegate : TypeNarrowDelegateT,
        value : ConstT
    ) : (
        SelectBuilderUtil.WhereIsEqual<
            this,
            TypeNarrowDelegateT,
            ConstT
        >
    ) {
        this.assertAfterFrom();
        this.assertBeforeUnion();

        sd.or(
            sd.boolean(),
            sd.number(),
            sd.string()
        )("value", value);

        const column = TypeNarrowDelegateUtil.getColumn(this.data.joins, typeNarrowDelegate as any);

        let assertDelegate : sd.AssertDelegate<ConstT> = sd.oneOf(value);
        if (value === true) {
            assertDelegate = ((name : string, mixed : any) : true => {
                const b = sd.numberToBoolean()(name, mixed);
                return sd.oneOf(true)(name, b);
            }) as any;
        } else if (value === false) {
            assertDelegate = ((name : string, mixed : any) : false => {
                const b = sd.numberToBoolean()(name, mixed);
                return sd.oneOf(false)(name, b);
            }) as any;
        }

        return this.narrow(
            new Column(
                column.tableAlias,
                column.name,
                assertDelegate,
                column.subTableName,
                column.isSelectReference
            ),
            e.isNotNullAndEq(column, value)
        ) as any;
    };

    //WHERE CLAUSE
    //Replaces but ANDs with NARROW
    //Must be called after `FROM` as per MySQL
    where<WhereDelegateT extends WhereDelegate<SelectBuilder<DataT>>> (
        this : SelectBuilder<{
            hasSelect : any,
            hasFrom : true,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,

            hasParentJoins : any,
            parentJoins : any,
        }>,
        whereDelegate : WhereDelegateT
    ) : this {
        this.assertAfterFrom();

        let whereExpr = WhereDelegateUtil.execute(this, whereDelegate as any);
        if (this.extraData.narrowExpr != undefined) {
            whereExpr = e.and(this.extraData.narrowExpr, whereExpr);
        }

        return new SelectBuilder(
            this.data,
            {
                ...this.extraData,
                whereExpr : whereExpr,
            }
        ) as any;
    }
    //Appends
    andWhere<WhereDelegateT extends WhereDelegate<SelectBuilder<DataT>>> (
        this : SelectBuilder<{
            hasSelect : any,
            hasFrom : true,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,

            hasParentJoins : any,
            parentJoins : any,
        }>,
        whereDelegate : WhereDelegateT
    ) : this {
        this.assertAfterFrom();

        if (this.extraData.whereExpr == undefined) {
            return this.where(whereDelegate as any) as any;
        }

        return new SelectBuilder(
            this.data,
            {
                ...this.extraData,
                whereExpr : e.and(
                    this.extraData.whereExpr,
                    WhereDelegateUtil.execute(this, whereDelegate as any)
                ),
            }
        ) as any;
    }

    //DISTINCT CLAUSE
    distinct (distinct : boolean = true) : this {
        return new SelectBuilder(
            this.data,
            {
                ...this.extraData,
                distinct : distinct,
            }
        ) as any;
    }

    //SQL_CALC_FOUND_ROWS CLAUSE
    sqlCalcFoundRows (sqlCalcFoundRows : boolean = true) : this {
        return new SelectBuilder(
            this.data,
            {
                ...this.extraData,
                sqlCalcFoundRows : sqlCalcFoundRows,
            }
        ) as any;
    }

    //GROUP BY CLAUSE
    //Replaces
    //Must be called after `FROM` as per MySQL
    groupBy<GroupByDelegateT extends GroupByDelegate<SelectBuilder<DataT>>> (
        this : SelectBuilder<{
            hasSelect : any,
            hasFrom : true,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,

            hasParentJoins : any,
            parentJoins : any,
        }>,
        groupByDelegate : GroupByDelegateT
    ) : this {
        this.assertAfterFrom();

        const groupBy = GroupByDelegateUtil.execute(this, groupByDelegate as any);
        return new SelectBuilder(
            this.data,
            {
                ...this.extraData,
                groupBy : groupBy,
            }
        ) as any;
    }
    //Appends
    appendGroupBy<GroupByDelegateT extends GroupByDelegate<SelectBuilder<DataT>>> (
        this : SelectBuilder<{
            hasSelect : any,
            hasFrom : true,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,

            hasParentJoins : any,
            parentJoins : any,
        }>,
        groupByDelegate : GroupByDelegateT
    ) : this {
        this.assertAfterFrom();

        if (this.extraData.groupBy == undefined) {
            return this.groupBy(groupByDelegate as any) as any;
        }

        const groupBy = GroupByDelegateUtil.execute(this, groupByDelegate as any);
        return new SelectBuilder(
            this.data,
            {
                ...this.extraData,
                groupBy : this.extraData.groupBy.concat(groupBy),
            }
        ) as any;
    }

    //REMOVES GROUP BY
    unsetGroupBy () : this {
        return new SelectBuilder(
            this.data,
            {
                ...this.extraData,
                groupBy : undefined,
            }
        ) as any;
    }

    //HAVING CLAUSE
    //TECHNICALLY, can only use columns in GROUP BY, or columns in aggregate functions,
    //But MySQL supports an extension that allows columns from SELECT
    //As such, this library does not check for valid columns here
    //As long as it is in columnReferences or selectReferences.

    //Replaces
    //Must be called after `FROM` as per MySQL
    having<HavingDelegateT extends HavingDelegate<SelectBuilder<DataT>>> (
        this : SelectBuilder<{
            hasSelect : any,
            hasFrom : true,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,

            hasParentJoins : any,
            parentJoins : any,
        }>,
        havingDelegate : HavingDelegateT
    ) : this {
        this.assertAfterFrom();

        return new SelectBuilder(
            this.data,
            {
                ...this.extraData,
                havingExpr : HavingDelegateUtil.execute(this, havingDelegate as any),
            }
        ) as any;
    }
    //Appends
    andHaving<HavingDelegateT extends HavingDelegate<SelectBuilder<DataT>>> (
        this : SelectBuilder<{
            hasSelect : any,
            hasFrom : true,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,

            hasParentJoins : any,
            parentJoins : any,
        }>,
        havingDelegate : HavingDelegateT
    ) : this {
        this.assertAfterFrom();

        if (this.extraData.havingExpr == undefined) {
            return this.having(havingDelegate as any) as any;
        }

        return new SelectBuilder(
            this.data,
            {
                ...this.extraData,
                havingExpr : e.and(
                    this.extraData.havingExpr,
                    HavingDelegateUtil.execute(this, havingDelegate as any)
                ),
            }
        ) as any;
    }

    //ORDER BY CLAUSE
    //Replaces
    orderBy<OrderByDelegateT extends OrderByDelegate<SelectBuilder<DataT>>> (
        orderByDelegate : OrderByDelegateT
    ) : this {
        return new SelectBuilder(
            this.data,
            {
                ...this.extraData,
                orderBy : OrderByDelegateUtil.execute(this, orderByDelegate as any),
            }
        ) as any;
    }
    //Appends
    appendOrderBy<OrderByDelegateT extends OrderByDelegate<SelectBuilder<DataT>>> (
        orderByDelegate : OrderByDelegateT
    ) : this {
        if (this.extraData.orderBy == undefined) {
            return this.orderBy(orderByDelegate);
        }
        const orderBy = OrderByDelegateUtil.execute(this, orderByDelegate as any);
        if (orderBy == undefined) {
            return this;
        }
        return new SelectBuilder(
            this.data,
            {
                ...this.extraData,
                orderBy : this.extraData.orderBy.concat(orderBy),
            }
        ) as any;
    }

    //REMOVES ORDER BY
    unsetOrderBy () : this {
        return new SelectBuilder(
            this.data,
            {
                ...this.extraData,
                orderBy : undefined,
            }
        ) as any;
    }

    //LIMIT CLAUSE
    limit (rowCount : number) : this {
        let limit = this.extraData.limit;
        if (limit == undefined) {
            limit = {
                rowCount : rowCount,
                offset : 0,
            };
        } else {
            limit = {
                rowCount : rowCount,
                offset : limit.offset,
            };
        }
        return new SelectBuilder(
            this.data,
            {
                ...this.extraData,
                limit : limit,
            }
        ) as any;
    }

    //OFFSET CLAUSE
    offset (offset : number) : this {
        let limit = this.extraData.limit;
        if (limit == undefined) {
            limit = {
                rowCount : ARBITRARY_ROW_COUNT,
                offset : offset,
            };
        } else {
            limit = {
                rowCount : limit.rowCount,
                offset : offset,
            };
        }
        return new SelectBuilder(
            this.data,
            {
                ...this.extraData,
                limit : limit,
            }
        ) as any;
    }

    //REMOVES LIMIT
    unsetLimit () : this {
        return new SelectBuilder(
            this.data,
            {
                ...this.extraData,
                limit : undefined,
            }
        ) as any;
    }

    //UNION ORDER BY CLAUSE
    //Replaces
    unionOrderBy<OrderByDelegateT extends OrderByDelegate<SelectBuilder<DataT>>> (
        orderByDelegate : OrderByDelegateT
    ) : this {
        return new SelectBuilder(
            this.data,
            {
                ...this.extraData,
                unionOrderBy : OrderByDelegateUtil.execute(this, orderByDelegate as any),
            }
        ) as any;
    }
    //Appends
    appendUnionOrderBy<OrderByDelegateT extends OrderByDelegate<SelectBuilder<DataT>>> (
        orderByDelegate : OrderByDelegateT
    ) : this {
        if (this.extraData.unionOrderBy == undefined) {
            return this.unionOrderBy(orderByDelegate);
        }
        const orderBy = OrderByDelegateUtil.execute(this, orderByDelegate as any);
        if (orderBy == undefined) {
            return this;
        }
        return new SelectBuilder(
            this.data,
            {
                ...this.extraData,
                unionOrderBy : this.extraData.unionOrderBy.concat(orderBy),
            }
        ) as any;
    }

    //UNION REMOVES ORDER BY
    unsetUnionOrderBy () : this {
        return new SelectBuilder(
            this.data,
            {
                ...this.extraData,
                unionOrderBy : undefined,
            }
        ) as any;
    }

    //UNION LIMIT CLAUSE
    unionLimit (rowCount : number) : this {
        let unionLimit = this.extraData.unionLimit;
        if (unionLimit == undefined) {
            unionLimit = {
                rowCount : rowCount,
                offset : 0,
            };
        } else {
            unionLimit = {
                rowCount : rowCount,
                offset : unionLimit.offset,
            };
        }
        return new SelectBuilder(
            this.data,
            {
                ...this.extraData,
                unionLimit : unionLimit,
            }
        ) as any;
    }

    //UNION OFFSET CLAUSE
    unionOffset (offset : number) : this {
        let unionLimit = this.extraData.unionLimit;
        if (unionLimit == undefined) {
            unionLimit = {
                rowCount : ARBITRARY_ROW_COUNT,
                offset : offset,
            };
        } else {
            unionLimit = {
                rowCount : unionLimit.rowCount,
                offset : offset,
            };
        }
        return new SelectBuilder(
            this.data,
            {
                ...this.extraData,
                unionLimit : unionLimit,
            }
        ) as any;
    }

    //UNION REMOVES LIMIT
    unsetUnionLimit () : this {
        return new SelectBuilder(
            this.data,
            {
                ...this.extraData,
                unionLimit : undefined,
            }
        ) as any;
    }

    //Must be done after select or there will be no columns to widen.
    //Must be done before `aggregate()` because
    //it'll make the data type wider than `aggregate()` expects.
    widen<
        TypeWidenDelegateT extends TypeWidenDelegate<DataT["selects"]>,
        WidenT
    > (
        this : SelectBuilder<{
            hasSelect : true,
            hasFrom : any,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : undefined,

            hasParentJoins : any,
            parentJoins : any,
        }>,
        typeWidenDelegate : TypeWidenDelegateT,
        assertWidened : sd.AssertFunc<WidenT>
    ) : (
        ReturnType<TypeWidenDelegateT> extends Column<infer TableAliasT, infer ColumnNameT, infer TypeT> ?
            SelectBuilder<{
                readonly [key in keyof DataT] : (
                    key extends "joins" ?
                    JoinCollectionUtil.ReplaceColumnType<
                        DataT["joins"],
                        TableAliasT,
                        ColumnNameT,
                        WidenT|TypeT
                    > :
                    key extends "selects" ?
                    SelectCollectionUtil.ReplaceSelectType<
                        DataT["selects"],
                        TableAliasT,
                        ColumnNameT,
                        WidenT|TypeT
                    > :
                    DataT[key]
                )
            }> :
            (invalid.E2<"Invalid column or could not infer some types", ReturnType<TypeWidenDelegateT>>)
    ) {
        this.assertAfterSelect();
        const widenedColumn = TypeWidenDelegateUtil.execute(
            this.data.selects,
            typeWidenDelegate,
            assertWidened
        );
        const joins = JoinCollectionUtil.replaceColumnType(
            this.data.joins,
            widenedColumn.tableAlias,
            widenedColumn.name,
            widenedColumn.assertDelegate
        );
        const selects = SelectCollectionUtil.replaceSelectType(
            this.data.selects,
            widenedColumn.tableAlias,
            widenedColumn.name,
            widenedColumn.assertDelegate
        );
        return new SelectBuilder(
            spread(
                this.data,
                {
                    joins : joins,
                    selects : selects,
                }
            ),
            this.extraData
        ) as any;
    };

    //UNION CLAUSE
    //Implicitly UNION DISTINCT
    union<
        TargetT extends SelectBuilder<{
            //Must have columns selected to be a union target
            hasSelect : true,
            hasFrom : any,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,

            hasParentJoins : any,
            parentJoins : any,
        }>
    > (
        this : SelectBuilder<{
            //Must have columns to know how many columns,
            //And what data types are required
            hasSelect : true,
            hasFrom : any,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,

            hasParentJoins : any,
            parentJoins : any,
        }>,
        target : TargetT,
        //Set to `false` to UNION ALL
        distinct : boolean = true
    ) : (
        TargetT extends SelectBuilder<infer TargetDataT> ?
            (
                TargetDataT["selects"] extends SelectCollection ?
                    (
                        DataT["selects"] extends SelectCollection ?
                            (
                                //Run-time check impossible for now
                                SelectCollectionUtil.HasCompatibleTypes<
                                    TargetDataT["selects"],
                                    DataT["selects"]
                                > extends true ?
                                    (
                                        SelectBuilder<DataT>
                                    ) :
                                    invalid.E4<
                                        "Target SELECT clause",
                                        SelectCollectionUtil.MapToTypes<TargetDataT["selects"]>,
                                        "is not compatible with",
                                        SelectCollectionUtil.MapToTypes<DataT["selects"]>
                                    >
                            ) :
                            invalid.E2<
                                "Could not find SELECT clause",
                                DataT["selects"]
                            >
                    ) :
                    invalid.E2<
                        "Union target does not have a SELECT clause",
                        TargetDataT["selects"]
                    >
            ) :
            invalid.E2<
                "Invalid union target, or could not infer TargetDataT",
                TargetT
            >
    ) {
        this.assertAfterSelect();
        if (target.data.selects == undefined) {
            throw new Error(`Union target does not have a SELECT clause`);
        }
        if (this.data.selects == undefined) {
            throw new Error(`Could not find SELECT clause`);
        }
        SelectCollectionUtil.assertHasCompatibleTypes(
            target.data.selects,
            this.data.selects
        )

        let union = this.extraData.union;
        if (union == undefined) {
            union = [];
        }
        union = union.concat({
            target : target,
            distinct : distinct,
        });
        return new SelectBuilder(
            spread(
                this.data,
                {
                    hasUnion : true,
                }
            ),
            {
                ...this.extraData,
                union : union,
            }
        ) as any;
    }

    querifyJoins (sb : StringBuilder) {
        sb.scope((sb) => {
            this.data.joins[0].table.querify(sb);
        });
        sb.map(
            this.data.joins.slice(1),
            (sb, join, index) => {
                sb.appendLine(`${join.joinType} JOIN`);
                sb.scope((sb) => {
                    join.table.querify(sb);
                });
                sb.appendLine("ON");
                sb.scope((sb) => {
                    if (join.from == undefined || join.to == undefined || join.from.length != join.to.length) {
                        throw new Error(`Invalid JOIN ${index}, ${join.joinType} JOIN ${join.table.alias}`);
                    }
                    const fromArr = join.from;
                    const toArr = join.to;
                    sb.map(
                        fromArr,
                        (sb, from, index) => {
                            const to = toArr[index];
                            from.querify(sb);
                            sb.append(" = ");
                            to.querify(sb);
                        },
                        " AND\n"
                    );
                });
            }
        )
    }
    querifyWhere (sb : StringBuilder) {
        if (this.extraData.whereExpr != undefined) {
            sb.appendLine("WHERE");
            const whereExpr = this.extraData.whereExpr;
            sb.scope((sb) => {
                whereExpr.querify(sb)
            });
        }
    }
    querify (sb : StringBuilder) {
        const hasUnionSelect = (
            this.data.selects != undefined &&
            (
                this.extraData.union != undefined ||
                this.extraData.unionOrderBy != undefined ||
                this.extraData.unionLimit != undefined
            )
        );
        if (hasUnionSelect) {
            sb.appendLine("(");
            sb.indent();
        }
        if (this.data.selects != undefined) {
            sb.append("SELECT");
            if (this.extraData.distinct) {
                sb.append(" DISTINCT");
            }
            if (this.extraData.sqlCalcFoundRows) {
                sb.append(" SQL_CALC_FOUND_ROWS");
            }
            sb.appendLine();

            const selects = this.data.selects;
            sb.scope((sb) => {
                sb.map(selects, (sb, element) => {
                    if (element instanceof AliasedExpr) {
                        element.querify(sb);
                    } else if (element instanceof Column) {
                        //const str = element.as(element.name).querify();
                        //return `\t${str}`;
                        const alias = mysql.escapeId(`${element.tableAlias}--${element.name}`);
                        element.querify(sb);
                        sb.append(` AS ${alias}`);

                    } else if (element instanceof Object) {
                        const names = Object.keys(element).sort();
                        sb.map(names, (sb, name) => {
                            const sub = element[name];
                            const alias = mysql.escapeId(`${sub.tableAlias}--${sub.name}`);
                            sub.querify(sb);
                            sb.append(` AS ${alias}`);
                        }, ",\n");
                    } else {
                        throw new Error(`Unknown select (${typeof element})${element}`);
                    }
                }, ",\n");
            });
        }
        if (this.data.hasFrom) {
            sb.appendLine("FROM");
            this.querifyJoins(sb);
        }
        this.querifyWhere(sb);
        if (this.extraData.groupBy != undefined) {
            sb.appendLine("GROUP BY");
            const groupBy = this.extraData.groupBy;
            sb.scope((sb) => {
                sb.map(
                    groupBy,
                    (sb, e) => {
                        if (e instanceof Column) {
                            e.querify(sb);
                        } else {
                            sb.map(
                                Object.keys(e),
                                (sb, columnName) => {
                                    e[columnName].querify(sb);
                                },
                                ",\n"
                            );
                        }

                    },
                    ",\n"
                );
            });
        }
        if (this.extraData.havingExpr != undefined) {
            sb.appendLine("HAVING");
            const havingExpr = this.extraData.havingExpr;
            sb.scope((sb) => {
                havingExpr.querify(sb);
            });
        }
        if (this.extraData.orderBy != undefined) {
            sb.appendLine("ORDER BY");
            const orderBy = this.extraData.orderBy;
            sb.scope((sb) => {
                sb.map(
                    orderBy,
                    (sb, e) => {
                        if ((e instanceof Column) || (e instanceof Expr)) {
                            e.querify(sb);
                            sb.append(" ASC");
                        } else {
                            e[0].querify(sb);
                            sb.append(e[1] ? " ASC" : " DESC");
                        }
                    },
                    ",\n"
                )
            });
        }
        if (this.extraData.limit != undefined) {
            const limit = this.extraData.limit;
            sb.appendLine("LIMIT")
                .scope((sb) => {
                    sb.append(limit.rowCount.toString());
                });
            sb.appendLine("OFFSET")
                .scope((sb) => {
                    sb.append(limit.offset.toString());
                });
        }

        if (hasUnionSelect) {
            sb.unindent();
            sb.appendLine(")");
        }

        if (this.extraData.union != undefined) {
            sb.map(
                this.extraData.union,
                (sb, u) => {
                    sb.append("UNION");
                    if (u.distinct) {
                        sb.append(" DISTINCT")
                    } else {
                        sb.append(" ALL")
                    }
                    sb.appendLine();
                    sb.appendLine("(");
                    sb.scope((sb) => {
                        u.target.querify(sb);
                    });
                    sb.appendLine(")");
                },
                "\n"
            );
        }
        if (this.extraData.unionOrderBy != undefined) {
            sb.appendLine("ORDER BY");
            const unionOrderBy = this.extraData.unionOrderBy;
            sb.scope((sb) => {
                sb.map(
                    unionOrderBy,
                    (sb, e) => {
                        if ((e instanceof Column) || (e instanceof Expr)) {
                            e.querify(sb);
                            sb.append(" ASC");
                        } else {
                            e[0].querify(sb);
                            sb.append(e[1] ? " ASC" : " DESC");
                        }
                    },
                    ",\n"
                )
            });
        }
        if (this.extraData.unionLimit != undefined) {
            const unionLimit = this.extraData.unionLimit;
            sb.appendLine("LIMIT")
                .scope((sb) => {
                    sb.append(unionLimit.rowCount.toString());
                });
            sb.appendLine("OFFSET")
                .scope((sb) => {
                    sb.append(unionLimit.offset.toString());
                });
        }
    }
    getQuery () {
        const sb = new StringBuilder();
        this.querify(sb);
        return sb.toString();
    }
    printQuery () {
        console.log(this.getQuery());
        return this;
    }
    as<AliasT extends string> (
        this : SelectBuilder<{
            //Must have columns to alias as a
            //subquery
            hasSelect : true,
            hasFrom : any,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,

            hasParentJoins : any,
            parentJoins : any,
        }>,
        alias : AliasT
    ) : (
        DataT extends { hasSelect : true } ?
            SubqueryTable<AliasT, DataT> :
            invalid.E1<"Missing SELECT clause">
    ) {
        this.assertAfterSelect();

        return new SubqueryTable(
            alias,
            this
        ) as any;
    };
    asExpr<AliasT extends string> (
        this : SelectBuilder<{
            //Must have columns to alias as a
            //subquery
            hasSelect : true,
            hasFrom : any,
            hasUnion : any,
            joins : any,
            selects : DataT["selects"] & { length : 1 }//SelectCollection & { length : 1 },//any,
            aggregateDelegate : any,

            hasParentJoins : any,
            parentJoins : any,
        }>,
        alias : AliasT
    ) : (
        AliasedExpr<
            {},
            "__expr",
            AliasT,
            RawExprUtil.Type<SelectBuilder<DataT>>
        >
    ) {
        this.assertAfterSelect();
        if (this.data.selects == undefined || this.data.selects.length != 1) {
            throw new Error(`Must SELECT one column only`);
        }
        if (
            !(this.data.selects[0] instanceof AliasedExpr) &&
            !(this.data.selects[0] instanceof Column)
        ) {
            throw new Error(`Invalid SELECT; must select a column or column expression`);
        }
        return RawExprUtil.toExpr(this).as(alias) as any;
    }

    subQuery () : (
        DataT["hasParentJoins"] extends true ?
            SelectBuilder<{
                hasSelect : false,
                hasFrom : false,
                hasUnion : false,

                //This is just a dummy JOIN
                //It will be replaced when the FROM clause is added
                joins : [
                    Join<
                        typeof __DUMMY_FROM_TABLE,
                        typeof __DUMMY_FROM_TABLE["columns"],
                        true
                    >
                ],
                selects : undefined,
                aggregateDelegate : undefined,

                //Give this builder access to our JOINs
                hasParentJoins : true,
                parentJoins : (
                    DataT["hasFrom"] extends true ?
                        TupleWConcat<
                            AnyJoin,
                            DataT["parentJoins"],
                            DataT["joins"]
                        > :
                        DataT["parentJoins"]
                ),
            }> :
            SelectBuilder<{
                hasSelect : false,
                hasFrom : false,
                hasUnion : false,

                //This is just a dummy JOIN
                //It will be replaced when the FROM clause is added
                joins : [
                    Join<
                        typeof __DUMMY_FROM_TABLE,
                        typeof __DUMMY_FROM_TABLE["columns"],
                        true
                    >
                ],
                selects : undefined,
                aggregateDelegate : undefined,

                //Give this builder access to our JOINs
                hasParentJoins : DataT["hasFrom"],
                parentJoins : DataT["joins"],
            }>
    ) {
        if (this.data.hasParentJoins) {
            const childBuilder = new SelectBuilder(
                {
                    hasSelect : false,
                    hasFrom : false,
                    hasUnion : false,

                    //This is just a dummy JOIN
                    //It will be replaced when the FROM clause is added
                    joins : [
                        new Join<
                            typeof __DUMMY_FROM_TABLE,
                            typeof __DUMMY_FROM_TABLE["columns"],
                            true
                        >(
                            JoinType.FROM,
                            __DUMMY_FROM_TABLE,
                            __DUMMY_FROM_TABLE.columns,
                            true,
                            [],
                            []
                        )
                    ],
                    selects : undefined,
                    aggregateDelegate : undefined,

                    //Give this builder access to our JOINs
                    hasParentJoins : true,
                    parentJoins : (
                        this.data.hasFrom ?
                            (
                                this.data.parentJoins.concat(this.data.joins)
                            ) :
                            this.data.parentJoins
                    ) as any,
                },
                {
                    db : this.extraData.db,
                    distinct : false,
                    sqlCalcFoundRows : false,
                }
            );
            return childBuilder as any;
        } else {
            const childBuilder = new SelectBuilder(
                {
                    hasSelect : false,
                    hasFrom : false,
                    hasUnion : false,

                    //This is just a dummy JOIN
                    //It will be replaced when the FROM clause is added
                    joins : [
                        new Join<
                            typeof __DUMMY_FROM_TABLE,
                            typeof __DUMMY_FROM_TABLE["columns"],
                            true
                        >(
                            JoinType.FROM,
                            __DUMMY_FROM_TABLE,
                            __DUMMY_FROM_TABLE.columns,
                            true,
                            [],
                            []
                        )
                    ],
                    selects : undefined,
                    aggregateDelegate : undefined,

                    //Give this builder access to our JOINs
                    hasParentJoins : this.data.hasFrom,
                    parentJoins : this.data.joins,
                },
                {
                    db : this.extraData.db,
                    distinct : false,
                    sqlCalcFoundRows : false,
                }
            );
            return childBuilder as any;
        }
    }

    //Convenience
    insertInto<TableT extends AnyTable> (
        this : SelectBuilder<{
            hasSelect : any,
            hasFrom : any,
            hasUnion : any,

            joins : any,

            selects : any,

            aggregateDelegate : any,

            //It makes no sense to insert into a subquery
            hasParentJoins : false,
            parentJoins : any,
        }>,
        table : TableT,
        delegate : InsertAssignmentCollectionDelegate<TableT, SelectBuilder<DataT>>
    ) : (
        InsertSelectBuilder<
            TableT,
            SelectBuilder<DataT>,
            RawInsertSelectAssignmentCollection<TableT, SelectBuilder<DataT>>,
            "NORMAL"
        >
    ) {
        return new InsertSelectBuilder(
            table,
            this,
            undefined,
            "NORMAL",
            this.extraData.db
        ).set(delegate as any) as any;
    }
    set (
        this : SelectBuilder<{
            hasSelect : false,
            hasFrom : true,
            hasUnion : false,

            joins : any,

            selects : undefined,

            aggregateDelegate : any,

            //It makes no sense to update a subquery
            hasParentJoins : false,
            parentJoins : any,
        }>,
        delegate : UpdateAssignmentReferencesDelegate<SelectBuilder<DataT>>
    ) : (
        UpdateBuilder<
            SelectBuilder<{
                hasSelect : false,
                hasFrom : true,
                hasUnion : false,

                joins : DataT["joins"],

                selects : undefined,

                aggregateDelegate : any,

                //It makes no sense to update a subquery
                hasParentJoins : false,
                parentJoins : any,
            }>,
            RawUpdateAssignmentReferences<SelectBuilder<DataT>>
        >
    ) {
        return new UpdateBuilder(
            this,
            undefined,
            false,
            this.extraData.db
        ).set(delegate as any) as any;
    }
    delete (
        this : SelectBuilder<{
            hasSelect : false,
            hasFrom : true,
            hasUnion : false,

            joins : any,

            selects : undefined,

            aggregateDelegate : any,

            //It makes no sense to delete a subquery
            hasParentJoins : false,
            parentJoins : any,
        }>,
        delegate? : DeleteTablesDelegate<SelectBuilder<DataT>>
    ) : (
        DeleteBuilder<
            SelectBuilder<{
                hasSelect : false,
                hasFrom : true,
                hasUnion : false,

                joins : DataT["joins"],

                selects : undefined,

                aggregateDelegate : any,

                //It makes no sense to delete a subquery
                hasParentJoins : false,
                parentJoins : any,
            }>,
            DeleteTables<SelectBuilder<DataT>>
        >
    ) {
        return new DeleteBuilder(
            this,
            undefined,
            false,
            this.extraData.db
        ).tables(delegate as any) as any;
    }
}

export type CreateSelectBuilderDelegate = (
    () => (
        SelectBuilder<{
            hasSelect : false,
            hasFrom : false,
            hasUnion : false,

            //This is just a dummy JOIN
            //It will be replaced when the FROM clause is added
            joins : [
                Join<
                    typeof __DUMMY_FROM_TABLE,
                    typeof __DUMMY_FROM_TABLE["columns"],
                    true
                >
            ],
            selects : undefined,
            aggregateDelegate : undefined,

            hasParentJoins : false,
            //This is just a dummy JOIN
            //It will be replaced when we have a subquery
            parentJoins : [
                Join<
                    typeof __DUMMY_FROM_TABLE,
                    typeof __DUMMY_FROM_TABLE["columns"],
                    true
                >
            ],
        }>
    )
);
export type AnySelectBuilder = SelectBuilder<any>;
