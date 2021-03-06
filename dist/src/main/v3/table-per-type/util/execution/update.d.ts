import { RawExpr, RawExprUtil } from "../../../raw-expr";
import { ITable } from "../../../table";
import { ColumnType, MutableColumnNames } from "../query";
import { ColumnRefUtil } from "../../../column-ref";
import { ColumnUtil } from "../../../column";
import { ExecutableUpdate } from "../../../update/util";
import { ColumnIdentifierUtil } from "../../../column-identifier";
import { PrimitiveExpr } from "../../../primitive-expr";
import { IAnonymousTypedExpr } from "../../../expr";
export declare type AssignmentMap<TableT extends ITable> = ({
    [name in MutableColumnNames<TableT>]?: (RawExpr<ColumnType<TableT, name>>);
});
export declare type SetDelegate<TableT extends ITable> = ((columns: ColumnRefUtil.ToConvenient<ColumnRefUtil.FromColumnArray<ColumnUtil.FromColumnMap<TableT["columns"] | TableT["parents"][number]["columns"]>[]>>) => AssignmentMap<TableT>);
export declare type SetDelegateExtractRawExpr<TableT extends ITable, DelegateT extends SetDelegate<TableT>> = (Extract<ReturnType<DelegateT>[keyof ReturnType<DelegateT>], RawExpr<PrimitiveExpr>>);
export declare type AssertValidSetDelegate_Hack<TableT extends ITable, DelegateT extends SetDelegate<TableT>, ResultT> = ((Exclude<ColumnIdentifierUtil.FromColumnRef<RawExprUtil.UsedRef<SetDelegateExtractRawExpr<TableT, DelegateT>>>, ColumnIdentifierUtil.FromColumnMap<TableT["columns"] | TableT["parents"][number]["columns"]>> extends never ? (Exclude<Extract<keyof ReturnType<DelegateT>, string>, MutableColumnNames<TableT>> extends never ? ResultT : ["The following columns cannot be updated", Exclude<Extract<keyof ReturnType<DelegateT>, string>, MutableColumnNames<TableT>>]) : ["The following referenced columns are not allowed", Exclude<ColumnIdentifierUtil.FromColumnRef<RawExprUtil.UsedRef<SetDelegateExtractRawExpr<TableT, DelegateT>>>, ColumnIdentifierUtil.FromColumnMap<TableT["columns"] | TableT["parents"][number]["columns"]>>]));
export declare function update<TableT extends ITable, DelegateT extends SetDelegate<TableT>>(table: TableT, where: IAnonymousTypedExpr<boolean>, delegate: DelegateT): (AssertValidSetDelegate_Hack<TableT, DelegateT, ExecutableUpdate>);
