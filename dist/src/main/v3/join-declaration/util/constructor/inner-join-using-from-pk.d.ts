import { IAliasedTable } from "../../../aliased-table";
import { ITable } from "../../../table";
import { InnerJoin } from "./inner-join";
import { AssertValidJoinUsingPkTarget } from "./join-using-pk";
export declare function innerJoinUsingFromPk<FromTableT extends ITable & {
    primaryKey: string[];
}, ToTableT extends IAliasedTable>(fromTable: AssertValidJoinUsingPkTarget<ToTableT, FromTableT>, toTable: ToTableT): InnerJoin<FromTableT, ToTableT>;
//# sourceMappingURL=inner-join-using-from-pk.d.ts.map