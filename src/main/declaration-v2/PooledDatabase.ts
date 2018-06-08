import * as mysql from "typed-mysql";
import {CreateSelectBuilderDelegate} from "./select-builder";
import {SelectBuilder, AnySelectBuilder, __DUMMY_FROM_TABLE} from "./select-builder";
import {Join, JoinType} from "./join";
import {AnyAliasedTable} from "./aliased-table";;
import {SelectDelegate} from "./select-delegate";
import {Table, AnyTable, UniqueKeys, TableRow} from "./table";
import {RawInsertValueRow, InsertValueBuilder} from "./insert-value-builder";
import {InsertAssignmentCollectionDelegate, InsertSelectBuilder, InsertSelectBuilderConvenientDelegate} from "./insert-select-builder";
import {UpdateBuilder, RawUpdateAssignmentReferences, UpdateAssignmentReferencesDelegate, UpdateResult} from "./update-builder";
import * as sd from "schema-decorator";
import {WhereDelegate} from "./where-delegate";
import {DeleteBuilder, DeleteTables, DeleteResult} from "./delete-builder";
import {SelectBuilderUtil} from "./select-builder-util";
import {FetchRow} from "./fetch-row";
import {SelectCollectionUtil} from "./select-collection";
import {UniqueKeyCollection} from "./unique-key-collection";
import * as informationSchema from "./information-schema";
import {PolymorphicRawInsertValueRow, polymorphicInsertValueAndFetch} from "./polymorphic-insert-value-and-fetch";
import {PolymorphicUpdateAssignmentCollectionDelegate, polymorphicUpdateZeroOrOneByUniqueKey} from "./polymorphic-update-zero-or-one-by-unique-key";
import {RawExprUtil} from "./raw-expr";
import {LogData, LogDataUtil} from "./log";
import {ColumnCollectionUtil} from "./column-collection";
import {SelectValue} from "./select-value";
import {ColumnReferencesUtil} from "./column-references";
import {TableParentCollectionUtil} from "./table-parent-collection";

import {AliasedTable} from "./aliased-table";;
import {AliasedExpr, AnyAliasedExpr} from "./aliased-expr";
import {Column, AnyColumn} from "./column";
import {Expr} from "./expr";
import {TableData} from "./table-data";
AliasedTable;
AliasedExpr;
Column;
Expr;
const __tabledata : TableData|undefined = undefined;
__tabledata;

export type ConvenientUpdateSelectBuilder<TableT extends AnyTable> = (
    SelectBuilder<{
        hasSelect : false,
        hasFrom : true,
        hasUnion : false,

        joins : [
            Join<
                TableT,
                TableT["columns"],
                false
            >
        ],

        selects : undefined,

        aggregateDelegate : undefined,

        //It makes no sense to update a subquery
        hasParentJoins : false,
        parentJoins : any,
    }>
);
export type ConvenientDeleteSelectBuilder<TableT extends AnyTable> = (
    SelectBuilder<{
        hasSelect : false,
        hasFrom : true,
        hasUnion : false,

        joins : [
            Join<
                TableT,
                TableT["columns"],
                false
            >
        ],

        selects : undefined,

        aggregateDelegate : undefined,

        //It makes no sense to delete a subquery
        hasParentJoins : false,
        parentJoins : any,
    }>
);

