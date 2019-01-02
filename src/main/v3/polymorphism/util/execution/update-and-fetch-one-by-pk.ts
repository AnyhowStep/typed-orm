import {ITable, TableUtil} from "../../../table";
import {IConnection} from "../../../execution";
import {SetDelegate, AssertValidSetDelegate_Hack} from "./update";
import {UpdateAndFetchOneResult, updateAndFetchOne} from "./update-and-fetch-one";
import { CandidateKey } from "../../../candidate-key";

export function updateAndFetchOneByPk<
    TableT extends ITable & { primaryKey : CandidateKey },
    DelegateT extends SetDelegate<TableT>
> (
    connection : IConnection,
    table : TableT,
    pk : TableUtil.PrimaryKey<TableT>,
    delegate : DelegateT
) : (
    AssertValidSetDelegate_Hack<
        TableT,
        DelegateT,
        Promise<UpdateAndFetchOneResult<TableT, DelegateT>>
    >
) {
    return updateAndFetchOne<TableT, DelegateT>(
        connection,
        table,
        TableUtil.eqPrimaryKey(table, pk),
        delegate
    );
}