import * as d from "../declaration";
import * as mysql from "typed-mysql";
import { ConnectedDatabase } from "./ConnectedDatabase";
export declare class Database extends mysql.Database {
    readonly from: d.CreateSelectBuilderDelegate;
    readonly insertSelectInto: d.CreateInsertSelectBuilderDelegate;
    readonly insertValueInto: d.CreateInsertValueBuilderDelegate;
    readonly updateTable: d.CreateUpdateBuilderDelegate;
    transaction(callback: (db: ConnectedDatabase) => Promise<void>): Promise<void>;
}