export class PooledDatabase extends mysql.PooledDatabase {
    public allocate () {
        return new PooledDatabase(
            this.getPool(),
            this.getData()
        );
    }
    public async transaction<ResultT> (callback : (db : PooledDatabase) => Promise<ResultT>) : Promise<ResultT> {
        const allocated = this.allocate();

        await allocated.beginTransaction();
        return callback(allocated)
            .then(async (result) => {
                await allocated.commit();
                allocated.freeConnection();
                return result;
            })
            .catch(async (err) => {
                await allocated.rollback();
                allocated.freeConnection();
                throw err;
            });
    }
    public transactionIfNotInOne<ResultT> (callback : (db : PooledDatabase) => Promise<ResultT>) : Promise<ResultT> {
        if (this.isInTransaction()) {
            return callback(this);
        } else {
            return this.transaction(callback);
        }
    }
    readonly query : CreateSelectBuilderDelegate = () => {
        return new SelectBuilder(
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

                hasParentJoins : false,
                parentJoins : [
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
            },
            {
                db : this,
                distinct : false,
                sqlCalcFoundRows : false,
            }
        );
    };
    from<TableT extends AnyAliasedTable|AnyTable> (table : TableT) : (
        SelectBuilderUtil.FromUnsafe<
            SelectBuilder<SelectBuilderUtil.CleanData>,
            TableT
        >
    ) {
        return this.query()
            .from(table) as any;
    };
    select<
        SelectDelegateT extends SelectDelegate<ReturnType<CreateSelectBuilderDelegate>>
    >(delegate : SelectDelegateT) : (
        SelectBuilderUtil.Select<ReturnType<CreateSelectBuilderDelegate>, SelectDelegateT>
    ) {
        return this.query()
            .select(delegate);
    };
    selectAll<T> (
        assert: sd.AssertFunc<T>,
        queryStr: string,
        queryValues?: mysql.QueryValues
    ) : Promise<mysql.SelectResult<T>>;
    selectAll<
        TableT extends AnyAliasedTable
    > (
        table : TableT,
        where? : WhereDelegate<SelectBuilderUtil.CleanToFrom<TableT>>
    ) : SelectBuilderUtil.CleanToSelectAll<TableT>;
    selectAll (arg0 : any, arg1? : any, arg2? : any) : any {
        if (arg0 instanceof AliasedTable) {
            if (arg1 == undefined) {
                return (this.from(arg0) as any)
                    .selectAll()
            } else {
                return (this.from(arg0) as any)
                    .where(arg1)
                    .selectAll();
            }
        } else {
            return super.selectAll(arg0, arg1, arg2);
        }
    }
    selectAllByUniqueKey<TableT extends AnyTable> (
        table : TableT,
        uniqueKey : UniqueKeys<TableT>
    ) : (
        SelectBuilderUtil.CleanToSelectAll<TableT>
    ) {
        /*uniqueKey = table.getUniqueKeyAssertDelegate()(
            `${table.alias} unique key`,
            uniqueKey
        ) as any;*/
        let result : any = (this.from(table) as any)
            .where(() => RawExprUtil.toUniqueKeyEqualityCondition(
                table,
                uniqueKey
            ))
            .selectAll();
        /*for (let columnName in uniqueKey) {
            const value : any = uniqueKey[columnName]
            if (value === undefined) {
                continue;
            }
            if (value == null) {
                result = result.whereIsNull((c : any) => c[columnName]);
            } else {
                result = result.whereIsEqual((c : any) => c[columnName], value);
            }
        }*/
        return result;
    }
    fetchOneByUniqueKey<TableT extends AnyTable> (
        table : TableT,
        uniqueKey : UniqueKeys<TableT>
    ) : (
        Promise<SelectBuilderUtil.AggregatedRow<SelectBuilderUtil.CleanToSelectAll<TableT>>>
    ) {
        return this.selectAllByUniqueKey(table, uniqueKey)
            .fetchOne();
    }
    fetchZeroOrOneByUniqueKey<TableT extends AnyTable> (
        table : TableT,
        uniqueKey : UniqueKeys<TableT>
    ) : (
        Promise<undefined|SelectBuilderUtil.AggregatedRow<SelectBuilderUtil.CleanToSelectAll<TableT>>>
    ) {
        return this.selectAllByUniqueKey(table, uniqueKey)
            .fetchZeroOrOne();
    }
    fetchOneById<TableT extends AnyAliasedTable & { data : { id : Column<any, any, number> } }> (
        table : TableT,
        id : number
    ) : (
        Promise<FetchRow<
            SelectBuilderUtil.CleanToSelectAll<TableT>["data"]["joins"],
            SelectCollectionUtil.ToColumnReferences<
                SelectBuilderUtil.CleanToSelectAll<TableT>["data"]["selects"]
            >
        >>
    ) {
        if (table.data.id == undefined) {
            throw new Error(`Expected ${table.alias} to have an id column`);
        }
        return (this.from(table) as any)
            .whereIsEqual((c : any) => c[table.data.id.name], id)
            .selectAll()
            .fetchOne();
    }
    async fetchZeroOrOneById<TableT extends AnyAliasedTable & { data : { id : Column<any, any, number> } }> (
        table : TableT,
        id : number
    ) : (
        Promise<FetchRow<
            SelectBuilderUtil.CleanToSelectAll<TableT>["data"]["joins"],
            SelectCollectionUtil.ToColumnReferences<
                SelectBuilderUtil.CleanToSelectAll<TableT>["data"]["selects"]
            >
        >|undefined>
    ) {
        if (table.data.id == undefined) {
            throw new Error(`Expected ${table.alias} to have an id column`);
        }
        return (this.from(table) as any)
            .whereIsEqual((c : any) => c[table.data.id.name], id)
            .selectAll()
            .fetchZeroOrOne();
    }
    fetchValueByUniqueKey<
        TableT extends AnyTable,
        DelegateT extends (c : TableT["columns"]) => SelectValue<ColumnCollectionUtil.ToColumnReferences<TableT["columns"]>, any>|Expr<ColumnReferencesUtil.Partial<ColumnCollectionUtil.ToColumnReferences<TableT["columns"]>>, any>
    > (
        table : TableT,
        uniqueKey : UniqueKeys<TableT>,
        selectValueDelegate : DelegateT
    ) : (
        Promise<
            ReturnType<DelegateT> extends AnyAliasedExpr ?
            ReturnType<ReturnType<DelegateT>["assertDelegate"]> :
            ReturnType<RawExprUtil.ToExpr<ReturnType<DelegateT>>["assertDelegate"]>
        >
    ) {
        const columnOrAliasedExprOrExpr = selectValueDelegate(table.columns);
        if (columnOrAliasedExprOrExpr instanceof AliasedExpr) {
            const ref = ColumnCollectionUtil.toColumnReferences(table.columns);
            ColumnReferencesUtil.assertHasColumnReferences(
                ref,
                columnOrAliasedExprOrExpr.usedReferences as any
            );
        } else if (columnOrAliasedExprOrExpr instanceof Column) {
            ColumnCollectionUtil.assertHasColumn(table.columns, columnOrAliasedExprOrExpr);
        } else {
            const ref = ColumnCollectionUtil.toColumnReferences(table.columns);
            ColumnReferencesUtil.assertHasColumnReferences(
                ref,
                columnOrAliasedExprOrExpr.usedReferences as any
            );
        }

        if (columnOrAliasedExprOrExpr instanceof Expr) {
            return (this.from(table) as any)
            .where(() => RawExprUtil.toUniqueKeyEqualityCondition(
                table,
                uniqueKey
            ))
            .select(() => [columnOrAliasedExprOrExpr.as("value")])
            .fetchValue();
        } else {
            return (this.from(table) as any)
            .where(() => RawExprUtil.toUniqueKeyEqualityCondition(
                table,
                uniqueKey
            ))
            .select(() => [columnOrAliasedExprOrExpr])
            .fetchValue();
        }
    }
    fetchValueOrUndefinedByUniqueKey<
        TableT extends AnyTable,
        DelegateT extends (c : TableT["columns"]) => SelectValue<ColumnCollectionUtil.ToColumnReferences<TableT["columns"]>, any>|Expr<ColumnReferencesUtil.Partial<ColumnCollectionUtil.ToColumnReferences<TableT["columns"]>>, any>
    > (
        table : TableT,
        uniqueKey : UniqueKeys<TableT>,
        selectValueDelegate : DelegateT
    ) : (
        Promise<
            undefined|
            (
                ReturnType<DelegateT> extends AnyAliasedExpr ?
                ReturnType<ReturnType<DelegateT>["assertDelegate"]> :
                ReturnType<RawExprUtil.ToExpr<ReturnType<DelegateT>>["assertDelegate"]>
            )
        >
    ) {
        const columnOrAliasedExprOrExpr = selectValueDelegate(table.columns);
        if (columnOrAliasedExprOrExpr instanceof AliasedExpr) {
            const ref = ColumnCollectionUtil.toColumnReferences(table.columns);
            ColumnReferencesUtil.assertHasColumnReferences(
                ref,
                columnOrAliasedExprOrExpr.usedReferences as any
            );
        } else if (columnOrAliasedExprOrExpr instanceof Column) {
            ColumnCollectionUtil.assertHasColumn(table.columns, columnOrAliasedExprOrExpr);
        } else {
            const ref = ColumnCollectionUtil.toColumnReferences(table.columns);
            ColumnReferencesUtil.assertHasColumnReferences(
                ref,
                columnOrAliasedExprOrExpr.usedReferences as any
            );
        }

        if (columnOrAliasedExprOrExpr instanceof Expr) {
            return (this.from(table) as any)
            .where(() => RawExprUtil.toUniqueKeyEqualityCondition(
                table,
                uniqueKey
            ))
            .select(() => [columnOrAliasedExprOrExpr.as("value")])
            .fetchValueOrUndefined();
        } else {
            return (this.from(table) as any)
            .where(() => RawExprUtil.toUniqueKeyEqualityCondition(
                table,
                uniqueKey
            ))
            .select(() => [columnOrAliasedExprOrExpr])
            .fetchValueOrUndefined();
        }
    }

