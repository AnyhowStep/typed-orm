//In particular,
//BLOB data should be sent as a Buffer
//JSON data should be sent as a string
//undefined IS NOT ALLOWED
export type PrimitiveExpr = bigint|number|string|boolean|Date|Buffer|null;
export type NonNullPrimitiveExpr = Exclude<PrimitiveExpr, null>;

export namespace PrimitiveExprUtil {
    export function isPrimitiveExprArray (raw : unknown) : raw is PrimitiveExpr[] {
        if (!(raw instanceof Array)) {
            return false;
        }
        for (let item of raw) {
            if (!isPrimitiveExpr(item)) {
                return false;
            }
        }
        return true;
    }
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
    export function isNonNullPrimitiveExprArray (raw : unknown) : raw is NonNullPrimitiveExpr[] {
        if (!(raw instanceof Array)) {
            return false;
        }
        for (let item of raw) {
            if (!isNonNullPrimitiveExpr(item)) {
                return false;
            }
        }
        return true;
    }
    export function isNonNullPrimitiveExpr (raw : unknown) : raw is NonNullPrimitiveExpr {
        if (raw === null) {
            return false;
        }
        return isPrimitiveExpr(raw);
    }

    export function isEqual (a : PrimitiveExpr, b : PrimitiveExpr) : boolean {
        if (a === b) {
            return true;
        }

        if (a instanceof Date) {
            if (b instanceof Date) {
                if (isNaN(a.getTime()) && isNaN(b.getTime())) {
                    return true;
                }
                return a.getTime() === b.getTime();
            } else {
                return false;
            }
        }

        if (a instanceof Buffer) {
            if (b instanceof Buffer) {
                return a.equals(b);
            } else {
                return false;
            }
        }

        //No idea, assume not equal
        return false;
    }
}