import { Column, AnyColumn } from "../column";
import { ColumnCollection, ColumnCollectionUtil } from "../column-collection";
import { Tuple } from "../tuple";
export interface TableData {
    autoIncrement: undefined | Column<any, any, number>;
    isGenerated: {
        [name: string]: true;
    };
    hasDefaultValue: {
        [name: string]: true;
    };
    isMutable: {
        [name: string]: true;
    };
}
export declare type AutoIncrementDelegate<ColumnCollectionT extends ColumnCollection> = ((columns: {
    [columnName in keyof ColumnCollectionT]: (ColumnCollectionT[columnName] extends Column<any, any, number> ? ColumnCollectionT[columnName] : never);
}) => (Extract<ColumnCollectionUtil.Columns<ColumnCollectionT>, Column<any, any, number>>));
export declare type IsGeneratedDelegate<DataT extends TableData, ColumnCollectionT extends ColumnCollection> = ((columns: ColumnCollectionUtil.ExcludeColumnNames<ColumnCollectionT, DataT["autoIncrement"] extends AnyColumn ? DataT["autoIncrement"]["name"] : never>) => Tuple<ColumnCollectionUtil.Columns<ColumnCollectionUtil.ExcludeColumnNames<ColumnCollectionT, DataT["autoIncrement"] extends AnyColumn ? DataT["autoIncrement"]["name"] : never>>>);
export declare type HasDefaultValueDelegate<DataT extends TableData, ColumnCollectionT extends ColumnCollection> = ((columns: ColumnCollectionUtil.ExcludeColumnNames<ColumnCollectionT, Extract<keyof DataT["isGenerated"], string>>) => Tuple<ColumnCollectionUtil.Columns<ColumnCollectionUtil.ExcludeColumnNames<ColumnCollectionT, Extract<keyof DataT["isGenerated"], string>>>>);
export declare type IsMutableDelegate<DataT extends TableData, ColumnCollectionT extends ColumnCollection> = ((columns: ColumnCollectionUtil.ExcludeColumnNames<ColumnCollectionT, Extract<keyof DataT["isGenerated"], string>>) => Tuple<ColumnCollectionUtil.Columns<ColumnCollectionUtil.ExcludeColumnNames<ColumnCollectionT, Extract<keyof DataT["isGenerated"], string>>>>);
