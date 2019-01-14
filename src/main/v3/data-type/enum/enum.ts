import * as sd from "schema-decorator";

function enumDelegate<ElementArr extends string[]> (
    ...elements : ElementArr
) : sd.AssertDelegate<ElementArr[number]> {
    if (elements.length > 65535) {
        throw new Error(`ENUM type can only have up to 65,535 elements`);
    }
    return sd.literal(...elements);
}
enumDelegate.nullable = <ElementArr extends string[]> (
    ...elements : ElementArr
) : sd.AssertDelegate<ElementArr[number]|null> => (
    sd.nullable(enumDelegate(...elements))
);
export {enumDelegate as enum};