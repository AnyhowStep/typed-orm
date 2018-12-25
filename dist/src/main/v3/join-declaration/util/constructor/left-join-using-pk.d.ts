import { IAliasedTable } from "../../../aliased-table";
import { ITable } from "../../../table";
import { LeftJoin } from "./left-join";
import { AssertValidJoinUsingPkTarget } from "./join-using-pk";
export declare function leftJoinUsingPk<FromTableT extends IAliasedTable, ToTableT extends ITable & {
    primaryKey: string[];
}>(fromTable: FromTableT, toTable: AssertValidJoinUsingPkTarget<FromTableT, ToTableT>): LeftJoin<FromTableT, ToTableT>;
//# sourceMappingURL=left-join-using-pk.d.ts.map