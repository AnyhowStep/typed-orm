import {IJoin} from "../../../join";

export type NullableTableAliases<JoinsT extends IJoin[]> = (
    Extract<
        JoinsT[number],
        { nullable : true }
    >["aliasedTable"]["alias"]
);