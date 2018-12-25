import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";

const table = o.table(
    "table",
    {
        x : sd.naturalNumber(),
        y : sd.string(),
        z : sd.boolean(),
    }
);
export const renamed = table.setAlias("renamed");

const emptyTable = o.table(
    "table",
    {}
);
export const emptyRenamed = emptyTable.setAlias("emptyRenamed");