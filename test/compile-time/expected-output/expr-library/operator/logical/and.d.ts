import * as sd from "schema-decorator";
import * as o from "../../../../../../dist/src/main";
export declare const and1: o.Expr<{
    usedColumns: (o.Column<{
        tableAlias: "table";
        name: "x";
        assertDelegate: sd.AssertDelegate<boolean>;
    }> | o.Column<{
        tableAlias: "table";
        name: "y";
        assertDelegate: sd.AssertDelegate<boolean>;
    }>)[];
    assertDelegate: sd.AssertDelegate<boolean>;
}>;
export declare const and2: o.Expr<{
    usedColumns: (o.Column<{
        tableAlias: "table";
        name: "x";
        assertDelegate: sd.AssertDelegate<boolean>;
    }> | o.Column<{
        tableAlias: "table";
        name: "y";
        assertDelegate: sd.AssertDelegate<boolean>;
    }> | o.Column<{
        tableAlias: "table";
        name: "z";
        assertDelegate: sd.AssertDelegate<boolean>;
    }>)[];
    assertDelegate: sd.AssertDelegate<boolean>;
}>;
export declare const and3: o.Expr<{
    usedColumns: (o.Column<{
        tableAlias: "table";
        name: "a";
        assertDelegate: sd.AssertDelegate<boolean>;
    }> | o.Column<{
        tableAlias: "table";
        name: "x";
        assertDelegate: sd.AssertDelegate<boolean>;
    }> | o.Column<{
        tableAlias: "table";
        name: "y";
        assertDelegate: sd.AssertDelegate<boolean>;
    }>)[];
    assertDelegate: sd.AssertDelegate<boolean>;
}>;
export declare const and4: o.Expr<{
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
        assertDelegate: sd.AssertDelegate<boolean>;
    }> | o.Column<{
        tableAlias: "table";
        name: "y";
        assertDelegate: sd.AssertDelegate<boolean>;
    }>)[];
    assertDelegate: sd.AssertDelegate<boolean>;
}>;
export declare const and5: o.Expr<{
    usedColumns: (o.Column<{
        tableAlias: "table";
        name: "x";
        assertDelegate: sd.AssertDelegate<boolean>;
    }> | o.Column<{
        tableAlias: "table";
        name: "y";
        assertDelegate: sd.AssertDelegate<boolean>;
    }> | o.Column<{
        tableAlias: "table";
        name: "z";
        assertDelegate: sd.AssertDelegate<boolean>;
    }>)[];
    assertDelegate: sd.AssertDelegate<boolean>;
}>;
export declare const and6: o.Expr<{
    usedColumns: o.Column<{
        tableAlias: "table";
        name: "x";
        assertDelegate: sd.AssertDelegate<boolean>;
    }>[];
    assertDelegate: sd.AssertDelegate<boolean>;
}>;
export declare const and7: o.Expr<{
    usedColumns: never[];
    assertDelegate: sd.AssertDelegate<boolean>;
}>;