    insertValue<TableT extends AnyTable> (
        table : TableT,
        value : RawInsertValueRow<TableT>
    ) : (
        InsertValueBuilder<TableT, RawInsertValueRow<TableT>[], "NORMAL">
    ) {
        return new InsertValueBuilder(
            table,
            undefined,
            "NORMAL",
            this
        ).value(value);
    };
    async insertValueAndFetch<
        TableT extends AnyTable & { data : { uniqueKeys : UniqueKeyCollection } }
    > (
        table : TableT,
        value : RawInsertValueRow<TableT>
    ) : (
        Promise<FetchRow<
            SelectBuilderUtil.CleanToSelectAll<TableT>["data"]["joins"],
            SelectCollectionUtil.ToColumnReferences<
                SelectBuilderUtil.CleanToSelectAll<TableT>["data"]["selects"]
            >
        >>
    ) {
        return (this.insertValue(table, value) as any)
            .executeAndFetch();
    }
    readonly insertSelect : InsertSelectBuilderConvenientDelegate = <
        TableT extends AnyTable,
        SelectBuilderT extends AnySelectBuilder
    > (
        table : TableT,
        selectBuilder : SelectBuilderT,
        delegate : InsertAssignmentCollectionDelegate<TableT, SelectBuilderT>
    ) => {
        return new InsertSelectBuilder(
            table,
            selectBuilder,
            undefined,
            "NORMAL",
            this
        ).set(delegate);
    };
    update<
        T extends mysql.QueryValues,
        ConditionT extends mysql.QueryValues
    >(
        assertRow: sd.AssertFunc<T>,
        assertCondition: sd.AssertFunc<ConditionT>,
        table: string,
        row: T,
        condition: ConditionT
    ): Promise<mysql.UpdateResult<T, ConditionT>>;
    update <
        TableT extends AnyTable
    > (
        table : TableT,
        delegate : UpdateAssignmentReferencesDelegate<ConvenientUpdateSelectBuilder<TableT>>,
        where : WhereDelegate<ConvenientUpdateSelectBuilder<TableT>>
    ) : (
        UpdateBuilder<
            ConvenientUpdateSelectBuilder<TableT>,
            RawUpdateAssignmentReferences<ConvenientUpdateSelectBuilder<TableT>>
        >
    );
    update (arg0 : any, arg1 : any, arg2 : any, arg3? : any, arg4? : any) : any {
        if (arg0 instanceof Table) {
            return (this.from(arg0) as any)
                .where(arg2)
                .set(arg1);
        } else {
            return super.update(arg0, arg1, arg2, arg3, arg4);
        }
    }
    existsById<
        TableT extends AnyTable & { data : { id : Column<any, any, number> } }
    > (
        table : TableT,
        id : number
    ) : Promise<boolean> {
        if (table.data.id == undefined) {
            throw new Error(`Expected ${table.alias} to have an id column`);
        }
        return (this.from(table) as any)
            .whereIsEqual((c : any) => c[table.data.id.name], id)
            .exists();
    }
    existsByUniqueKey<
        TableT extends AnyTable & { data : { uniqueKeys : UniqueKeyCollection } }
    > (
        table : TableT,
        uniqueKey : UniqueKeys<TableT>
    ) : Promise<boolean> {
        if (table.data.uniqueKeys == undefined) {
            throw new Error(`Expected ${table.alias} to have a unique key`);
        }
        return (this.from(table) as any)
            .where(() => RawExprUtil.toUniqueKeyEqualityCondition(
                table,
                uniqueKey
            ))
            .exists();
    }
    updateZeroOrOneById<
        TableT extends AnyTable & { data : { id : Column<any, any, number> } }
    > (
        table : TableT,
        id : number,
        delegate : UpdateAssignmentReferencesDelegate<ConvenientUpdateSelectBuilder<TableT>>
    ) : (
        Promise<UpdateResult>
    ) {
        if (table.data.id == undefined) {
            throw new Error(`Expected ${table.alias} to have an id column`);
        }
        return this.transactionIfNotInOne(async (db) => {
            const updateResult : UpdateResult = await (db.from(table) as any)
                .whereIsEqual((c : any) => c[table.data.id.name], id)
                .set(delegate)
                .execute();

            if (updateResult.foundRowCount > 1) {
                //Should not be possible
                throw new Error(`Expected to update one row of ${table.alias}, with ${table.data.id.name} = ${id}; found ${updateResult.foundRowCount} rows`);
            }

            if (updateResult.foundRowCount == 0) {
                return updateResult;
            }

            if (updateResult.foundRowCount < 0) {
                //No update was even attempted, probably an empty SET clause
                const exists = await db.existsById(table, id);
                if (exists) {
                    return {
                        ...updateResult,
                        affectedRows : 1,
                        foundRowCount : 1,
                    };
                } else {
                    return {
                        ...updateResult,
                        affectedRows : 0,
                        foundRowCount : 0,
                    };
                }
            }

            return updateResult;
        }) as any;
    }
    updateOneById<
        TableT extends AnyTable & { data : { id : Column<any, any, number> } }
    > (
        table : TableT,
        id : number,
        delegate : UpdateAssignmentReferencesDelegate<ConvenientUpdateSelectBuilder<TableT>>
    ) : (
        Promise<UpdateResult>
    ) {
        if (table.data.id == undefined) {
            throw new Error(`Expected ${table.alias} to have an id column`);
        }
        return this.transactionIfNotInOne(async (db) => {
            const updateResult : UpdateResult = await (db.from(table) as any)
                .whereIsEqual((c : any) => c[table.data.id.name], id)
                .set(delegate)
                .execute();

            if (updateResult.foundRowCount > 1) {
                //Should not be possible
                throw new Error(`Expected to update one row of ${table.alias}, with ${table.data.id.name} = ${id}; found ${updateResult.foundRowCount} rows`);
            }

            if (updateResult.foundRowCount == 0) {
                throw new Error(`Expected to find one row of ${table.alias}, with ${table.data.id.name} = ${id}; found zero`);
            }

            if (updateResult.foundRowCount < 0) {
                //No update was even attempted, probably an empty SET clause
                const exists = await db.existsById(table, id);
                if (exists) {
                    return {
                        ...updateResult,
                        affectedRows : 1,
                        foundRowCount : 1,
                    };
                } else {
                    throw new Error(`Expected to find one row of ${table.alias}, with ${table.data.id.name} = ${id}; found zero`);
                }
            }

            return updateResult;
        }) as any;
    }
    /*
        If the row does not exist, it returns,
        {
            foundRowCount : 0,
            row : undefined
        }

        If the row exists but was not updated, it returns,
        {
            updatedRowCount : 0
            row : Object
        }
    */
    updateAndFetchZeroOrOneById<
        TableT extends AnyTable & { data : { id : Column<any, any, number> } }
    > (
        table : TableT,
        id : number,
        delegate : UpdateAssignmentReferencesDelegate<ConvenientUpdateSelectBuilder<TableT>>
    ) : (
        Promise<
            UpdateResult &
            (
                {
                    foundRowCount : 1,
                    row : (
                        FetchRow<
                            SelectBuilderUtil.CleanToSelectAll<TableT>["data"]["joins"],
                            SelectCollectionUtil.ToColumnReferences<
                                SelectBuilderUtil.CleanToSelectAll<TableT>["data"]["selects"]
                            >
                        >
                    )
                } |
                {
                    foundRowCount : 0,
                    row : undefined
                }
            )
        >
    ) {
        if (table.data.id == undefined) {
            throw new Error(`Expected ${table.alias} to have an id column`);
        }
        return this.transactionIfNotInOne(async (db) => {
            const updateResult : UpdateResult = await (db.from(table) as any)
                .whereIsEqual((c : any) => c[table.data.id.name], id)
                .set(delegate)
                .execute();

            if (updateResult.foundRowCount > 1) {
                //Should not be possible
                throw new Error(`Expected to update one row of ${table.alias}, with ${table.data.id.name} = ${id}; found ${updateResult.foundRowCount} rows`);
            }

            if (updateResult.foundRowCount == 0) {
                return {
                    ...updateResult,
                    row : undefined,
                };
            }

            if (updateResult.foundRowCount < 0) {
                //No update was even attempted, probably an empty SET clause
                const row = await db.fetchZeroOrOneById(table, id);
                if (row == undefined) {
                    return {
                        ...updateResult,
                        affectedRows : 0,
                        foundRowCount : 0,
                        row : row,
                    };
                } else {
                    return {
                        ...updateResult,
                        affectedRows : 1,
                        foundRowCount : 1,
                        row : row,
                    };
                }
            }

            return {
                ...updateResult,
                row : await db.fetchOneById(table, id),
            };
        }) as any;
    }
    updateZeroOrOneByUniqueKey<
        TableT extends AnyTable & { data : { uniqueKeys : UniqueKeyCollection } }
    > (
        table : TableT,
        uniqueKey : UniqueKeys<TableT>,
        delegate : UpdateAssignmentReferencesDelegate<ConvenientUpdateSelectBuilder<TableT>>
    ) : (
        Promise<UpdateResult>
    ) {
        if (table.data.uniqueKeys == undefined) {
            throw new Error(`Expected ${table.alias} to have a unique key`);
        }
        return this.transactionIfNotInOne(async (db) => {
            const updateResult : UpdateResult = await (db.from(table) as any)
                .where(() => RawExprUtil.toUniqueKeyEqualityCondition(
                    table,
                    uniqueKey
                ))
                .set(delegate)
                .execute();

            if (updateResult.foundRowCount > 1) {
                //Should not be possible
                throw new Error(`Expected to update one row of ${table.alias}, with unique key ${JSON.stringify(uniqueKey)}; found ${updateResult.foundRowCount} rows`);
            }

            if (updateResult.foundRowCount == 0) {
                return updateResult;
            }

            if (updateResult.foundRowCount < 0) {
                //No update was even attempted, probably an empty SET clause
                const exists = await db.existsByUniqueKey(table, uniqueKey);
                if (exists) {
                    return {
                        ...updateResult,
                        affectedRows : 1,
                        foundRowCount : 1,
                    };
                } else {
                    return {
                        ...updateResult,
                        affectedRows : 0,
                        foundRowCount : 0,
                    };
                }
            }

            return updateResult;
        }) as any;
    }
    updateOneByUniqueKey<
        TableT extends AnyTable & { data : { uniqueKeys : UniqueKeyCollection } }
    > (
        table : TableT,
        uniqueKey : UniqueKeys<TableT>,
        delegate : UpdateAssignmentReferencesDelegate<ConvenientUpdateSelectBuilder<TableT>>
    ) : (
        Promise<UpdateResult>
    ) {
        if (table.data.uniqueKeys == undefined) {
            throw new Error(`Expected ${table.alias} to have a unique key`);
        }
        return this.transactionIfNotInOne(async (db) => {
            const updateResult : UpdateResult = await (db.from(table) as any)
                .where(() => RawExprUtil.toUniqueKeyEqualityCondition(
                    table,
                    uniqueKey
                ))
                .set(delegate)
                .execute();

            if (updateResult.foundRowCount > 1) {
                //Should not be possible
                throw new Error(`Expected to update one row of ${table.alias}, with unique key ${JSON.stringify(uniqueKey)}; found ${updateResult.foundRowCount} rows`);
            }

            if (updateResult.foundRowCount == 0) {
                throw new Error(`Expected to update one row of ${table.alias}, with unique key ${JSON.stringify(uniqueKey)}; found zero`);
            }

            if (updateResult.foundRowCount < 0) {
                //No update was even attempted, probably an empty SET clause
                const exists = await db.existsByUniqueKey(table, uniqueKey);
                if (exists) {
                    return {
                        ...updateResult,
                        affectedRows : 1,
                        foundRowCount : 1,
                    };
                } else {
                    throw new Error(`Expected to update one row of ${table.alias}, with unique key ${JSON.stringify(uniqueKey)}; found zero`);
                }
            }

            return updateResult;
        }) as any;
    }
    deleteFrom <
        TableT extends AnyTable
    > (
        table : TableT,
        where : WhereDelegate<ConvenientDeleteSelectBuilder<TableT>>
    ) : (
        DeleteBuilder<
            ConvenientDeleteSelectBuilder<TableT>,
            DeleteTables<ConvenientDeleteSelectBuilder<TableT>>
        >
    ) {
        return (this.from(table) as any)
            .where(where)
            .delete(() => [table] as any);
    }
    deleteZeroOrOneByUniqueKey<
        TableT extends AnyTable & { data : { uniqueKeys : UniqueKeyCollection } }
    > (
        table : TableT,
        uniqueKey : UniqueKeys<TableT>
    ) : Promise<DeleteResult> {
        return this.transactionIfNotInOne(async (db) => {
            const result = await db.deleteFrom(
                table,
                () => (RawExprUtil.toUniqueKeyEqualityCondition(
                    table,
                    uniqueKey
                ) as any)
            ).execute();

            if (result.deletedRowCount > 1) {
                throw new Error(`Expected to delete zero or one row of ${table.alias}, with unique key ${JSON.stringify(uniqueKey)}; found ${result.deletedRowCount} rows`);
            }

            return result;
        });
    }
    /*
        Desired methods,
        //Basic query
        db.from(app)
            .select(c => [app.appId])
        db.query()
            .from(app)
            .select(c => [app.appId])
        db.select(() => [NOW.as("now")])
        //Basic insert
        //Optionally takes an array of values
        db.insertValue(app, {
            ssoClientId : 1,
            name : "Name"
        }).value([
            {
                ssoClientId : 1,
                name : "Name"
            },
            {
                ssoClientId : 1,
                name : "Name"
            }
        ]).ignore().execute();
        db.insertSelect(
            app,
            db.from(ssoClient)
                .selectAll(),
            c => {
                ssoClientId : c.ssoClientId,
                name : "Hello, world!"
            }
        ).ignore().execute()
        //Builder insert
        db.query()
            .select(() => [NOW.as("now")])
            .insertInto(app, c => {
                return {
                    createdAt : c.now,
                    name : "Hi",
                    ssoClientId : 1,
                };
            }).ignore().execute();
        //Basic update
        db.update(app, {
            name : "Updated Name"
        }, c => {
            return eq(c.appId, 1);
        }).ignoreErrors().execute();
        //Builder update
        db.query()
            .from(app)
            .whereIsEqual(c => c.appId, 1)
            .set(c => {
                return {
                    name : "Updated Name"
                }
            })
            .ignoreErrors()
            .execute()
        //Basic delete
        db.deleteFrom(
            app,
            c => {
                return eq(c.appId, 1);
            }
        )
            .ignoreErrors()
            .execute()
        //Builder delete
        db.query()
            .from(ssoClient)
            .joinUsing(app, c => [c.ssoClientId])
            .whereIsEqual(c => c.app.appId, 1)
            .delete(j => [j.ssoClient])
            .ignoreErrors()
            .execute()
        db.query()
            .from(ssoClient)
            .joinUsing(app, c => [c.ssoClientId])
            .whereIsEqual(c => c.app.appId, 1)
            .delete() //Without arguments, means delete from all tables
            .ignoreErrors()
            .execute()
    */
    /*readonly insertSelectInto : d.CreateInsertSelectBuilderDelegate = (
        <
            TableT extends d.ITable<any, any, any, any>,
            SelectBuilderT extends d.AnySelectBuilder
        > (
            table : TableT,
            selectBuilder : SelectBuilderT
        ) => {
            return new InsertSelectBuilder({
                table : table,
                selectBuilder : selectBuilder,
                ignore : false,
                columns : undefined,
            }, this) as any;
        }
    );
    readonly insertValueInto : d.CreateInsertValueBuilderDelegate = (
        <TableT extends d.ITable<any, any, any, any>> (table : TableT) => {
            return new InsertValueBuilder({
                table : table,
                ignore : false,
                values : undefined,
            }, this);
        }
    );
    //TODO Implement proper transactions?
    //TODO Remove mysql.Database dependency?
    readonly updateTable : d.CreateUpdateBuilderDelegate = (
        <
            SelectBuilderT extends d.AnySelectBuilder
        > (
            selectBuilder : SelectBuilderT
        ) => {
            return new UpdateBuilder({
                selectBuilder : selectBuilder,
                ignoreErrors : false,
                assignments : undefined,
            }, this);
        }
    ) as any;*/
    async getGenerationExpression (column : AnyColumn) : Promise<string>{
        const connection = await this.getOrAllocateConnection();
        const db = connection.config.database;
        if (db == undefined) {
            throw new Error(`Multi-database support not implemented, please pass database value to connection configuration`);
        }
        return this.from(informationSchema.COLUMNS)
            .select(c => [c.GENERATION_EXPRESSION])
            .whereIsEqual(c => c.TABLE_SCHEMA, db)
            .whereIsEqual(c => c.TABLE_NAME, column.tableAlias)
            .whereIsEqual(c => c.COLUMN_NAME, column.name)
            .fetchValue();
    }
    polymorphicInsertValueAndFetch<TableT extends AnyTable> (
        table : TableT,
        row : PolymorphicRawInsertValueRow<TableT>
    ) {
        return polymorphicInsertValueAndFetch(
            this,
            table,
            row
        );
    }
    polymorphicUpdateZeroOrOneByUniqueKey<TableT extends AnyTable> (
        table : TableT,
        uniqueKey : UniqueKeys<TableT> & ({} | TableParentCollectionUtil.PartialTableRow<TableT>),
        setDelegate : PolymorphicUpdateAssignmentCollectionDelegate<TableT>
    ) {
        return polymorphicUpdateZeroOrOneByUniqueKey(
            this,
            table,
            uniqueKey,
            setDelegate
        );
    }

