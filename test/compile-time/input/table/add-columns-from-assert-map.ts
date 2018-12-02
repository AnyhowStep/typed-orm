import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";

export const table = o.table(
    "table",
    {
        x : sd.naturalNumber(),
        y : sd.string(),
        z : sd.boolean(),
    }
).addColumns({
    a : sd.naturalNumber(),
    b : sd.string(),
    c : sd.nullable(sd.boolean())
});

export const emptyTable = o.table(
    "table",
    {}
).addColumns({
    a : sd.naturalNumber(),
    b : sd.string(),
    c : sd.nullable(sd.boolean())
});

export const narrow = table.addColumns({
    c : sd.boolean()
});