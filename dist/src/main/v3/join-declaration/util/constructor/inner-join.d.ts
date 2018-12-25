import { IAliasedTable } from "../../../aliased-table";
import { JoinDeclaration } from "../../join-declaration";
import { JoinFromDelegate, JoinToDelegate } from "./join-delegate";
export declare type InnerJoin<FromTableT extends IAliasedTable, ToTableT extends IAliasedTable> = (JoinDeclaration<{
    readonly fromTable: FromTableT;
    readonly toTable: ToTableT;
    readonly nullable: false;
}>);
export declare function innerJoin<FromTableT extends IAliasedTable, ToTableT extends IAliasedTable, FromDelegateT extends JoinFromDelegate<FromTableT>>(fromTable: FromTableT, toTable: ToTableT & (Extract<FromTableT["alias"], ToTableT["alias"]> extends never ? unknown : ["Cannot join two tables with the same name", Extract<FromTableT["alias"], ToTableT["alias"]>]), fromDelegate: FromDelegateT, toDelegate: JoinToDelegate<FromTableT, ToTableT, FromDelegateT>): InnerJoin<FromTableT, ToTableT>;
//# sourceMappingURL=inner-join.d.ts.map