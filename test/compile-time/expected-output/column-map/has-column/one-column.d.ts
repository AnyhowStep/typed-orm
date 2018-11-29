import * as sd from "schema-decorator";
import * as o from "../../../../../src/main";
export declare const columnMap: {
    readonly x: o.Column<{
        tableAlias: "someTable";
        name: "x";
        assertDelegate: sd.AssertDelegate<number> & {
            __accepts: number;
            __canAccept: number;
        };
    }>;
};
declare type HasColumn<DataT extends o.ColumnData> = o.ColumnMapUtil.HasColumn<typeof columnMap, o.IColumn<DataT>>;
export declare const hasColumn: [HasColumn<{
    tableAlias: "someTable";
    name: "x";
    assertDelegate: sd.AssertDelegate<number>;
}>, HasColumn<{
    tableAlias: "someTable";
    name: "x";
    assertDelegate: sd.AssertDelegate<Date>;
}>, HasColumn<{
    tableAlias: "someTable";
    name: "x";
    assertDelegate: sd.AssertDelegate<string>;
}>, HasColumn<{
    tableAlias: "someTable";
    name: "x";
    assertDelegate: sd.AssertDelegate<any>;
}>, HasColumn<{
    tableAlias: "someTable";
    name: "x";
    assertDelegate: sd.AssertDelegate<unknown>;
}>];
export declare const hasColumnCheck: [true, false, false, boolean, false];
export declare const hasColumnCheckReverse: typeof hasColumn;
export declare const hasColumn2: [HasColumn<{
    tableAlias: "someTable";
    name: "doesNotExist";
    assertDelegate: sd.AssertDelegate<number>;
}>, HasColumn<{
    tableAlias: "someTable";
    name: "doesNotExist";
    assertDelegate: sd.AssertDelegate<Date>;
}>, HasColumn<{
    tableAlias: "someTable";
    name: "doesNotExist";
    assertDelegate: sd.AssertDelegate<string>;
}>, HasColumn<{
    tableAlias: "someTable";
    name: "doesNotExist";
    assertDelegate: sd.AssertDelegate<any>;
}>, HasColumn<{
    tableAlias: "someTable";
    name: "doesNotExist";
    assertDelegate: sd.AssertDelegate<unknown>;
}>];
export declare const hasColumnCheck2: [false, false, false, false, false];
export declare const hasColumnCheckReverse2: typeof hasColumn2;
export declare const hasColumn3: [HasColumn<{
    tableAlias: "someTable";
    name: string;
    assertDelegate: sd.AssertDelegate<number>;
}>, HasColumn<{
    tableAlias: "someTable";
    name: string;
    assertDelegate: sd.AssertDelegate<Date>;
}>, HasColumn<{
    tableAlias: "someTable";
    name: string;
    assertDelegate: sd.AssertDelegate<string>;
}>, HasColumn<{
    tableAlias: "someTable";
    name: string;
    assertDelegate: sd.AssertDelegate<any>;
}>, HasColumn<{
    tableAlias: "someTable";
    name: string;
    assertDelegate: sd.AssertDelegate<unknown>;
}>];
export declare const hasColumnCheck3: [boolean, false, false, boolean, false];
export declare const hasColumnCheckReverse3: typeof hasColumn3;
export declare const hasColumn4: [HasColumn<{
    tableAlias: "doesNotExist";
    name: "x";
    assertDelegate: sd.AssertDelegate<number>;
}>, HasColumn<{
    tableAlias: "doesNotExist";
    name: "x";
    assertDelegate: sd.AssertDelegate<Date>;
}>, HasColumn<{
    tableAlias: "doesNotExist";
    name: "x";
    assertDelegate: sd.AssertDelegate<string>;
}>, HasColumn<{
    tableAlias: "doesNotExist";
    name: "x";
    assertDelegate: sd.AssertDelegate<any>;
}>, HasColumn<{
    tableAlias: "doesNotExist";
    name: "x";
    assertDelegate: sd.AssertDelegate<unknown>;
}>];
export declare const hasColumnCheck4: [false, false, false, false, false];
export declare const hasColumnCheckReverse4: typeof hasColumn4;
export declare const hasColumn5: [HasColumn<{
    tableAlias: "doesNotExist";
    name: "doesNotExist";
    assertDelegate: sd.AssertDelegate<number>;
}>, HasColumn<{
    tableAlias: "doesNotExist";
    name: "doesNotExist";
    assertDelegate: sd.AssertDelegate<Date>;
}>, HasColumn<{
    tableAlias: "doesNotExist";
    name: "doesNotExist";
    assertDelegate: sd.AssertDelegate<string>;
}>, HasColumn<{
    tableAlias: "doesNotExist";
    name: "doesNotExist";
    assertDelegate: sd.AssertDelegate<any>;
}>, HasColumn<{
    tableAlias: "doesNotExist";
    name: "doesNotExist";
    assertDelegate: sd.AssertDelegate<unknown>;
}>];
export declare const hasColumnCheck5: [false, false, false, false, false];
export declare const hasColumnCheckReverse5: typeof hasColumn5;
export declare const hasColumn6: [HasColumn<{
    tableAlias: "doesNotExist";
    name: string;
    assertDelegate: sd.AssertDelegate<number>;
}>, HasColumn<{
    tableAlias: "doesNotExist";
    name: string;
    assertDelegate: sd.AssertDelegate<Date>;
}>, HasColumn<{
    tableAlias: "doesNotExist";
    name: string;
    assertDelegate: sd.AssertDelegate<string>;
}>, HasColumn<{
    tableAlias: "doesNotExist";
    name: string;
    assertDelegate: sd.AssertDelegate<any>;
}>, HasColumn<{
    tableAlias: "doesNotExist";
    name: string;
    assertDelegate: sd.AssertDelegate<unknown>;
}>];
export declare const hasColumnCheck6: [false, false, false, false, false];
export declare const hasColumnCheckReverse6: typeof hasColumn6;
export declare const hasColumn7: [HasColumn<{
    tableAlias: string;
    name: "x";
    assertDelegate: sd.AssertDelegate<number>;
}>, HasColumn<{
    tableAlias: string;
    name: "x";
    assertDelegate: sd.AssertDelegate<Date>;
}>, HasColumn<{
    tableAlias: string;
    name: "x";
    assertDelegate: sd.AssertDelegate<string>;
}>, HasColumn<{
    tableAlias: string;
    name: "x";
    assertDelegate: sd.AssertDelegate<any>;
}>, HasColumn<{
    tableAlias: string;
    name: "x";
    assertDelegate: sd.AssertDelegate<unknown>;
}>];
export declare const hasColumnCheck7: [boolean, false, false, boolean, false];
export declare const hasColumnCheckReverse7: typeof hasColumn7;
export declare const hasColumn8: [HasColumn<{
    tableAlias: string;
    name: "doesNotExist";
    assertDelegate: sd.AssertDelegate<number>;
}>, HasColumn<{
    tableAlias: string;
    name: "doesNotExist";
    assertDelegate: sd.AssertDelegate<Date>;
}>, HasColumn<{
    tableAlias: string;
    name: "doesNotExist";
    assertDelegate: sd.AssertDelegate<string>;
}>, HasColumn<{
    tableAlias: string;
    name: "doesNotExist";
    assertDelegate: sd.AssertDelegate<any>;
}>, HasColumn<{
    tableAlias: string;
    name: "doesNotExist";
    assertDelegate: sd.AssertDelegate<unknown>;
}>];
export declare const hasColumnCheck8: [false, false, false, false, false];
export declare const hasColumnCheckReverse8: typeof hasColumn8;
export declare const hasColumn9: [HasColumn<{
    tableAlias: string;
    name: string;
    assertDelegate: sd.AssertDelegate<number>;
}>, HasColumn<{
    tableAlias: string;
    name: string;
    assertDelegate: sd.AssertDelegate<Date>;
}>, HasColumn<{
    tableAlias: string;
    name: string;
    assertDelegate: sd.AssertDelegate<string>;
}>, HasColumn<{
    tableAlias: string;
    name: string;
    assertDelegate: sd.AssertDelegate<any>;
}>, HasColumn<{
    tableAlias: string;
    name: string;
    assertDelegate: sd.AssertDelegate<unknown>;
}>];
export declare const hasColumnCheck9: [boolean, false, false, boolean, false];
export declare const hasColumnCheckReverse9: typeof hasColumn9;
export {};
