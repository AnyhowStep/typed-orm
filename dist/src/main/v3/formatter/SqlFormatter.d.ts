import { FormatterConfig } from "./Formatter";
export declare class SqlFormatter {
    private readonly cfg;
    /**
     * @param {Object} cfg Different set of configurations
     */
    constructor(cfg?: FormatterConfig | undefined);
    /**
     * Format the whitespace in a Standard SQL string to make it easier to read
     *
     * @param {String} query The Standard SQL string
     * @return {String} formatted string
     */
    format(query: string): string;
}
