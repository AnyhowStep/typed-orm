import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";

export const table = o.table(
    "table",
    {
        x : sd.naturalNumber(),
        y : sd.string(),
        z : sd.boolean(),
    }
);
declare function toInterface<T extends o.IAliasedTable> (
    t : T
) : o.AliasedTableUtil.ToInterface<T>;

export const a = toInterface(table);