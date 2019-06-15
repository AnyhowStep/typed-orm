import * as sd from "type-mapping";
declare function enumDelegate<ElementArr extends string[]>(...elements: ElementArr): sd.SafeMapper<ElementArr[number]>;
declare namespace enumDelegate {
    var nullable: <ElementArr extends string[]>(...elements: ElementArr) => sd.Mapper<unknown, ElementArr[number] | null>;
}
export { enumDelegate as enum };
