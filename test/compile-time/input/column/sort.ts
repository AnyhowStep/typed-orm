import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";

const c = o.column(
    "tableAlias",
    "columnName",
    sd.naturalNumber(),
);
export const sortAsc = c.sort(o.ASC);
export const sortDesc = c.sort(o.DESC);