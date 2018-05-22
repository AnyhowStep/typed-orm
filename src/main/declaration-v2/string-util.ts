export type IsOneStringLiteralImpl<S extends string> = (
    string extends S ?
        string :
        {
            [str in S] : Exclude<S, str>
        }[S]
);
//IsOneStringLiteral<S> extends true ?
//    "Only one string literal" :
//    "Multiple"|"String"|"Literals"|string
export type IsOneStringLiteral<S extends string> = (
    IsOneStringLiteralImpl<S> extends never ?
        true :
        false
);
/*
export type str = IsOneStringLiteral<string> extends true ? "is-one-string-literal" : "nope";
export type multi = IsOneStringLiteral<"Multiple"|"String"|"Literals"> extends true ? "is-one-string-literal" : "nope";
export type one = IsOneStringLiteral<"Only one string literal"> extends true ? "is-one-string-literal" : "nope";
*/
