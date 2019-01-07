import {ITable} from "../../../table";
import {IConnection, UpdateZeroOrOneResult} from "../../../execution";
import {SetDelegate, AssertValidSetDelegate_Hack} from "./update";
import {IAnonymousTypedExpr} from "../../../expr";
import {updateZeroOrOne} from "./update-zero-or-one";
import {RawExpr, RawExprUtil} from "../../../raw-expr";
import {ColumnType, ColumnNames} from "../query";
import {fetchZeroOrOne} from "./fetch-zero-or-one";

export type UpdateAndFetchZeroOrOneResult<
    TableT extends ITable,
    DelegateT extends SetDelegate<TableT>
> = (
    UpdateZeroOrOneResult &
    (
        {
            foundRowCount : 0,
            updatedRowCount : 0,
            row : undefined,
        } |
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
    )
);
export function updateAndFetchZeroOrOne<
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
        Promise<UpdateAndFetchZeroOrOneResult<TableT, DelegateT>>
    >
) {
    return connection.transactionIfNotInOne(async (connection) : Promise<UpdateAndFetchZeroOrOneResult<TableT, DelegateT>> => {
        const updateResult : UpdateZeroOrOneResult = await updateZeroOrOne(
            connection, table, where ,delegate
        ) as any;
        if (updateResult.foundRowCount == 0) {
            return {
                ...updateResult,
                row : undefined,
            };
        }
        const row : any = await fetchZeroOrOne(
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