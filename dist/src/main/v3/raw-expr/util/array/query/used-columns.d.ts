import { RawExpr } from "../../../raw-expr";
import * as query from "../../query";
export declare type UsedColumns<ArrT extends RawExpr<any>[]> = ((query.UsedColumns<ArrT[number]>[number])[]);
export declare function usedColumns<ArrT extends RawExpr<any>[]>(arr: ArrT): UsedColumns<ArrT>;
