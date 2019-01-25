import { Key } from "../../../key";
import { ExtractEqual } from "../../../../type";
import { FromKeyArray } from "../../constructor";
export declare type Intersect<ArrayA extends Key[], ArrayB extends Key[]> = (ExtractEqual<FromKeyArray<ArrayA>, FromKeyArray<ArrayB>>);
export declare function intersect<ArrayA extends Key[], ArrayB extends Key[]>(arrayA: ArrayA, arrayB: ArrayB): (Intersect<ArrayA, ArrayB>[]);
