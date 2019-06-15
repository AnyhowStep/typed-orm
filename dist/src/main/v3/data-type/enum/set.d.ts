import * as sd from "type-mapping";
declare function set<ElementArr extends string[]>(...elements: ElementArr): sd.SafeMapper<string>;
declare namespace set {
    var nullable: <ElementArr extends string[]>(...elements: ElementArr) => sd.Mapper<unknown, string | null>;
}
export { set };
