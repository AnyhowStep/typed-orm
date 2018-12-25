import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";

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
.setMutable(c => [c.x]);