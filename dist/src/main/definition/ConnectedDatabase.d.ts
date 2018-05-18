import * as d from "../declaration";
import * as mysql from "typed-mysql";
export declare class ConnectedDatabase extends mysql.ConnectedDatabase {
    readonly from: d.CreateSelectBuilderDelegate;
    readonly insertSelectInto: d.CreateInsertSelectBuilderDelegate;
    readonly insertValueInto: d.CreateInsertValueBuilderDelegate;
    readonly updateTable: d.CreateUpdateBuilderDelegate;
}
