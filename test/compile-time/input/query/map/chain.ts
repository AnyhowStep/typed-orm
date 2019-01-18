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

const query = o.from(table)
    .select(c => [c.x, c.y]);

const query1 = query
    .map((row) => {
        return {
            hello : "world" as "world",
            ...row,
        }
    });
const query2 = query
    .map((row) => {
        return Promise.resolve({
            hello : "world" as "world",
            ...row,
        })
    });
const query3 = query1
    .map((row) => {
        return {
            chain : "hang low" as "hang low",
            ...row
        }
    });
const query4 = query1
    .map((row) => {
        return Promise.resolve({
            chain : "hang low" as "hang low",
            ...row
        })
    });
const query5 = query2
    .map((row) => {
        return {
            chain : "hang low" as "hang low",
            ...row
        }
    });
const query6 = query2
    .map((row) => {
        return Promise.resolve({
            chain : "hang low" as "hang low",
            ...row
        })
    });
export const result3 = query3._mapDelegate(null as any, null as any, null as any);
export const result4 = query4._mapDelegate(null as any, null as any, null as any);
export const result5 = query5._mapDelegate(null as any, null as any, null as any);
export const result6 = query6._mapDelegate(null as any, null as any, null as any);