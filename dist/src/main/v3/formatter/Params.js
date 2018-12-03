"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Handles placeholder replacement with given params.
 */
class Params {
    /**
     * @param {Object} params
     */
    constructor(params) {
        this.params = params;
        this.index = 0;
    }
    /**
     * Returns param value that matches given placeholder with param key.
     * @param {Object} token
     *   @param {String} token.key Placeholder key
     *   @param {String} token.value Placeholder value
     * @return {String} param or token.value when params are missing
     */
    get({ key, value }) {
        if (!this.params) {
            return value;
        }
        if (key) {
            if (this.params instanceof Array) {
                throw new Error(`Cannot use array params with named placeholders`);
            }
            else {
                return this.params[key];
            }
        }
        else {
            if (this.params instanceof Array) {
                return this.params[this.index++];
            }
            else {
                throw new Error(`Cannot use object params with index placeholders`);
            }
        }
    }
}
exports.Params = Params;
//# sourceMappingURL=Params.js.map