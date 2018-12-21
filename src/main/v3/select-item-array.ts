import {SelectItem, SelectItemUtil} from "./select-item";
import { ColumnRef, ColumnRefUtil } from "./column-ref";

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
            [index in Exclude<Extract<keyof SelectsT, string>, IgnoreIndexT>] : (
                SelectsT[index] extends SelectItem ?
                SelectItemUtil.ToColumnNameUnion<SelectsT[index]> :
                never
            )
        }[Exclude<Extract<keyof SelectsT, string>, IgnoreIndexT>]
    );
    export type DuplicateColumnName<SelectsT extends SelectItem[]> = (
        {
            [index in Extract<keyof SelectsT, string>] : (
                SelectsT[index] extends SelectItem ?
                (
                    Extract<
                        SelectItemUtil.ToColumnNameUnion<SelectsT[index]>,
                        ToColumnNameUnionIgnoreIndex<SelectsT, index>
                    > |
                    (
                        SelectsT[index] extends ColumnRef ?
                        ColumnRefUtil.DuplicateColumnName<SelectsT[index]> :
                        never
                    )
                ) :
                never
            )
        }[Extract<keyof SelectsT, string>]
    );
    export type HasDuplicateColumnName<SelectsT extends SelectItem[]> = (
        DuplicateColumnName<SelectsT> extends never ?
        false :
        true
    );
    export function isSelectItemArray (raw : any) : raw is SelectItem[] {
        if (!(raw instanceof Array)) {
            return false;
        }
        for (let item of raw) {
            if (!SelectItemUtil.isSelectItem(item)) {
                return false;
            }
        }
        return true;
    }
    export function assertNoDuplicateColumnName (arr : SelectItem[]) {
        const seen : string[] = [];
        for (let item of arr) {
            for (let name of SelectItemUtil.getColumnNames(item)) {
                if (seen.indexOf(name) >= 0) {
                    throw new Error(`Duplicate column name '${name}' found`);
                }
                seen.push(name);
            }
        }
    }
}