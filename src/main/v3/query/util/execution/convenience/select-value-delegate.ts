import {ITable} from "../../../../table";
import {RawExpr} from "../../../../raw-expr";
import {PrimitiveExpr} from "../../../../primitive-expr";
import {ExprUtil} from "../../../../expr";
import {AssertValidSelectDelegateImpl, From} from "../../operation";
import {NewInstance} from "../../constructor";
import {ColumnMap} from "../../../../column-map";
import {IQuery} from "../../../query";
import {SingleValueSelectItem} from "../../../../select-item";
import {ColumnUtil} from "../../../../column";
import {ExprSelectItemUtil} from "../../../../expr-select-item";

export type SelectValueDelegate<
    TableT extends ITable
> = (
    (
        columns : TableT["columns"],
        query : From<NewInstance, TableT>
    ) => RawExpr<PrimitiveExpr>
);
export type AssertValidSelectValueDelegateImpl<
    TableT extends ITable,
    DelegateT extends SelectValueDelegate<TableT>
> = (
    AssertValidSelectDelegateImpl<
        From<NewInstance, TableT>,
        () => [
            ExprUtil.As<
                ExprUtil.FromRawExpr<ReturnType<DelegateT>>,
                "value"
            >
        ]
    >
);
export type AssertValidSelectValueDelegate<
    TableT extends ITable,
    DelegateT extends SelectValueDelegate<TableT>
> = (
    DelegateT &
    AssertValidSelectValueDelegateImpl<TableT, DelegateT>
);
export function executeSelectValueDelegate (
    columns : ColumnMap,
    query : IQuery,
    delegate : SelectValueDelegate<ITable>
) : [SingleValueSelectItem] {
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
}