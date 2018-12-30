import { ITable, TableUtil } from "../../../../table";
import { IConnection } from "../../../../execution";
import { RawExpr, RawExprUtil } from "../../../../raw-expr";
import { PrimitiveExpr } from "../../../../primitive-expr";
import { ExprUtil } from "../../../../expr";
import { AssertValidSelectDelegateImpl, From } from "../../operation";
import { NewInstance } from "../../constructor";
export declare type SelectValueDelegate<TableT extends ITable> = ((columns: TableT["columns"], query: From<NewInstance, TableT>) => RawExpr<PrimitiveExpr>);
export declare type AssertValidSelectValueDelegateImpl<TableT extends ITable, DelegateT extends SelectValueDelegate<TableT>> = (AssertValidSelectDelegateImpl<From<NewInstance, TableT>, () => [ExprUtil.As<ExprUtil.FromRawExpr<ReturnType<DelegateT>>, "value">]>);
export declare type AssertValidSelectValueDelegate<TableT extends ITable, DelegateT extends SelectValueDelegate<TableT>> = (DelegateT & AssertValidSelectValueDelegateImpl<TableT, DelegateT>);
export declare function fetchValueOrUndefinedByCk<TableT extends ITable, DelegateT extends SelectValueDelegate<TableT>>(connection: IConnection, table: TableT, ck: TableUtil.CandidateKey<TableT>, delegate: AssertValidSelectValueDelegate<TableT, DelegateT>): (Promise<RawExprUtil.TypeOf<ReturnType<DelegateT>>>);
//# sourceMappingURL=fetch-value-or-undefined-by-ck.d.ts.map