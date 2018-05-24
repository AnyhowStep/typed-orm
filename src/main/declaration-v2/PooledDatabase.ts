import * as mysql from "typed-mysql";
import {CreateSelectBuilderDelegate} from "./select-builder";
import {SelectBuilder, __DUMMY_FROM_TABLE} from "./select-builder";
//import {InsertSelectBuilder, InsertValueBuilder} from "./insert";
//import {UpdateBuilder} from "./update";
import {Join, JoinType} from "./join";
import {AnyAliasedTable} from "./aliased-table";;
import {SelectDelegate} from "./select-delegate";
import {AnyTable} from "./table";
import {RawInsertRow, InsertValueBuilder} from "./insert-value-builder";

export class PooledDatabase extends mysql.PooledDatabase {
    public allocate () {
        return new PooledDatabase(
            this.getPool(),
            this.getData()
        );
    }
    public async transaction(callback: (db: PooledDatabase) => Promise<void>) : Promise<void> {
        const allocated = this.allocate();

        await allocated.beginTransaction();
        await callback(allocated)
            .then(async () => {
                await allocated.commit();
                allocated.freeConnection();
            })
            .catch(async (err) => {
                await allocated.rollback();
                allocated.freeConnection();
                throw err;
            });
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
            },
            {
                db : this,
                distinct : false,
                sqlCalcFoundRows : false,
            }
        );
    };
    readonly from = <TableT extends AnyAliasedTable>(table : TableT) => {
        return this.query()
            .from(table);
    };
    readonly select = <SelectDelegateT extends SelectDelegate<ReturnType<CreateSelectBuilderDelegate>>>(
        delegate : SelectDelegateT
    ) => {
        return this.query()
            .select(delegate);
    };

    readonly insertValue = <TableT extends AnyTable>(
        table : TableT,
        value : RawInsertRow<TableT>
    ) : InsertValueBuilder<TableT, RawInsertRow<TableT>[], "NORMAL"> => {
        return new InsertValueBuilder(
            table,
            undefined,
            "NORMAL",
            this
        ).value(value);
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
        db.insertInto(
            app,
            db.from(ssoClient),
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
        db.deleteFrom(app, c => {
            return eq(c.appId, 1);
        }).ignoreErrors()
        //Builder delete
        db.query()
            .from(app)
            .whereIsEqual(c => c.appId, 1)
            .delete()
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
