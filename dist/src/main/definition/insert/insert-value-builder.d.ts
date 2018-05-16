import * as d from "../../declaration";
import { Database } from "../Database";
export declare class InsertValueBuilder<DataT extends d.AnyInsertValueBuilderData> implements d.IInsertValueBuilder<DataT> {
    readonly data: DataT;
    readonly db: Database;
    constructor(data: DataT, db: Database);
    ignore(ignore?: boolean): any;
    private validateRow(row);
    value(row: d.RawInsertRow<DataT["table"]>): any;
    values(rows: d.RawInsertRow<DataT["table"]>[]): any;
    querify(sb: d.IStringBuilder): void;
    getQuery(): string;
    execute(this: InsertValueBuilder<{
        table: any;
        ignore: any;
        values: any[];
    }>): any;
}
