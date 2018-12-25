import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";

const table = o.table(
    "table",
    {
        x : sd.naturalNumber(),
    }
);
const joined1 = o.table(
    "joined1",
    {
        x : sd.naturalNumber(),
    }
);

const joined2 = o.table(
    "joined2",
    {
        x : sd.naturalNumber(),
    }
);

const joined3 = o.table(
    "joined3",
    {
        x : sd.naturalNumber(),
    }
);

const joined4 = o.table(
    "joined4",
    {
        x : sd.naturalNumber(),
    }
);

const joined5 = o.table(
    "joined5",
    {
        x : sd.naturalNumber(),
    }
);

const joined6 = o.table(
    "joined6",
    {
        x : sd.naturalNumber(),
    }
);

const joined7 = o.table(
    "joined7",
    {
        x : sd.naturalNumber(),
    }
);

const joined8 = o.table(
    "joined8",
    {
        x : sd.naturalNumber(),
    }
);

const joined9 = o.table(
    "joined9",
    {
        x : sd.naturalNumber(),
    }
);

const joined10 = o.table(
    "joined10",
    {
        x : sd.naturalNumber(),
    }
);

const joined11 = o.table(
    "joined11",
    {
        x : sd.naturalNumber(),
    }
);

const joined12 = o.table(
    "joined12",
    {
        x : sd.naturalNumber(),
    }
);

const joined13 = o.table(
    "joined13",
    {
        x : sd.naturalNumber(),
    }
);

const joined14 = o.table(
    "joined14",
    {
        x : sd.naturalNumber(),
    }
);

const joined15 = o.table(
    "joined15",
    {
        x : sd.naturalNumber(),
    }
);

const joined16 = o.table(
    "joined16",
    {
        x : sd.naturalNumber(),
    }
);

const joined17 = o.table(
    "joined17",
    {
        x : sd.naturalNumber(),
    }
);

const joined18 = o.table(
    "joined18",
    {
        x : sd.naturalNumber(),
    }
);

const joined19 = o.table(
    "joined19",
    {
        x : sd.naturalNumber(),
    }
);

const joined20 = o.table(
    "joined20",
    {
        x : sd.naturalNumber(),
    }
);

const joined21 = o.table(
    "joined21",
    {
        x : sd.naturalNumber(),
    }
);

const joined22 = o.table(
    "joined22",
    {
        x : sd.naturalNumber(),
    }
);

export const query = o.from(table)
    .innerJoinUsing(
        joined1,
        c => [c.x]
    )
    .innerJoinUsing(
        joined2,
        c => [c.joined1.x]
    )
    .innerJoinUsing(
        joined3,
        c => [c.joined2.x]
    )
    .innerJoinUsing(
        joined4,
        c => [c.joined3.x]
    )
    .innerJoinUsing(
        joined5,
        c => [c.joined4.x]
    )
    .innerJoinUsing(
        joined6,
        c => [c.joined5.x]
    )
    .innerJoinUsing(
        joined7,
        c => [c.joined6.x]
    )
    .innerJoinUsing(
        joined8,
        c => [c.joined7.x]
    )
    .innerJoinUsing(
        joined9,
        c => [c.joined8.x]
    )
    .innerJoinUsing(
        joined10,
        c => [c.joined9.x]
    )
    .innerJoinUsing(
        joined11,
        c => [c.joined10.x]
    )
    .innerJoinUsing(
        joined12,
        c => [c.joined11.x]
    )
    .innerJoinUsing(
        joined13,
        c => [c.joined12.x]
    )
    .innerJoinUsing(
        joined14,
        c => [c.joined13.x]
    )
    .innerJoinUsing(
        joined15,
        c => [c.joined14.x]
    )
    .innerJoinUsing(
        joined16,
        c => [c.joined15.x]
    )
    .innerJoinUsing(
        joined17,
        c => [c.joined16.x]
    )
    .innerJoinUsing(
        joined18,
        c => [c.joined17.x]
    )
    .innerJoinUsing(
        joined19,
        c => [c.joined18.x]
    )
    .innerJoinUsing(
        joined20,
        c => [c.joined19.x]
    )
    .innerJoinUsing(
        joined21,
        c => [c.joined20.x]
    );
export declare const tableAliasUnion : o.JoinArrayUtil.ToTableAliasUnion<typeof query._joins>;
export const query2 = query
    .innerJoinUsing(
        joined22,
        () => [joined21.columns.x]
    );