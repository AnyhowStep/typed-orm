import {Expr} from "../expr";
import {RawExpr, RawExprUtil} from "../raw-expr";
import * as sd from "schema-decorator";
import {ColumnReferencesUtil} from "../column-references";

//https://dev.mysql.com/doc/refman/8.0/en/string-comparison-functions.html#operator_like
export function like<
    StrT extends RawExpr<string>,
    PatternT extends RawExpr<string>
> (
    str : StrT,
    pattern : PatternT
) : (
    Expr<
        ColumnReferencesUtil.Merge<
            RawExprUtil.UsedReferences<StrT>,
            RawExprUtil.UsedReferences<PatternT>
        >,
        boolean
    > & {
        //The escape sequence should be empty or one character long.
        //The expression must evaluate as a constant at execution time.
        //If the NO_BACKSLASH_ESCAPES SQL mode is enabled, the sequence cannot be empty.
        escape : (escapeChar : string) => Expr<
            ColumnReferencesUtil.Merge<
                RawExprUtil.UsedReferences<StrT>,
                RawExprUtil.UsedReferences<PatternT>
            >,
            boolean
        >
    }
) {
    RawExprUtil.assertNonNullable(str);
    RawExprUtil.assertNonNullable(pattern);

    const usedReferences = ColumnReferencesUtil.merge(
        RawExprUtil.usedReferences(str),
        RawExprUtil.usedReferences(pattern)
    );
    const query = `${RawExprUtil.querify(str)} LIKE ${RawExprUtil.querify(pattern)}`;
    const expr = new Expr(
        usedReferences,
        sd.numberToBoolean(),
        query
    );
    (expr as any).escape = (escapeChar : string) => {
        escapeChar = sd.varChar(0, 1)("escapeChar", escapeChar);
        return new Expr(
            usedReferences,
            sd.numberToBoolean(),
            `${query} ESCAPE ${RawExprUtil.querify(escapeChar)}`
        )
    };
    return expr as any;
}

export function likeUnsafe<
    StrT extends RawExpr<string|null>,
    PatternT extends RawExpr<string|null>
> (
    str : StrT,
    pattern : PatternT
) : (
    Expr<
        ColumnReferencesUtil.Merge<
            RawExprUtil.UsedReferences<StrT>,
            RawExprUtil.UsedReferences<PatternT>
        >,
        null|boolean
    > & {
        //The escape sequence should be empty or one character long.
        //The expression must evaluate as a constant at execution time.
        //If the NO_BACKSLASH_ESCAPES SQL mode is enabled, the sequence cannot be empty.
        escape : (escapeChar : string) => Expr<
            ColumnReferencesUtil.Merge<
                RawExprUtil.UsedReferences<StrT>,
                RawExprUtil.UsedReferences<PatternT>
            >,
            null|boolean
        >
    }
) {
    const usedReferences = ColumnReferencesUtil.merge(
        RawExprUtil.usedReferences(str),
        RawExprUtil.usedReferences(pattern)
    );
    const query = `${RawExprUtil.querify(str)} LIKE ${RawExprUtil.querify(pattern)}`;
    const expr = new Expr(
        usedReferences,
        sd.numberToBoolean(),
        query
    );
    (expr as any).escape = (escapeChar : string) => {
        escapeChar = sd.varChar(0, 1)("escapeChar", escapeChar);
        return new Expr(
            usedReferences,
            sd.numberToBoolean(),
            `${query} ESCAPE ${RawExprUtil.querify(escapeChar)}`
        )
    };
    return expr as any;
}

/*
With LIKE you can use the following two wildcard characters in the pattern:

+ % matches any number of characters, even zero characters.
+ _ matches exactly one character.

This function just prepends `escapeChar` to each of the above characters.

If no `escapeChar` is given, backslash is assumed.
*/
export function escapeLikePattern (pattern : string, escapeChar : string = "\\") {
    return pattern.replace(/(\%|\_)/g, s => escapeChar + s);
}