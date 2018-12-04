import { IJoin, Join } from "./join";
export declare namespace JoinArrayUtil {
    type ToTableAliasUnion<JoinsT extends IJoin[]> = (JoinsT[number]["aliasedTable"]["alias"]);
    type FindWithTableAlias<JoinsT extends IJoin[], TableAliasT extends string> = (Extract<JoinsT[number], IJoin & {
        aliasedTable: {
            alias: TableAliasT;
        };
    }>);
    function isJoinArray(raw: any): raw is IJoin[];
    type ToNullable<JoinsT extends IJoin[]> = (Join.ToNullable<JoinsT[number]>[]);
    function toNullable<JoinsT extends IJoin[]>(joins: JoinsT): ToNullable<JoinsT>;
}
//# sourceMappingURL=join-array.d.ts.map