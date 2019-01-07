import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";

const c = o.column(
    "tableAlias",
    "columnName",
    sd.naturalNumber(),
);
const d = o.column(
    "tableAlias",
    "columnName2",
    sd.nullable(sd.naturalNumber()),
);
const column = Math.random() < 0.5 ?
    c : d;
declare function toInterface<T extends o.IColumn> (t : T) : (
    o.ColumnUtil.ToInterface<T>
);
export const result = toInterface(column);