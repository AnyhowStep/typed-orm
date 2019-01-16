import { IJoin } from "../../../join";
export declare type NonNullableTableAliases<JoinsT extends IJoin[]> = (Extract<JoinsT[number], {
    nullable: true;
}>["aliasedTable"]["alias"]);
//# sourceMappingURL=non-nullable-table-aliases.d.ts.map