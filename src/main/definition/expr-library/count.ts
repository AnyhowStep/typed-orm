import {Expr} from "../expr";
import * as sd from "schema-decorator";

export const COUNT_ALL = new Expr(
    {},
    sd.naturalNumber(),
    "COUNT(*)"
);
