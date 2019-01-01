import {ITable, TableUtil} from "../../../../table";
import {IConnection, UpdateOneResult} from "../../../../execution";
import {SingleTableSetDelegateFromTable, AssertValidSingleTableSetDelegateFromTable_Hack} from "../../constructor";
import {QueryUtil} from "../../../../query";
import {updateOneBySk} from "./update-one-by-sk";
import {UpdateAndFetchOneResult} from "./update-and-fetch-one";

export function updateAndFetchOneBySk<
    TableT extends ITable,
    DelegateT extends SingleTableSetDelegateFromTable<TableT>
> (
    connection : IConnection,
    table : TableT & TableUtil.AssertHasCandidateKey<TableT>,
    sk : TableUtil.SuperKey<TableT>,
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
        const updateResult : UpdateOneResult = await updateOneBySk(
            connection,
            table,
            sk,
            delegate
        ) as any;
        const row = await QueryUtil.fetchOneBySk(
            connection,
            table,
            sk
        );
        return {
            ...updateResult,
            row : row as any,
        };
    }) as any;
}