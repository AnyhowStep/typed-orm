import {SelectItem, SelectItemUtil} from "./select-item";

export namespace SelectItemArrayUtil {
    export type ToColumnNameUnion<SelectsT extends SelectItem[]> = (
        {
            [index in Extract<keyof SelectsT, string>|number] : (
                SelectsT[index] extends SelectItem ?
                Extract<
                    SelectItemUtil.ToColumnNameUnion<SelectsT[index]>,
                    string
                > :
                never
            )
        }[Extract<keyof SelectsT, string>|number]
    );
    export type ToColumnNameUnionIgnoreIndex<
        SelectsT extends SelectItem[],
        IgnoreIndexT extends Extract<keyof SelectsT, string>
    > = (
        {
            [index in Exclude<keyof SelectsT, IgnoreIndexT>] : (
                SelectsT[index] extends SelectItem ?
                SelectItemUtil.ToColumnNameUnion<SelectsT[index]> :
                never
            )
        }[Exclude<keyof SelectsT, IgnoreIndexT>]
    );
    export type HasDuplicateColumnName<SelectsT extends SelectItem[]> = (
        {
            [index in Extract<keyof SelectsT, string>] : (
                SelectsT[index] extends SelectItem ?
                (
                    SelectItemUtil.ToColumnNameUnion<SelectsT[index]> extends ToColumnNameUnionIgnoreIndex<SelectsT, index> ?
                    true :
                    false
                ) :
                never
            )
        }[Extract<keyof SelectsT, string>]
    );

    export type ToColumnIdentifierUnion<SelectsT extends SelectItem[]> = (
        {
            [index in keyof SelectsT] : (
                SelectsT[index] extends SelectItem ?
                SelectItemUtil.ToColumnIdentifierUnion<SelectsT[index]> :
                never
            )
        }[keyof SelectsT]
    );
    export type ToColumnIdentifierUnionIgnoreIndex<
        SelectsT extends SelectItem[],
        IgnoreIndexT extends Extract<keyof SelectsT, string>
    > = (
        {
            [index in Exclude<Extract<keyof SelectsT, string>, IgnoreIndexT>] : (
                SelectsT[index] extends SelectItem ?
                SelectItemUtil.ToColumnIdentifierUnion<SelectsT[index]> :
                never
            )
        }[Exclude<Extract<keyof SelectsT, string>, IgnoreIndexT>]
    );
}