import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";

const c = o.column(
    "tableAlias",
    "columnName",
    sd.naturalNumber(),
);
export const desc = c.desc();