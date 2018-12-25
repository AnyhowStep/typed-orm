import { IAliasedTable } from "../../../aliased-table";
import { ITable } from "../../../table";
import { InnerJoin } from "./inner-join";
import { AssertValidJoinUsingPkTarget } from "./join-using-pk";
export declare function innerJoinUsingPk<FromTableT extends IAliasedTable, ToTableT extends ITable & {
    primaryKey: string[];
}>(fromTable: FromTableT, toTable: AssertValidJoinUsingPkTarget<FromTableT, ToTableT>): InnerJoin<FromTableT, ToTableT>;
//# sourceMappingURL=inner-join-using-pk.d.ts.map