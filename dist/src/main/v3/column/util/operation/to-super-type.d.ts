import * as sd from "schema-decorator";
import { IColumn, Column } from "../../column";
import { PrimitiveExprUtil } from "../../../primitive-expr";
export declare type ToSuperType<ColumnT extends IColumn> = (ColumnT extends IColumn ? Column<{
    readonly tableAlias: ColumnT["tableAlias"];
    readonly name: ColumnT["name"];
    readonly assertDelegate: sd.AssertDelegate<PrimitiveExprUtil.ToSuperType<ReturnType<ColumnT["assertDelegate"]>>>;
}> : never);
//# sourceMappingURL=to-super-type.d.ts.map