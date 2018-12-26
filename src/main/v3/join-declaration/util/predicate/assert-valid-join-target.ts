import {IAliasedTable} from "../../../aliased-table";

export type AssertValidJoinTargetImpl<
    FromTableT extends IAliasedTable,
    ToTableT extends IAliasedTable
> = (
    (
        Extract<FromTableT["alias"], ToTableT["alias"]> extends never ?
        unknown :
        [
            "Cannot join two tables with the same name",
            Extract<FromTableT["alias"], ToTableT["alias"]>
        ]
    )
);
export type AssertValidJoinTarget<
    FromTableT extends IAliasedTable,
    ToTableT extends IAliasedTable
> = (
    ToTableT &
    AssertValidJoinTargetImpl<FromTableT, ToTableT>
);
export function assertValidJoinTarget<
    FromTableT extends IAliasedTable,
    ToTableT extends IAliasedTable
> (
    fromTable : FromTableT,
    toTable : ToTableT
) : (
    AssertValidJoinTarget<FromTableT, ToTableT>
) {
    if (fromTable.alias == toTable.alias) {
        throw new Error(`Cannot join two tables with the same name`);
    }
    return toTable as AssertValidJoinTarget<FromTableT, ToTableT>;
}