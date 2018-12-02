import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";

export const table = o.table(
    "table",
    {
        x : sd.naturalNumber(),
        y : sd.string(),
        z : sd.boolean(),
    }
).addColumns([
    sd.field("a", sd.naturalNumber()),
    sd.field("b", sd.string()),
    sd.field("b", sd.string()),
    sd.field("b", sd.string()),
    sd.field("c", sd.nullable(sd.boolean())),
    sd.field("c", sd.nullable(sd.boolean())),
    sd.field("c", sd.nullable(sd.boolean())),
]);

export const emptyTable = o.table(
    "table",
    {}
).addColumns([
    sd.field("a", sd.naturalNumber()),
    sd.field("b", sd.string()),
    sd.field("c", sd.nullable(sd.boolean())),
    sd.field("c", sd.nullable(sd.boolean())),
    sd.field("b", sd.string()),
]);

export const narrow = table.addColumns([
    sd.field("c", sd.boolean()),
    sd.field("c", sd.boolean()),
    sd.field("c", sd.boolean()),
]);

export const lastDuplicateOverwritesTable = o.table(
    "table",
    {
        x : sd.naturalNumber(),
        y : sd.string(),
        z : sd.boolean(),
    }
).addColumns([
    sd.field("a", sd.naturalNumber()),
    sd.field("b", sd.string()),
    sd.field("b", sd.string()),
    sd.field("b", sd.string()),
    sd.field("c", sd.nullable(sd.boolean())),
    sd.field("c", sd.nullable(sd.boolean())),
    sd.field("c", sd.nullable(sd.boolean())),
    sd.field("c", sd.boolean()),
    sd.field("c", sd.boolean()),
    sd.field("c", sd.boolean()),
    sd.field("c", sd.nullable(sd.boolean())),
]);