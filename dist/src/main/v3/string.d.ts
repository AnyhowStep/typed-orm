export declare namespace StringUtil {
    type IsOneLiteralImpl<S extends string> = (string extends S ? string : {
        [str in S]: Exclude<S, str>;
    }[S]);
    type IsOneLiteral<S extends string> = (IsOneLiteralImpl<S> extends never ? (S extends never ? false : true) : false);
    function zeroPad(num: number, length: number): string;
    function trailingZeroPad(num: number | string, length: number): string;
}
//# sourceMappingURL=string.d.ts.map