import { IAliasedTable } from "../../../../aliased-table";
import { ITable } from "../../../../table";
import { LeftJoin } from "../join";
import { QueryUtil } from "../../../../query";
export declare function leftJoinPk<FromTableT extends IAliasedTable, ToTableT extends ITable & {
    primaryKey: string[];
}>(fromTable: FromTableT, toTable: QueryUtil.AssertValidJoinPk<FromTableT, ToTableT>): LeftJoin<FromTableT, ToTableT>;
