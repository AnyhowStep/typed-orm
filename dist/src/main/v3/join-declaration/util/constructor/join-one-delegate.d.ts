import { IAliasedTable } from "../../../aliased-table";
import { ITable } from "../../../table";
import { JoinFromDelegate, JoinToDelegate } from "./join-delegate";
import { CandidateKeyArrayUtil } from "../../../candidate-key-array";
export declare type AssertValidJoinToOneDelegate_Hack<FromTableT extends IAliasedTable, ToTableT extends ITable, FromDelegateT extends JoinFromDelegate<FromTableT>, ToDelegateT extends JoinToDelegate<FromTableT, ToTableT, FromDelegateT>, ResultT> = (CandidateKeyArrayUtil.HasKey<ToTableT["candidateKeys"], ReturnType<ToDelegateT>[number]["name"][]> extends true ? ResultT : [ReturnType<ToDelegateT>[number]["name"][], "is not a candidate key of", ToTableT["alias"]] | void);
//# sourceMappingURL=join-one-delegate.d.ts.map