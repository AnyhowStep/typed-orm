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
}