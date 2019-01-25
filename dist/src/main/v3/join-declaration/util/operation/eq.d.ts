import * as sd from "schema-decorator";
import { IJoinDeclaration } from "../../join-declaration";
import { Expr } from "../../../expr";
import { ColumnRefUtil } from "../../../column-ref";
import { ColumnUtil } from "../../../column";
export declare type Eq<JoinDeclT extends IJoinDeclaration> = (Expr<{
    usedRef: ColumnRefUtil.FromColumnArray<(ColumnUtil.FromColumnMap<JoinDeclT["fromTable"]["columns"] | JoinDeclT["toTable"]["columns"]>)[]>;
    assertDelegate: sd.AssertDelegate<boolean>;
}>);
export declare function eq<JoinDeclT extends IJoinDeclaration>(joinDecl: JoinDeclT): Eq<JoinDeclT>;
