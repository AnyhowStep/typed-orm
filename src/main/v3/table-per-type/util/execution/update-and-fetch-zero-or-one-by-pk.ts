import {ITable, TableUtil} from "../../../table";
import {IConnection} from "../../../execution";
import {SetDelegate, AssertValidSetDelegate_Hack} from "./update";
import {UpdateAndFetchZeroOrOneResult, updateAndFetchZeroOrOne} from "./update-and-fetch-zero-or-one";
import { CandidateKey } from "../../../candidate-key";
import {PrimaryKey} from "../../../primary-key";

export function updateAndFetchZeroOrOneByPk<
    TableT extends ITable & { primaryKey : CandidateKey },
    DelegateT extends SetDelegate<TableT>
> (
    connection : IConnection,
    table : TableT,
    pk : PrimaryKey<TableT>,
    delegate : DelegateT
) : (
    AssertValidSetDelegate_Hack<
        TableT,
        DelegateT,
        Promise<UpdateAndFetchZeroOrOneResult<TableT, DelegateT>>
    >
) {
    return updateAndFetchZeroOrOne<TableT, DelegateT>(
        connection,
        table,
        TableUtil.eqPrimaryKey(table, pk),
        delegate
    );
}