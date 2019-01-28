import { IAliasedTable } from "../aliased-table";
import { JoinType } from "../join";
import { IColumn } from "../column";
import * as JoinDeclarationUtil from "./util";
export interface JoinDeclarationData {
    readonly fromTable: IAliasedTable;
    readonly toTable: IAliasedTable;
    readonly nullable: boolean;
}
export interface IJoinDeclaration<DataT extends JoinDeclarationData = JoinDeclarationData> {
    readonly fromTable: DataT["fromTable"];
    readonly toTable: DataT["toTable"];
    readonly nullable: DataT["nullable"];
    readonly joinType: JoinType.INNER | JoinType.LEFT;
    readonly from: IColumn[];
    readonly to: IColumn[];
}
export declare class JoinDeclaration<DataT extends JoinDeclarationData> implements IJoinDeclaration<DataT> {
    readonly fromTable: DataT["fromTable"];
    readonly toTable: DataT["toTable"];
    readonly nullable: DataT["nullable"];
    readonly joinType: JoinType.INNER | JoinType.LEFT;
    readonly from: IColumn[];
    readonly to: IColumn[];
    constructor(data: DataT, joinType: JoinType.INNER | JoinType.LEFT, from: IColumn[], to: IColumn[]);
    swap(): JoinDeclarationUtil.Swap<this>;
    readonly eq: () => import("..").Expr<{
        usedRef: { readonly [tableAlias in ((DataT["fromTable"]["columns"] extends import("..").ColumnMap ? DataT["fromTable"]["columns"][Extract<keyof DataT["fromTable"]["columns"], string>] : never) | (DataT["toTable"]["columns"] extends import("..").ColumnMap ? DataT["toTable"]["columns"][Extract<keyof DataT["toTable"]["columns"], string>] : never))["tableAlias"]]: { readonly [columnName in (Extract<DataT["fromTable"]["columns"] extends import("..").ColumnMap ? DataT["fromTable"]["columns"][Extract<keyof DataT["fromTable"]["columns"], string>] : never, {
            tableAlias: tableAlias;
        }> | Extract<DataT["toTable"]["columns"] extends import("..").ColumnMap ? DataT["toTable"]["columns"][Extract<keyof DataT["toTable"]["columns"], string>] : never, {
            tableAlias: tableAlias;
        }>)["name"]]: Extract<Extract<DataT["fromTable"]["columns"] extends import("..").ColumnMap ? DataT["fromTable"]["columns"][Extract<keyof DataT["fromTable"]["columns"], string>] : never, {
            tableAlias: tableAlias;
        }>, {
            name: columnName;
        }> | Extract<Extract<DataT["toTable"]["columns"] extends import("..").ColumnMap ? DataT["toTable"]["columns"][Extract<keyof DataT["toTable"]["columns"], string>] : never, {
            tableAlias: tableAlias;
        }>, {
            name: columnName;
        }>; }; };
        assertDelegate: import("schema-decorator").AssertDelegate<boolean>;
    }>;
}
