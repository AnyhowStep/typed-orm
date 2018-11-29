import * as sd from "schema-decorator";
import * as o from "../../../../src/main";

export const t = o.table(
    "name",
    {
        x : sd.naturalNumber(),
        y : sd.naturalNumber(),
    }
);
export const t2 = o.table(
    232,
    {
        x : sd.naturalNumber(),
        y : sd.naturalNumber(),
    }
);
export const t3 = o.table(
    "232",
    {
        x : sd.naturalNumber(),
        y : sd.naturalNumber(),
    }
).setAutoIncrement(c => c.x)
.overwriteMutable(c => [c.x]);