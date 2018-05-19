import * as d from "../declaration";
import { Expr } from "./expr";
export declare const TRUE: Expr<{}, true>;
export declare const FALSE: Expr<{}, false>;
export declare const and: <LeftT extends boolean | d.IExpr<any, boolean> | d.IColumn<any, any, boolean> | d.ISelectBuilder<{
    hasSelect: true;
    hasUnion: any;
    columnReferences: any;
    joins: any;
    selectReferences: any;
    selectTuple: any[] & {
        "0": any;
    } & {
        length: 1;
    } & {
        "0": d.IColumn<any, any, boolean> | d.IColumnExpr<any, "__expr", any, boolean>;
    };
    aggregateCallback: any;
}>, RightT extends boolean | d.IExpr<any, boolean> | d.IColumn<any, any, boolean> | d.ISelectBuilder<{
    hasSelect: true;
    hasUnion: any;
    columnReferences: any;
    joins: any;
    selectReferences: any;
    selectTuple: any[] & {
        "0": any;
    } & {
        length: 1;
    } & {
        "0": d.IColumn<any, any, boolean> | d.IColumnExpr<any, "__expr", any, boolean>;
    };
    aggregateCallback: any;
}>>(left: LeftT, right: RightT) => Expr<(LeftT extends d.ISelectBuilder<any> ? {} : LeftT extends d.AllowedExprConstants ? {} : LeftT extends d.IColumn<infer TableNameT, infer NameT, infer TypeT> ? { [table in TableNameT]: { [name in NameT]: d.IColumn<TableNameT, NameT, TypeT>; }; } : LeftT extends d.IExpr<infer UsedColumnsT, any> ? UsedColumnsT : never) & (RightT extends d.ISelectBuilder<any> ? {} : RightT extends d.AllowedExprConstants ? {} : RightT extends d.IColumn<infer TableNameT, infer NameT, infer TypeT> ? { [table in TableNameT]: { [name in NameT]: d.IColumn<TableNameT, NameT, TypeT>; }; } : RightT extends d.IExpr<infer UsedColumnsT, any> ? UsedColumnsT : never), boolean>;
export declare const or: <LeftT extends boolean | d.IExpr<any, boolean> | d.IColumn<any, any, boolean> | d.ISelectBuilder<{
    hasSelect: true;
    hasUnion: any;
    columnReferences: any;
    joins: any;
    selectReferences: any;
    selectTuple: any[] & {
        "0": any;
    } & {
        length: 1;
    } & {
        "0": d.IColumn<any, any, boolean> | d.IColumnExpr<any, "__expr", any, boolean>;
    };
    aggregateCallback: any;
}>, RightT extends boolean | d.IExpr<any, boolean> | d.IColumn<any, any, boolean> | d.ISelectBuilder<{
    hasSelect: true;
    hasUnion: any;
    columnReferences: any;
    joins: any;
    selectReferences: any;
    selectTuple: any[] & {
        "0": any;
    } & {
        length: 1;
    } & {
        "0": d.IColumn<any, any, boolean> | d.IColumnExpr<any, "__expr", any, boolean>;
    };
    aggregateCallback: any;
}>>(left: LeftT, right: RightT) => Expr<(LeftT extends d.ISelectBuilder<any> ? {} : LeftT extends d.AllowedExprConstants ? {} : LeftT extends d.IColumn<infer TableNameT, infer NameT, infer TypeT> ? { [table in TableNameT]: { [name in NameT]: d.IColumn<TableNameT, NameT, TypeT>; }; } : LeftT extends d.IExpr<infer UsedColumnsT, any> ? UsedColumnsT : never) & (RightT extends d.ISelectBuilder<any> ? {} : RightT extends d.AllowedExprConstants ? {} : RightT extends d.IColumn<infer TableNameT, infer NameT, infer TypeT> ? { [table in TableNameT]: { [name in NameT]: d.IColumn<TableNameT, NameT, TypeT>; }; } : RightT extends d.IExpr<infer UsedColumnsT, any> ? UsedColumnsT : never), boolean>;
export declare const xor: <LeftT extends boolean | d.IExpr<any, boolean> | d.IColumn<any, any, boolean> | d.ISelectBuilder<{
    hasSelect: true;
    hasUnion: any;
    columnReferences: any;
    joins: any;
    selectReferences: any;
    selectTuple: any[] & {
        "0": any;
    } & {
        length: 1;
    } & {
        "0": d.IColumn<any, any, boolean> | d.IColumnExpr<any, "__expr", any, boolean>;
    };
    aggregateCallback: any;
}>, RightT extends boolean | d.IExpr<any, boolean> | d.IColumn<any, any, boolean> | d.ISelectBuilder<{
    hasSelect: true;
    hasUnion: any;
    columnReferences: any;
    joins: any;
    selectReferences: any;
    selectTuple: any[] & {
        "0": any;
    } & {
        length: 1;
    } & {
        "0": d.IColumn<any, any, boolean> | d.IColumnExpr<any, "__expr", any, boolean>;
    };
    aggregateCallback: any;
}>>(left: LeftT, right: RightT) => Expr<(LeftT extends d.ISelectBuilder<any> ? {} : LeftT extends d.AllowedExprConstants ? {} : LeftT extends d.IColumn<infer TableNameT, infer NameT, infer TypeT> ? { [table in TableNameT]: { [name in NameT]: d.IColumn<TableNameT, NameT, TypeT>; }; } : LeftT extends d.IExpr<infer UsedColumnsT, any> ? UsedColumnsT : never) & (RightT extends d.ISelectBuilder<any> ? {} : RightT extends d.AllowedExprConstants ? {} : RightT extends d.IColumn<infer TableNameT, infer NameT, infer TypeT> ? { [table in TableNameT]: { [name in NameT]: d.IColumn<TableNameT, NameT, TypeT>; }; } : RightT extends d.IExpr<infer UsedColumnsT, any> ? UsedColumnsT : never), boolean>;
export declare function not<RawT extends d.RawExpr<boolean>>(raw: RawT): Expr<d.ExprUsedColumns<RawT>, boolean>;
