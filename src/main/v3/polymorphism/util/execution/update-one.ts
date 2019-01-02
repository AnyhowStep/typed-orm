import {ITable} from "../../../table";
import {IConnection, UpdateOneResult} from "../../../execution";
import {UpdateUtil} from "../../../update";
import {SetDelegate, AssertValidSetDelegate_Hack, update} from "./update";
import {IAnonymousTypedExpr} from "../../../expr";

export function updateOne<
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
        Promise<UpdateOneResult>
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
    return UpdateUtil.executeUpdateOne(
        executableUpdate,
        connection
    ) as any;
}