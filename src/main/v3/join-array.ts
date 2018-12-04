import {IJoin, Join} from "./join";

export namespace JoinArrayUtil {
    export type ToTableAliasUnion<JoinsT extends IJoin[]> = (
        JoinsT[number]["aliasedTable"]["alias"]
    );
    export type FindWithTableAlias<
        JoinsT extends IJoin[],
        TableAliasT extends string
    > = (
        Extract<
            JoinsT[number],
            IJoin & { aliasedTable : { alias : TableAliasT } }
        >
    );
    export function isJoinArray (raw : any) : raw is IJoin[] {
        if (!(raw instanceof Array)) {
            return false;
        }
        for (let item of raw) {
            if (!Join.isJoin(item)) {
                return false;
            }
        }
        return true;
    }

    export type ToNullable<JoinsT extends IJoin[]> = (
        Join.ToNullable<JoinsT[number]>[]
    );
    export function toNullable<JoinsT extends IJoin[]> (
        joins : JoinsT
    ) : ToNullable<JoinsT> {
        return joins.map((join : JoinsT[number]) : Join.ToNullable<JoinsT[number]> => {
            return Join.toNullable(join);
        });
    }
}