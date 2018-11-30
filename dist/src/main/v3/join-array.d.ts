import { IJoin, Join } from "./join";
export declare namespace JoinArrayUtil {
    type ToTableAliasUnion<JoinsT extends IJoin[]> = (JoinsT[number]["aliasedTable"]["alias"]);
    type FindWithTableAlias<JoinsT extends IJoin[], TableAliasT extends string> = (Extract<JoinsT[number], IJoin & {
        aliasedTable: {
            alias: TableAliasT;
        };
    }>);
    type ToUnion<JoinsT extends IJoin[]> = (Join.ToUnion<JoinsT[number]>);
}
//# sourceMappingURL=join-array.d.ts.map