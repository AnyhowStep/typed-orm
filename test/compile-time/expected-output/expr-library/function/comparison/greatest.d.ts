import * as sd from "schema-decorator";
import * as o from "../../../../../../dist/src/main";
export declare const expr1: o.Expr<{
    usedColumns: (o.Column<{
        tableAlias: "table";
        name: "x";
        assertDelegate: sd.AssertDelegate<number>;
    }> | o.Column<{
        tableAlias: "table";
        name: "y";
        assertDelegate: sd.AssertDelegate<number>;
    }> | o.Column<{
        tableAlias: "table";
        name: "z";
        assertDelegate: sd.AssertDelegate<number>;
    }>)[];
    assertDelegate: sd.AssertDelegate<number>;
}>;
export declare const expr2: o.Expr<{
    usedColumns: (o.Column<{
        tableAlias: "table";
        name: "x";
        assertDelegate: sd.AssertDelegate<number>;
    }> | o.Column<{
        tableAlias: "table";
        name: "y";
        assertDelegate: sd.AssertDelegate<number>;
    }> | o.Column<{
        tableAlias: "table";
        name: "z";
        assertDelegate: sd.AssertDelegate<number>;
    }>)[];
    assertDelegate: sd.AssertDelegate<number>;
}>;
export declare const expr3: o.Expr<{
    usedColumns: never[];
    assertDelegate: sd.AssertDelegate<number>;
}>;
export declare const expr4: any;
export declare const expr5: o.Expr<{
    usedColumns: (o.Column<{
        tableAlias: "table";
        name: "x";
        assertDelegate: sd.AssertDelegate<number>;
    }> | o.Column<{
        tableAlias: "table";
        name: "y";
        assertDelegate: sd.AssertDelegate<number>;
    }>)[];
    assertDelegate: sd.AssertDelegate<number>;
}>;
export declare const expr6: any;
