import { IJoin } from "../../../join";
export declare type FindWithTableAlias<JoinsT extends IJoin[], TableAliasT extends string> = (Extract<JoinsT[number], IJoin & {
    aliasedTable: {
        alias: TableAliasT;
    };
}>);
//# sourceMappingURL=find-with-table-alias.d.ts.map