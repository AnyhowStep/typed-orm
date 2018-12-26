import { IAliasedTable } from "../../../../aliased-table";
import { ITable } from "../../../../table";
import { InnerJoin } from "../join";
import { QueryUtil } from "../../../../query";
export declare function innerJoinFromPk<FromTableT extends ITable & {
    primaryKey: string[];
}, ToTableT extends IAliasedTable>(fromTable: QueryUtil.AssertValidJoinPk<ToTableT, FromTableT>, toTable: ToTableT): InnerJoin<FromTableT, ToTableT>;
//# sourceMappingURL=inner.d.ts.map