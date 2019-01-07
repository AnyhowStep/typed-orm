import * as sd from "schema-decorator";
import { IColumn, Column } from "../../column";
export declare type ToNullable<ColumnT extends IColumn> = (ColumnT extends IColumn ? Column<{
    readonly tableAlias: ColumnT["tableAlias"];
    readonly name: ColumnT["name"];
    readonly assertDelegate: sd.AssertDelegate<null | ReturnType<ColumnT["assertDelegate"]>>;
}> : never);
export declare function toNullable<ColumnT extends IColumn>({ tableAlias, name, assertDelegate, __isInSelectClause, }: ColumnT): (ToNullable<ColumnT>);
//# sourceMappingURL=to-nullable.d.ts.map