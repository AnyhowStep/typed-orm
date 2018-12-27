import {ITable, TableUtil} from "../../../../table";
import {IConnection} from "../../../../execution";
import {InsertRow} from "../../../insert";
import {executeAndFetch} from "../execute-and-fetch";
import {insertInto} from "../../constructor";

export async function insertAndFetch<
    TableT extends ITable & { insertAllowed : true }
> (
    connection : (
        IConnection &
        TableUtil.AssertHasCandidateKey<TableT>
    ),
    table : TableT,
    insertRow : InsertRow<TableT>
) {
    return executeAndFetch(
        insertInto(table)
            .values(insertRow),
        connection
    );
}