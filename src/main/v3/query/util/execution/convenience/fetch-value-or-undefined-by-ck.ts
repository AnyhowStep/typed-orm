import {ITable, TableUtil} from "../../../../table";
import {QueryUtil} from "../../..";
import {IConnection} from "../../../../execution";
import {RawExpr, RawExprUtil} from "../../../../raw-expr";
import {PrimitiveExpr} from "../../../../primitive-expr";
import {ColumnUtil} from "../../../../column";
import {ExprUtil} from "../../../../expr";
import {ExprSelectItemUtil} from "../../../../expr-select-item";
import { AssertValidSelectDelegateImpl, From } from "../../operation";
import { NewInstance } from "../../constructor";

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
    /*Exclude<
        ColumnUtil.FromColumnRef<
            RawExprUtil.UsedRef<
                ReturnType<DelegateT>
            >
        >,
        ColumnUtil.FromColumnMap<TableT["columns"]>
    > extends never ?
    unknown :
    [
        "Invalid column references",
        Exclude<
            ColumnUtil.FromColumnRef<
                RawExprUtil.UsedRef<
                    ReturnType<DelegateT>
                >
            >,
            ColumnUtil.FromColumnMap<TableT["columns"]>
        >
    ]*/
);
export type AssertValidSelectValueDelegate<
    TableT extends ITable,
    DelegateT extends SelectValueDelegate<TableT>
> = (
    DelegateT &
    AssertValidSelectValueDelegateImpl<TableT, DelegateT>
);
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
        RawExprUtil.TypeOf<ReturnType<DelegateT>>
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