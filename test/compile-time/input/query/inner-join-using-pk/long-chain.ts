import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";

const table = o.table(
    "table",
    {
        x : sd.naturalNumber(),
    }
).setPrimaryKey(c => [c.x]);
const joined1 = o.table(
    "joined1",
    {
        x : sd.naturalNumber(),
    }
).setPrimaryKey(c => [c.x]);

const joined2 = o.table(
    "joined2",
    {
        x : sd.naturalNumber(),
    }
).setPrimaryKey(c => [c.x]);

const joined3 = o.table(
    "joined3",
    {
        x : sd.naturalNumber(),
    }
).setPrimaryKey(c => [c.x]);

const joined4 = o.table(
    "joined4",
    {
        x : sd.naturalNumber(),
    }
).setPrimaryKey(c => [c.x]);

const joined5 = o.table(
    "joined5",
    {
        x : sd.naturalNumber(),
    }
).setPrimaryKey(c => [c.x]);

const joined6 = o.table(
    "joined6",
    {
        x : sd.naturalNumber(),
    }
).setPrimaryKey(c => [c.x]);

const joined7 = o.table(
    "joined7",
    {
        x : sd.naturalNumber(),
    }
).setPrimaryKey(c => [c.x]);

const joined8 = o.table(
    "joined8",
    {
        x : sd.naturalNumber(),
    }
).setPrimaryKey(c => [c.x]);

const joined9 = o.table(
    "joined9",
    {
        x : sd.naturalNumber(),
    }
).setPrimaryKey(c => [c.x]);

const joined10 = o.table(
    "joined10",
    {
        x : sd.naturalNumber(),
    }
).setPrimaryKey(c => [c.x]);

const joined11 = o.table(
    "joined11",
    {
        x : sd.naturalNumber(),
    }
).setPrimaryKey(c => [c.x]);

const joined12 = o.table(
    "joined12",
    {
        x : sd.naturalNumber(),
    }
).setPrimaryKey(c => [c.x]);

const joined13 = o.table(
    "joined13",
    {
        x : sd.naturalNumber(),
    }
).setPrimaryKey(c => [c.x]);

const joined14 = o.table(
    "joined14",
    {
        x : sd.naturalNumber(),
    }
).setPrimaryKey(c => [c.x]);

const joined15 = o.table(
    "joined15",
    {
        x : sd.naturalNumber(),
    }
).setPrimaryKey(c => [c.x]);

const joined16 = o.table(
    "joined16",
    {
        x : sd.naturalNumber(),
    }
).setPrimaryKey(c => [c.x]);

const joined17 = o.table(
    "joined17",
    {
        x : sd.naturalNumber(),
    }
).setPrimaryKey(c => [c.x]);

const joined18 = o.table(
    "joined18",
    {
        x : sd.naturalNumber(),
    }
).setPrimaryKey(c => [c.x]);

const joined19 = o.table(
    "joined19",
    {
        x : sd.naturalNumber(),
    }
).setPrimaryKey(c => [c.x]);

const joined20 = o.table(
    "joined20",
    {
        x : sd.naturalNumber(),
    }
).setPrimaryKey(c => [c.x]);

const joined21 = o.table(
    "joined21",
    {
        x : sd.naturalNumber(),
    }
).setPrimaryKey(c => [c.x]);

export const query = o.from(table)
    .innerJoinPk(
        t => t.table,
        joined1
    )
    .innerJoinPk(
        t => t.joined1,
        joined2
    )
    .innerJoinPk(
        t => t.joined2,
        joined3
    )
    .innerJoinPk(
        t => t.joined3,
        joined4
    )
    .innerJoinPk(
        t => t.joined4,
        joined5
    )
    .innerJoinPk(
        t => t.joined5,
        joined6
    )
    .innerJoinPk(
        t => t.joined6,
        joined7
    )
    .innerJoinPk(
        t => t.joined7,
        joined8
    )
    .innerJoinPk(
        t => t.joined8,
        joined9
    )
    .innerJoinPk(
        t => t.joined9,
        joined10
    )
    .innerJoinPk(
        t => t.joined10,
        joined11
    )
    .innerJoinPk(
        t => t.joined11,
        joined12
    )
    .innerJoinPk(
        t => t.joined12,
        joined13
    )
    .innerJoinPk(
        t => t.joined13,
        joined14
    )
    .innerJoinPk(
        t => t.joined14,
        joined15
    )
    .innerJoinPk(
        t => t.joined15,
        joined16
    )
    .innerJoinPk(
        t => t.joined16,
        joined17
    )
    .innerJoinPk(
        t => t.joined17,
        joined18
    )
    .innerJoinPk(
        t => t.joined18,
        joined19
    )
    .innerJoinPk(
        t => t.joined19,
        joined20
    );
export declare const tableAliasUnion : o.JoinArrayUtil.ToTableAliasUnion<typeof query._joins>;
export const query2 = query
    .innerJoinPk(
        t => t.joined20,
        joined21
    );