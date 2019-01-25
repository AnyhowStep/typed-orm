import { IJoinDeclaration } from "../../../join-declaration";
import { NonEmptyTuple } from "../../../../tuple";
export declare type ToTableAliasIgnoreIndex<ArrT extends NonEmptyTuple<IJoinDeclaration>, IndexT extends string> = ({
    [index in Exclude<Extract<keyof ArrT, string>, IndexT>]: (ArrT[index] extends IJoinDeclaration ? ArrT[index]["toTable"]["alias"] : never);
}[Exclude<Extract<keyof ArrT, string>, IndexT>]);
export declare type DuplicateToTableAlias<ArrT extends NonEmptyTuple<IJoinDeclaration>> = ({
    [index in Extract<keyof ArrT, string>]: (ArrT[index] extends IJoinDeclaration ? Extract<ArrT[index]["toTable"]["alias"], ToTableAliasIgnoreIndex<ArrT, index>> : never);
}[Extract<keyof ArrT, string>]);
