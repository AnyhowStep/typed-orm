import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";

export const table = o.table(
    "table",
    {
        x : sd.naturalNumber(),
        y : sd.string(),
        z : sd.boolean(),
    }
).setGenerated(c => [c.x, c.z, c.x, c.z]);