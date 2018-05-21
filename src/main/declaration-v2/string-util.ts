//IsOneStringLiteral<S> extends never ?
//    "Only one string literal" :
//    "Multiple"|"String"|"Literals"|string
export type IsOneStringLiteral<S extends string> = (
    string extends S ?
        string :
        {
            [str in S] : Exclude<S, str>
        }[S]
);
/*
export type str = IsOneStringLiteral<string>
export type multi = IsOneStringLiteral<"Multiple"|"String"|"Literals">
export type one = IsOneStringLiteral<"Only one string literal">
*/
