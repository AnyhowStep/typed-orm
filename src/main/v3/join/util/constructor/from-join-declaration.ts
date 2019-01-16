import {IJoinDeclaration} from "../../../join-declaration";
import {Join} from "../../join";

export type FromJoinDeclaration<
    JoinDeclT extends IJoinDeclaration
> = (
    JoinDeclT extends IJoinDeclaration ?
    Join<{
        aliasedTable : JoinDeclT["toTable"],
        columns : JoinDeclT["toTable"]["columns"],
        nullable : JoinDeclT["nullable"],
    }> :
    never
);