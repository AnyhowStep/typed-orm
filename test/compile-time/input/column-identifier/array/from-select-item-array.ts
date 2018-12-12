import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";

export const arr = o.ColumnIdentifierUtil.Array.fromSelectItemArray([
    o.column("tableAlias", "name", sd.naturalNumber()),
    o.eq(
        o.column("a", "a", sd.string()),
        o.column("b", "b", sd.string())
    ).as("eq"),
    o.ColumnMapUtil.fromAssertMap("otherTable", {
        x : sd.date(),
        y : sd.boolean(),
        z : sd.nullable(sd.buffer())
    })
]);

export const emptyArr = o.ColumnIdentifierUtil.Array.fromSelectItemArray([]);

export const untypedArr = o.ColumnIdentifierUtil.Array.fromSelectItemArray<
    o.SelectItem[]
>([]);