"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("typed-mysql");
const select_builder_1 = require("./select-builder");
const join_1 = require("./join");
;
const table_1 = require("./table");
const insert_value_builder_1 = require("./insert-value-builder");
const insert_select_builder_1 = require("./insert-select-builder");
const sd = require("schema-decorator");
const informationSchema = require("./information-schema");
const polymorphic_insert_value_and_fetch_1 = require("./polymorphic-insert-value-and-fetch");
const polymorphic_update_zero_or_one_by_unique_key_1 = require("./polymorphic-update-zero-or-one-by-unique-key");
const raw_expr_1 = require("./raw-expr");
const log_1 = require("./log");
const column_collection_1 = require("./column-collection");
const column_references_1 = require("./column-references");
const order_by_1 = require("./order-by");
const aliased_table_1 = require("./aliased-table");
;
const aliased_expr_1 = require("./aliased-expr");
const column_1 = require("./column");
const expr_1 = require("./expr");
aliased_table_1.AliasedTable;
aliased_expr_1.AliasedExpr;
column_1.Column;
expr_1.Expr;
const __tabledata = undefined;
__tabledata;
class PooledDatabase extends mysql.PooledDatabase {
    constructor() {
        super(...arguments);
        this.query = () => {
            return new select_builder_1.SelectBuilder({
                hasSelect: false,
                hasFrom: false,
                hasUnion: false,
                //This is just a dummy JOIN
                //It will be replaced when the FROM clause is added
                joins: [
                    new join_1.Join(join_1.JoinType.FROM, select_builder_1.__DUMMY_FROM_TABLE, select_builder_1.__DUMMY_FROM_TABLE.columns, true, [], [])
                ],
                selects: undefined,
                aggregateDelegate: undefined,
                hasParentJoins: false,
                parentJoins: [
                    new join_1.Join(join_1.JoinType.FROM, select_builder_1.__DUMMY_FROM_TABLE, select_builder_1.__DUMMY_FROM_TABLE.columns, true, [], [])
                ],
            }, {
                db: this,
                distinct: false,
                sqlCalcFoundRows: false,
            });
        };
        this.insertSelect = (table, selectBuilder, delegate) => {
            return new insert_select_builder_1.InsertSelectBuilder(table, selectBuilder, undefined, "NORMAL", this).set(delegate);
        };
    }
    allocate() {
        return new PooledDatabase(this.getPool(), this.getData());
    }
    acquire(callback) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    acquireIfNotTemporary(callback) {
        if (this.isAcquiredTemporary()) {
            return callback(this);
        }
        else {
            return this.acquire(callback);
        }
    }
    transaction(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.acquire((allocated) => __awaiter(this, void 0, void 0, function* () {
                yield allocated.beginTransaction();
                return callback(allocated)
                    .then((result) => __awaiter(this, void 0, void 0, function* () {
                    yield allocated.commit();
                    return result;
                }))
                    .catch((err) => __awaiter(this, void 0, void 0, function* () {
                    yield allocated.rollback();
                    throw err;
                }));
            }));
        });
    }
    transactionIfNotInOne(callback) {
        if (this.isInTransaction()) {
            return callback(this);
        }
        else {
            return this.transaction(callback);
        }
    }
    from(table) {
        return this.query()
            .from(table);
    }
    ;
    select(delegate) {
        return this.query()
            .select(delegate);
    }
    ;
    selectAll(arg0, arg1, arg2) {
        if (arg0 instanceof aliased_table_1.AliasedTable) {
            if (arg1 == undefined) {
                return this.from(arg0)
                    .selectAll();
            }
            else {
                return this.from(arg0)
                    .where(arg1)
                    .selectAll();
            }
        }
        else {
            return super.selectAll(arg0, arg1, arg2);
        }
    }
    selectAllByUniqueKey(table, uniqueKey) {
        /*uniqueKey = table.getUniqueKeyAssertDelegate()(
            `${table.alias} unique key`,
            uniqueKey
        ) as any;*/
        let result = this.from(table)
            .where(() => raw_expr_1.RawExprUtil.toUniqueKeyEqualityCondition(table, uniqueKey))
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
    fetchOneByUniqueKey(table, uniqueKey) {
        return this.selectAllByUniqueKey(table, uniqueKey)
            .fetchOne();
    }
    fetchZeroOrOneByUniqueKey(table, uniqueKey) {
        return this.selectAllByUniqueKey(table, uniqueKey)
            .fetchZeroOrOne();
    }
    fetchOneById(table, id) {
        if (table.data.id == undefined) {
            throw new Error(`Expected ${table.alias} to have an id column`);
        }
        return this.from(table)
            .whereIsEqual((c) => c[table.data.id.name], id)
            .selectAll()
            .fetchOne();
    }
    fetchZeroOrOneById(table, id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (table.data.id == undefined) {
                throw new Error(`Expected ${table.alias} to have an id column`);
            }
            return this.from(table)
                .whereIsEqual((c) => c[table.data.id.name], id)
                .selectAll()
                .fetchZeroOrOne();
        });
    }
    fetchValueByUniqueKey(table, uniqueKey, selectValueDelegate) {
        const columnOrAliasedExprOrExpr = selectValueDelegate(table.columns);
        if (columnOrAliasedExprOrExpr instanceof aliased_expr_1.AliasedExpr) {
            const ref = column_collection_1.ColumnCollectionUtil.toColumnReferences(table.columns);
            column_references_1.ColumnReferencesUtil.assertHasColumnReferences(ref, columnOrAliasedExprOrExpr.usedReferences);
        }
        else if (columnOrAliasedExprOrExpr instanceof column_1.Column) {
            column_collection_1.ColumnCollectionUtil.assertHasColumn(table.columns, columnOrAliasedExprOrExpr);
        }
        else {
            const ref = column_collection_1.ColumnCollectionUtil.toColumnReferences(table.columns);
            column_references_1.ColumnReferencesUtil.assertHasColumnReferences(ref, columnOrAliasedExprOrExpr.usedReferences);
        }
        if (columnOrAliasedExprOrExpr instanceof expr_1.Expr) {
            return this.from(table)
                .where(() => raw_expr_1.RawExprUtil.toUniqueKeyEqualityCondition(table, uniqueKey))
                .select(() => [columnOrAliasedExprOrExpr.as("value")])
                .fetchValue();
        }
        else {
            return this.from(table)
                .where(() => raw_expr_1.RawExprUtil.toUniqueKeyEqualityCondition(table, uniqueKey))
                .select(() => [columnOrAliasedExprOrExpr])
                .fetchValue();
        }
    }
    fetchValueOrUndefinedByUniqueKey(table, uniqueKey, selectValueDelegate) {
        const columnOrAliasedExprOrExpr = selectValueDelegate(table.columns);
        if (columnOrAliasedExprOrExpr instanceof aliased_expr_1.AliasedExpr) {
            const ref = column_collection_1.ColumnCollectionUtil.toColumnReferences(table.columns);
            column_references_1.ColumnReferencesUtil.assertHasColumnReferences(ref, columnOrAliasedExprOrExpr.usedReferences);
        }
        else if (columnOrAliasedExprOrExpr instanceof column_1.Column) {
            column_collection_1.ColumnCollectionUtil.assertHasColumn(table.columns, columnOrAliasedExprOrExpr);
        }
        else {
            const ref = column_collection_1.ColumnCollectionUtil.toColumnReferences(table.columns);
            column_references_1.ColumnReferencesUtil.assertHasColumnReferences(ref, columnOrAliasedExprOrExpr.usedReferences);
        }
        if (columnOrAliasedExprOrExpr instanceof expr_1.Expr) {
            return this.from(table)
                .where(() => raw_expr_1.RawExprUtil.toUniqueKeyEqualityCondition(table, uniqueKey))
                .select(() => [columnOrAliasedExprOrExpr.as("value")])
                .fetchValueOrUndefined();
        }
        else {
            return this.from(table)
                .where(() => raw_expr_1.RawExprUtil.toUniqueKeyEqualityCondition(table, uniqueKey))
                .select(() => [columnOrAliasedExprOrExpr])
                .fetchValueOrUndefined();
        }
    }
    fetchValueById(table, id, selectValueDelegate) {
        if (table.data.id == undefined) {
            throw new Error(`Expected ${table.alias} to have an id column`);
        }
        const columnOrAliasedExprOrExpr = selectValueDelegate(table.columns);
        if (columnOrAliasedExprOrExpr instanceof aliased_expr_1.AliasedExpr) {
            const ref = column_collection_1.ColumnCollectionUtil.toColumnReferences(table.columns);
            column_references_1.ColumnReferencesUtil.assertHasColumnReferences(ref, columnOrAliasedExprOrExpr.usedReferences);
        }
        else if (columnOrAliasedExprOrExpr instanceof column_1.Column) {
            column_collection_1.ColumnCollectionUtil.assertHasColumn(table.columns, columnOrAliasedExprOrExpr);
        }
        else {
            const ref = column_collection_1.ColumnCollectionUtil.toColumnReferences(table.columns);
            column_references_1.ColumnReferencesUtil.assertHasColumnReferences(ref, columnOrAliasedExprOrExpr.usedReferences);
        }
        if (columnOrAliasedExprOrExpr instanceof expr_1.Expr) {
            return this.from(table)
                .whereIsEqual((c) => c[table.data.id.name], id)
                .select(() => [columnOrAliasedExprOrExpr.as("value")])
                .fetchValue();
        }
        else {
            return this.from(table)
                .whereIsEqual((c) => c[table.data.id.name], id)
                .select(() => [columnOrAliasedExprOrExpr])
                .fetchValue();
        }
    }
    fetchValueOrUndefinedById(table, id, selectValueDelegate) {
        if (table.data.id == undefined) {
            throw new Error(`Expected ${table.alias} to have an id column`);
        }
        const columnOrAliasedExprOrExpr = selectValueDelegate(table.columns);
        if (columnOrAliasedExprOrExpr instanceof aliased_expr_1.AliasedExpr) {
            const ref = column_collection_1.ColumnCollectionUtil.toColumnReferences(table.columns);
            column_references_1.ColumnReferencesUtil.assertHasColumnReferences(ref, columnOrAliasedExprOrExpr.usedReferences);
        }
        else if (columnOrAliasedExprOrExpr instanceof column_1.Column) {
            column_collection_1.ColumnCollectionUtil.assertHasColumn(table.columns, columnOrAliasedExprOrExpr);
        }
        else {
            const ref = column_collection_1.ColumnCollectionUtil.toColumnReferences(table.columns);
            column_references_1.ColumnReferencesUtil.assertHasColumnReferences(ref, columnOrAliasedExprOrExpr.usedReferences);
        }
        if (columnOrAliasedExprOrExpr instanceof expr_1.Expr) {
            return this.from(table)
                .whereIsEqual((c) => c[table.data.id.name], id)
                .select(() => [columnOrAliasedExprOrExpr.as("value")])
                .fetchValueOrUndefined();
        }
        else {
            return this.from(table)
                .whereIsEqual((c) => c[table.data.id.name], id)
                .select(() => [columnOrAliasedExprOrExpr])
                .fetchValueOrUndefined();
        }
    }
    insertValue(table, value) {
        return new insert_value_builder_1.InsertValueBuilder(table, undefined, "NORMAL", this).value(value);
    }
    ;
    insertValueAndFetch(table, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.insertValue(table, value)
                .executeAndFetch();
        });
    }
    update(arg0, arg1, arg2, arg3, arg4) {
        if (arg0 instanceof table_1.Table) {
            return this.from(arg0)
                .where(arg2)
                .set(arg1);
        }
        else {
            return super.update(arg0, arg1, arg2, arg3, arg4);
        }
    }
    existsById(table, id) {
        if (table.data.id == undefined) {
            throw new Error(`Expected ${table.alias} to have an id column`);
        }
        return this.from(table)
            .whereIsEqual((c) => c[table.data.id.name], id)
            .exists();
    }
    existsByUniqueKey(table, uniqueKey) {
        if (table.data.uniqueKeys == undefined) {
            throw new Error(`Expected ${table.alias} to have a unique key`);
        }
        return this.from(table)
            .where(() => raw_expr_1.RawExprUtil.toUniqueKeyEqualityCondition(table, uniqueKey))
            .exists();
    }
    updateZeroOrOneById(table, id, delegate) {
        if (table.data.id == undefined) {
            throw new Error(`Expected ${table.alias} to have an id column`);
        }
        return this.transactionIfNotInOne((db) => __awaiter(this, void 0, void 0, function* () {
            const updateResult = yield db.from(table)
                .whereIsEqual((c) => c[table.data.id.name], id)
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
                const exists = yield db.existsById(table, id);
                if (exists) {
                    return Object.assign({}, updateResult, { affectedRows: 1, foundRowCount: 1 });
                }
                else {
                    return Object.assign({}, updateResult, { affectedRows: 0, foundRowCount: 0 });
                }
            }
            return updateResult;
        }));
    }
    updateOneById(table, id, delegate) {
        if (table.data.id == undefined) {
            throw new Error(`Expected ${table.alias} to have an id column`);
        }
        return this.transactionIfNotInOne((db) => __awaiter(this, void 0, void 0, function* () {
            const updateResult = yield db.from(table)
                .whereIsEqual((c) => c[table.data.id.name], id)
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
                const exists = yield db.existsById(table, id);
                if (exists) {
                    return Object.assign({}, updateResult, { affectedRows: 1, foundRowCount: 1 });
                }
                else {
                    throw new Error(`Expected to find one row of ${table.alias}, with ${table.data.id.name} = ${id}; found zero`);
                }
            }
            return updateResult;
        }));
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
    updateAndFetchZeroOrOneById(table, id, delegate) {
        if (table.data.id == undefined) {
            throw new Error(`Expected ${table.alias} to have an id column`);
        }
        return this.transactionIfNotInOne((db) => __awaiter(this, void 0, void 0, function* () {
            const updateResult = yield db.from(table)
                .whereIsEqual((c) => c[table.data.id.name], id)
                .set(delegate)
                .execute();
            if (updateResult.foundRowCount > 1) {
                //Should not be possible
                throw new Error(`Expected to update one row of ${table.alias}, with ${table.data.id.name} = ${id}; found ${updateResult.foundRowCount} rows`);
            }
            if (updateResult.foundRowCount == 0) {
                return Object.assign({}, updateResult, { row: undefined });
            }
            if (updateResult.foundRowCount < 0) {
                //No update was even attempted, probably an empty SET clause
                const row = yield db.fetchZeroOrOneById(table, id);
                if (row == undefined) {
                    return Object.assign({}, updateResult, { affectedRows: 0, foundRowCount: 0, row: row });
                }
                else {
                    return Object.assign({}, updateResult, { affectedRows: 1, foundRowCount: 1, row: row });
                }
            }
            return Object.assign({}, updateResult, { row: yield db.fetchOneById(table, id) });
        }));
    }
    updateZeroOrOneByUniqueKey(table, uniqueKey, delegate) {
        if (table.data.uniqueKeys == undefined) {
            throw new Error(`Expected ${table.alias} to have a unique key`);
        }
        return this.transactionIfNotInOne((db) => __awaiter(this, void 0, void 0, function* () {
            const updateResult = yield db.from(table)
                .where(() => raw_expr_1.RawExprUtil.toUniqueKeyEqualityCondition(table, uniqueKey))
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
                const exists = yield db.existsByUniqueKey(table, uniqueKey);
                if (exists) {
                    return Object.assign({}, updateResult, { affectedRows: 1, foundRowCount: 1 });
                }
                else {
                    return Object.assign({}, updateResult, { affectedRows: 0, foundRowCount: 0 });
                }
            }
            return updateResult;
        }));
    }
    updateOneByUniqueKey(table, uniqueKey, delegate) {
        if (table.data.uniqueKeys == undefined) {
            throw new Error(`Expected ${table.alias} to have a unique key`);
        }
        return this.transactionIfNotInOne((db) => __awaiter(this, void 0, void 0, function* () {
            const updateResult = yield db.from(table)
                .where(() => raw_expr_1.RawExprUtil.toUniqueKeyEqualityCondition(table, uniqueKey))
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
                const exists = yield db.existsByUniqueKey(table, uniqueKey);
                if (exists) {
                    return Object.assign({}, updateResult, { affectedRows: 1, foundRowCount: 1 });
                }
                else {
                    throw new Error(`Expected to update one row of ${table.alias}, with unique key ${JSON.stringify(uniqueKey)}; found zero`);
                }
            }
            return updateResult;
        }));
    }
    deleteFrom(table, where) {
        return this.from(table)
            .where(where)
            .delete(() => [table]);
    }
    deleteZeroOrOneByUniqueKey(table, uniqueKey) {
        return this.transactionIfNotInOne((db) => __awaiter(this, void 0, void 0, function* () {
            const result = yield db.deleteFrom(table, () => raw_expr_1.RawExprUtil.toUniqueKeyEqualityCondition(table, uniqueKey)).execute();
            if (result.deletedRowCount > 1) {
                throw new Error(`Expected to delete zero or one row of ${table.alias}, with unique key ${JSON.stringify(uniqueKey)}; found ${result.deletedRowCount} rows`);
            }
            return result;
        }));
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
    getOrAllocateConnectionWithDefaultDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield this.getOrAllocateConnection();
            const db = connection.config.database;
            if (db == undefined) {
                throw new Error(`Multi-database support not implemented, please pass database value to connection configuration`);
            }
            return connection;
        });
    }
    getGenerationExpression(column) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield this.getOrAllocateConnectionWithDefaultDatabase();
            return this.from(informationSchema.COLUMNS)
                .select(c => [c.GENERATION_EXPRESSION])
                .whereIsEqual(c => c.TABLE_SCHEMA, connection.config.database)
                .whereIsEqual(c => c.TABLE_NAME, column.tableAlias)
                .whereIsEqual(c => c.COLUMN_NAME, column.name)
                .fetchValue();
        });
    }
    polymorphicInsertValueAndFetch(table, row) {
        return polymorphic_insert_value_and_fetch_1.polymorphicInsertValueAndFetch(this, table, row);
    }
    polymorphicUpdateZeroOrOneByUniqueKey(table, uniqueKey, setDelegate) {
        return polymorphic_update_zero_or_one_by_unique_key_1.polymorphicUpdateZeroOrOneByUniqueKey(this, table, uniqueKey, setDelegate);
    }
    fetchLatestQuery(data, entityIdentifier) {
        return log_1.LogDataUtil.fetchLatestQuery(this, data, entityIdentifier);
    }
    fetchLatestOrError(data, entityIdentifier) {
        return log_1.LogDataUtil.fetchLatestOrError(this, data, entityIdentifier);
    }
    fetchLatestOrUndefined(data, entityIdentifier) {
        return log_1.LogDataUtil.fetchLatestOrUndefined(this, data, entityIdentifier);
    }
    fetchLatestOrDefault(data, entityIdentifier) {
        return log_1.LogDataUtil.fetchLatestOrDefault(this, data, entityIdentifier);
    }
    insertIfDifferentAndFetch(data, entityIdentifier, insertIfDifferentRow) {
        return log_1.LogDataUtil.insertIfDifferentAndFetch(this, data, entityIdentifier, insertIfDifferentRow);
    }
    latestValueExpression(data, entity, valueDelegate, defaultValueDelegate) {
        return log_1.LogDataUtil.latestValueExpression(this, data, entity, valueDelegate, defaultValueDelegate);
    }
    ;
    createSubQuery(...tables) {
        if (tables.length == 0) {
            return this.query();
        }
        let result = this;
        for (let t of tables) {
            result = result.from(t).subQuery();
        }
        return result;
    }
    tableExists(tableName) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield this.getOrAllocateConnectionWithDefaultDatabase();
            return this.from(informationSchema.TABLES)
                .whereIsEqual(c => c.TABLE_SCHEMA, connection.config.database)
                .whereIsEqual(c => c.TABLE_NAME, tableName)
                .exists();
        });
    }
    validateColumns(declaredTable, output) {
        return __awaiter(this, void 0, void 0, function* () {
            function warning(message) {
                output.warnings.push(message);
            }
            function error(message) {
                output.errors.push(message);
            }
            const connection = yield this.getOrAllocateConnectionWithDefaultDatabase();
            const databaseName = connection.config.database;
            const actualColumns = yield this.from(informationSchema.COLUMNS)
                .whereIsEqual(c => c.TABLE_SCHEMA, databaseName)
                .whereIsEqual(c => c.TABLE_NAME, declaredTable.name)
                .orderBy(c => [
                [c.ORDINAL_POSITION, order_by_1.ASCENDING]
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
                }
                else {
                    if (actualColumn.EXTRA == "auto_increment") {
                        if (declaredTable.data.autoIncrement == undefined) {
                            warning(`Column ${declaredTable.name}.${actualColumn.COLUMN_NAME} on database is the auto increment column; declared table does not set it`);
                        }
                        else {
                            if (actualColumn.COLUMN_NAME != declaredTable.data.autoIncrement.name) {
                                error(`Column ${declaredTable.name}.${actualColumn.COLUMN_NAME} on database is the auto increment column; declared table sets ${declaredTable.data.autoIncrement.name} as the auto increment column`);
                            }
                        }
                    }
                    else {
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
                    }
                    else {
                        if (declaredTable.data.isGenerated[actualColumn.COLUMN_NAME] === true) {
                            if (declaredTable.data.autoIncrement == undefined ||
                                actualColumn.COLUMN_NAME != declaredTable.data.autoIncrement.name) {
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
                    }
                    else {
                        if (declaredNullable) {
                            error(`Column ${declaredTable.name}.${actualColumn.COLUMN_NAME} on database is NOT nullable; declared column is`);
                        }
                        if (actualColumn.COLUMN_DEFAULT == undefined) {
                            //Not nullable, but column default is null
                            //So, there is no default value.
                            if (declaredTable.data.hasDefaultValue[actualColumn.COLUMN_NAME] === true) {
                                if (declaredTable.data.autoIncrement == undefined ||
                                    actualColumn.COLUMN_NAME != declaredTable.data.autoIncrement.name) {
                                    if (declaredTable.data.isGenerated[actualColumn.COLUMN_NAME] !== true) {
                                        error(`Column ${declaredTable.name}.${actualColumn.COLUMN_NAME} on database has no default value; declared column does`);
                                    }
                                }
                            }
                        }
                        else {
                            if (declaredTable.data.hasDefaultValue[actualColumn.COLUMN_NAME] !== true) {
                                warning(`Column ${declaredTable.name}.${actualColumn.COLUMN_NAME} on database has default value ${actualColumn.COLUMN_DEFAULT}; declared column does not`);
                            }
                        }
                    }
                }
            }
            Object.keys(declaredTable.columns)
                .map(k => declaredTable.columns[k])
                .filter(declared => actualColumns.every(actual => declared.name != actual.COLUMN_NAME))
                .forEach(declared => {
                error(`Declared column ${declared.name} does not exist`);
            });
        });
    }
    validateUniqueKeys(declaredTable, output) {
        return __awaiter(this, void 0, void 0, function* () {
            function warning(message) {
                output.warnings.push(message);
            }
            function error(message) {
                output.errors.push(message);
            }
            const connection = yield this.getOrAllocateConnectionWithDefaultDatabase();
            const databaseName = connection.config.database;
            const actualUniqueKeys = yield this.from(informationSchema.STATISTICS)
                .whereIsEqual(c => c.TABLE_SCHEMA, databaseName)
                .whereIsEqual(c => c.TABLE_NAME, declaredTable.name)
                .whereIsEqual(
            //We want unique keys
            c => c.NON_UNIQUE, false)
                .select(c => [
                c.INDEX_NAME,
                c.COLUMN_NAME,
                c.NULLABLE,
            ])
                .orderBy(c => [
                [c.INDEX_NAME, order_by_1.ASCENDING],
                [c.SEQ_IN_INDEX, order_by_1.ASCENDING]
            ])
                .fetchAll()
                .then(arr => {
                return arr.reduce((memo, row) => {
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
            const declaredUniqueKeys = declaredTable.data.uniqueKeys;
            function isEqual(actualUniqueKey, declaredColumnNames) {
                if (actualUniqueKey.length != declaredColumnNames.length) {
                    return false;
                }
                for (let declaredColumnName of declaredColumnNames) {
                    if (actualUniqueKey.every(actualColumn => actualColumn.COLUMN_NAME != declaredColumnName)) {
                        return false;
                    }
                }
                return true;
            }
            function findDeclaredUniqueKey(actualUniqueKey) {
                return declaredUniqueKeys.find(declared => {
                    const declaredColumnNames = Object.keys(declared);
                    return isEqual(actualUniqueKey, declaredColumnNames);
                });
            }
            function findActualUniqueKey(declaredUniqueKey) {
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
        });
    }
    validateTable(declaredTable, output) {
        return __awaiter(this, void 0, void 0, function* () {
            function error(message) {
                output.errors.push(message);
            }
            if (declaredTable.alias != declaredTable.name) {
                error(`Cannot validate table named ${declaredTable.name} with alias ${declaredTable.alias}; both alias and name must be the same`);
                return;
            }
            if (!(yield this.tableExists(declaredTable.name))) {
                error(`Table ${declaredTable.name} does not exist`);
                return;
            }
            yield this.validateColumns(declaredTable, output);
            yield this.validateUniqueKeys(declaredTable, output);
        });
    }
}
exports.PooledDatabase = PooledDatabase;
//# sourceMappingURL=PooledDatabase.js.map