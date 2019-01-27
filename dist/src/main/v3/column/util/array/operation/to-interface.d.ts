import { IColumn } from "../../../column";
import * as operation from "../../operation";
export declare type ToInterface<ArrT extends IColumn[]> = (ArrT extends IColumn[] ? operation.ToInterface<ArrT[number]>[] : never);
