import { IJoin } from "../../../join";
import * as operation from "../../operation";
export declare type ToNullable<JoinsT extends IJoin[]> = (operation.ToNullable<JoinsT[number]>[]);
export declare function toNullable<JoinsT extends IJoin[]>(joins: JoinsT): ToNullable<JoinsT>;
