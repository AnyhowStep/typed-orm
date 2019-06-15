import * as sd from "type-mapping";

export const assertBoolean = sd.mysql.boolean();
export const assertTrue = sd.mysql.true();
export const assertFalse = sd.mysql.false();

function boolean () {
    return sd.mysql.boolean();
}
boolean.nullable = () => sd.orNull(boolean());

function getTrue () {
    return sd.mysql.true();
}
getTrue.nullable = () => sd.orNull(getTrue());
function getFalse () {
    return sd.mysql.false();
}
getFalse.nullable = () => sd.orNull(getFalse());
export {
    boolean,
    getTrue as true,
    getFalse as false,
}