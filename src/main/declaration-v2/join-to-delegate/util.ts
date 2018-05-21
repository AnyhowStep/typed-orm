import {AnyAliasedTable, AliasedTableUtil} from "../aliased-table";
import {Tuple} from "../tuple";
import {JoinToDelegate, JoinTo} from "./join-to-delegate";
import {AnyColumn, ColumnTupleUtil} from "../column";
import {ColumnCollectionUtil} from "../column-collection";

export namespace JoinToDelegateUtil {
    export function execute<
        ToTableT extends AnyAliasedTable,
        FromT extends Tuple<AnyColumn>
    > (
        toTable : ToTableT,
        from : FromT,
        toDelegate : JoinToDelegate<ToTableT, FromT>
    ) : JoinTo<ToTableT, FromT> {
        const to = toDelegate(toTable.columns);
        if (to.length != from.length) {
            throw new Error(`Expected JOIN to columns of length ${from.length}; received ${to.length}`);
        }
        AliasedTableUtil.assertHasColumns(toTable, to);
        return to;
    };

    export type CreateUsingUnsafe<
        ToTableT extends AnyAliasedTable,
        FromT extends Tuple<AnyColumn>
    > = (
        ColumnTupleUtil.WithTableAlias<FromT, ToTableT["alias"]>
    );
    function createUsingUnsafe<
        ToTableT extends AnyAliasedTable,
        FromT extends Tuple<AnyColumn>
    > (toTable : ToTableT, from : FromT) : (
        CreateUsingUnsafe<ToTableT, FromT>
    ) {
        const to = ColumnTupleUtil.withTableAlias(from, toTable.alias);
        AliasedTableUtil.assertHasColumns(toTable, to);
        return to;
    }
    export type CreateUsing<
        ToTableT extends AnyAliasedTable,
        FromT extends Tuple<AnyColumn>
    > = (
        ColumnCollectionUtil.HasColumns<
            ToTableT["columns"],
            ColumnTupleUtil.WithTableAlias<FromT, ToTableT["alias"]>
        > extends true ?
            ColumnTupleUtil.WithTableAlias<FromT, ToTableT["alias"]> :
            never
    );
    export function createUsing<
        ToTableT extends AnyAliasedTable,
        FromT extends Tuple<AnyColumn>
    > (toTable : ToTableT, from : FromT) : (
        CreateUsing<ToTableT, FromT>
    ) {
        return createUsingUnsafe(toTable, from) as any;
    }
}
