import { RawExpr, RawExprUtil } from "../raw-expr";
import { ColumnReferencesUtil } from "../column-references";
import { Expr } from "../expr";
import { SelectBuilder } from "../select-builder";
import { Column } from "../column";
import { AliasedExpr } from "../aliased-expr";
export declare const TRUE: Expr<{}, true>;
export declare const FALSE: Expr<{}, false>;
export declare const or: <LeftT extends boolean | Expr<any, boolean> | Column<any, any, boolean> | SelectBuilder<{
    hasSelect: true;
    hasFrom: any;
    hasUnion: any;
    joins: any;
    selects: any[] & {
        "0": any;
    } & {
        length: 1;
    } & {
        "0": Column<any, any, boolean> | AliasedExpr<{
            readonly [x: string]: {
                readonly [x: string]: Column<any, any, boolean> | undefined;
            } | undefined;
        }, "__expr", any, boolean>;
    };
    aggregateDelegate: any;
    hasParentJoins: any;
    parentJoins: any;
}>, RightT extends boolean | Expr<any, boolean> | Column<any, any, boolean> | SelectBuilder<{
    hasSelect: true;
    hasFrom: any;
    hasUnion: any;
    joins: any;
    selects: any[] & {
        "0": any;
    } & {
        length: 1;
    } & {
        "0": Column<any, any, boolean> | AliasedExpr<{
            readonly [x: string]: {
                readonly [x: string]: Column<any, any, boolean> | undefined;
            } | undefined;
        }, "__expr", any, boolean>;
    };
    aggregateDelegate: any;
    hasParentJoins: any;
    parentJoins: any;
}>>(left: LeftT, right: RightT) => Expr<{ readonly [tableAlias in Extract<Exclude<keyof (LeftT extends SelectBuilder<any> ? {} : LeftT extends string | number | boolean | Date | null | undefined ? {} : LeftT extends Column<string, string, any> ? { readonly [tableAlias in LeftT["tableAlias"]]: { readonly [name in LeftT["name"]]: LeftT; }; } : LeftT extends Expr<any, any> ? LeftT["usedReferences"] : never), keyof (RightT extends SelectBuilder<any> ? {} : RightT extends string | number | boolean | Date | null | undefined ? {} : RightT extends Column<string, string, any> ? { readonly [tableAlias in RightT["tableAlias"]]: { readonly [name in RightT["name"]]: RightT; }; } : RightT extends Expr<any, any> ? RightT["usedReferences"] : never)>, string>]: (LeftT extends SelectBuilder<any> ? {} : LeftT extends string | number | boolean | Date | null | undefined ? {} : LeftT extends Column<string, string, any> ? { readonly [tableAlias in LeftT["tableAlias"]]: { readonly [name in LeftT["name"]]: LeftT; }; } : LeftT extends Expr<any, any> ? LeftT["usedReferences"] : never)[tableAlias] extends {
    readonly [columnName: string]: Column<string, string, any>;
} ? (LeftT extends SelectBuilder<any> ? {} : LeftT extends string | number | boolean | Date | null | undefined ? {} : LeftT extends Column<string, string, any> ? { readonly [tableAlias in LeftT["tableAlias"]]: { readonly [name in LeftT["name"]]: LeftT; }; } : LeftT extends Expr<any, any> ? LeftT["usedReferences"] : never)[tableAlias] : never; } & { readonly [tableAlias in Extract<Exclude<keyof (RightT extends SelectBuilder<any> ? {} : RightT extends string | number | boolean | Date | null | undefined ? {} : RightT extends Column<string, string, any> ? { readonly [tableAlias in RightT["tableAlias"]]: { readonly [name in RightT["name"]]: RightT; }; } : RightT extends Expr<any, any> ? RightT["usedReferences"] : never), keyof (LeftT extends SelectBuilder<any> ? {} : LeftT extends string | number | boolean | Date | null | undefined ? {} : LeftT extends Column<string, string, any> ? { readonly [tableAlias in LeftT["tableAlias"]]: { readonly [name in LeftT["name"]]: LeftT; }; } : LeftT extends Expr<any, any> ? LeftT["usedReferences"] : never)>, string>]: (RightT extends SelectBuilder<any> ? {} : RightT extends string | number | boolean | Date | null | undefined ? {} : RightT extends Column<string, string, any> ? { readonly [tableAlias in RightT["tableAlias"]]: { readonly [name in RightT["name"]]: RightT; }; } : RightT extends Expr<any, any> ? RightT["usedReferences"] : never)[tableAlias] extends {
    readonly [columnName: string]: Column<string, string, any>;
} ? (RightT extends SelectBuilder<any> ? {} : RightT extends string | number | boolean | Date | null | undefined ? {} : RightT extends Column<string, string, any> ? { readonly [tableAlias in RightT["tableAlias"]]: { readonly [name in RightT["name"]]: RightT; }; } : RightT extends Expr<any, any> ? RightT["usedReferences"] : never)[tableAlias] : never; } & { readonly [tableAlias in Extract<Extract<keyof (LeftT extends SelectBuilder<any> ? {} : LeftT extends string | number | boolean | Date | null | undefined ? {} : LeftT extends Column<string, string, any> ? { readonly [tableAlias in LeftT["tableAlias"]]: { readonly [name in LeftT["name"]]: LeftT; }; } : LeftT extends Expr<any, any> ? LeftT["usedReferences"] : never), keyof (RightT extends SelectBuilder<any> ? {} : RightT extends string | number | boolean | Date | null | undefined ? {} : RightT extends Column<string, string, any> ? { readonly [tableAlias in RightT["tableAlias"]]: { readonly [name in RightT["name"]]: RightT; }; } : RightT extends Expr<any, any> ? RightT["usedReferences"] : never)>, string>]: (LeftT extends SelectBuilder<any> ? {} : LeftT extends string | number | boolean | Date | null | undefined ? {} : LeftT extends Column<string, string, any> ? { readonly [tableAlias in LeftT["tableAlias"]]: { readonly [name in LeftT["name"]]: LeftT; }; } : LeftT extends Expr<any, any> ? LeftT["usedReferences"] : never)[tableAlias] extends {
    readonly [columnName: string]: Column<string, string, any>;
} ? (RightT extends SelectBuilder<any> ? {} : RightT extends string | number | boolean | Date | null | undefined ? {} : RightT extends Column<string, string, any> ? { readonly [tableAlias in RightT["tableAlias"]]: { readonly [name in RightT["name"]]: RightT; }; } : RightT extends Expr<any, any> ? RightT["usedReferences"] : never)[tableAlias] extends {
    readonly [columnName: string]: Column<string, string, any>;
} ? { readonly [columnName in Extract<keyof (LeftT extends SelectBuilder<any> ? {} : LeftT extends string | number | boolean | Date | null | undefined ? {} : LeftT extends Column<string, string, any> ? { readonly [tableAlias in LeftT["tableAlias"]]: { readonly [name in LeftT["name"]]: LeftT; }; } : LeftT extends Expr<any, any> ? LeftT["usedReferences"] : never)[tableAlias], string>]: columnName extends keyof (RightT extends SelectBuilder<any> ? {} : RightT extends string | number | boolean | Date | null | undefined ? {} : RightT extends Column<string, string, any> ? { readonly [tableAlias in RightT["tableAlias"]]: { readonly [name in RightT["name"]]: RightT; }; } : RightT extends Expr<any, any> ? RightT["usedReferences"] : never)[tableAlias] ? Column<(LeftT extends SelectBuilder<any> ? {} : LeftT extends string | number | boolean | Date | null | undefined ? {} : LeftT extends Column<string, string, any> ? { readonly [tableAlias in LeftT["tableAlias"]]: { readonly [name in LeftT["name"]]: LeftT; }; } : LeftT extends Expr<any, any> ? LeftT["usedReferences"] : never)[tableAlias][columnName]["tableAlias"], (LeftT extends SelectBuilder<any> ? {} : LeftT extends string | number | boolean | Date | null | undefined ? {} : LeftT extends Column<string, string, any> ? { readonly [tableAlias in LeftT["tableAlias"]]: { readonly [name in LeftT["name"]]: LeftT; }; } : LeftT extends Expr<any, any> ? LeftT["usedReferences"] : never)[tableAlias][columnName]["name"], ReturnType<(LeftT extends SelectBuilder<any> ? {} : LeftT extends string | number | boolean | Date | null | undefined ? {} : LeftT extends Column<string, string, any> ? { readonly [tableAlias in LeftT["tableAlias"]]: { readonly [name in LeftT["name"]]: LeftT; }; } : LeftT extends Expr<any, any> ? LeftT["usedReferences"] : never)[tableAlias][columnName]["assertDelegate"]> & ReturnType<(RightT extends SelectBuilder<any> ? {} : RightT extends string | number | boolean | Date | null | undefined ? {} : RightT extends Column<string, string, any> ? { readonly [tableAlias in RightT["tableAlias"]]: { readonly [name in RightT["name"]]: RightT; }; } : RightT extends Expr<any, any> ? RightT["usedReferences"] : never)[tableAlias][columnName]["assertDelegate"]>> : (LeftT extends SelectBuilder<any> ? {} : LeftT extends string | number | boolean | Date | null | undefined ? {} : LeftT extends Column<string, string, any> ? { readonly [tableAlias in LeftT["tableAlias"]]: { readonly [name in LeftT["name"]]: LeftT; }; } : LeftT extends Expr<any, any> ? LeftT["usedReferences"] : never)[tableAlias][columnName]; } & (RightT extends SelectBuilder<any> ? {} : RightT extends string | number | boolean | Date | null | undefined ? {} : RightT extends Column<string, string, any> ? { readonly [tableAlias in RightT["tableAlias"]]: { readonly [name in RightT["name"]]: RightT; }; } : RightT extends Expr<any, any> ? RightT["usedReferences"] : never)[tableAlias] : never : never; }, boolean>;
export declare const xor: <LeftT extends boolean | Expr<any, boolean> | Column<any, any, boolean> | SelectBuilder<{
    hasSelect: true;
    hasFrom: any;
    hasUnion: any;
    joins: any;
    selects: any[] & {
        "0": any;
    } & {
        length: 1;
    } & {
        "0": Column<any, any, boolean> | AliasedExpr<{
            readonly [x: string]: {
                readonly [x: string]: Column<any, any, boolean> | undefined;
            } | undefined;
        }, "__expr", any, boolean>;
    };
    aggregateDelegate: any;
    hasParentJoins: any;
    parentJoins: any;
}>, RightT extends boolean | Expr<any, boolean> | Column<any, any, boolean> | SelectBuilder<{
    hasSelect: true;
    hasFrom: any;
    hasUnion: any;
    joins: any;
    selects: any[] & {
        "0": any;
    } & {
        length: 1;
    } & {
        "0": Column<any, any, boolean> | AliasedExpr<{
            readonly [x: string]: {
                readonly [x: string]: Column<any, any, boolean> | undefined;
            } | undefined;
        }, "__expr", any, boolean>;
    };
    aggregateDelegate: any;
    hasParentJoins: any;
    parentJoins: any;
}>>(left: LeftT, right: RightT) => Expr<{ readonly [tableAlias in Extract<Exclude<keyof (LeftT extends SelectBuilder<any> ? {} : LeftT extends string | number | boolean | Date | null | undefined ? {} : LeftT extends Column<string, string, any> ? { readonly [tableAlias in LeftT["tableAlias"]]: { readonly [name in LeftT["name"]]: LeftT; }; } : LeftT extends Expr<any, any> ? LeftT["usedReferences"] : never), keyof (RightT extends SelectBuilder<any> ? {} : RightT extends string | number | boolean | Date | null | undefined ? {} : RightT extends Column<string, string, any> ? { readonly [tableAlias in RightT["tableAlias"]]: { readonly [name in RightT["name"]]: RightT; }; } : RightT extends Expr<any, any> ? RightT["usedReferences"] : never)>, string>]: (LeftT extends SelectBuilder<any> ? {} : LeftT extends string | number | boolean | Date | null | undefined ? {} : LeftT extends Column<string, string, any> ? { readonly [tableAlias in LeftT["tableAlias"]]: { readonly [name in LeftT["name"]]: LeftT; }; } : LeftT extends Expr<any, any> ? LeftT["usedReferences"] : never)[tableAlias] extends {
    readonly [columnName: string]: Column<string, string, any>;
} ? (LeftT extends SelectBuilder<any> ? {} : LeftT extends string | number | boolean | Date | null | undefined ? {} : LeftT extends Column<string, string, any> ? { readonly [tableAlias in LeftT["tableAlias"]]: { readonly [name in LeftT["name"]]: LeftT; }; } : LeftT extends Expr<any, any> ? LeftT["usedReferences"] : never)[tableAlias] : never; } & { readonly [tableAlias in Extract<Exclude<keyof (RightT extends SelectBuilder<any> ? {} : RightT extends string | number | boolean | Date | null | undefined ? {} : RightT extends Column<string, string, any> ? { readonly [tableAlias in RightT["tableAlias"]]: { readonly [name in RightT["name"]]: RightT; }; } : RightT extends Expr<any, any> ? RightT["usedReferences"] : never), keyof (LeftT extends SelectBuilder<any> ? {} : LeftT extends string | number | boolean | Date | null | undefined ? {} : LeftT extends Column<string, string, any> ? { readonly [tableAlias in LeftT["tableAlias"]]: { readonly [name in LeftT["name"]]: LeftT; }; } : LeftT extends Expr<any, any> ? LeftT["usedReferences"] : never)>, string>]: (RightT extends SelectBuilder<any> ? {} : RightT extends string | number | boolean | Date | null | undefined ? {} : RightT extends Column<string, string, any> ? { readonly [tableAlias in RightT["tableAlias"]]: { readonly [name in RightT["name"]]: RightT; }; } : RightT extends Expr<any, any> ? RightT["usedReferences"] : never)[tableAlias] extends {
    readonly [columnName: string]: Column<string, string, any>;
} ? (RightT extends SelectBuilder<any> ? {} : RightT extends string | number | boolean | Date | null | undefined ? {} : RightT extends Column<string, string, any> ? { readonly [tableAlias in RightT["tableAlias"]]: { readonly [name in RightT["name"]]: RightT; }; } : RightT extends Expr<any, any> ? RightT["usedReferences"] : never)[tableAlias] : never; } & { readonly [tableAlias in Extract<Extract<keyof (LeftT extends SelectBuilder<any> ? {} : LeftT extends string | number | boolean | Date | null | undefined ? {} : LeftT extends Column<string, string, any> ? { readonly [tableAlias in LeftT["tableAlias"]]: { readonly [name in LeftT["name"]]: LeftT; }; } : LeftT extends Expr<any, any> ? LeftT["usedReferences"] : never), keyof (RightT extends SelectBuilder<any> ? {} : RightT extends string | number | boolean | Date | null | undefined ? {} : RightT extends Column<string, string, any> ? { readonly [tableAlias in RightT["tableAlias"]]: { readonly [name in RightT["name"]]: RightT; }; } : RightT extends Expr<any, any> ? RightT["usedReferences"] : never)>, string>]: (LeftT extends SelectBuilder<any> ? {} : LeftT extends string | number | boolean | Date | null | undefined ? {} : LeftT extends Column<string, string, any> ? { readonly [tableAlias in LeftT["tableAlias"]]: { readonly [name in LeftT["name"]]: LeftT; }; } : LeftT extends Expr<any, any> ? LeftT["usedReferences"] : never)[tableAlias] extends {
    readonly [columnName: string]: Column<string, string, any>;
} ? (RightT extends SelectBuilder<any> ? {} : RightT extends string | number | boolean | Date | null | undefined ? {} : RightT extends Column<string, string, any> ? { readonly [tableAlias in RightT["tableAlias"]]: { readonly [name in RightT["name"]]: RightT; }; } : RightT extends Expr<any, any> ? RightT["usedReferences"] : never)[tableAlias] extends {
    readonly [columnName: string]: Column<string, string, any>;
} ? { readonly [columnName in Extract<keyof (LeftT extends SelectBuilder<any> ? {} : LeftT extends string | number | boolean | Date | null | undefined ? {} : LeftT extends Column<string, string, any> ? { readonly [tableAlias in LeftT["tableAlias"]]: { readonly [name in LeftT["name"]]: LeftT; }; } : LeftT extends Expr<any, any> ? LeftT["usedReferences"] : never)[tableAlias], string>]: columnName extends keyof (RightT extends SelectBuilder<any> ? {} : RightT extends string | number | boolean | Date | null | undefined ? {} : RightT extends Column<string, string, any> ? { readonly [tableAlias in RightT["tableAlias"]]: { readonly [name in RightT["name"]]: RightT; }; } : RightT extends Expr<any, any> ? RightT["usedReferences"] : never)[tableAlias] ? Column<(LeftT extends SelectBuilder<any> ? {} : LeftT extends string | number | boolean | Date | null | undefined ? {} : LeftT extends Column<string, string, any> ? { readonly [tableAlias in LeftT["tableAlias"]]: { readonly [name in LeftT["name"]]: LeftT; }; } : LeftT extends Expr<any, any> ? LeftT["usedReferences"] : never)[tableAlias][columnName]["tableAlias"], (LeftT extends SelectBuilder<any> ? {} : LeftT extends string | number | boolean | Date | null | undefined ? {} : LeftT extends Column<string, string, any> ? { readonly [tableAlias in LeftT["tableAlias"]]: { readonly [name in LeftT["name"]]: LeftT; }; } : LeftT extends Expr<any, any> ? LeftT["usedReferences"] : never)[tableAlias][columnName]["name"], ReturnType<(LeftT extends SelectBuilder<any> ? {} : LeftT extends string | number | boolean | Date | null | undefined ? {} : LeftT extends Column<string, string, any> ? { readonly [tableAlias in LeftT["tableAlias"]]: { readonly [name in LeftT["name"]]: LeftT; }; } : LeftT extends Expr<any, any> ? LeftT["usedReferences"] : never)[tableAlias][columnName]["assertDelegate"]> & ReturnType<(RightT extends SelectBuilder<any> ? {} : RightT extends string | number | boolean | Date | null | undefined ? {} : RightT extends Column<string, string, any> ? { readonly [tableAlias in RightT["tableAlias"]]: { readonly [name in RightT["name"]]: RightT; }; } : RightT extends Expr<any, any> ? RightT["usedReferences"] : never)[tableAlias][columnName]["assertDelegate"]>> : (LeftT extends SelectBuilder<any> ? {} : LeftT extends string | number | boolean | Date | null | undefined ? {} : LeftT extends Column<string, string, any> ? { readonly [tableAlias in LeftT["tableAlias"]]: { readonly [name in LeftT["name"]]: LeftT; }; } : LeftT extends Expr<any, any> ? LeftT["usedReferences"] : never)[tableAlias][columnName]; } & (RightT extends SelectBuilder<any> ? {} : RightT extends string | number | boolean | Date | null | undefined ? {} : RightT extends Column<string, string, any> ? { readonly [tableAlias in RightT["tableAlias"]]: { readonly [name in RightT["name"]]: RightT; }; } : RightT extends Expr<any, any> ? RightT["usedReferences"] : never)[tableAlias] : never : never; }, boolean>;
export declare function and<LeftT extends RawExpr<boolean>, R0 extends RawExpr<boolean>, R1 extends RawExpr<boolean>>(left: LeftT, r0: R0, r1: R1): (Expr<ColumnReferencesUtil.Merge<ColumnReferencesUtil.Merge<RawExprUtil.UsedReferences<LeftT>, RawExprUtil.UsedReferences<R0>>, RawExprUtil.UsedReferences<R1>>, boolean>);
export declare function and<LeftT extends RawExpr<boolean>, RightT extends RawExpr<boolean>>(left: LeftT, right: RightT): (Expr<ColumnReferencesUtil.Merge<RawExprUtil.UsedReferences<LeftT>, RawExprUtil.UsedReferences<RightT>>, boolean>);
export declare function and<LeftT extends RawExpr<boolean>, RightT extends RawExpr<boolean>>(left: LeftT, ...rightArr: RightT[]): (Expr<ColumnReferencesUtil.Merge<RawExprUtil.UsedReferences<LeftT>, RawExprUtil.UsedReferences<RightT>>, boolean>);
export declare function not<RawT extends RawExpr<boolean>>(raw: RawT): Expr<RawExprUtil.UsedReferences<RawT>, boolean>;
export declare function implies<LeftT extends RawExpr<boolean>, RightT extends RawExpr<boolean>>(left: LeftT, right: RightT): (Expr<ColumnReferencesUtil.Merge<RawExprUtil.UsedReferences<LeftT>, RawExprUtil.UsedReferences<RightT>>, boolean>);
