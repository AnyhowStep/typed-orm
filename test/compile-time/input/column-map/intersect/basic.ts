import * as sd from "schema-decorator";
import * as o from "../../../../../src/main";

export const columnMapA = o.ColumnMapUtil.fromAssertMap(
    "someTableA",
    {
        commonA : sd.naturalNumber(),
        commonB : sd.date(),
        commonC : sd.nullable(sd.boolean()),
        differentA : sd.buffer(),
    }
);

export const columnMapB = o.ColumnMapUtil.fromAssertMap(
    "someTableB",
    {
        commonA : sd.string(),
        commonB : sd.boolean(),
        commonC : sd.boolean(),
        differentB : sd.nil(),
    }
);

export const intersect = o.ColumnMapUtil.intersect(
    columnMapA,
    columnMapB
);