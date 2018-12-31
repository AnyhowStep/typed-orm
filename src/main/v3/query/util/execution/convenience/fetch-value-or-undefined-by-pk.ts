import {ITable, TableUtil} from "../../../../table";
import {QueryUtil} from "../../..";
import {IConnection} from "../../../../execution";
import {RawExprUtil} from "../../../../raw-expr";
import {ColumnUtil} from "../../../../column";
import {ExprUtil} from "../../../../expr";
import {ExprSelectItemUtil} from "../../../../expr-select-item";
import {SelectValueDelegate, AssertValidSelectValueDelegate} from "./select-value-delegate";
import {CandidateKey} from "../../../../candidate-key";

export function fetchValueOrUndefinedByPk<
    TableT extends ITable & { primaryKey : CandidateKey },
    DelegateT extends SelectValueDelegate<TableT>
> (
    connection : IConnection,
    table : TableT,
    pk : TableUtil.PrimaryKey<TableT>,
    delegate : AssertValidSelectValueDelegate<TableT, DelegateT>
) : (
    Promise<
        RawExprUtil.TypeOf<ReturnType<DelegateT>>
    >
) {
    return QueryUtil.newInstance()
        .from(table as any)
        .where(() => TableUtil.eqPrimaryKey(table, pk) as any)
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