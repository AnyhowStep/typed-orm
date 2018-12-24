import { IAliasedTable } from "./aliased-table";
import { ColumnMap } from "./column-map";
import { IColumn } from "./column";
import * as e from "enum-util";
export declare enum JoinType {
    FROM = "FROM",
    INNER = "INNER",
    LEFT = "LEFT",
    RIGHT = "RIGHT",
    CROSS = "CROSS"
}
export declare const JoinTypeUtil: e.WrappedEnum<typeof JoinType>;
export interface JoinData {
    readonly aliasedTable: IAliasedTable;
    readonly columns: ColumnMap;
    readonly nullable: boolean;
}
export interface IJoin<DataT extends JoinData = JoinData> {
    readonly aliasedTable: DataT["aliasedTable"];
    readonly columns: DataT["columns"];
    readonly nullable: DataT["nullable"];
    readonly joinType: JoinType;
    readonly from: IColumn[];
    readonly to: IColumn[];
}
export declare class Join<DataT extends JoinData> implements IJoin<DataT> {
    readonly aliasedTable: DataT["aliasedTable"];
    readonly columns: DataT["columns"];
    readonly nullable: DataT["nullable"];
    readonly joinType: JoinType;
    readonly from: IColumn[];
    readonly to: IColumn[];
    constructor(data: DataT, joinType: JoinType, from: IColumn[], to: IColumn[]);
}
export declare namespace Join {
    function isJoin(raw: any): raw is IJoin;
    type ToNullable<JoinT extends IJoin> = (JoinT extends IJoin ? Join<{
        aliasedTable: JoinT["aliasedTable"];
        columns: JoinT["columns"];
        nullable: true;
    }> : never);
    function toNullable<JoinT extends IJoin>(join: JoinT): ToNullable<JoinT>;
    type ReplaceColumn<JoinT extends IJoin, ColumnT extends IColumn> = (JoinT extends IJoin ? (ColumnT["tableAlias"] extends JoinT["aliasedTable"]["alias"] ? (ColumnT["name"] extends keyof JoinT["columns"] ? (IJoin<{
        readonly aliasedTable: JoinT["aliasedTable"];
        readonly columns: {
            readonly [columnName in keyof JoinT["columns"]]: (columnName extends ColumnT["name"] ? ColumnT : JoinT["columns"][columnName]);
        };
        readonly nullable: JoinT["nullable"];
    }>) : JoinT) : JoinT) : never);
    function replaceColumn<JoinT extends IJoin, ColumnT extends IColumn>(join: JoinT, column: ColumnT): ReplaceColumn<JoinT, ColumnT>;
}
//# sourceMappingURL=join.d.ts.map