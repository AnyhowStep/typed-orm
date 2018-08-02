export declare type IsOneStringLiteralImpl<S extends string> = (string extends S ? string : {
    [str in S]: Exclude<S, str>;
}[S]);
export declare type IsOneStringLiteral<S extends string> = (IsOneStringLiteralImpl<S> extends never ? true : false);
//# sourceMappingURL=string-util.d.ts.map