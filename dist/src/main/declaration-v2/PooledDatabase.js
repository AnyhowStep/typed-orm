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
        this.from = (table) => {
            return this.query()
                .from(table);
        };
        this.select = (delegate) => {
            return this.query()
                .select(delegate);
        };
        this.insertValue = (table, value) => {
            return new insert_value_builder_1.InsertValueBuilder(table, undefined, "NORMAL", this).value(value);
        };
        this.insertSelect = (table, selectBuilder, delegate) => {
            return new insert_select_builder_1.InsertSelectBuilder(table, selectBuilder, undefined, "NORMAL", this).set(delegate);
        };
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
    }
    allocate() {
        return new PooledDatabase(this.getPool(), this.getData());
    }
    transaction(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const allocated = this.allocate();
            yield allocated.beginTransaction();
            yield callback(allocated)
                .then(() => __awaiter(this, void 0, void 0, function* () {
                yield allocated.commit();
                allocated.freeConnection();
            }))
                .catch((err) => __awaiter(this, void 0, void 0, function* () {
                yield allocated.rollback();
                allocated.freeConnection();
                throw err;
            }));
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
    deleteFrom(table, where) {
        return this.from(table)
            .where(where)
            .delete(() => [table]);
    }
}
exports.PooledDatabase = PooledDatabase;
//# sourceMappingURL=PooledDatabase.js.map