    fetchLatestOrError<DataT extends LogData> (
        data : DataT,
        entityIdentifier : LogDataUtil.EntityIdentifier<DataT>
    ) : Promise<TableRow<DataT["table"]>> {
        return LogDataUtil.fetchLatestOrError(this, data, entityIdentifier);
    }
    fetchLatestOrUndefined<DataT extends LogData> (
        data : DataT,
        entityIdentifier : LogDataUtil.EntityIdentifier<DataT>
    ) : Promise<TableRow<DataT["table"]>|undefined> {
        return LogDataUtil.fetchLatestOrUndefined(this, data, entityIdentifier);
    }
    fetchLatestOrDefault<DataT extends LogData> (
        data : DataT,
        entityIdentifier : LogDataUtil.EntityIdentifier<DataT>
    ) : Promise<TableRow<DataT["table"]>> {
        return LogDataUtil.fetchLatestOrDefault(this, data, entityIdentifier);
    }
    insertIfDifferentAndFetch<DataT extends LogData> (
        data : DataT,
        entityIdentifier : LogDataUtil.EntityIdentifier<DataT>,
        newValues : LogDataUtil.Trackable<DataT>
    ) : Promise<{
        latest : TableRow<DataT["table"]>,
        wasInserted : boolean,
    }> {
        return LogDataUtil.insertIfDifferentAndFetch(this, data, entityIdentifier, newValues);
    }
}
