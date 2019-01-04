import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";
export declare const renamed: o.Table<{
    readonly usedRef: {};
    readonly alias: "renamed";
    readonly columns: {
        readonly x: o.Column<{
            readonly tableAlias: "renamed";
            readonly name: "x";
            readonly assertDelegate: sd.AssertDelegate<number> & {
                __accepts: number;
                __canAccept: number;
            };
        }>;
        readonly y: o.Column<{
            readonly tableAlias: "renamed";
            readonly name: "y";
            readonly assertDelegate: sd.AssertDelegate<string> & {
                __accepts: string;
                __canAccept: string;
            };
        }>;
        readonly z: o.Column<{
            readonly tableAlias: "renamed";
            readonly name: "z";
            readonly assertDelegate: sd.AssertDelegate<boolean> & {
                __accepts: boolean;
                __canAccept: boolean;
            };
        }>;
    };
    readonly autoIncrement: undefined;
    readonly id: undefined;
    readonly primaryKey: undefined;
    readonly candidateKeys: [];
    readonly generated: [];
    readonly isNullable: never[];
    readonly hasExplicitDefaultValue: [];
    readonly mutable: ("x" | "y" | "z")[];
    readonly parents: [];
    readonly insertAllowed: true;
    readonly deleteAllowed: true;
}>;
export declare const emptyRenamed: o.Table<{
    readonly usedRef: {};
    readonly alias: "emptyRenamed";
    readonly columns: {};
    readonly autoIncrement: undefined;
    readonly id: undefined;
    readonly primaryKey: undefined;
    readonly candidateKeys: [];
    readonly generated: [];
    readonly isNullable: never[];
    readonly hasExplicitDefaultValue: [];
    readonly mutable: never[];
    readonly parents: [];
    readonly insertAllowed: true;
    readonly deleteAllowed: true;
}>;
