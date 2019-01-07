import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";

const table = o.table(
    "table",
    {
        x : sd.naturalNumber(),
        y : sd.string(),
        z : sd.boolean(),
    }
);
export const table2 = o.requireParentJoins(table)
    .from(
        o.table(
            "table2",
            {
                a : sd.naturalNumber(),
                b : sd.string(),
                c : sd.boolean(),
            }
        )
    ).select(
        c => [c.table2]
    ).as(
        "aliasedTable"
    );
declare function toInterface<T extends o.IAliasedTable> (
    t : T
) : o.AliasedTableUtil.ToInterface<T>;

export const a = toInterface(table2);