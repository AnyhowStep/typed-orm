import { Token } from "./Token";
/**
 * Handles placeholder replacement with given params.
 */
export declare class Params {
    private readonly params;
    private index;
    /**
     * @param {Object} params
     */
    constructor(params: string[] | {
        [key: string]: string;
    } | undefined);
    /**
     * Returns param value that matches given placeholder with param key.
     * @param {Object} token
     *   @param {String} token.key Placeholder key
     *   @param {String} token.value Placeholder value
     * @return {String} param or token.value when params are missing
     */
    get({ key, value }: Token): string;
}
