import { IJoin } from "../../../join";
export declare type TableAliases<JoinsT extends IJoin[]> = (JoinsT[number]["aliasedTable"]["alias"]);
