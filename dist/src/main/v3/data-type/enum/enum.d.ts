import * as sd from "schema-decorator";
declare function enumDelegate<ElementArr extends string[]>(...elements: ElementArr): sd.AssertDelegate<ElementArr[number]>;
declare namespace enumDelegate {
    var nullable: <ElementArr extends string[]>(...elements: ElementArr) => sd.AssertDelegate<ElementArr[number] | null>;
}
export { enumDelegate as enum };
