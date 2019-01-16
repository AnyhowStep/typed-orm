import {IJoin} from "../../../join";

export type TableAliases<JoinsT extends IJoin[]> = (
    JoinsT[number]["aliasedTable"]["alias"]
);