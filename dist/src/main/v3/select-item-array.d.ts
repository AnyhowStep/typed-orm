import { SelectItem, SelectItemUtil } from "./select-item";
import { ColumnRef, ColumnRefUtil } from "./column-ref";
export declare namespace SelectItemArrayUtil {
    type ToColumnNameUnion<SelectsT extends SelectItem[]> = ({
        [index in Extract<keyof SelectsT, string> | number]: (SelectsT[index] extends SelectItem ? Extract<SelectItemUtil.ToColumnNameUnion<SelectsT[index]>, string> : never);
    }[Extract<keyof SelectsT, string> | number]);
    type ToColumnNameUnionIgnoreIndex<SelectsT extends SelectItem[], IgnoreIndexT extends Extract<keyof SelectsT, string>> = ({
        [index in Exclude<Extract<keyof SelectsT, string>, IgnoreIndexT>]: (SelectsT[index] extends SelectItem ? SelectItemUtil.ToColumnNameUnion<SelectsT[index]> : never);
    }[Exclude<Extract<keyof SelectsT, string>, IgnoreIndexT>]);
    type DuplicateColumnName<SelectsT extends SelectItem[]> = ({
        [index in Extract<keyof SelectsT, string>]: (SelectsT[index] extends SelectItem ? (Extract<SelectItemUtil.ToColumnNameUnion<SelectsT[index]>, ToColumnNameUnionIgnoreIndex<SelectsT, index>> | (SelectsT[index] extends ColumnRef ? ColumnRefUtil.DuplicateColumnName<SelectsT[index]> : never)) : never);
    }[Extract<keyof SelectsT, string>]);
    type HasDuplicateColumnName<SelectsT extends SelectItem[]> = (DuplicateColumnName<SelectsT> extends never ? false : true);
    function isSelectItemArray(raw: any): raw is SelectItem[];
    function hasDuplicateColumnName(arr: SelectItem[]): boolean;
    function assertNoDuplicateColumnName(arr: SelectItem[]): void;
}
