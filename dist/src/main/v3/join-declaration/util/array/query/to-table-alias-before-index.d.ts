import { IJoinDeclaration } from "../../../join-declaration";
import { NonEmptyTuple, TupleUtil } from "../../../../tuple";
export declare type ToTableAliasBeforeIndex<ArrT extends NonEmptyTuple<IJoinDeclaration>, IndexT extends string> = (Extract<ArrT[Extract<TupleUtil.IndicesBefore<IndexT>, keyof ArrT>], IJoinDeclaration>["toTable"]["alias"]);
//# sourceMappingURL=to-table-alias-before-index.d.ts.map