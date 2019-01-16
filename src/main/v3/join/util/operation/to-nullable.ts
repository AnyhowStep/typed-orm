import {IJoin, Join} from "../../join";

export type ToNullable<JoinT extends IJoin> = (
    JoinT extends IJoin ?
    Join<{
        aliasedTable : JoinT["aliasedTable"],
        columns : JoinT["columns"],
        nullable : true,
    }> :
    never
);
export function toNullable<JoinT extends IJoin> (
    join : JoinT
) : ToNullable<JoinT> {
    const {
        aliasedTable,
        columns,
    } = join;
    const result : Join<{
        aliasedTable : JoinT["aliasedTable"],
        columns : JoinT["columns"],
        nullable : true,
    }> = new Join(
        {
            aliasedTable,
            columns,
            nullable : true as true,
        },
        join.joinType,
        join.from,
        join.to
    );
    return result as any;
}