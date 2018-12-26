import {IJoinDeclaration, JoinDeclaration} from "../../join-declaration";

export type Swap<JoinDeclT extends IJoinDeclaration> = (
    JoinDeclaration<{
        readonly fromTable : JoinDeclT["toTable"],
        readonly toTable : JoinDeclT["fromTable"],
        readonly nullable : JoinDeclT["nullable"],
    }>
);
export function swap<JoinDeclT extends IJoinDeclaration> (
    joinDecl : JoinDeclT
) : Swap<JoinDeclT> {
    return new JoinDeclaration(
        {
            fromTable : joinDecl.toTable,
            toTable : joinDecl.fromTable,
            nullable : joinDecl.nullable,
        },
        joinDecl.joinType,
        joinDecl.to,
        joinDecl.from
    );
}