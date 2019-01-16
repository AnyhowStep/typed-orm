import {IJoin, JoinUtil} from "../join";
import {TypeRef, TypeRefUtil} from "../type-ref";
import {ColumnRefUtil} from "../column-ref";
import {SelectItem} from "../select-item";

/*
    Our RefT maybe entirely nullable because of left/right joins.

    With left/right joins, when the table's column values are present,
    not all of them are nullable.
    JoinsT has the real data type of the RefT
*/
export type UnmappedFetchRefImpl<
    RefT extends TypeRef,
    JoinsT extends IJoin[]
> = (
    //Required
    {
        readonly [tableAlias in Extract<
            JoinUtil.Array.NonNullableTableAliases<JoinsT>,
            keyof RefT
        >] : (
            {
                readonly [columnName in Extract<
                    keyof RefT[tableAlias],
                    keyof JoinUtil.Array.FindWithTableAlias<JoinsT, tableAlias>["columns"]
                >] : (
                    //Get the real data type
                    ReturnType<
                        JoinUtil.Array.FindWithTableAlias<
                            JoinsT,
                            tableAlias
                        >["columns"][columnName]["assertDelegate"]
                    >
                )
            } &
            {
                readonly [columnName in Exclude<
                    keyof RefT[tableAlias],
                    keyof JoinUtil.Array.FindWithTableAlias<JoinsT, tableAlias>["columns"]
                >] : (
                    //Get the real data type
                    RefT[tableAlias][columnName]
                )
            }
        )
    } &
    //Optional
    {
        readonly [tableAlias in Extract<
            JoinUtil.Array.NullableTableAliases<JoinsT>,
            keyof RefT
        >]? : (
            {
                readonly [columnName in Extract<
                    keyof RefT[tableAlias],
                    keyof JoinUtil.Array.FindWithTableAlias<JoinsT, tableAlias>["columns"]
                >] : (
                    //Get the real data type
                    ReturnType<
                        JoinUtil.Array.FindWithTableAlias<
                            JoinsT,
                            tableAlias
                        >["columns"][columnName]["assertDelegate"]
                    >
                )
            } &
            {
                readonly [columnName in Exclude<
                    keyof RefT[tableAlias],
                    keyof JoinUtil.Array.FindWithTableAlias<JoinsT, tableAlias>["columns"]
                >] : (
                    //Get the real data type
                    RefT[tableAlias][columnName]
                )
            }
        )
    } &
    //Extras (Like __aliased)
    {
        readonly [tableAlias in Exclude<
            keyof RefT,
            JoinUtil.Array.TableAliases<JoinsT>
        >] : (
            RefT[tableAlias]
        )
    }
);
export type UnmappedFetchRef<
    SelectsT extends SelectItem[],
    JoinsT extends IJoin[]
> = (
    UnmappedFetchRefImpl<
        TypeRefUtil.FromColumnRef<
            ColumnRefUtil.FromSelectItemArray<SelectsT>
        >,
        JoinsT
    >
);