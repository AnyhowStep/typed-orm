import {IJoin} from "../../../join";
import * as operation from "../../operation";

export type ToNullable<JoinsT extends IJoin[]> = (
    operation.ToNullable<JoinsT[number]>[]
);
export function toNullable<JoinsT extends IJoin[]> (
    joins : JoinsT
) : ToNullable<JoinsT> {
    return joins.map((join : JoinsT[number]) : operation.ToNullable<JoinsT[number]> => {
        return operation.toNullable(join);
    });
}