import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";

export const table = o.table(
    "table",
    [
        sd.field("x", sd.naturalNumber()),
        sd.field("y", sd.string()),
        sd.field("z", sd.boolean()),
    ]
);

export const emptyTable = o.table(
    "table",
    []
);

export const nullable = o.table(
    "table",
    [
        sd.field("a", sd.nullable(sd.naturalNumber())),
    ]
);