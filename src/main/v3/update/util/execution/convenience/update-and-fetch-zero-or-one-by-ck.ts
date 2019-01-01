import {ITable, TableUtil} from "../../../../table";
import {IConnection, UpdateZeroOrOneResult} from "../../../../execution";
import {SingleTableSetDelegateFromTable, AssertValidSingleTableSetDelegateFromTable_Hack} from "../../constructor";
import {QueryUtil} from "../../../../query";
import {updateZeroOrOneByCk} from "./update-zero-or-one-by-ck";
import {UpdateAndFetchZeroOrOneResult} from "./update-and-fetch-zero-or-one";

export function updateAndFetchZeroOrOneByCk<
    TableT extends ITable,
    DelegateT extends SingleTableSetDelegateFromTable<TableT>
> (
    connection : IConnection,
    table : TableT & TableUtil.AssertHasCandidateKey<TableT>,
    ck : TableUtil.CandidateKey<TableT>,
    delegate : DelegateT
) : (
    AssertValidSingleTableSetDelegateFromTable_Hack<
        TableT,
        DelegateT,
        Promise<UpdateAndFetchZeroOrOneResult<
            TableT,
            DelegateT
        >>
    >
) {
    return connection.transactionIfNotInOne(async (connection) : (
        Promise<UpdateAndFetchZeroOrOneResult<
            TableT,
            DelegateT
        >>
    ) => {
        const updateResult : UpdateZeroOrOneResult = await updateZeroOrOneByCk(
            connection,
            table,
            ck,
            delegate
        ) as any;
        if (updateResult.foundRowCount == 0) {
            return {
                ...updateResult,
                row : undefined,
            };
        }
        const row = await QueryUtil.fetchOneByCk(
            connection,
            table,
            ck
        );
        return {
            ...updateResult,
            row : row as any,
        };
    }) as any;
}