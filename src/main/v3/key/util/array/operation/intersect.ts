import {Key} from "../../../key";
import {ExtractEqual} from "../../../../type";
import {isEqual} from "../../predicate";
import {FromKeyArray} from "../../constructor";

/*
    For table inheritance support.

    When adding a parent table to a table,
    the two tables must have at least
    one unique key in common.
*/
export type Intersect<
    ArrayA extends Key[],
    ArrayB extends Key[]
> = (
    ExtractEqual<
        FromKeyArray<ArrayA>,
        FromKeyArray<ArrayB>
    >
);
export function intersect<
    ArrayA extends Key[],
    ArrayB extends Key[]
> (
    arrayA : ArrayA,
    arrayB : ArrayB
) : (
    Intersect<
        ArrayA,
        ArrayB
    >[]
) {
    const result : Key[] = [];
    for (let a of arrayA) {
        for (let b of arrayB) {
            if (isEqual(a, b)) {
                result.push(a);
                break;
            }
        }
    }
    return result as any;
}