import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";

const tableSrc = o.table(
    "table",
    {
        x : sd.naturalNumber(),
        y : sd.string(),
        z : sd.boolean(),
    }
);
export const table = o.table(tableSrc);

const emptyTableSrc = o.table(
    "table",
    {}
);
export const emptyTable = o.table(emptyTableSrc);