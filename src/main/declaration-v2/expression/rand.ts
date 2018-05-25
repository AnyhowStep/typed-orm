import {Expr} from "../expr";
import * as sd from "schema-decorator";

export const RAND = new Expr(
    {},
    sd.number(),
    "RAND()"
);
