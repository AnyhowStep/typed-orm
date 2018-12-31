import {ITable, TableUtil} from "../../../../table";
import {QueryUtil} from "../../..";
import {IConnection} from "../../../../execution";
import {RawExprUtil} from "../../../../raw-expr";
import {ColumnUtil} from "../../../../column";
import {ExprUtil} from "../../../../expr";
import {ExprSelectItemUtil} from "../../../../expr-select-item";
import {SelectValueDelegate, AssertValidSelectValueDelegate} from "./select-value-delegate";

export function fetchValueOrUndefinedByCk<
    TableT extends ITable,
    DelegateT extends SelectValueDelegate<TableT>
> (
    connection : IConnection,
    table : TableT,
    ck : TableUtil.CandidateKey<TableT>,
    delegate : AssertValidSelectValueDelegate<TableT, DelegateT>
) : (
    Promise<
        RawExprUtil.TypeOf<ReturnType<DelegateT>>|undefined
    >
) {
    return QueryUtil.newInstance()
        .from(table as any)
        .where(() => TableUtil.eqCandidateKey(table, ck) as any)
        .select((columns, query) => {
            const rawExpr = delegate(columns, query as any);
            const selectItem = (
                ColumnUtil.isColumn(rawExpr) ?
                rawExpr :
                ExprSelectItemUtil.isExprSelectItem(rawExpr) ?
                rawExpr :
                ExprUtil.as(
                    ExprUtil.fromRawExpr(rawExpr),
                    "value"
                )
            );
            return [selectItem];
        })
        .fetchValueOrUndefined(connection) as any;
}