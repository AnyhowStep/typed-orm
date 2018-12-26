import { IAliasedTable } from "../../../aliased-table";
import { ITable } from "../../../table";
import { LeftJoin } from "./left-join";
import { AssertValidJoinUsingPkTarget } from "./join-using-pk";
export declare function leftJoinUsingFromPk<FromTableT extends ITable & {
    primaryKey: string[];
}, ToTableT extends IAliasedTable>(fromTable: AssertValidJoinUsingPkTarget<ToTableT, FromTableT>, toTable: ToTableT): LeftJoin<FromTableT, ToTableT>;
//# sourceMappingURL=left-join-using-from-pk.d.ts.map