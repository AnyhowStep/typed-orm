import * as sd from "schema-decorator";
import {IJoinDeclaration} from "../../join-declaration";
import {Expr} from "../../../expr";
import {ColumnRefUtil} from "../../../column-ref";
import {ColumnUtil} from "../../../column";
import {nullSafeEq, and} from "../../../expr-library";

export type Eq<JoinDeclT extends IJoinDeclaration> = (
    Expr<{
        usedRef : ColumnRefUtil.FromColumnArray<
            (
                ColumnUtil.FromColumnMap<
                    JoinDeclT["fromTable"]["columns"] |
                    JoinDeclT["toTable"]["columns"]
                >
            )[]
        >,
        assertDelegate : sd.AssertDelegate<boolean>,
    }>
);
export function eq<JoinDeclT extends IJoinDeclaration> (
    joinDecl : JoinDeclT
) : Eq<JoinDeclT> {
    const arr = joinDecl.from.map((f, index) => nullSafeEq(
        f,
        joinDecl.to[index]
    ));
    return and(...(arr as any)) as any;
}