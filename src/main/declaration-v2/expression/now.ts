import {Expr} from "../expr";
import * as sd from "schema-decorator";

export const NOW = new Expr(
    {},
    sd.date(),
    "NOW()"
);
