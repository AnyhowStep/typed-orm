import { IAliasedTable } from "../../../aliased-table";
export declare type AssertValidJoinTargetImpl<FromTableT extends IAliasedTable, ToTableT extends IAliasedTable> = ((Extract<FromTableT["alias"], ToTableT["alias"]> extends never ? unknown : ["Cannot join two tables with the same name", Extract<FromTableT["alias"], ToTableT["alias"]>]));
export declare type AssertValidJoinTarget<FromTableT extends IAliasedTable, ToTableT extends IAliasedTable> = (ToTableT & AssertValidJoinTargetImpl<FromTableT, ToTableT>);
export declare function assertValidJoinTarget<FromTableT extends IAliasedTable, ToTableT extends IAliasedTable>(fromTable: FromTableT, toTable: ToTableT): (AssertValidJoinTarget<FromTableT, ToTableT>);
//# sourceMappingURL=assert-valid-join-target.d.ts.map