import {IJoin} from "../../../join";

export type NonNullableTableAliases<JoinsT extends IJoin[]> = (
    Extract<
        JoinsT[number],
        { nullable : false }
    >["aliasedTable"]["alias"]
);