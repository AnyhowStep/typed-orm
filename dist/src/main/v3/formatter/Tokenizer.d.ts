import { TokenType } from "./TokenType";
import { Token } from "./Token";
export declare class Tokenizer {
    private readonly WHITESPACE_REGEX;
    private readonly NUMBER_REGEX;
    private readonly OPERATOR_REGEX;
    private readonly BLOCK_COMMENT_REGEX;
    private readonly LINE_COMMENT_REGEX;
    private readonly RESERVED_TOPLEVEL_REGEX;
    private readonly RESERVED_NEWLINE_REGEX;
    private readonly RESERVED_PRE_NEWLINE_REGEX;
    private readonly RESERVED_PLAIN_REGEX;
    private readonly WORD_REGEX;
    private readonly STRING_REGEX;
    private readonly OPEN_PAREN_REGEX;
    private readonly CLOSE_PAREN_REGEX;
    private readonly INDEXED_PLACEHOLDER_REGEX;
    private readonly IDENT_NAMED_PLACEHOLDER_REGEX;
    private readonly STRING_NAMED_PLACEHOLDER_REGEX;
    /**
     * @param {Object} cfg
     *  @param {String[]} cfg.reservedWords Reserved words in SQL
     *  @param {String[]} cfg.reservedToplevelWords Words that are set to new line separately
     *  @param {String[]} cfg.reservedNewlineWords Words that are set to newline
     *  @param {String[]} cfg.stringTypes String types to enable: "", '', ``, [], N''
     *  @param {String[]} cfg.openParens Opening parentheses to enable, like (, [
     *  @param {String[]} cfg.closeParens Closing parentheses to enable, like ), ]
     *  @param {String[]} cfg.indexedPlaceholderTypes Prefixes for indexed placeholders, like ?
     *  @param {String[]} cfg.namedPlaceholderTypes Prefixes for named placeholders, like @ and :
     *  @param {String[]} cfg.lineCommentTypes Line comments to enable, like # and --
     *  @param {String[]} cfg.specialWordChars Special chars that can be found inside of words, like @ and #
     */
    constructor(cfg: {
        reservedWords: string[];
        reservedToplevelWords: string[];
        reservedNewlineWords: string[];
        reservedPreNewlineWords: string[];
        stringTypes: ("``" | "[]" | "\"\"" | "''" | "N''" | "X''")[];
        openParens: string[];
        closeParens: string[];
        indexedPlaceholderTypes: string[];
        namedPlaceholderTypes: string[];
        lineCommentTypes: string[];
        specialWordChars: string[] | undefined;
    });
    createLineCommentRegex(lineCommentTypes: string[]): RegExp;
    createReservedWordRegex(reservedWords: string[]): RegExp;
    createWordRegex(specialChars?: string[]): RegExp;
    createStringRegex(stringTypes: ("``" | "[]" | "\"\"" | "''" | "N''" | "X''")[]): RegExp;
    createStringPattern(stringTypes: ("``" | "[]" | "\"\"" | "''" | "N''" | "X''")[]): string;
    createParenRegex(parens: string[]): RegExp;
    escapeParen(paren: string): string;
    createPlaceholderRegex(types: string[], pattern: string): RegExp | undefined;
    /**
     * Takes a SQL string and breaks it into tokens.
     * Each token is an object with type and value.
     *
     * @param {String} input The SQL string
     * @return {Object[]} tokens An array of tokens.
     *  @return {String} token.type
     *  @return {String} token.value
     */
    tokenize(input: string): Token[];
    getNextToken(input: string, previousToken: Token | undefined): Token | undefined;
    getWhitespaceToken(input: string): Token | undefined;
    getCommentToken(input: string): Token | undefined;
    getLineCommentToken(input: string): Token | undefined;
    getBlockCommentToken(input: string): Token | undefined;
    getStringToken(input: string): Token | undefined;
    getOpenParenToken(input: string): Token | undefined;
    getCloseParenToken(input: string): Token | undefined;
    getPlaceholderToken(input: string): Token | undefined;
    getIdentNamedPlaceholderToken(input: string): Token | undefined;
    getStringNamedPlaceholderToken(input: string): Token | undefined;
    getIndexedPlaceholderToken(input: string): Token | undefined;
    getPlaceholderTokenWithKey({ input, regex, parseKey }: {
        input: string;
        regex: RegExp | undefined;
        parseKey: (v: string) => string;
    }): Token | undefined;
    getEscapedPlaceholderKey({ key, quoteChar }: {
        key: string;
        quoteChar: string;
    }): string;
    getNumberToken(input: string): Token | undefined;
    getOperatorToken(input: string): Token | undefined;
    getReservedWordToken(input: string, previousToken: Token | undefined): Token | undefined;
    getToplevelReservedToken(input: string): Token | undefined;
    getNewlineReservedToken(input: string): Token | undefined;
    getPreNewlineReservedToken(input: string): Token | undefined;
    getPlainReservedToken(input: string): Token | undefined;
    getWordToken(input: string): Token | undefined;
    getTokenOnFirstMatch({ input, type, regex }: {
        input: string;
        type: TokenType;
        regex: RegExp | undefined;
    }): Token | undefined;
}
