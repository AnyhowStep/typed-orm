import { IAliasedTable } from "../../../../aliased-table";
import { ITable } from "../../../../table";
import { LeftJoin } from "../join";
import { QueryUtil } from "../../../../query";
export declare function leftJoinFromPk<FromTableT extends ITable & {
    primaryKey: string[];
}, ToTableT extends IAliasedTable>(fromTable: QueryUtil.AssertValidJoinPk<ToTableT, FromTableT>, toTable: ToTableT): LeftJoin<FromTableT, ToTableT>;
//# sourceMappingURL=left.d.ts.map