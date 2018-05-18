import * as d from "../../declaration";
import { Database } from "../Database";
import { ConnectedDatabase } from "../ConnectedDatabase";
export declare class InsertValueBuilder<DataT extends d.AnyInsertValueBuilderData> implements d.IInsertValueBuilder<DataT> {
    readonly data: DataT;
    readonly db: Database | ConnectedDatabase;
    constructor(data: DataT, db: Database | ConnectedDatabase);
    ignore(ignore?: boolean): any;
    private validateRow;
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
