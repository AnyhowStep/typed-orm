import * as sd from "type-mapping";
import * as o from "../../../../dist/src/main";

export const table = o.table(
    "table",
    {
        x : sd.unsignedInteger(),
        y : sd.string(),
        z : sd.boolean(),
    }
).addColumns([
    sd.withName(sd.unsignedInteger(), "a"),
    sd.withName(sd.string(), "b"),
    sd.withName(sd.string(), "b"),
    sd.withName(sd.string(), "b"),
    sd.withName(sd.orNull(sd.boolean()), "c"),
    sd.withName(sd.orNull(sd.boolean()), "c"),
    sd.withName(sd.orNull(sd.boolean()), "c"),
]);

export const emptyTable = o.table(
    "table",
    {}
).addColumns([
    sd.withName(sd.unsignedInteger(), "a"),
    sd.withName(sd.string(), "b"),
    sd.withName(sd.orNull(sd.boolean()), "c"),
    sd.withName(sd.orNull(sd.boolean()), "c"),
    sd.withName(sd.string(), "b"),
]);

export const narrow = table.addColumns([
    sd.withName(sd.boolean(), "c"),
    sd.withName(sd.boolean(), "c"),
    sd.withName(sd.boolean(), "c"),
]);

export const lastDuplicateOverwritesTable = o.table(
    "table",
    {
        x : sd.unsignedInteger(),
        y : sd.string(),
        z : sd.boolean(),
    }
).addColumns([
    sd.withName(sd.unsignedInteger(), "a"),
    sd.withName(sd.string(), "b"),
    sd.withName(sd.string(), "b"),
    sd.withName(sd.string(), "b"),
    sd.withName(sd.orNull(sd.boolean()), "c"),
    sd.withName(sd.orNull(sd.boolean()), "c"),
    sd.withName(sd.orNull(sd.boolean()), "c"),
    sd.withName(sd.boolean(), "c"),
    sd.withName(sd.boolean(), "c"),
    sd.withName(sd.boolean(), "c"),
    sd.withName(sd.orNull(sd.boolean()), "c"),
]);