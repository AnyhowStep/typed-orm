import * as sd from "schema-decorator";
export declare function set<ElementArr extends string[]>(...elements: ElementArr): sd.AssertDelegate<string>;
export declare namespace set {
    var nullable: <ElementArr extends string[]>(...elements: ElementArr) => sd.AssertDelegate<string | null>;
}
//# sourceMappingURL=set.d.ts.map