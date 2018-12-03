import { Tokenizer } from "./Tokenizer";
import { Token } from "./Token";
export interface FormatterConfig {
    indent?: string;
    params?: string[] | {
        [key: string]: string;
    } | undefined;
}
export declare class Formatter {
    private readonly cfg;
    private readonly indentation;
    private readonly inlineBlock;
    private readonly params;
    private readonly tokenizer;
    private previousReservedWord;
    private tokens;
    private index;
    /**
     * @param {Object} cfg
     *   @param {Object} cfg.indent
     *   @param {Object} cfg.params
     * @param {Tokenizer} tokenizer
     */
    constructor(cfg: FormatterConfig | undefined, tokenizer: Tokenizer);
    /**
     * Formats whitespaces in a SQL string to make it easier to read.
     *
     * @param {String} query The SQL query string
     * @return {String} formatted query
     */
    format(query: string): string;
    getFormattedQueryFromTokens(): string;
    formatLineComment(token: Token, query: string): string;
    formatBlockComment(token: Token, query: string): string;
    indentComment(comment: string): string;
    formatToplevelReservedWord(token: Token, query: string): string;
    formatNewlineReservedWord(token: Token, query: string): string;
    equalizeWhitespace(string: string): string;
    formatOpeningParentheses(token: Token, query: string): string;
    formatClosingParentheses(token: Token, query: string): string;
    formatPlaceholder(token: Token, query: string): string;
    formatComma(token: Token, query: string): string;
    formatWithSpaceAfter(token: Token, query: string): string;
    formatWithoutSpaces(token: Token, query: string): string;
    formatWithSpaces(token: Token, query: string): string;
    addNewline(query: string): string;
    trimTrailingWhitespace(query: string): string;
    previousNonWhitespaceToken(): Token;
    previousToken(offset?: number): Token;
}
//# sourceMappingURL=Formatter.d.ts.map