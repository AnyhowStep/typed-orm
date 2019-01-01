import {ITable, TableUtil} from "../../../../table";
import {IConnection, UpdateZeroOrOneResult, UpdateResult} from "../../../../execution";
import {SingleTableSetDelegateFromTable, AssertValidSingleTableSetDelegateFromTable_Hack} from "../../constructor";
import {QueryUtil} from "../../../../query";
import {RawExpr, RawExprUtil} from "../../../../raw-expr";
import {updateZeroOrOneByCk} from "./update-zero-or-one-by-ck";

export type UpdateAndFetchZeroOrOneResult<
    TableT extends ITable,
    DelegateT extends SingleTableSetDelegateFromTable<TableT>
> = (
    UpdateResult &
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
                readonly [columnName in Extract<keyof TableT["columns"], string>] : (
                    columnName extends keyof ReturnType<DelegateT> ?
                    (
                        ReturnType<DelegateT>[columnName] extends RawExpr<
                            ReturnType<
                                TableT["columns"][columnName]["assertDelegate"]
                            >
                        > ?
                        RawExprUtil.TypeOf<
                            ReturnType<DelegateT>[columnName]
                        > :
                        ReturnType<
                            TableT["columns"][columnName]["assertDelegate"]
                        >
                    ) :
                    ReturnType<
                        TableT["columns"][columnName]["assertDelegate"]
                    >
                )
            }
        }
    )
);
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