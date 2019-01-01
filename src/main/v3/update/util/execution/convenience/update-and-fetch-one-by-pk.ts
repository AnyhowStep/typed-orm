import {ITable, TableUtil} from "../../../../table";
import {IConnection, UpdateOneResult} from "../../../../execution";
import {SingleTableSetDelegateFromTable, AssertValidSingleTableSetDelegateFromTable_Hack} from "../../constructor";
import {QueryUtil} from "../../../../query";
import {updateOneByPk} from "./update-one-by-pk";
import {UpdateAndFetchOneResult} from "./update-and-fetch-one";
import {CandidateKey} from "../../../../candidate-key";

export function updateAndFetchOneByPk<
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
        const updateResult : UpdateOneResult = await updateOneByPk(
            connection,
            table,
            pk,
            delegate
        ) as any;
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