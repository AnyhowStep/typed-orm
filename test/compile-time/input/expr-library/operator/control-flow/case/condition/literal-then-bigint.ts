import * as o from "../../../../../../../../dist/src/main";

export const c = o.case()
    .when(true, 0n)
    .when(true, 4n as bigint)
    .else(8n);