import * as d from "../../declaration";
import { Database } from "../Database";
export declare class InsertSelectBuilder<DataT extends d.AnyInsertSelectBuilderData> implements d.IInsertSelectBuilder<DataT> {
    readonly data: DataT;
    readonly db: Database;
    constructor(data: DataT, db: Database);
    ignore(ignore?: boolean): any;
    columns<InsertColumnsCallbackT extends d.InsertColumnsCallback<DataT>>(columnsCallback: InsertColumnsCallbackT): d.IInsertSelectBuilder<{
        table: DataT["table"];
        selectBuilder: DataT["selectBuilder"];
        ignore: DataT["ignore"];
        columns: ReturnType<InsertColumnsCallbackT>;
    }>;
    querify(sb: d.IStringBuilder): void;
    getQuery(): string;
    execute(this: InsertSelectBuilder<{
        table: any;
        selectBuilder: any;
        ignore: any;
        columns: {
            [name: string]: d.AnyColumn;
        };
    }>): any;
}
