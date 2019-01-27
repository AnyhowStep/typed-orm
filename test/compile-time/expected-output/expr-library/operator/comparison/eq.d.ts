import * as sd from "schema-decorator";
import * as o from "../../../../../../dist/src/main";
export declare const eq1: o.Expr<{
    usedColumns: (o.Column<{
        tableAlias: "table";
        name: "x";
        assertDelegate: sd.AssertDelegate<number>;
    }> | o.Column<{
        tableAlias: "table";
        name: "y";
        assertDelegate: sd.AssertDelegate<number>;
    }>)[];
    assertDelegate: sd.AssertDelegate<boolean>;
}>;
export declare const eq2: o.Expr<{
    usedColumns: o.Column<{
        tableAlias: "table";
        name: "x";
        assertDelegate: sd.AssertDelegate<number>;
    }>[];
    assertDelegate: sd.AssertDelegate<boolean>;
}>;
export declare const eq3: o.Expr<{
    usedColumns: (o.Column<{
        tableAlias: "table";
        name: "a";
        assertDelegate: sd.AssertDelegate<boolean>;
    }> | o.Column<{
        tableAlias: "table";
        name: "x";
        assertDelegate: sd.AssertDelegate<number>;
    }> | o.Column<{
        tableAlias: "table";
        name: "y";
        assertDelegate: sd.AssertDelegate<number>;
    }>)[];
    assertDelegate: sd.AssertDelegate<boolean>;
}>;
export declare const eq4: o.Expr<{
    usedColumns: (o.Column<{
        tableAlias: "table";
        name: "a";
        assertDelegate: sd.AssertDelegate<boolean>;
    }> | o.Column<{
        tableAlias: "table";
        name: "b";
        assertDelegate: sd.AssertDelegate<boolean>;
    }> | o.Column<{
        tableAlias: "table";
        name: "x";
        assertDelegate: sd.AssertDelegate<number>;
    }> | o.Column<{
        tableAlias: "table";
        name: "y";
        assertDelegate: sd.AssertDelegate<number>;
    }>)[];
    assertDelegate: sd.AssertDelegate<boolean>;
}>;
export declare const eq5: o.Expr<{
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
        name: "c";
        assertDelegate: sd.AssertDelegate<boolean>;
    }>)[];
    assertDelegate: sd.AssertDelegate<boolean>;
}>;
export declare const eq6: any;
export declare const eq7: any;
export declare const eq8: any;
export declare const eq9: any;
export declare const eq10: any;
