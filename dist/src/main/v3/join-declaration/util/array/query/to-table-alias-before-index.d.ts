import { IJoinDeclaration } from "../../../join-declaration";
import { NonEmptyTuple, TupleUtil } from "../../../../tuple";
export declare type ToTableAliasBeforeIndex<ArrT extends NonEmptyTuple<IJoinDeclaration>, IndexT extends string> = (Extract<ArrT[Extract<keyof ArrT, TupleUtil.IndicesBefore<IndexT>>], IJoinDeclaration>["toTable"]["alias"]);
