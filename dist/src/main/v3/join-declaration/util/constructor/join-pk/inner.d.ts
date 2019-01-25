import { IAliasedTable } from "../../../../aliased-table";
import { ITable } from "../../../../table";
import { InnerJoin } from "../join";
import { QueryUtil } from "../../../../query";
export declare function innerJoinPk<FromTableT extends IAliasedTable, ToTableT extends ITable & {
    primaryKey: string[];
}>(fromTable: FromTableT, toTable: QueryUtil.AssertValidJoinPk<FromTableT, ToTableT>): InnerJoin<FromTableT, ToTableT>;
