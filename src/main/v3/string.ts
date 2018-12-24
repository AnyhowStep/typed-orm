export namespace StringUtil {
    export type IsOneLiteralImpl<S extends string> = (
        string extends S ?
            string :
            {
                [str in S] : Exclude<S, str>
            }[S]
    );
    //IsOneStringLiteral<S> extends true ?
    //    "Only one string literal" :
    //    "Multiple"|"String"|"Literals"|string
    export type IsOneLiteral<S extends string> = (
        IsOneLiteralImpl<S> extends never ?
        (
            S extends never ?
            false :
            true
        ) :
        false
    );
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
    export function zeroPad (num : number, length : number) {
        const str = num.toString();
        if (str.length < length) {
            return "0".repeat(length-str.length) + str;
        } else {
            return str;
        }
    }
}