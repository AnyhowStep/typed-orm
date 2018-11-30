export declare namespace StringUtil {
    type IsOneLiteralImpl<S extends string> = (S extends never ? string : string extends S ? string : {
        [str in S]: Exclude<S, str>;
    }[S]);
    type IsOneLiteral<S extends string> = (IsOneLiteralImpl<S> extends never ? true : false);
}
//# sourceMappingURL=string.d.ts.map