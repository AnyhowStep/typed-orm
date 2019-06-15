import * as sd from "type-mapping";

function enumDelegate<ElementArr extends string[]> (
    ...elements : ElementArr
) : sd.SafeMapper<ElementArr[number]> {
    if (elements.length > 65535) {
        throw new Error(`ENUM type can only have up to 65,535 elements`);
    }
    return sd.literal(...elements);
}
enumDelegate.nullable = <ElementArr extends string[]> (
    ...elements : ElementArr
) : sd.SafeMapper<ElementArr[number]|null> => (
    sd.orNull(enumDelegate(...elements))
);
export {enumDelegate as enum};