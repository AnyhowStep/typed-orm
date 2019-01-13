import { IAliasedTable } from "../../../../aliased-table";
import { ITable } from "../../../../table";
import { JoinFromDelegate, JoinToDelegate } from "../join";
import { AssertValidJoinTarget } from "../../predicate";
import { KeyUtil } from "../../../../key";
import { JoinType } from "../../../../join";
import { JoinDeclaration } from "../../../join-declaration";
export declare type AssertValidJoinCkDelegate_Hack<FromTableT extends IAliasedTable, ToTableT extends ITable, FromDelegateT extends JoinFromDelegate<FromTableT>, ToDelegateT extends JoinToDelegate<FromTableT, ToTableT, FromDelegateT>, ResultT> = (KeyUtil.Array.HasKey<ToTableT["candidateKeys"], ReturnType<ToDelegateT>[number]["name"][]> extends true ? ResultT : [ReturnType<ToDelegateT>[number]["name"][], "is not a candidate key of", ToTableT["alias"]] | void);
export declare function joinCk<FromTableT extends IAliasedTable, ToTableT extends ITable, FromDelegateT extends JoinFromDelegate<FromTableT>, ToDelegateT extends JoinToDelegate<FromTableT, ToTableT, FromDelegateT>, NullableT extends boolean>(fromTable: FromTableT, toTable: AssertValidJoinTarget<FromTableT, ToTableT>, fromDelegate: FromDelegateT, toDelegate: ToDelegateT, nullable: NullableT, joinType: JoinType.INNER | JoinType.LEFT): (AssertValidJoinCkDelegate_Hack<FromTableT, ToTableT, FromDelegateT, ToDelegateT, JoinDeclaration<{
    readonly fromTable: FromTableT;
    readonly toTable: ToTableT;
    readonly nullable: NullableT;
}>>);
//# sourceMappingURL=join-ck.d.ts.map