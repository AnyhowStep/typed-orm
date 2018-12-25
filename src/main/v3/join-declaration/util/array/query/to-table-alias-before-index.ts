import {IJoinDeclaration} from "../../../join-declaration";
import {NonEmptyTuple, TupleUtil} from "../../../../tuple";

export type ToTableAliasBeforeIndex<
    ArrT extends NonEmptyTuple<IJoinDeclaration>,
    IndexT extends string
> = (
    Extract<
        ArrT[Extract<TupleUtil.IndicesBefore<IndexT>, keyof ArrT>],
        IJoinDeclaration
    >["toTable"]["alias"]
);