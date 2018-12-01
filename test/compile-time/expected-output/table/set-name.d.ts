import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";
export declare const renamed: o.Table<{
    readonly alias: "renamed";
    readonly name: "renamed";
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
    readonly candidateKeys: [];
    readonly generated: [];
    readonly hasDefaultValue: never[];
    readonly mutable: ("x" | "y" | "z")[];
    readonly parents: [];
    readonly insertAllowed: true;
    readonly deleteAllowed: true;
}>;
export declare const emptyRenamed: o.Table<{
    readonly alias: "emptyRenamed";
    readonly name: "emptyRenamed";
    readonly columns: {};
    readonly autoIncrement: undefined;
    readonly id: undefined;
    readonly candidateKeys: [];
    readonly generated: [];
    readonly hasDefaultValue: never[];
    readonly mutable: never[];
    readonly parents: [];
    readonly insertAllowed: true;
    readonly deleteAllowed: true;
}>;
