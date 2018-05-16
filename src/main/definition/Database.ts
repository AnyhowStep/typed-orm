import * as d from "../declaration";
import * as mysql from "typed-mysql";
import {newCreateSelectBuilderDelegate} from "./select-builder";
import {InsertValueBuilder} from "./insert";

export class Database extends mysql.Database {
    readonly from : d.CreateSelectBuilderDelegate = newCreateSelectBuilderDelegate(this);
    readonly insertValueInto : d.CreateInsertValueBuilderDelegate = (
        <TableT extends d.ITable<any, any, any, any>> (table : TableT) => {
            return new InsertValueBuilder({
                table : table,
                ignore : false,
                values : undefined,
            }, this);
        }
    );
}
