import {ITable, TableUtil} from "../../../../table";
import {IConnection, UpdateOneResult} from "../../../../execution";
import {SingleTableSetDelegateFromTable, AssertValidSingleTableSetDelegateFromTable_Hack} from "../../constructor";
import {QueryUtil} from "../../../../query";
import {updateOneByCk} from "./update-one-by-ck";
import {UpdateAndFetchOneResult} from "./update-and-fetch-one";
import {CandidateKey} from "../../../../candidate-key";

export function updateAndFetchOneByCk<
    TableT extends ITable,
    DelegateT extends SingleTableSetDelegateFromTable<TableT>
> (
    connection : IConnection,
    table : TableT & TableUtil.AssertHasCandidateKey<TableT>,
    ck : CandidateKey<TableT>,
    delegate : DelegateT
) : (
    AssertValidSingleTableSetDelegateFromTable_Hack<
        TableT,
        DelegateT,
        Promise<UpdateAndFetchOneResult<
            TableT,
            DelegateT
        >>
    >
) {
    return connection.transactionIfNotInOne(async (connection) : (
        Promise<UpdateAndFetchOneResult<
            TableT,
            DelegateT
        >>
    ) => {
        const updateResult : UpdateOneResult = await updateOneByCk(
            connection,
            table,
            ck,
            delegate
        ) as any;
        const row = await QueryUtil.fetchOneByCk(
            connection,
            table,
            ck
        );
        await connection.pool.onUpdateAndFetch.invoke({
            type : "updateAndFetch",
            table : table,
            connection,
            row : row,
        });
        return {
            ...updateResult,
            row : row as any,
        };
    }) as any;
}