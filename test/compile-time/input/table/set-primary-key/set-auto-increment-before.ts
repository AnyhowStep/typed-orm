import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";

const joined1 = o.table(
    "joined1",
    {
        a : sd.date(),
        b : sd.buffer(),
        y : sd.string(),
        c : sd.string(),
        d : sd.string(),
    }
).setAutoIncrement(c => c.y)

joined1.setPrimaryKey(c => [c.y]);
joined1.setPrimaryKey(c => [c.y, c.d]);