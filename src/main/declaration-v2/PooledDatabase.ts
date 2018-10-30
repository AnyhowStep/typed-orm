import * as mysql from "typed-mysql";
import {CreateSelectBuilderDelegate} from "./select-builder";
import {SelectBuilder, AnySelectBuilder, __DUMMY_FROM_TABLE} from "./select-builder";
import {Join, JoinType, AnyJoin} from "./join";
import {AnyAliasedTable, AliasedTableUtil} from "./aliased-table";;
import {SelectDelegate} from "./select-delegate";
import {Table, AnyTable, AnyTableAllowInsert, UniqueKeys, TableRow} from "./table";
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
import {AnyRawExpr, RawExprUtil} from "./raw-expr";
import {LogData, LogDataUtil} from "./log";
import {ColumnCollectionUtil} from "./column-collection";
import {SelectValue} from "./select-value";
import {ColumnReferencesUtil} from "./column-references";
import {TableParentCollectionUtil} from "./table-parent-collection";
import {Tuple, TupleKeys} from "./tuple";
import {ASCENDING} from "./order-by";

import {AliasedTable} from "./aliased-table";;
import {AliasedExpr, AnyAliasedExpr} from "./aliased-expr";
import {Column, AnyColumn} from "./column";
import {Expr} from "./expr";
import {TableData} from "./table-data";
import { PoolConnection } from "mysql";
import { UniqueKey } from "./unique-key";
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
                AliasedTableUtil.EraseSubType<TableT>,
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
                AliasedTableUtil.EraseSubType<TableT>,
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
    public async acquire<ResultT> (callback : (db : PooledDatabase) => Promise<ResultT>) : Promise<ResultT> {
        const allocated = this.allocate();
        //Temporary because we'll automatically free it
        allocated.acquiredTemporary = true;

        return callback(allocated)
            .then((result) => {
                allocated.freeConnection();
                allocated.acquiredTemporary = false;
                return result;
            })
            .catch((err) => {
                allocated.freeConnection();
                allocated.acquiredTemporary = false;
                throw err;
            });
    }
    public acquireIfNotTemporary<ResultT> (callback : (db : PooledDatabase) => Promise<ResultT>) : Promise<ResultT> {
        if (this.isAcquiredTemporary()) {
            return callback(this);
        } else {
            return this.acquire(callback);
        }
    }
    public async transaction<ResultT> (callback : (db : PooledDatabase) => Promise<ResultT>) : Promise<ResultT> {
        return this.acquire(async (allocated) => {
            await allocated.beginTransaction();
            return callback(allocated)
                .then(async (result) => {
                    await allocated.commit();
                    return result;
                })
                .catch(async (err) => {
                    await allocated.rollback();
                    throw err;
                });
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
    fetchValueById<
        TableT extends AnyAliasedTable & { data : { id : Column<any, any, number> } },
        DelegateT extends (c : TableT["columns"]) => SelectValue<ColumnCollectionUtil.ToColumnReferences<TableT["columns"]>, any>|Expr<ColumnReferencesUtil.Partial<ColumnCollectionUtil.ToColumnReferences<TableT["columns"]>>, any>
    > (
        table : TableT,
        id : number,
        selectValueDelegate : DelegateT
    ) : (
        Promise<
            ReturnType<DelegateT> extends AnyAliasedExpr ?
            ReturnType<ReturnType<DelegateT>["assertDelegate"]> :
            ReturnType<RawExprUtil.ToExpr<ReturnType<DelegateT>>["assertDelegate"]>
        >
    ) {
        if (table.data.id == undefined) {
            throw new Error(`Expected ${table.alias} to have an id column`);
        }
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
                .whereIsEqual((c : any) => c[table.data.id.name], id)
                .select(() => [columnOrAliasedExprOrExpr.as("value")])
                .fetchValue();
        } else {
            return (this.from(table) as any)
                .whereIsEqual((c : any) => c[table.data.id.name], id)
                .select(() => [columnOrAliasedExprOrExpr])
                .fetchValue();
        }
    }
    fetchValueOrUndefinedById<
        TableT extends AnyAliasedTable & { data : { id : Column<any, any, number> } },
        DelegateT extends (c : TableT["columns"]) => SelectValue<ColumnCollectionUtil.ToColumnReferences<TableT["columns"]>, any>|Expr<ColumnReferencesUtil.Partial<ColumnCollectionUtil.ToColumnReferences<TableT["columns"]>>, any>
    > (
        table : TableT,
        id : number,
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
        if (table.data.id == undefined) {
            throw new Error(`Expected ${table.alias} to have an id column`);
        }
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
                .whereIsEqual((c : any) => c[table.data.id.name], id)
                .select(() => [columnOrAliasedExprOrExpr.as("value")])
                .fetchValueOrUndefined();
        } else {
            return (this.from(table) as any)
                .whereIsEqual((c : any) => c[table.data.id.name], id)
                .select(() => [columnOrAliasedExprOrExpr])
                .fetchValueOrUndefined();
        }
    }

    insertValue<TableT extends AnyTableAllowInsert> (
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
        TableT extends AnyTableAllowInsert & { data : { uniqueKeys : UniqueKeyCollection } }
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
        TableT extends AnyTableAllowInsert,
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
    async assertExistsById<
        TableT extends AnyTable & { data : { id : Column<any, any, number> } }
    > (
        table : TableT,
        id : number
    ) : Promise<void> {
        const exists = await this.existsById(table, id);
        if (!exists) {
            if (this.willPrintQueryOnRowCountError()) {
                console.error(
                    table.name,
                    id
                );
            }
            throw new mysql.RowNotFoundError(`${table.name} does not exist`);
        }
    }
    async assertExistsByUniqueKey<
        TableT extends AnyTable & { data : { uniqueKeys : UniqueKeyCollection } }
    > (
        table : TableT,
        uniqueKey : UniqueKeys<TableT>
    ) : Promise<void> {
        const exists = await this.existsByUniqueKey(table, uniqueKey);
        if (!exists) {
            if (this.willPrintQueryOnRowCountError()) {
                console.error(
                    table.name,
                    uniqueKey
                );
            }
            throw new mysql.RowNotFoundError(`${table.name} does not exist`);
        }
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
        TableT extends AnyTable & { data : { id : Column<any, any, number> } },
        DelegateT extends UpdateAssignmentReferencesDelegate<ConvenientUpdateSelectBuilder<TableT>>
    > (
        table : TableT,
        id : number,
        delegate : DelegateT
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
                        > &
                        {
                            readonly [columnName in (
                                {
                                    [columnName in keyof ReturnType<DelegateT>] : (
                                        undefined extends ReturnType<DelegateT>[columnName] ?
                                        never :
                                        columnName
                                    )
                                }[keyof ReturnType<DelegateT>]
                            )] : (
                                ReturnType<DelegateT>[columnName] extends AnyRawExpr ?
                                RawExprUtil.Type<ReturnType<DelegateT>[columnName]> :
                                never
                            )
                        }
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
    async updateAndFetchOneById<
        TableT extends AnyTable & { data : { id : Column<any, any, number> } },
        DelegateT extends UpdateAssignmentReferencesDelegate<ConvenientUpdateSelectBuilder<TableT>>
    > (
        table : TableT,
        id : number,
        delegate : DelegateT
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
                        > &
                        {
                            readonly [columnName in (
                                {
                                    [columnName in keyof ReturnType<DelegateT>] : (
                                        undefined extends ReturnType<DelegateT>[columnName] ?
                                        never :
                                        columnName
                                    )
                                }[keyof ReturnType<DelegateT>]
                            )] : (
                                ReturnType<DelegateT>[columnName] extends AnyRawExpr ?
                                RawExprUtil.Type<ReturnType<DelegateT>[columnName]> :
                                never
                            )
                        }
                    )
                }
            )
        >
    ) {
        const result = await this.updateAndFetchZeroOrOneById(table, id, delegate);
        if (result.foundRowCount == 1) {
            return result;
        } else {
            throw new mysql.RowNotFoundError(`${table.name} ${id} does not exist`);
        }
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
    updateAndFetchZeroOrOneByUniqueKey<
        TableT extends AnyTable & { data : { uniqueKeys : UniqueKeyCollection } }
    > (
        table : TableT,
        uniqueKey : UniqueKeys<TableT>,
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
        if (table.data.uniqueKeys == undefined || table.data.uniqueKeys.length == 0) {
            throw new Error(`Expected ${table.alias} to have unique keys`);
        }
        return this.transactionIfNotInOne(async (db) => {
            const updateResult : UpdateResult = await this
                .updateZeroOrOneByUniqueKey(
                    table,
                    uniqueKey,
                    delegate
                );

            if (updateResult.foundRowCount == 0) {
                return {
                    ...updateResult,
                    row : undefined,
                };
            }

            return {
                ...updateResult,
                row : await db.fetchOneByUniqueKey(table, uniqueKey),
            };
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
    async getOrAllocateConnectionWithDefaultDatabase () : (
        Promise<PoolConnection & { config : { database : string } }>
    ) {
        const connection = await this.getOrAllocateConnection();
        const db = connection.config.database;
        if (db == undefined) {
            throw new Error(`Multi-database support not implemented, please pass database value to connection configuration`);
        }
        return connection as any;
    }
    async getGenerationExpression (column : AnyColumn) : Promise<string>{
        const connection = await this.getOrAllocateConnectionWithDefaultDatabase();
        return this.from(informationSchema.COLUMNS)
            .select(c => [c.GENERATION_EXPRESSION])
            .whereIsEqual(c => c.TABLE_SCHEMA, connection.config.database)
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

    fetchLatestQuery<DataT extends LogData> (
        data : DataT,
        entityIdentifier : LogDataUtil.EntityIdentifier<DataT>
    ) : SelectBuilderUtil.CleanToFrom<DataT["table"]> {
        return LogDataUtil.fetchLatestQuery(this, data, entityIdentifier);
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
        insertIfDifferentRow : LogDataUtil.InsertIfDifferentRow<DataT>
    ) : Promise<{
        latest : TableRow<DataT["table"]>,
        wasInserted : boolean,
    }> {
        return LogDataUtil.insertIfDifferentAndFetch(this, data, entityIdentifier, insertIfDifferentRow);
    }
    insertIfDifferentOrFirstAndFetch<DataT extends LogData> (
        data : DataT,
        entityIdentifier : LogDataUtil.EntityIdentifier<DataT>,
        insertIfDifferentOrFirstRow : LogDataUtil.FullOverwriteInsertIfDifferentRow<DataT>
    ) : Promise<{
        latest : TableRow<DataT["table"]>,
        wasInserted : boolean,
    }> {
        return LogDataUtil.insertIfDifferentOrFirstAndFetch(this, data, entityIdentifier, insertIfDifferentOrFirstRow);
    }
    latestValueExpression<
        DataT extends LogData,
        EntityT extends LogDataUtil.LatestValueExpressionEntityTable<DataT>,
        ValueDelegateT extends LogDataUtil.LatestValueExpressionValueDelegate<
            DataT,
            EntityT
        >,
        DefaultValueDelegateT extends LogDataUtil.LatestValueExpressionDefaultValueDelegate<
            DataT,
            EntityT
        >
    > (
        data : DataT,
        entity : EntityT,
        valueDelegate : ValueDelegateT,
        defaultValueDelegate : DefaultValueDelegateT
    ) : LogDataUtil.LatestValueExpression<
        DataT,
        EntityT,
        ValueDelegateT,
        DefaultValueDelegateT
    > {
        return LogDataUtil.latestValueExpression(
            this,
            data,
            entity,
            valueDelegate,
            defaultValueDelegate
        );
    };
    rowsExistForEntity<DataT extends LogData> (
        data : DataT,
        entityIdentifier : LogDataUtil.EntityIdentifier<DataT>
    ) {
        return LogDataUtil.rowsExistForEntity(
            this,
            data,
            entityIdentifier
        );
    }

    createSubQuery<TablesT extends Tuple<AnyAliasedTable>> (...tables : TablesT) : (
        TablesT["length"] extends 0 ?
        ReturnType<CreateSelectBuilderDelegate> :
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

            hasParentJoins : true,
            //This is just a dummy JOIN
            //It will be replaced when we have a subquery
            parentJoins : (
                {
                    [index in TupleKeys<TablesT>] : (
                        Join<
                            Extract<TablesT[index], AnyAliasedTable>,
                            Extract<TablesT[index], AnyAliasedTable>["columns"],
                            false
                        >
                    )
                } &
                {
                    "0" : Join<
                        TablesT[0],
                        TablesT[0]["columns"],
                        false
                    >
                } &
                {
                    length : TablesT["length"]
                } &
                AnyJoin[]
            ),
        }>
    ) {
        if (tables.length == 0) {
            return this.query() as any;
        }
        let result : any = this;
        for (let t of tables) {
            result = result.from(t).subQuery();
        }
        return result;
    }

    async tableExists (tableName : string) : Promise<boolean> {
        const connection = await this.getOrAllocateConnectionWithDefaultDatabase();
        return this.from(informationSchema.TABLES)
            .whereIsEqual(
                c => c.TABLE_SCHEMA,
                connection.config.database
            )
            .whereIsEqual(
                c => c.TABLE_NAME,
                tableName
            )
            .exists();
    }

    async validateColumns (declaredTable : AnyTable, output : { warnings : string[], errors : string[] }) {
        function warning (message : string) {
            output.warnings.push(message);
        }
        function error (message : string) {
            output.errors.push(message);
        }

        const connection = await this.getOrAllocateConnectionWithDefaultDatabase();
        const databaseName = connection.config.database;

        const actualColumns = await this.from(informationSchema.COLUMNS)
            .whereIsEqual(
                c => c.TABLE_SCHEMA,
                databaseName
            )
            .whereIsEqual(
                c => c.TABLE_NAME,
                declaredTable.name
            )
            .orderBy(c => [
                [c.ORDINAL_POSITION, ASCENDING]
            ])
            .select(c => [
                c.COLUMN_NAME,
                c.ORDINAL_POSITION,
                c.IS_NULLABLE,
                c.COLUMN_DEFAULT,
                c.GENERATION_EXPRESSION,
                c.EXTRA
            ])
            .fetchAll();

        if (actualColumns.length == 0) {
            error(`Table ${declaredTable.name} has no columns or does not exist`);
            return;
        }

        for (let actualColumn of actualColumns) {
            const actualNullable = (actualColumn.IS_NULLABLE === "YES");

            const declaredColumn = declaredTable.columns[actualColumn.COLUMN_NAME];
            if (declaredColumn == undefined) {
                warning(`Table ${declaredTable.name} on database has column ${actualColumn.COLUMN_NAME}; declared table does not have it`);
                if (actualColumn.GENERATION_EXPRESSION != "") {
                    warning(`This should be fine as ${declaredTable.name}.${actualColumn.COLUMN_NAME} is a generated column; INSERTs will set the value to ${actualColumn.GENERATION_EXPRESSION}`);
                    continue;
                }

                if (actualNullable) {
                    warning(`This should be fine as ${declaredTable.name}.${actualColumn.COLUMN_NAME} is nullable; INSERTs will set the value to ${actualColumn.COLUMN_DEFAULT}`);
                    continue;
                }

                if (actualColumn.COLUMN_DEFAULT == undefined) {
                    error(`INSERTs to ${declaredTable.name} will fail as ${actualColumn.COLUMN_NAME} has no default value; and declared table does not have the column`);
                }
            } else {
                if (actualColumn.EXTRA == "auto_increment") {
                    if (declaredTable.data.autoIncrement == undefined) {
                        warning(`Column ${declaredTable.name}.${actualColumn.COLUMN_NAME} on database is the auto increment column; declared table does not set it`);
                    } else {
                        if (actualColumn.COLUMN_NAME != declaredTable.data.autoIncrement.name) {
                            error(`Column ${declaredTable.name}.${actualColumn.COLUMN_NAME} on database is the auto increment column; declared table sets ${declaredTable.data.autoIncrement.name} as the auto increment column`);
                        }
                    }
                } else {
                    if (declaredTable.data.autoIncrement != undefined) {
                        if (actualColumn.COLUMN_NAME == declaredTable.data.autoIncrement.name) {
                            error(`Column ${declaredTable.name}.${actualColumn.COLUMN_NAME} on database is NOT the auto increment column; declared table sets ${declaredTable.data.autoIncrement.name} as the auto increment column`);
                        }
                    }
                }

                if (actualColumn.GENERATION_EXPRESSION != "") {
                    if (declaredTable.data.isGenerated[actualColumn.COLUMN_NAME] !== true) {
                        error(`Column ${declaredTable.name}.${actualColumn.COLUMN_NAME} on database is generated; declared column is not`);
                        continue;
                    }
                } else {
                    if (declaredTable.data.isGenerated[actualColumn.COLUMN_NAME] === true) {
                        if (
                            declaredTable.data.autoIncrement == undefined ||
                            actualColumn.COLUMN_NAME != declaredTable.data.autoIncrement.name
                        ) {
                            error(`Column ${declaredTable.name}.${actualColumn.COLUMN_NAME} on database is NOT generated; declared column is`);
                            continue;
                        }
                    }
                }

                const declaredNullable = sd.isNullable(declaredColumn.assertDelegate);
                if (actualNullable) {
                    if (!declaredNullable) {
                        warning(`Column ${declaredTable.name}.${actualColumn.COLUMN_NAME} on database is nullable; declared column is not`);
                    }
                } else {
                    if (declaredNullable) {
                        error(`Column ${declaredTable.name}.${actualColumn.COLUMN_NAME} on database is NOT nullable; declared column is`);
                    }

                    if (actualColumn.COLUMN_DEFAULT == undefined) {
                        //Not nullable, but column default is null
                        //So, there is no default value.
                        if (declaredTable.data.hasDefaultValue[actualColumn.COLUMN_NAME] === true) {
                            if (
                                declaredTable.data.autoIncrement == undefined ||
                                actualColumn.COLUMN_NAME != declaredTable.data.autoIncrement.name
                            ) {
                                if (declaredTable.data.isGenerated[actualColumn.COLUMN_NAME] !== true) {
                                    error(`Column ${declaredTable.name}.${actualColumn.COLUMN_NAME} on database has no default value; declared column does`);
                                }
                            }
                        }
                    } else {
                        if (declaredTable.data.hasDefaultValue[actualColumn.COLUMN_NAME] !== true) {
                            warning(`Column ${declaredTable.name}.${actualColumn.COLUMN_NAME} on database has default value ${actualColumn.COLUMN_DEFAULT}; declared column does not`);
                        }
                    }
                }
            }
        }

        Object.keys(declaredTable.columns)
            .map(k => declaredTable.columns[k])
            .filter(declared => actualColumns.every(
                actual => declared.name != actual.COLUMN_NAME
            ))
            .forEach(declared => {
                error(`Declared column ${declaredTable.name}.${declared.name} does not exist`);
            });
    }

    async validateUniqueKeys (declaredTable : AnyTable, output : { warnings : string[], errors : string[] }) {
        function warning (message : string) {
            output.warnings.push(message);
        }
        function error (message : string) {
            output.errors.push(message);
        }

        const connection = await this.getOrAllocateConnectionWithDefaultDatabase();
        const databaseName = connection.config.database;

        const actualUniqueKeys = await this.from(informationSchema.STATISTICS)
            .whereIsEqual(
                c => c.TABLE_SCHEMA,
                databaseName
            )
            .whereIsEqual(
                c => c.TABLE_NAME,
                declaredTable.name
            )
            .whereIsEqual(
                //We want unique keys
                c => c.NON_UNIQUE,
                false
            )
            .select(c => [
                c.INDEX_NAME,
                c.COLUMN_NAME,
                c.NULLABLE,
            ])
            .orderBy(c => [
                [c.INDEX_NAME, ASCENDING],
                [c.SEQ_IN_INDEX, ASCENDING]
            ])
            .fetchAll()
            .then(arr => {
                return arr.reduce<{ [indexName : string] : {
                    INDEX_NAME : string,
                    COLUMN_NAME : string,
                    NULLABLE : string,
                }[]|undefined }>((memo, row) => {
                    let arr = memo[row.INDEX_NAME];
                    if (arr == undefined) {
                        arr = [];
                        memo[row.INDEX_NAME] = arr;
                    }
                    arr.push(row);
                    return memo;
                }, {});
            });

        if (declaredTable.data.uniqueKeys == undefined) {
            if (Object.keys(actualUniqueKeys).length == 0) {
                //Both declared and actual table do not have unique keys
                return;
            }
            error(`Declared table ${declaredTable.name} has no unique keys; database on table has ${Object.keys(actualUniqueKeys).length} unique keys`);
        }

        const declaredUniqueKeys : UniqueKeyCollection = declaredTable.data.uniqueKeys;

        function isEqual (actualUniqueKey : {
            INDEX_NAME: string;
            COLUMN_NAME: string;
            NULLABLE: string;
        }[], declaredColumnNames : string[]) {
            if (actualUniqueKey.length != declaredColumnNames.length) {
                return false;
            }

            for (let declaredColumnName of declaredColumnNames) {
                if (actualUniqueKey.every(
                    actualColumn => actualColumn.COLUMN_NAME != declaredColumnName
                )) {
                    return false;
                }
            }
            return true;
        }

        function findDeclaredUniqueKey (actualUniqueKey : {
            INDEX_NAME: string;
            COLUMN_NAME: string;
            NULLABLE: string;
        }[]) {
            return declaredUniqueKeys.find(declared => {
                const declaredColumnNames = Object.keys(declared);
                return isEqual(actualUniqueKey, declaredColumnNames);
            });
        }

        function findActualUniqueKey (declaredUniqueKey : UniqueKey) {
            const declaredColumnNames = Object.keys(declaredUniqueKey);

            return Object.keys(actualUniqueKeys)
                .map(k => actualUniqueKeys[k])
                .find(actualUniqueKey => {
                    if (actualUniqueKey == undefined) {
                        return false;
                    }
                    return isEqual(actualUniqueKey, declaredColumnNames);
                });
        }

        for (let actualIndexName in actualUniqueKeys) {
            const actualUniqueKey = actualUniqueKeys[actualIndexName];
            if (actualUniqueKey == undefined) {
                //Should not happen
                continue;
            }

            const declaredUniqueKey = findDeclaredUniqueKey(actualUniqueKey);
            if (declaredUniqueKey == undefined) {
                const str = actualUniqueKey.map(c => c.COLUMN_NAME).join(", ");
                warning(`Table ${declaredTable.name} on database has unique key ${actualIndexName} [${str}]; declared table does not`);
            }
        }

        for (let declaredUniqueKey of declaredUniqueKeys) {
            const actualUniqueKey = findActualUniqueKey(declaredUniqueKey);
            if (actualUniqueKey == undefined) {
                const str = Object.keys(declaredUniqueKey).join(", ");
                error(`Table ${declaredTable.name} on database does not have unique key [${str}]; declared table does`);
            }
        }
    }

    async validateTable (declaredTable : AnyTable, output : { warnings : string[], errors : string[] }) {
        function error (message : string) {
            output.errors.push(message);
        }

        if (declaredTable.alias != declaredTable.name) {
            error(`Cannot validate table named ${declaredTable.name} with alias ${declaredTable.alias}; both alias and name must be the same`);
            return;
        }


        if (!await this.tableExists(declaredTable.name)) {
            error(`Table ${declaredTable.name} does not exist`);
            return;
        }

        await this.validateColumns(declaredTable, output);
        await this.validateUniqueKeys(declaredTable, output);
    }
}
