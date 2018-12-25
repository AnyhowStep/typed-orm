import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";

const joined1 = o.table(
    "joined1",
    {
        a : sd.date(),
        b : sd.number(),
        y : sd.string(),
        c : sd.string(),
        d : sd.string(),
    }
).setPrimaryKey(c => [c.y])
.setPrimaryKey(c => [c.c, c.d]);

joined1.setAutoIncrement(c => c.y);
joined1.setAutoIncrement(c => c.c);
joined1.setAutoIncrement(c => c.d);

export const ai = joined1.setAutoIncrement(c => c.b);