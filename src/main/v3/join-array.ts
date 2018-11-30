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
    export type ToUnion<JoinsT extends IJoin[]> = (
        Join.ToUnion<JoinsT[number]>
    );
}