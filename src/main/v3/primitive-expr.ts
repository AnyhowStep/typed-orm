//In particular,
//BLOB data should be sent as a Buffer
//JSON data should be sent as a string
//undefined IS NOT ALLOWED
export type PrimitiveExpr = bigint|number|string|boolean|Date|Buffer|null;
export type NonNullPrimitiveExpr = Exclude<PrimitiveExpr, null>;

export function isPrimitiveExpr (raw : unknown) : raw is PrimitiveExpr {
    switch (typeof raw) {
        case "bigint":
        case "number":
        case "string":
        case "boolean": {
            return true;
        }
    }
    if (raw instanceof Date) {
        return true;
    }
    if (raw instanceof Buffer) {
        return true;
    }
    if (raw === null) {
        return true;
    }

    return false;
}
export function isNonNullPrimitiveExpr (raw : unknown) : raw is NonNullPrimitiveExpr {
    if (raw === null) {
        return false;
    }
    return isPrimitiveExpr(raw);
}