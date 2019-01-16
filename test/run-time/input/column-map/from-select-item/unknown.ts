import * as tape from "tape";
import * as o from "../../../../../dist/src/main";

tape(__filename, (t) => {
    t.throws(() => {
        o.ColumnMapUtil.fromSelectItem(
            123 as any
        );
    });
    t.throws(() => {
        const x = o.ColumnMapUtil.fromSelectItem(
            [] as any
        );
        console.log(x);
    });
    t.throws(() => {
        o.ColumnMapUtil.fromSelectItem(
            (()=>2) as any
        );
    });
    t.end();
});
