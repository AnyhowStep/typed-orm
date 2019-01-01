import {ITable, TableUtil} from "../../../../table";
import {IConnection, UpdateZeroOrOneResult} from "../../../../execution";
import {SingleTableSetDelegateFromTable, AssertValidSingleTableSetDelegateFromTable_Hack} from "../../constructor";
import {QueryUtil} from "../../../../query";
import {updateZeroOrOneByPk} from "./update-zero-or-one-by-pk";
import {UpdateAndFetchZeroOrOneResult} from "./update-and-fetch-zero-or-one";
import {CandidateKey} from "../../../../candidate-key";

export function updateAndFetchZeroOrOneByPk<
    TableT extends ITable & { primaryKey : CandidateKey },
    DelegateT extends SingleTableSetDelegateFromTable<TableT>
> (
    connection : IConnection,
    table : TableT & TableUtil.AssertHasCandidateKey<TableT>,
    pk : TableUtil.PrimaryKey<TableT>,
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
        const updateResult : UpdateZeroOrOneResult = await updateZeroOrOneByPk(
            connection,
            table,
            pk,
            delegate
        ) as any;
        if (updateResult.foundRowCount == 0) {
            return {
                ...updateResult,
                row : undefined,
            };
        }
        const row = await QueryUtil.fetchOneByPk(
            connection,
            table,
            pk
        );
        return {
            ...updateResult,
            row : row as any,
        };
    }) as any;
}