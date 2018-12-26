import { IAliasedTable } from "../../../../aliased-table";
import { ITable } from "../../../../table";
import { LeftJoin, JoinFromDelegate, JoinToDelegate } from "../join";
import { AssertValidJoinCkDelegate_Hack } from "./join-ck";
import { AssertValidJoinTarget } from "../../predicate";
export declare function leftJoinCk<FromTableT extends IAliasedTable, ToTableT extends ITable, FromDelegateT extends JoinFromDelegate<FromTableT>, ToDelegateT extends JoinToDelegate<FromTableT, ToTableT, FromDelegateT>>(fromTable: FromTableT, toTable: AssertValidJoinTarget<FromTableT, ToTableT>, fromDelegate: FromDelegateT, toDelegate: ToDelegateT): (AssertValidJoinCkDelegate_Hack<FromTableT, ToTableT, FromDelegateT, ToDelegateT, LeftJoin<FromTableT, ToTableT>>);
//# sourceMappingURL=left.d.ts.map