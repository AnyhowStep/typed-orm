import {ITable} from "../../../table";
import {IConnection, UpdateOneResult} from "../../../execution";
import {SetDelegate, AssertValidSetDelegate_Hack} from "./update";
import {IAnonymousTypedExpr} from "../../../expr";
import {RawExpr, RawExprUtil} from "../../../raw-expr";
import {ColumnType, ColumnNames} from "../query";
import {updateOne} from "./update-one";
import {fetchOne} from "./fetch-one";

export type UpdateAndFetchOneResult<
    TableT extends ITable,
    DelegateT extends SetDelegate<TableT>
> = (
    UpdateOneResult &
    {
        foundRowCount : 1,
        updatedRowCount : 0|1,
        row : {
            readonly [columnName in ColumnNames<TableT>] : (
                columnName extends keyof ReturnType<DelegateT> ?
                (
                    ReturnType<DelegateT>[columnName] extends RawExpr<
                        ColumnType<TableT, columnName>
                    > ?
                    RawExprUtil.TypeOf<
                        ReturnType<DelegateT>[columnName]
                    > :
                    ColumnType<TableT, columnName>
                ) :
                ColumnType<TableT, columnName>
            )
        }
    }
);
export function updateAndFetchOne<
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
        Promise<UpdateAndFetchOneResult<TableT, DelegateT>>
    >
) {
    return connection.transactionIfNotInOne(async (connection) : Promise<UpdateAndFetchOneResult<TableT, DelegateT>> => {
        const updateResult : UpdateOneResult = await updateOne(
            connection, table, where ,delegate
        ) as any;
        const row : any = await fetchOne(
            connection,
            table,
            where
        );
        return {
            ...updateResult,
            row,
        };
    }) as any;
}