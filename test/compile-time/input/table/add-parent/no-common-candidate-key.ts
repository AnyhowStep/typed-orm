import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";

export const parent = o.table(
    "parent",
    {
        x : sd.naturalNumber(),
        y : sd.string(),
        z : sd.boolean(),
    }
).addCandidateKey(c => [c.x]);

export const table = o.table(
    "table",
    {
        x : sd.naturalNumber(),
        y : sd.string(),
        z : sd.boolean(),
    }
).addCandidateKey(c => [c.z])
.addParent(parent);