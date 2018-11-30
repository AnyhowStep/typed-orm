import { IAliasedTable } from "./aliased-table";
import { ColumnMap, ColumnMapUtil } from "./column-map";
import { IColumn } from "./column";
export declare enum JoinType {
    FROM = "FROM",
    INNER = "INNER",
    LEFT = "LEFT",
    RIGHT = "RIGHT",
    CROSS = "CROSS"
}
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
    type ToUnion<JoinT extends IJoin> = (ColumnMapUtil.ToUnion<ColumnMapUtil.FromJoin<JoinT>>);
}
//# sourceMappingURL=join.d.ts.map