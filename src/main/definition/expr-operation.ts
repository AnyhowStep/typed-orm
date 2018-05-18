import * as d from "../declaration";
import * as sd from "schema-decorator";
import {Database} from "typed-mysql";
import {SelectBuilder} from "./select-builder";
import {Column} from "./column";
import {Expr} from "./expr";
import {StringBuilder} from "./StringBuilder";

export function isAllowedExprConstant<RawExprT extends d.RawExpr<any>> (
    raw : RawExprT
) {
    if (raw == undefined) {
        return true;
    }
    if (raw instanceof Date) {
        return true;
    }
    switch (typeof raw) {
        case "number":
        case "string":
        case "boolean": {
            return true;
        }
    }
    return false;
}

//TODO Make more generic and non-dependent on implementation?
export function usedColumns<RawExprT extends d.RawExpr<any>> (
    raw : RawExprT
) : d.ExprUsedColumns<RawExprT> {
    if (raw instanceof SelectBuilder) {
        return {} as any;
    }
    if (isAllowedExprConstant(raw)) {
        return {} as any;
    }
    if (raw instanceof Column) {
        return {
            [raw.table] : {
                [raw.name] : raw
            }
        } as any;
    }
    if (raw instanceof Expr) {
        return raw.usedReferences;
    }
    throw new Error(`Unknown raw expression (${typeof raw})${raw}`);
}

export function assertDelegate<RawExprT extends d.RawExpr<any>> (
    raw : RawExprT
) : sd.AssertDelegate<d.ExprType<RawExprT>> {
    if (isAllowedExprConstant(raw)) {
        if (raw == undefined) {
            return sd.nil() as any;
        }
        if (raw instanceof Date) {
            return sd.date() as any;
        }
        switch (typeof raw) {
            case "number": {
                return sd.number() as any;
            }
            case "string": {
                return sd.string() as any;
            }
            case "boolean": {
                //MySQL returns `number` instead of `boolean`
                return sd.numberToBoolean() as any;
            }
        }
    }
    if (raw instanceof Column) {
        return raw.assertDelegate;
    }
    if (raw instanceof Expr) {
        return raw.assertDelegate;
    }
    if (raw instanceof SelectBuilder) {
        //If it's from a subquery. it's possible it may be null
        return sd.nullable(raw.data.selectTuple[0].assertDelegate) as any;
    }
    throw new Error(`Unknown raw expression (${typeof raw})${raw}`);
}

export function querify (raw : d.RawExpr<any>) : string {
    if (isAllowedExprConstant(raw)) {
        if (raw == undefined) {
            return Database.Escape(null);
        }
        if (raw instanceof Date) {
            //TODO Make this toggleable
            return Database.Escape(raw, true);
        }
        switch (typeof raw) {
            case "number": {
                return Database.Escape(raw);
            }
            case "string": {
                return Database.Escape(raw);
            }
            case "boolean": {
                return Database.Escape(raw);
            }
        }
    }
    if (raw instanceof Column) {
        const sb = new StringBuilder();
        raw.querify(sb);
        return sb.toString();
    }
    if (raw instanceof Expr) {
        const sb = new StringBuilder();
        raw.querify(sb);
        return sb.toString();
    }
    if (raw instanceof SelectBuilder) {
        const sb = new StringBuilder();
        raw.querify(sb);
        return "(" + sb.toString() + ")";
    }
    throw new Error(`Unknown raw expression (${typeof raw})${raw}`);
}

export function toExpr<RawExprT extends d.RawExpr<any>> (
    raw : RawExprT
) : d.RawToExpr<RawExprT> {
    return new Expr(
        usedColumns(raw),
        assertDelegate(raw),
        querify(raw)
    );
}
