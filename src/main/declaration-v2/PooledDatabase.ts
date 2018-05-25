import * as mysql from "typed-mysql";
import {CreateSelectBuilderDelegate} from "./select-builder";
import {SelectBuilder, AnySelectBuilder, __DUMMY_FROM_TABLE} from "./select-builder";
import {Join, JoinType} from "./join";
import {AnyAliasedTable} from "./aliased-table";;
import {SelectDelegate} from "./select-delegate";
import {Table, AnyTable} from "./table";
import {RawInsertValueRow, InsertValueBuilder} from "./insert-value-builder";
import {InsertAssignmentCollectionDelegate, InsertSelectBuilder, RawInsertSelectAssignmentCollection} from "./insert-select-builder";
import {UpdateBuilder, RawUpdateAssignmentReferences, UpdateAssignmentReferencesDelegate} from "./update-builder";
import * as sd from "schema-decorator";
import {WhereDelegate} from "./where-delegate";
import {DeleteBuilder, DeleteTables} from "./delete-builder";

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
    }>
);

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
        value : RawInsertValueRow<TableT>
    ) : InsertValueBuilder<TableT, RawInsertValueRow<TableT>[], "NORMAL"> => {
        return new InsertValueBuilder(
            table,
            undefined,
            "NORMAL",
            this
        ).value(value);
    };
    readonly insertSelect = <
        TableT extends AnyTable,
        SelectBuilderT extends AnySelectBuilder
    > (
        table : TableT,
        selectBuilder : SelectBuilderT,
        delegate : InsertAssignmentCollectionDelegate<TableT, SelectBuilderT>
    ) : (
        InsertSelectBuilder<
            TableT,
            SelectBuilderT,
            RawInsertSelectAssignmentCollection<TableT, SelectBuilderT>,
            "NORMAL"
        >
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
            return this.from(arg0)
                .where(arg2)
                .set(arg1);
        } else {
            return super.update(arg0, arg1, arg2, arg3, arg4);
        }
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
        return this.from(table)
            .where(where)
            .delete(() => [table] as any);
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
}
