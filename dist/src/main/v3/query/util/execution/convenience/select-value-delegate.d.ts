import { ITable } from "../../../../table";
import { RawExpr } from "../../../../raw-expr";
import { PrimitiveExpr } from "../../../../primitive-expr";
import { ExprUtil } from "../../../../expr";
import { AssertValidSelectDelegateImpl, From } from "../../operation";
import { NewInstance } from "../../constructor";
export declare type SelectValueDelegate<TableT extends ITable> = ((columns: TableT["columns"], query: From<NewInstance, TableT>) => RawExpr<PrimitiveExpr>);
export declare type AssertValidSelectValueDelegateImpl<TableT extends ITable, DelegateT extends SelectValueDelegate<TableT>> = (AssertValidSelectDelegateImpl<From<NewInstance, TableT>, () => [ExprUtil.As<ExprUtil.FromRawExpr<ReturnType<DelegateT>>, "value">]>);
export declare type AssertValidSelectValueDelegate<TableT extends ITable, DelegateT extends SelectValueDelegate<TableT>> = (DelegateT & AssertValidSelectValueDelegateImpl<TableT, DelegateT>);
//# sourceMappingURL=select-value-delegate.d.ts.map