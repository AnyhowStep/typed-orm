"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const expr_comparison_1 = require("./expr-comparison");
const expr_logical_1 = require("./expr-logical");
class EqualityBuilder {
    constructor(convert) {
        this.convertImpl = convert;
        if (convert == undefined) {
            this.convert = (() => {
                throw new Error(`Empty equality builder`);
            });
        }
        else {
            this.convert = ((raw) => {
                const result = convert(raw);
                if (result == undefined) {
                    throw new Error(`Invalid identifier, ${JSON.stringify(raw)}`);
                }
                return result;
            });
        }
    }
    static Create() {
        return new EqualityBuilder(undefined);
    }
    add(identifierAssert, mapping) {
        const assertDelegate = sd.toAssertDelegateExact(identifierAssert);
        const newConvert = (raw) => {
            try {
                raw = assertDelegate("identifier", raw);
            }
            catch (_err) {
                return undefined;
            }
            let result = undefined;
            for (let key in mapping) {
                const value = raw[key];
                const column = mapping[key];
                const check = (value == undefined) ?
                    expr_comparison_1.isNull(column) :
                    expr_comparison_1.eq(column, value);
                result = (result == undefined) ?
                    check :
                    expr_logical_1.and(result, check);
            }
            if (result == undefined) {
                return expr_logical_1.TRUE;
            }
            else {
                return result;
            }
        };
        if (this.convertImpl == undefined) {
            return new EqualityBuilder(newConvert);
        }
        else {
            const convert = this.convertImpl;
            return new EqualityBuilder((raw) => {
                const result = convert(raw);
                if (result == undefined) {
                    return newConvert(raw);
                }
                else {
                    return result;
                }
            });
        }
    }
}
exports.EqualityBuilder = EqualityBuilder;
//# sourceMappingURL=EqualityBuilder.js.map