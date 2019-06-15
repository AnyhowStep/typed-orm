import * as sd from "schema-decorator";
declare function set<ElementArr extends string[]>(...elements: ElementArr): sd.AssertDelegate<string>;
declare namespace set {
    var nullable: <ElementArr extends string[]>(...elements: ElementArr) => sd.AssertDelegate<string | null>;
}
export { set };
