import { IAliasedTable } from "../../../aliased-table";
import { ITable } from "../../../table";
import { JoinFromDelegate, JoinToDelegate } from "./join-delegate";
import { InnerJoin } from "./inner-join";
import { AssertValidJoinToOneDelegate_Hack } from "./join-one-delegate";
import { AssertValidJoinTarget } from "../predicate";
export declare function innerJoinOne<FromTableT extends IAliasedTable, ToTableT extends ITable, FromDelegateT extends JoinFromDelegate<FromTableT>, ToDelegateT extends JoinToDelegate<FromTableT, ToTableT, FromDelegateT>>(fromTable: FromTableT, toTable: AssertValidJoinTarget<FromTableT, ToTableT>, fromDelegate: FromDelegateT, toDelegate: ToDelegateT): (AssertValidJoinToOneDelegate_Hack<FromTableT, ToTableT, FromDelegateT, ToDelegateT, InnerJoin<FromTableT, ToTableT>>);
//# sourceMappingURL=inner-join-one.d.ts.map