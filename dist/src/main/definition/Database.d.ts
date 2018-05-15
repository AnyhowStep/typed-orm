import * as d from "../declaration";
import * as mysql from "typed-mysql";
export declare class Database extends mysql.Database {
    readonly from: d.CreateSelectBuilderDelegate;
}
