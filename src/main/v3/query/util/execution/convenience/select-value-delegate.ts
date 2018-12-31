import {ITable} from "../../../../table";
import {RawExpr} from "../../../../raw-expr";
import {PrimitiveExpr} from "../../../../primitive-expr";
import {ExprUtil} from "../../../../expr";
import {AssertValidSelectDelegateImpl, From} from "../../operation";
import {NewInstance} from "../../constructor";

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