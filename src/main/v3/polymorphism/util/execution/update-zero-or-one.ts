import {ITable} from "../../../table";
import {IConnection, UpdateZeroOrOneResult} from "../../../execution";
import {UpdateUtil} from "../../../update";
import {SetDelegate, AssertValidSetDelegate_Hack, update} from "./update";
import {IAnonymousTypedExpr} from "../../../expr";

export function updateZeroOrOne<
    TableT extends ITable,
    DelegateT extends SetDelegate<TableT>
> (
    connection : IConnection,
    table : TableT,
    where : IAnonymousTypedExpr<boolean>,
    delegate : DelegateT
) : (
    AssertValidSetDelegate_Hack<
        TableT,
        DelegateT,
        Promise<UpdateZeroOrOneResult>
    >
 ) {
    const executableUpdate = update<
        TableT,
        DelegateT
    >(
        table,
        where,
        delegate
    ) as any;
    return UpdateUtil.executeUpdateZeroOrOne(
        executableUpdate,
        connection
    ) as any;
}