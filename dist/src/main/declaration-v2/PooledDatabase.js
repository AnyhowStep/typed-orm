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
const informationSchema = require("./information-schema");
const polymorphic_insert_value_and_fetch_1 = require("./polymorphic-insert-value-and-fetch");
const polymorphic_update_zero_or_one_by_unique_key_1 = require("./polymorphic-update-zero-or-one-by-unique-key");
const raw_expr_1 = require("./raw-expr");
const log_1 = require("./log");
const column_collection_1 = require("./column-collection");
const column_references_1 = require("./column-references");
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
    transaction(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const allocated = this.allocate();
            yield allocated.beginTransaction();
            return callback(allocated)
                .then((result) => __awaiter(this, void 0, void 0, function* () {
                yield allocated.commit();
                allocated.freeConnection();
                return result;
            }))
                .catch((err) => __awaiter(this, void 0, void 0, function* () {
                yield allocated.rollback();
                allocated.freeConnection();
                throw err;
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
    getGenerationExpression(column) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield this.getOrAllocateConnection();
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
        });
    }
    polymorphicInsertValueAndFetch(table, row) {
        return polymorphic_insert_value_and_fetch_1.polymorphicInsertValueAndFetch(this, table, row);
    }
    polymorphicUpdateZeroOrOneByUniqueKey(table, uniqueKey, setDelegate) {
        return polymorphic_update_zero_or_one_by_unique_key_1.polymorphicUpdateZeroOrOneByUniqueKey(this, table, uniqueKey, setDelegate);
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
    insertIfDifferentAndFetch(data, entityIdentifier, newValues) {
        return log_1.LogDataUtil.insertIfDifferentAndFetch(this, data, entityIdentifier, newValues);
    }
}
exports.PooledDatabase = PooledDatabase;
//# sourceMappingURL=PooledDatabase.js.map