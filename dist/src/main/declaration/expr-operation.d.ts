import { AllowedExprConstants, RawExpr, IExpr, IColumnExpr } from "./expr";
import { ISelectBuilder, AnySelectBuilder } from "./select-builder";
import { IColumn } from "./column";
import { Tuple } from "./tuple";
import { TypeOf } from "./column-collection";
export declare type ExprUsedColumns<RawExprT extends RawExpr<any>> = (RawExprT extends AnySelectBuilder ? {} : RawExprT extends AllowedExprConstants ? {} : RawExprT extends IColumn<infer TableNameT, infer NameT, infer TypeT> ? {
    [table in TableNameT]: {
        [name in NameT]: IColumn<TableNameT, NameT, TypeT>;
    };
} : RawExprT extends IExpr<infer UsedColumnsT, any> ? UsedColumnsT : never);
export declare type ExprType<RawExprT extends RawExpr<any>> = (RawExprT extends AllowedExprConstants ? (RawExprT extends undefined ? null : RawExprT) : RawExprT extends IColumn<any, any, infer TypeT> ? TypeT : RawExprT extends IExpr<any, infer TypeT> ? TypeT : RawExprT extends ISelectBuilder<infer DataT> ? (DataT["selectTuple"] extends (Tuple<IColumn<any, any, any> | IColumnExpr<any, "__expr", any, any>> & {
    length: 1;
}) ? TypeOf<DataT["selectTuple"][0]["assertDelegate"]> | null : ("Invalid selectTuple; must have 1 element, and not be a table" | void | never)) : ("Invalid RawExprT or could not infer TypeT/DataT" | void | never));
export declare type RawToExpr<RawExprT extends RawExpr<any>> = (IExpr<ExprUsedColumns<RawExprT>, ExprType<RawExprT>>);
