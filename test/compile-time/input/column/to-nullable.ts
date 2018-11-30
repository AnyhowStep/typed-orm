import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";

export const c = new o.Column({
    tableAlias : "tableAlias",
    name : "columnName",
    assertDelegate : sd.naturalNumber(),
});
export const c2 = c.toNullable();

export const c3 = o.column("tableAlias", "columnName", sd.varChar(255));
export const c4 = c3.toNullable();