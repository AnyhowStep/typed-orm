import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";

/*
    Because of a TS limitation, I have to defer the error
    to the return type.
    https://github.com/Microsoft/TypeScript/issues/29133
*/
export const t = o.table(
    "joined1",
    {
        a : sd.date(),
        b : sd.number(),
        y : sd.string(),
        c : sd.string(),
        d : sd.string(),
    }
).setPrimaryKey(c => [1, c.y, c.b]);