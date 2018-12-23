"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//TODO-FEATURE Create a version using MySQL queries
//REGEXP_REPLACE(pattern, '(\\%|\\_)', '\\$1', 1, 0, 'm')
/*
    With LIKE you can use the following two wildcard characters in the pattern:

    + % matches any number of characters, even zero characters.
    + _ matches exactly one character.

    This function just prepends `escapeChar` to each of the above characters.

    If no `escapeChar` is given, backslash is assumed.
*/
function escapeLikePattern(pattern, escapeChar = "\\") {
    return pattern.replace(/(\%|\_)/g, s => escapeChar + s);
}
exports.escapeLikePattern = escapeLikePattern;
//# sourceMappingURL=escape-like-pattern.js.map