import { IJoin, JoinUtil } from "../join";
import { TypeRef, TypeRefUtil } from "../type-ref";
import { ColumnRefUtil } from "../column-ref";
import { SelectItem } from "../select-item";
export declare type UnmappedFetchRefImpl<RefT extends TypeRef, JoinsT extends IJoin[]> = ({
    readonly [tableAlias in Extract<JoinUtil.Array.NonNullableTableAliases<JoinsT>, keyof RefT>]: ({
        readonly [columnName in Extract<keyof RefT[tableAlias], keyof JoinUtil.Array.FindWithTableAlias<JoinsT, tableAlias>["columns"]>]: (ReturnType<JoinUtil.Array.FindWithTableAlias<JoinsT, tableAlias>["columns"][columnName]["assertDelegate"]>);
    } & {
        readonly [columnName in Exclude<keyof RefT[tableAlias], keyof JoinUtil.Array.FindWithTableAlias<JoinsT, tableAlias>["columns"]>]: (RefT[tableAlias][columnName]);
    });
} & {
    readonly [tableAlias in Extract<JoinUtil.Array.NullableTableAliases<JoinsT>, keyof RefT>]?: ({
        readonly [columnName in Extract<keyof RefT[tableAlias], keyof JoinUtil.Array.FindWithTableAlias<JoinsT, tableAlias>["columns"]>]: (ReturnType<JoinUtil.Array.FindWithTableAlias<JoinsT, tableAlias>["columns"][columnName]["assertDelegate"]>);
    } & {
        readonly [columnName in Exclude<keyof RefT[tableAlias], keyof JoinUtil.Array.FindWithTableAlias<JoinsT, tableAlias>["columns"]>]: (RefT[tableAlias][columnName]);
    });
} & {
    readonly [tableAlias in Exclude<keyof RefT, JoinUtil.Array.TableAliases<JoinsT>>]: (RefT[tableAlias]);
});
export declare type UnmappedFetchRef<SelectsT extends SelectItem[], JoinsT extends IJoin[]> = (UnmappedFetchRefImpl<TypeRefUtil.FromColumnRef<ColumnRefUtil.FromSelectItemArray<SelectsT>>, JoinsT>);
