"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StringUtil;
(function (StringUtil) {
    /*
    export type nvr = IsOneLiteral<never>;
    export type str = IsOneLiteral<string>;
    export type multi = IsOneLiteral<"Multiple"|"String"|"Literals">;
    export type one = IsOneLiteral<"Only one string literal">;
    //*/
    /*
        zeroPad(1, 4)     === "0001"
        zeroPad(34, 4)    === "0034"
        zeroPad(678, 4)   === "0678"
        zeroPad(1337, 4)  === "1337"
        zeroPad(92678, 4) === "92678"
    */
    function zeroPad(num, length) {
        const str = num.toString();
        if (str.length < length) {
            return "0".repeat(length - str.length) + str;
        }
        else {
            return str;
        }
    }
    StringUtil.zeroPad = zeroPad;
})(StringUtil = exports.StringUtil || (exports.StringUtil = {}));
//# sourceMappingURL=string.js.map