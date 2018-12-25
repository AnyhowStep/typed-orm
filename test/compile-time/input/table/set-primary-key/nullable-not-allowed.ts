import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";

export const joined2 = o.table(
    "joined2",
    {
        a : sd.date(),
        b : sd.nullable(sd.number()),
        y : sd.string()
    }
).setPrimaryKey(c => [c.a, c.b, c.y]);
