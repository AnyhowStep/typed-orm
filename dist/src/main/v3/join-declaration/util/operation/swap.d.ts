import { IJoinDeclaration, JoinDeclaration } from "../../join-declaration";
export declare type Swap<JoinDeclT extends IJoinDeclaration> = (JoinDeclaration<{
    readonly fromTable: JoinDeclT["toTable"];
    readonly toTable: JoinDeclT["fromTable"];
    readonly nullable: JoinDeclT["nullable"];
}>);
export declare function swap<JoinDeclT extends IJoinDeclaration>(joinDecl: JoinDeclT): Swap<JoinDeclT>;
