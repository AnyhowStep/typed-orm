//TODO clean up
import * as d from "../declaration";
import * as sd from "schema-decorator";
import {eq, isNull} from "./expr-comparison";
import {and, TRUE} from "./expr-logical";
import {Column} from "./column";

export class EqualityBuilder<
    ConvertFuncT extends undefined|((raw : any) => d.IExpr<{}, boolean>) = undefined
> implements d.IEqualityBuilder<ConvertFuncT> {
    private readonly convertImpl : ConvertFuncT;
    readonly convert : ConvertFuncT;

    private constructor (convert : ConvertFuncT) {
        this.convertImpl = convert;
        if (convert == undefined) {
            this.convert = (() => {
                throw new Error(`Empty equality builder`);
            }) as any;
        } else {
            this.convert = ((raw : any) => {
                const result = convert(raw);
                if (result == undefined) {
                    throw new Error(`Invalid identifier, ${JSON.stringify(raw)}`);
                }
                return result;
            }) as any;
        }
    }
    public static Create() {
        return new EqualityBuilder(undefined);
    }

    add<
        IdentifierT extends object,
        MappingT extends d.ColumnMapping<IdentifierT>
    > (
        identifierAssert : sd.AssertFunc<IdentifierT>,
        mapping : MappingT
    ) : (
        d.ColumnMapping<IdentifierT> extends MappingT ?
            d.EqualityBuilderAddResult<ConvertFuncT, IdentifierT, MappingT> :
            ("Extra fields not allowed in mapping"|void|never)
    ) {
        const assertDelegate = sd.toAssertDelegateExact(identifierAssert);
        const newConvert = (raw : any) => {
            try {
                raw = assertDelegate("identifier", raw);
            } catch (_err) {
                return undefined;
            }
            let result : any = undefined;
            for (let key in mapping) {
                if (!raw.hasOwnProperty(key)) {
                    throw new Error(`Unknown key ${key}`);
                }
                const value = (raw as any)[key];
                const column = mapping[key];
                const check = (value == undefined) ?
                    isNull(column) :
                    eq(column, value);
                result = (result == undefined) ?
                    check :
                    and(result, check as any);
            }
            if (result == undefined) {
                return TRUE;
            } else {
                return result;
            }
        }
        if (this.convertImpl == undefined) {
            return new EqualityBuilder(newConvert) as any;
        } else {
            const convert : any = this.convertImpl;
            return new EqualityBuilder((raw : any) => {
                const result = convert(raw);
                if (result == undefined) {
                    return newConvert(raw);
                } else {
                    return result;
                }
            }) as any;
        }
    }

    addTable<
        IdentifierT extends object,
        TableT extends d.ITable<any, any, any, any>
    > (
        identifierAssert : sd.AssertFunc<IdentifierT>,
        table : TableT
    ) : (
        TableT["columns"] extends d.TableColumnsWithMapping<IdentifierT> ?
            d.EqualityBuilderAddTableResult<ConvertFuncT, IdentifierT, TableT> :
            ("Invalid table, does not have all the columns of IdentifierT"|void|never)
    ) {
        const assertDelegate = sd.toAssertDelegateExact(identifierAssert);
        const newConvert = (raw : any) => {
            try {
                raw = assertDelegate("identifier", raw);
            } catch (_err) {
                return undefined;
            }
            let result : any = undefined;
            for (let key in raw) {
                const value = (raw as any)[key];
                const column = (table.columns as any)[key];
                if (!(column instanceof Column)) {
                    throw new Error(`Table ${table.alias} has no such column ${key}`);
                }
                const check = (value == undefined) ?
                    isNull(column) :
                    eq(column, value);
                result = (result == undefined) ?
                    check :
                    and(result, check as any);
            }
            if (result == undefined) {
                return TRUE;
            } else {
                return result;
            }
        }
        if (this.convertImpl == undefined) {
            return new EqualityBuilder(newConvert) as any;
        } else {
            const convert : any = this.convertImpl;
            return new EqualityBuilder((raw : any) => {
                const result = convert(raw);
                if (result == undefined) {
                    return newConvert(raw);
                } else {
                    return result;
                }
            }) as any;
        }
    }
}
