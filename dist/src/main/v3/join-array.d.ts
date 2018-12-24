import { IJoin, Join } from "./join";
import { IColumn } from "./column";
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
    type ReplaceColumn<JoinsT extends IJoin[], ColumnT extends IColumn> = (Join.ReplaceColumn<JoinsT[number], ColumnT>[]);
    function replaceColumn<JoinsT extends IJoin[], ColumnT extends IColumn>(joins: JoinsT, column: ColumnT): ReplaceColumn<JoinsT, ColumnT>;
}
//# sourceMappingURL=join-array.d.ts.map