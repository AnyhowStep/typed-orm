import {IJoinDeclaration} from "../../../join-declaration";
import {NonEmptyTuple, TupleUtil} from "../../../../tuple";

export type ToTableAliasBeforeIndex<
    ArrT extends NonEmptyTuple<IJoinDeclaration>,
    IndexT extends string
> = (
    Extract<
        //TODO Investigate
        ArrT[Extract<keyof ArrT, TupleUtil.IndicesBefore<IndexT>>],
        IJoinDeclaration
    >["toTable"]["alias"]
);