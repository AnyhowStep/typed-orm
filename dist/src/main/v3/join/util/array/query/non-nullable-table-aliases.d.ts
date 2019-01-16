import { IJoin } from "../../../join";
export declare type NonNullableTableAliases<JoinsT extends IJoin[]> = (Extract<JoinsT[number], {
    nullable: false;
}>["aliasedTable"]["alias"]);
//# sourceMappingURL=non-nullable-table-aliases.d.ts.map