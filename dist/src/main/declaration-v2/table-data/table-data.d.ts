import { Column, AnyColumn } from "../column";
import { ColumnCollection, ColumnCollectionUtil } from "../column-collection";
import { Tuple } from "../tuple";
import { UniqueKeyCollection } from "../unique-key-collection";
import { AnyTable } from "../table";
export interface TableData {
    readonly autoIncrement: undefined | Column<any, any, number>;
    readonly isGenerated: {
        [name: string]: true;
    };
    readonly hasDefaultValue: {
        [name: string]: true;
    };
    readonly isMutable: {
        [name: string]: true;
    };
    readonly id: undefined | Column<any, any, number>;
    readonly uniqueKeys: undefined | (UniqueKeyCollection);
    readonly parentTables: undefined | Tuple<AnyTable>;
}
export declare type AutoIncrementDelegate<ColumnCollectionT extends ColumnCollection> = ((columns: {
    [columnName in keyof ColumnCollectionT]: (ColumnCollectionT[columnName] extends Column<any, any, number> ? ColumnCollectionT[columnName] : never);
}) => (Extract<ColumnCollectionUtil.Columns<ColumnCollectionT>, Column<any, any, number>>));
export declare type IsGeneratedDelegate<DataT extends TableData, ColumnCollectionT extends ColumnCollection> = ((columns: ColumnCollectionUtil.ExcludeColumnNames<ColumnCollectionT, DataT["autoIncrement"] extends AnyColumn ? DataT["autoIncrement"]["name"] : never>) => Tuple<ColumnCollectionUtil.Columns<ColumnCollectionUtil.ExcludeColumnNames<ColumnCollectionT, DataT["autoIncrement"] extends AnyColumn ? DataT["autoIncrement"]["name"] : never>>>);
export declare type HasDefaultValueDelegate<DataT extends TableData, ColumnCollectionT extends ColumnCollection> = ((columns: ColumnCollectionUtil.ExcludeColumnNames<ColumnCollectionT, Extract<keyof DataT["isGenerated"], string>>) => Tuple<ColumnCollectionUtil.Columns<ColumnCollectionUtil.ExcludeColumnNames<ColumnCollectionT, Extract<keyof DataT["isGenerated"], string>>>>);
export declare type IsMutableDelegate<DataT extends TableData, ColumnCollectionT extends ColumnCollection> = ((columns: ColumnCollectionUtil.ExcludeColumnNames<ColumnCollectionT, Extract<keyof DataT["isGenerated"], string>>) => Tuple<ColumnCollectionUtil.Columns<ColumnCollectionUtil.ExcludeColumnNames<ColumnCollectionT, Extract<keyof DataT["isGenerated"], string>>>>);
export declare type IdDelegate<DataT extends TableData, ColumnCollectionT extends ColumnCollection> = ((columns: (DataT["autoIncrement"] extends AnyColumn ? {} : {
    [columnName in keyof ColumnCollectionT]: (ColumnCollectionT[columnName] extends Column<any, any, number> ? ColumnCollectionT[columnName] : never);
})) => (DataT["autoIncrement"] extends AnyColumn ? never : Extract<ColumnCollectionUtil.Columns<ColumnCollectionT>, Column<any, any, number>>));
export declare type AddUniqueKeyDelegate<ColumnCollectionT extends ColumnCollection> = ((columns: ColumnCollectionT) => Tuple<ColumnCollectionUtil.Columns<ColumnCollectionT>>);
//# sourceMappingURL=table-data.d.ts.map