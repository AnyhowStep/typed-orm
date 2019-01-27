import { IColumn } from "../../column";
import { ColumnIdentifierUtil } from "../../../column-identifier";
export declare type AssertValidUsed<UsedT extends IColumn, AllowedT extends IColumn> = (UsedT extends ColumnIdentifierUtil.FromColumn<AllowedT> ? (Extract<AllowedT, ColumnIdentifierUtil.FromColumn<UsedT>> extends UsedT ? never : [ColumnIdentifierUtil.FromColumn<UsedT>, "must handle", ReturnType<Extract<AllowedT, ColumnIdentifierUtil.FromColumn<UsedT>>["assertDelegate"]>]) : [ColumnIdentifierUtil.FromColumn<UsedT>, "not allowed"]);
