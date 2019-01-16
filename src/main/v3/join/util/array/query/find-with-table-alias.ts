import {IJoin} from "../../../join";

export type FindWithTableAlias<
    JoinsT extends IJoin[],
    TableAliasT extends string
> = (
    Extract<
        JoinsT[number],
        IJoin & { aliasedTable : { alias : TableAliasT } }
    >
);