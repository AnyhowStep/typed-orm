import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";
export declare const table: o.Table<{
    readonly usedRef: {};
    readonly alias: "table";
    readonly columns: {
        readonly x: o.Column<{
            tableAlias: "table";
            name: "x";
            assertDelegate: sd.AssertDelegate<number> & {
                __accepts: number;
                __canAccept: number;
            };
        }>;
        readonly y: o.Column<{
            tableAlias: "table";
            name: "y";
            assertDelegate: sd.AssertDelegate<string> & {
                __accepts: string;
                __canAccept: string;
            };
        }>;
        readonly z: o.Column<{
            tableAlias: "table";
            name: "z";
            assertDelegate: sd.AssertDelegate<boolean> & {
                __accepts: boolean;
                __canAccept: boolean;
            };
        }>;
        readonly w: o.Column<{
            tableAlias: "table";
            name: "w";
            assertDelegate: sd.AssertDelegate<Date> & {
                __accepts: Date;
                __canAccept: string | number | Date;
            };
        }>;
    };
    readonly autoIncrement: undefined;
    readonly id: undefined;
    readonly primaryKey: ("y" | "z")[];
    readonly candidateKeys: (("x" | "y")[] | ("y" | "z")[])[];
    readonly generated: [];
    readonly isNullable: never[];
    readonly hasExplicitDefaultValue: [];
    readonly mutable: ("x" | "y" | "z" | "w")[];
    readonly parents: [];
    readonly insertAllowed: true;
    readonly deleteAllowed: true;
}>;
export declare const ck: o.CandidateKey<typeof table>;
export declare const ckad: sd.AssertDelegate<{
    readonly x: number;
    readonly y: string;
} | {
    readonly y: string;
    readonly z: boolean;
}>;
export declare const sk: o.TableUtil.SuperKey<typeof table>;
export declare const skad: sd.AssertDelegate<({
    readonly x: number;
    readonly y: string;
} & {
    z?: boolean | undefined;
    w?: Date | undefined;
}) | ({
    readonly y: string;
    readonly z: boolean;
} & {
    x?: number | undefined;
    w?: Date | undefined;
})>;
export declare const table2: o.Table<{
    readonly usedRef: {};
    readonly alias: "table";
    readonly columns: {
        readonly x: o.Column<{
            tableAlias: "table";
            name: "x";
            assertDelegate: sd.AssertDelegate<number> & {
                __accepts: number;
                __canAccept: number;
            };
        }>;
        readonly y: o.Column<{
            tableAlias: "table";
            name: "y";
            assertDelegate: sd.AssertDelegate<string> & {
                __accepts: string;
                __canAccept: string;
            };
        }>;
        readonly z: o.Column<{
            tableAlias: "table";
            name: "z";
            assertDelegate: sd.AssertDelegate<boolean> & {
                __accepts: boolean;
                __canAccept: boolean;
            };
        }>;
        readonly w: o.Column<{
            tableAlias: "table";
            name: "w";
            assertDelegate: sd.AssertDelegate<Date> & {
                __accepts: Date;
                __canAccept: string | number | Date;
            };
        }>;
    };
    readonly autoIncrement: undefined;
    readonly id: undefined;
    readonly primaryKey: ("x" | "z")[];
    readonly candidateKeys: (("x" | "y")[] | ("y" | "z")[] | ("x" | "z")[])[];
    readonly generated: [];
    readonly isNullable: never[];
    readonly hasExplicitDefaultValue: [];
    readonly mutable: ("x" | "y" | "z" | "w")[];
    readonly parents: [];
    readonly insertAllowed: true;
    readonly deleteAllowed: true;
}>;
