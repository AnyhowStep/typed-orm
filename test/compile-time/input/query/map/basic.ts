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

export const query = o.from(table)
    .select(c => [c.x, c.y]);

export const query1 = query
    .map((row) => {
        return {
            hello : "world" as "world",
            ...row,
        }
    });
export const query2 = query
    .map((row) => {
        return Promise.resolve({
            hello : "world" as "world",
            ...row,
        })
    });
export const result1 = query1._mapDelegate(null as any, null as any);
export const result2 = query2._mapDelegate(null as any, null as any);