import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";
export declare const coalesced: o.Expr<{
    usedColumns: (o.Column<{
        tableAlias: "parent";
        name: "a";
        assertDelegate: sd.AssertDelegate<number>;
    }> | o.Column<{
        tableAlias: "parent";
        name: "b";
        assertDelegate: sd.AssertDelegate<string>;
    }> | o.Column<{
        tableAlias: "parent";
        name: "c";
        assertDelegate: sd.AssertDelegate<boolean>;
    }>)[];
    assertDelegate: sd.AssertDelegate<number>;
}>;
