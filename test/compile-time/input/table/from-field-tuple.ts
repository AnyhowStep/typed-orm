import * as sd from "type-mapping";
import * as o from "../../../../dist/src/main";

export const table = o.table(
    "table",
    [
        sd.withName(sd.unsignedInteger(), "x"),
        sd.withName(sd.string(), "y"),
        sd.withName(sd.boolean(), "z"),
    ]
);

export const emptyTable = o.table(
    "table",
    []
);

export const nullable = o.table(
    "table",
    [
        sd.withName(sd.orNull(sd.unsignedInteger()), "a"),
    ]
);