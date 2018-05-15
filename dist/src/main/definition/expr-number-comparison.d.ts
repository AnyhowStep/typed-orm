import * as d from "../declaration";
import { Expr } from "./expr";
export declare const lt: <LeftT extends number | d.IColumn<any, any, number> | d.IExpr<any, number> | d.ISelectBuilder<{
    allowed: any;
    columnReferences: any;
    joins: any;
    selectReferences: {};
    selectTuple: any[] & {
        "0": any;
    } & {
        length: 1;
    } & {
        "0": d.IColumn<any, any, number> | d.IColumnExpr<any, "__expr", any, number>;
    };
    distinct: any;
    sqlCalcFoundRows: any;
    groupByTuple: any;
    orderByTuple: any;
    limit: any;
    unionOrderByTuple: any;
    unionLimit: any;
}>, RightT extends number | d.IColumn<any, any, number> | d.IExpr<any, number> | d.ISelectBuilder<{
    allowed: any;
    columnReferences: any;
    joins: any;
    selectReferences: {};
    selectTuple: any[] & {
        "0": any;
    } & {
        length: 1;
    } & {
        "0": d.IColumn<any, any, number> | d.IColumnExpr<any, "__expr", any, number>;
    };
    distinct: any;
    sqlCalcFoundRows: any;
    groupByTuple: any;
    orderByTuple: any;
    limit: any;
    unionOrderByTuple: any;
    unionLimit: any;
}>>(left: LeftT, right: RightT) => Expr<(LeftT extends d.ISelectBuilder<any> ? {} : LeftT extends d.AllowedExprConstants ? {} : LeftT extends d.IColumn<infer TableNameT, infer NameT, infer TypeT> ? { [table in TableNameT]: { [name in NameT]: d.IColumn<TableNameT, NameT, TypeT>; }; } : LeftT extends d.IExpr<infer UsedColumnsT, any> ? UsedColumnsT : never) & (RightT extends d.ISelectBuilder<any> ? {} : RightT extends d.AllowedExprConstants ? {} : RightT extends d.IColumn<infer TableNameT, infer NameT, infer TypeT> ? { [table in TableNameT]: { [name in NameT]: d.IColumn<TableNameT, NameT, TypeT>; }; } : RightT extends d.IExpr<infer UsedColumnsT, any> ? UsedColumnsT : never), boolean>;
export declare const gt: <LeftT extends number | d.IColumn<any, any, number> | d.IExpr<any, number> | d.ISelectBuilder<{
    allowed: any;
    columnReferences: any;
    joins: any;
    selectReferences: {};
    selectTuple: any[] & {
        "0": any;
    } & {
        length: 1;
    } & {
        "0": d.IColumn<any, any, number> | d.IColumnExpr<any, "__expr", any, number>;
    };
    distinct: any;
    sqlCalcFoundRows: any;
    groupByTuple: any;
    orderByTuple: any;
    limit: any;
    unionOrderByTuple: any;
    unionLimit: any;
}>, RightT extends number | d.IColumn<any, any, number> | d.IExpr<any, number> | d.ISelectBuilder<{
    allowed: any;
    columnReferences: any;
    joins: any;
    selectReferences: {};
    selectTuple: any[] & {
        "0": any;
    } & {
        length: 1;
    } & {
        "0": d.IColumn<any, any, number> | d.IColumnExpr<any, "__expr", any, number>;
    };
    distinct: any;
    sqlCalcFoundRows: any;
    groupByTuple: any;
    orderByTuple: any;
    limit: any;
    unionOrderByTuple: any;
    unionLimit: any;
}>>(left: LeftT, right: RightT) => Expr<(LeftT extends d.ISelectBuilder<any> ? {} : LeftT extends d.AllowedExprConstants ? {} : LeftT extends d.IColumn<infer TableNameT, infer NameT, infer TypeT> ? { [table in TableNameT]: { [name in NameT]: d.IColumn<TableNameT, NameT, TypeT>; }; } : LeftT extends d.IExpr<infer UsedColumnsT, any> ? UsedColumnsT : never) & (RightT extends d.ISelectBuilder<any> ? {} : RightT extends d.AllowedExprConstants ? {} : RightT extends d.IColumn<infer TableNameT, infer NameT, infer TypeT> ? { [table in TableNameT]: { [name in NameT]: d.IColumn<TableNameT, NameT, TypeT>; }; } : RightT extends d.IExpr<infer UsedColumnsT, any> ? UsedColumnsT : never), boolean>;
export declare const ltEq: <LeftT extends number | d.IColumn<any, any, number> | d.IExpr<any, number> | d.ISelectBuilder<{
    allowed: any;
    columnReferences: any;
    joins: any;
    selectReferences: {};
    selectTuple: any[] & {
        "0": any;
    } & {
        length: 1;
    } & {
        "0": d.IColumn<any, any, number> | d.IColumnExpr<any, "__expr", any, number>;
    };
    distinct: any;
    sqlCalcFoundRows: any;
    groupByTuple: any;
    orderByTuple: any;
    limit: any;
    unionOrderByTuple: any;
    unionLimit: any;
}>, RightT extends number | d.IColumn<any, any, number> | d.IExpr<any, number> | d.ISelectBuilder<{
    allowed: any;
    columnReferences: any;
    joins: any;
    selectReferences: {};
    selectTuple: any[] & {
        "0": any;
    } & {
        length: 1;
    } & {
        "0": d.IColumn<any, any, number> | d.IColumnExpr<any, "__expr", any, number>;
    };
    distinct: any;
    sqlCalcFoundRows: any;
    groupByTuple: any;
    orderByTuple: any;
    limit: any;
    unionOrderByTuple: any;
    unionLimit: any;
}>>(left: LeftT, right: RightT) => Expr<(LeftT extends d.ISelectBuilder<any> ? {} : LeftT extends d.AllowedExprConstants ? {} : LeftT extends d.IColumn<infer TableNameT, infer NameT, infer TypeT> ? { [table in TableNameT]: { [name in NameT]: d.IColumn<TableNameT, NameT, TypeT>; }; } : LeftT extends d.IExpr<infer UsedColumnsT, any> ? UsedColumnsT : never) & (RightT extends d.ISelectBuilder<any> ? {} : RightT extends d.AllowedExprConstants ? {} : RightT extends d.IColumn<infer TableNameT, infer NameT, infer TypeT> ? { [table in TableNameT]: { [name in NameT]: d.IColumn<TableNameT, NameT, TypeT>; }; } : RightT extends d.IExpr<infer UsedColumnsT, any> ? UsedColumnsT : never), boolean>;
export declare const gtEq: <LeftT extends number | d.IColumn<any, any, number> | d.IExpr<any, number> | d.ISelectBuilder<{
    allowed: any;
    columnReferences: any;
    joins: any;
    selectReferences: {};
    selectTuple: any[] & {
        "0": any;
    } & {
        length: 1;
    } & {
        "0": d.IColumn<any, any, number> | d.IColumnExpr<any, "__expr", any, number>;
    };
    distinct: any;
    sqlCalcFoundRows: any;
    groupByTuple: any;
    orderByTuple: any;
    limit: any;
    unionOrderByTuple: any;
    unionLimit: any;
}>, RightT extends number | d.IColumn<any, any, number> | d.IExpr<any, number> | d.ISelectBuilder<{
    allowed: any;
    columnReferences: any;
    joins: any;
    selectReferences: {};
    selectTuple: any[] & {
        "0": any;
    } & {
        length: 1;
    } & {
        "0": d.IColumn<any, any, number> | d.IColumnExpr<any, "__expr", any, number>;
    };
    distinct: any;
    sqlCalcFoundRows: any;
    groupByTuple: any;
    orderByTuple: any;
    limit: any;
    unionOrderByTuple: any;
    unionLimit: any;
}>>(left: LeftT, right: RightT) => Expr<(LeftT extends d.ISelectBuilder<any> ? {} : LeftT extends d.AllowedExprConstants ? {} : LeftT extends d.IColumn<infer TableNameT, infer NameT, infer TypeT> ? { [table in TableNameT]: { [name in NameT]: d.IColumn<TableNameT, NameT, TypeT>; }; } : LeftT extends d.IExpr<infer UsedColumnsT, any> ? UsedColumnsT : never) & (RightT extends d.ISelectBuilder<any> ? {} : RightT extends d.AllowedExprConstants ? {} : RightT extends d.IColumn<infer TableNameT, infer NameT, infer TypeT> ? { [table in TableNameT]: { [name in NameT]: d.IColumn<TableNameT, NameT, TypeT>; }; } : RightT extends d.IExpr<infer UsedColumnsT, any> ? UsedColumnsT : never), boolean>;
