import * as d from "../declaration";
import * as mysql from "typed-mysql";
import {newCreateSelectBuilderDelegate} from "./select-builder";
import {InsertSelectBuilder, InsertValueBuilder} from "./insert";
import {UpdateBuilder} from "./update";
import {ConnectedDatabase} from "./ConnectedDatabase";

export class Database extends mysql.Database {
    readonly from : d.CreateSelectBuilderDelegate = newCreateSelectBuilderDelegate(this);
    readonly insertSelectInto : d.CreateInsertSelectBuilderDelegate = (
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
    ) as any;
    public async transaction(callback: (db: ConnectedDatabase) => Promise<void>): Promise<void> {
        const allocated = new ConnectedDatabase(
            this.isUtcOnly(),
            await this.allocatePoolConnection()
        );
        allocated.setPaginationConfiguration(this.getPaginationConfiguration());

        await allocated.beginTransaction();
        await callback(allocated);
        await allocated.commit();
        allocated.releaseConnection();
    }
}
