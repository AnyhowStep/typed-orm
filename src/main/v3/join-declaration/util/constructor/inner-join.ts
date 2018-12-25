import {IAliasedTable} from "../../../aliased-table";
import {JoinType} from "../../../join";
import {JoinDeclaration} from "../../join-declaration";
import {ColumnMapUtil} from "../../../column-map";
import {JoinFromDelegate, JoinToDelegate} from "./join-delegate";
import {ColumnUtil} from "../../../column";

export type InnerJoin<
    FromTableT extends IAliasedTable,
    ToTableT extends IAliasedTable
> = (
    JoinDeclaration<{
        readonly fromTable : FromTableT;
        readonly toTable : ToTableT,
        readonly nullable : false,
    }>
);
export function innerJoin<
    FromTableT extends IAliasedTable,
    ToTableT extends IAliasedTable,
    FromDelegateT extends JoinFromDelegate<FromTableT>
> (
    fromTable : FromTableT,
    toTable : ToTableT & (
        Extract<FromTableT["alias"], ToTableT["alias"]> extends never ?
        unknown :
        [
            "Cannot join two tables with the same name",
            Extract<FromTableT["alias"], ToTableT["alias"]>
        ]
    ),
    fromDelegate : FromDelegateT,
    toDelegate : JoinToDelegate<FromTableT, ToTableT, FromDelegateT>
) : InnerJoin<FromTableT, ToTableT> {
    const fromColumns = fromDelegate(fromTable.columns);

    ColumnUtil.Array.assertIsColumnArray(fromColumns);
    if (fromColumns.length == 0) {
        throw new Error(`Expected JOIN to have at least one column for ON clause`);
    }
    ColumnMapUtil.assertHasColumnIdentifiers(
        fromTable.columns,
        fromColumns
    );

    const toColumns = toDelegate(toTable.columns);

    ColumnUtil.Array.assertIsColumnArray(toColumns);
    if (fromColumns.length != toColumns.length) {
        throw new Error(`Expected JOIN to have ${fromColumns.length} target columns`);
    }
    ColumnMapUtil.assertHasColumnIdentifiers(
        toTable.columns,
        toColumns
    );

    return new JoinDeclaration(
        {
            fromTable,
            toTable,
            nullable : false,
        },
        JoinType.INNER,
        fromColumns,
        toColumns
    );
}