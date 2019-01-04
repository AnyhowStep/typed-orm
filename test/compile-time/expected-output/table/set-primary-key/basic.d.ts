import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";
export declare const table: o.Table<{
    readonly usedRef: {};
    readonly alias: "table";
    readonly columns: {
        readonly y: o.Column<{
            tableAlias: "table";
            name: "y";
            assertDelegate: sd.AssertDelegate<string> & {
                __accepts: string;
                __canAccept: string;
            };
        }>;
        readonly x: o.Column<{
            tableAlias: "table";
            name: "x";
            assertDelegate: sd.AssertDelegate<number> & {
                __accepts: number;
                __canAccept: number;
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
    readonly candidateKeys: (("y" | "x")[] | ("y" | "z")[])[];
    readonly generated: [];
    readonly isNullable: never[];
    readonly hasExplicitDefaultValue: [];
    readonly mutable: ("y" | "x" | "z" | "w")[];
    readonly parents: [];
    readonly insertAllowed: true;
    readonly deleteAllowed: true;
}>;
export declare const ck: o.TableUtil.CandidateKey<typeof table>;
export declare const ckad: sd.AssertDelegate<{
    readonly y: string;
    readonly x: number;
} | {
    readonly y: string;
    readonly z: boolean;
}>;
export declare const sk: o.TableUtil.SuperKey<typeof table>;
export declare const skad: sd.AssertDelegate<({
    readonly y: string;
    readonly x: number;
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
        readonly y: o.Column<{
            tableAlias: "table";
            name: "y";
            assertDelegate: sd.AssertDelegate<string> & {
                __accepts: string;
                __canAccept: string;
            };
        }>;
        readonly x: o.Column<{
            tableAlias: "table";
            name: "x";
            assertDelegate: sd.AssertDelegate<number> & {
                __accepts: number;
                __canAccept: number;
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
    readonly candidateKeys: (("y" | "x")[] | ("y" | "z")[] | ("x" | "z")[])[];
    readonly generated: [];
    readonly isNullable: never[];
    readonly hasExplicitDefaultValue: [];
    readonly mutable: ("y" | "x" | "z" | "w")[];
    readonly parents: [];
    readonly insertAllowed: true;
    readonly deleteAllowed: true;
}>;
