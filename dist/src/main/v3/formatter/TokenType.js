"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TokenType;
(function (TokenType) {
    TokenType["WHITESPACE"] = "whitespace";
    TokenType["WORD"] = "word";
    TokenType["STRING"] = "string";
    TokenType["RESERVED"] = "reserved";
    TokenType["RESERVED_TOPLEVEL"] = "reserved-toplevel";
    TokenType["RESERVED_NEWLINE"] = "reserved-newline";
    TokenType["RESERVED_PRE_NEWLINE"] = "reserved-pre-newline";
    TokenType["OPERATOR"] = "operator";
    TokenType["OPEN_PAREN"] = "open-paren";
    TokenType["CLOSE_PAREN"] = "close-paren";
    TokenType["LINE_COMMENT"] = "line-comment";
    TokenType["BLOCK_COMMENT"] = "block-comment";
    TokenType["NUMBER"] = "number";
    TokenType["PLACEHOLDER"] = "placeholder";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
//# sourceMappingURL=TokenType.js.map