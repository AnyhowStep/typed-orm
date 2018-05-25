import * as sd from "schema-decorator";
import {Join, AnyJoin} from "./join";
import {ColumnCollectionUtil} from "../column-collection";

export namespace JoinUtil {
    export type ToNullable<JoinT extends AnyJoin> = (
        Join<JoinT["table"], JoinT["columns"], true>
    )
    export function toNullable<JoinT extends AnyJoin> (join : JoinT) : (
        ToNullable<JoinT>
    ) {
        return new Join(
            join.joinType,
            join.table,
            join.columns,
            true,
            join.from,
            join.to
        );
    }

    export type ReplaceColumnType<
        JoinT extends AnyJoin,
        TableAliasT extends string,
        ColumnNameT extends string,
        NewTypeT
    > = (
        JoinT["table"]["alias"] extends TableAliasT ?
            (
                Join<
                    JoinT["table"],
                    ColumnCollectionUtil.ReplaceColumnType<
                        JoinT["columns"],
                        TableAliasT,
                        ColumnNameT,
                        NewTypeT
                    >,
                    JoinT["nullable"]
                >
            ) :
            JoinT
    );
    export function replaceColumnType<
        JoinT extends AnyJoin,
        TableAliasT extends string,
        ColumnNameT extends string,
        NewTypeT
    > (
        join : JoinT,
        tableAlias : TableAliasT,
        columnName : ColumnNameT,
        newAssertDelegate : sd.AssertDelegate<NewTypeT>
    ) : (
        ReplaceColumnType<
            JoinT,
            TableAliasT,
            ColumnNameT,
            NewTypeT
        >
    ) {
        if (join.table.alias == tableAlias) {
            return new Join(
                join.joinType,
                join.table,
                ColumnCollectionUtil.replaceColumnType(
                    join.columns,
                    tableAlias,
                    columnName,
                    newAssertDelegate
                ),
                join.nullable,
                join.from,
                join.to
            ) as any;
        } else {
            return join as any;
        }
    }
}
