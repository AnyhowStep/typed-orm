import { IAliasedTable } from "../../../../aliased-table";
import { ITable } from "../../../../table";
import { JoinType } from "../../../../join";
import { JoinDeclaration } from "../../../join-declaration";
import { QueryUtil } from "../../../../query";
export declare function joinPk<FromTableT extends IAliasedTable, ToTableT extends ITable & {
    primaryKey: string[];
}, NullableT extends boolean>(fromTable: FromTableT, toTable: QueryUtil.AssertValidJoinPk<FromTableT, ToTableT>, nullable: NullableT, joinType: JoinType.INNER | JoinType.LEFT): (JoinDeclaration<{
    readonly fromTable: FromTableT;
    readonly toTable: ToTableT;
    readonly nullable: NullableT;
}>);
//# sourceMappingURL=join-pk.d.ts.map