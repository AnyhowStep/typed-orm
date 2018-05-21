import {Join, AnyJoin} from "./join";

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
}
