import * as sd from "schema-decorator";
import {Column, AnyColumn} from "./column";

export namespace ColumnUtil {
    export type ToNullable<ColumnT extends AnyColumn> = (
        Column<
            ColumnT["tableAlias"],
            ColumnT["name"],
            null|ReturnType<ColumnT["assertDelegate"]>
        >
    );
    export function toNullable<ColumnT extends AnyColumn> (column : ColumnT) : (
        ToNullable<ColumnT>
    ) {
        return new Column(
            column.tableAlias,
            column.name,
            sd.or(
                sd.nil(),
                column.assertDelegate
            )
        );
    }

    export type WithTableAlias<
        ColumnT extends AnyColumn,
        NewTableAliasT extends string
    > = (
        Column<
            NewTableAliasT,
            ColumnT["name"],
            ReturnType<ColumnT["assertDelegate"]>
        >
    );
    export function withTableAlias <
        ColumnT extends AnyColumn,
        NewTableAliasT extends string
    > (column : ColumnT, newTableAlias : NewTableAliasT) : (
        WithTableAlias<ColumnT, NewTableAliasT>
    ) {
        return new Column(
            newTableAlias,
            column.name,
            column.assertDelegate
        );
    }
}
