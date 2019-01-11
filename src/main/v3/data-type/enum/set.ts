import * as sd from "schema-decorator";

export function set<ElementArr extends string[]> (
    ...elements : ElementArr
) : sd.AssertDelegate<string>{
    if (elements.length > 64) {
        throw new Error(`SET type can only have up to 64 elements`);
    }
    sd.array(sd.nonMatch(
        /\,/,
        name => `${name} must not have commas`
    ))("elements", elements);
    return sd.chain(
        sd.string(),
        (name : string, raw : string) : string => {
            const arr = raw.split(",");
            for (let e of arr) {
                if (elements.indexOf(e) < 0) {
                    throw new Error(`${name} has unknown set element; ${e}`);
                }
            }
            return raw;
        }
    );
}