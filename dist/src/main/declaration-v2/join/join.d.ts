import { AnyAliasedTable } from "../aliased-table";
import { AnyColumn } from "../column";
import { ColumnCollection } from "../column-collection";
export declare enum JoinType {
    FROM = "FROM",
    INNER = "INNER",
    LEFT = "LEFT",
    RIGHT = "RIGHT",
    CROSS = "CROSS"
}
export declare class Join<TableT extends AnyAliasedTable, ColumnCollectionT extends ColumnCollection, NullableT extends boolean> {
    readonly joinType: JoinType;
    readonly table: TableT;
    readonly columns: ColumnCollectionT;
    readonly nullable: NullableT;
    readonly from: AnyColumn[];
    readonly to: AnyColumn[];
    constructor(joinType: JoinType, table: TableT, columns: ColumnCollectionT, nullable: NullableT, from: AnyColumn[], to: AnyColumn[]);
}
export declare type AnyJoin = Join<AnyAliasedTable, ColumnCollection, boolean>;
