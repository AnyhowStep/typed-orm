export declare const arr: ({
    readonly tableAlias: "tableAlias";
    readonly name: "name";
} | {
    readonly tableAlias: "__aliased";
    readonly name: "eq";
} | {
    readonly tableAlias: "otherTable";
    readonly name: "x";
} | {
    readonly tableAlias: "otherTable";
    readonly name: "y";
} | {
    readonly tableAlias: "otherTable";
    readonly name: "z";
})[];
export declare const emptyArr: never[];
export declare const untypedArr: ({
    readonly tableAlias: string;
    readonly name: string;
} | {
    readonly tableAlias: string;
    readonly name: string;
})[];
