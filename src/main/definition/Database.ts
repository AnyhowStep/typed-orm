import * as d from "../declaration";
import * as mysql from "typed-mysql";
import {newCreateSelectBuilderDelegate} from "./select-builder";

export class Database extends mysql.Database {
    readonly from : d.CreateSelectBuilderDelegate = newCreateSelectBuilderDelegate(this);
}
