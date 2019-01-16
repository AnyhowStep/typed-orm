import { IJoin } from "../../join";
import { IColumn } from "../../../column";
export declare type ReplaceColumn<JoinT extends IJoin, ColumnT extends IColumn> = (JoinT extends IJoin ? (ColumnT["tableAlias"] extends JoinT["aliasedTable"]["alias"] ? (ColumnT["name"] extends keyof JoinT["columns"] ? (IJoin<{
    readonly aliasedTable: JoinT["aliasedTable"];
    readonly columns: {
        readonly [columnName in keyof JoinT["columns"]]: (columnName extends ColumnT["name"] ? ColumnT : JoinT["columns"][columnName]);
    };
    readonly nullable: JoinT["nullable"];
}>) : JoinT) : JoinT) : never);
export declare function replaceColumn<JoinT extends IJoin, ColumnT extends IColumn>(join: JoinT, column: ColumnT): ReplaceColumn<JoinT, ColumnT>;
//# sourceMappingURL=replace-column.d.ts.map