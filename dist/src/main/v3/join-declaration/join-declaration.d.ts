import { IAliasedTable } from "../aliased-table";
import { JoinType } from "../join";
import { IColumn } from "../column";
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
}
//# sourceMappingURL=join-declaration.d.ts.map