import * as o from "../../../../../dist/src/main";

export const query = o.select(() => [
    o.eq(
        o.selectExpr(() => o.eq<number, number>(32, 45)),
        true
    ).as("value")
]);