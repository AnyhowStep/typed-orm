"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const TokenType_1 = require("./TokenType");
const Indentation_1 = require("./Indentation");
const InlineBlock_1 = require("./InlineBlock");
const Params_1 = require("./Params");
class Formatter {
    /**
     * @param {Object} cfg
     *   @param {Object} cfg.indent
     *   @param {Object} cfg.params
     * @param {Tokenizer} tokenizer
     */
    constructor(cfg, tokenizer) {
        this.cfg = cfg || {};
        this.indentation = new Indentation_1.Indentation(this.cfg.indent);
        this.inlineBlock = new InlineBlock_1.InlineBlock();
        this.params = new Params_1.Params(this.cfg.params);
        this.tokenizer = tokenizer;
        this.previousReservedWord = undefined;
        this.tokens = [];
        this.index = 0;
    }
    /**
     * Formats whitespaces in a SQL string to make it easier to read.
     *
     * @param {String} query The SQL query string
     * @return {String} formatted query
     */
    format(query) {
        this.tokens = this.tokenizer.tokenize(query);
        const formattedQuery = this.getFormattedQueryFromTokens();
        return formattedQuery.trim();
    }
    getFormattedQueryFromTokens() {
        let formattedQuery = "";
        this.tokens.forEach((token, index) => {
            this.index = index;
            if (token.type === TokenType_1.TokenType.WHITESPACE) {
                // ignore (we do our own whitespace formatting)
            }
            else if (token.type === TokenType_1.TokenType.LINE_COMMENT) {
                formattedQuery = this.formatLineComment(token, formattedQuery);
            }
            else if (token.type === TokenType_1.TokenType.BLOCK_COMMENT) {
                formattedQuery = this.formatBlockComment(token, formattedQuery);
            }
            else if (token.type === TokenType_1.TokenType.RESERVED_TOPLEVEL) {
                formattedQuery = this.formatToplevelReservedWord(token, formattedQuery);
                this.previousReservedWord = token;
            }
            else if (token.type === TokenType_1.TokenType.RESERVED_NEWLINE) {
                formattedQuery = this.formatNewlineReservedWord(token, formattedQuery);
                this.previousReservedWord = token;
            }
            else if (token.type === TokenType_1.TokenType.RESERVED) {
                formattedQuery = this.formatWithSpaces(token, formattedQuery);
                this.previousReservedWord = token;
            }
            else if (token.type === TokenType_1.TokenType.OPEN_PAREN) {
                formattedQuery = this.formatOpeningParentheses(token, formattedQuery);
            }
            else if (token.type === TokenType_1.TokenType.CLOSE_PAREN) {
                formattedQuery = this.formatClosingParentheses(token, formattedQuery);
            }
            else if (token.type === TokenType_1.TokenType.PLACEHOLDER) {
                formattedQuery = this.formatPlaceholder(token, formattedQuery);
            }
            else if (token.value === ",") {
                formattedQuery = this.formatComma(token, formattedQuery);
            }
            else if (token.value === ":") {
                formattedQuery = this.formatWithSpaceAfter(token, formattedQuery);
            }
            else if (token.value === "." || token.value === ";") {
                formattedQuery = this.formatWithoutSpaces(token, formattedQuery);
            }
            else {
                formattedQuery = this.formatWithSpaces(token, formattedQuery);
            }
        });
        return formattedQuery;
    }
    formatLineComment(token, query) {
        return this.addNewline(query + token.value);
    }
    formatBlockComment(token, query) {
        return this.addNewline(this.addNewline(query) + this.indentComment(token.value));
    }
    indentComment(comment) {
        return comment.replace(/\n/g, "\n" + this.indentation.getIndent());
    }
    formatToplevelReservedWord(token, query) {
        this.indentation.decreaseTopLevel();
        query = this.addNewline(query);
        this.indentation.increaseToplevel();
        query += this.equalizeWhitespace(token.value);
        return this.addNewline(query);
    }
    formatNewlineReservedWord(token, query) {
        //Different from original implementation. I think this looks nicer.
        if (query.length > 0 && query[query.length - 1] != " ") {
            query += " ";
        }
        return this.addNewline(query + this.equalizeWhitespace(token.value));
    }
    // Replace any sequence of whitespace characters with single space
    equalizeWhitespace(string) {
        return string.replace(/\s+/g, " ");
    }
    // Opening parentheses increase the block indent level and start a new line
    formatOpeningParentheses(token, query) {
        // Take out the preceding space unless there was whitespace there in the original query
        // or another opening parens or line comment
        const preserveWhitespaceFor = [
            TokenType_1.TokenType.WHITESPACE,
            TokenType_1.TokenType.OPEN_PAREN,
            TokenType_1.TokenType.LINE_COMMENT,
        ];
        if (!this.hasPreviousToken() || !preserveWhitespaceFor.includes(this.previousToken().type)) {
            query = lodash_1.trimEnd(query);
        }
        query += token.value;
        this.inlineBlock.beginIfPossible(this.tokens, this.index);
        if (!this.inlineBlock.isActive()) {
            this.indentation.increaseBlockLevel();
            query = this.addNewline(query);
        }
        return query;
    }
    // Closing parentheses decrease the block indent level
    formatClosingParentheses(token, query) {
        if (this.inlineBlock.isActive()) {
            this.inlineBlock.end();
            return this.formatWithSpaceAfter(token, query);
        }
        else {
            this.indentation.decreaseBlockLevel();
            return this.formatWithSpaces(token, this.addNewline(query));
        }
    }
    formatPlaceholder(token, query) {
        return query + this.params.get(token) + " ";
    }
    // Commas start a new line (unless within inline parentheses or SQL "LIMIT" clause)
    formatComma(token, query) {
        query = this.trimTrailingWhitespace(query) + token.value + " ";
        if (this.inlineBlock.isActive()) {
            return query;
        }
        else if (this.previousReservedWord != undefined && /^LIMIT$/i.test(this.previousReservedWord.value)) {
            return query;
        }
        else {
            return this.addNewline(query);
        }
    }
    formatWithSpaceAfter(token, query) {
        return this.trimTrailingWhitespace(query) + token.value + " ";
    }
    formatWithoutSpaces(token, query) {
        return this.trimTrailingWhitespace(query) + token.value;
    }
    formatWithSpaces(token, query) {
        if (token.value == "HACKED_AND_NO_NEW_LINE") {
            return query + "AND" + " ";
        }
        return query + token.value + " ";
    }
    addNewline(query) {
        return lodash_1.trimEnd(query) + "\n" + this.indentation.getIndent();
    }
    trimTrailingWhitespace(query) {
        if (this.hasPreviousNonWhitespaceToken() && this.previousNonWhitespaceToken().type === TokenType_1.TokenType.LINE_COMMENT) {
            return lodash_1.trimEnd(query) + "\n";
        }
        else {
            return lodash_1.trimEnd(query);
        }
    }
    hasPreviousNonWhitespaceToken() {
        let n = 1;
        while (this.hasPreviousToken(n) && this.previousToken(n).type === TokenType_1.TokenType.WHITESPACE) {
            n++;
        }
        return this.hasPreviousToken(n);
    }
    previousNonWhitespaceToken() {
        let n = 1;
        while (this.previousToken(n).type === TokenType_1.TokenType.WHITESPACE) {
            n++;
        }
        return this.previousToken(n);
    }
    hasPreviousToken(offset = 1) {
        return (this.index - offset) >= 0;
    }
    previousToken(offset = 1) {
        const result = this.tokens[this.index - offset];
        if (result == undefined) {
            throw new Error(`No previous token. index ${this.index}, offset ${offset}`);
        }
        return result;
    }
}
exports.Formatter = Formatter;
//# sourceMappingURL=Formatter.js.map