import { IJoin } from "../../../join";
export declare type NullableTableAliases<JoinsT extends IJoin[]> = (Extract<JoinsT[number], {
    nullable: true;
}>["aliasedTable"]["alias"]);
