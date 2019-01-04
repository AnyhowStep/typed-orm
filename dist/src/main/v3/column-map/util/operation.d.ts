import * as sd from "schema-decorator";
import { ColumnMap } from "../column-map";
import { IColumn, ColumnUtil } from "../../column";
import { Omit } from "../../type";
export declare type WithTableAlias<ColumnMapT extends ColumnMap, NewTableAliasT extends string> = ({
    readonly [columnName in Extract<keyof ColumnMapT, string>]: (ColumnUtil.WithTableAlias<ColumnMapT[columnName], NewTableAliasT>);
});
export declare function withTableAlias<ColumnMapT extends ColumnMap, NewTableAliasT extends string>(columnMap: ColumnMapT, newTableAlias: NewTableAliasT): (WithTableAlias<ColumnMapT, NewTableAliasT>);
export declare type LeftIntersect<ColumnMapA extends ColumnMap, ColumnMapB extends ColumnMap> = ({
    readonly [columnName in Extract<keyof ColumnMapA, string>]: (columnName extends keyof ColumnMapB ? IColumn<{
        readonly tableAlias: ColumnMapA[columnName]["tableAlias"];
        readonly name: ColumnMapA[columnName]["name"];
        readonly assertDelegate: sd.AssertDelegate<ReturnType<ColumnMapA[columnName]["assertDelegate"]> & ReturnType<ColumnMapB[columnName]["assertDelegate"]>>;
    }> : ColumnMapA[columnName]);
});
export declare function leftIntersect<ColumnMapA extends ColumnMap, ColumnMapB extends ColumnMap>(columnMapA: ColumnMapA, columnMapB: ColumnMapB): (LeftIntersect<ColumnMapA, ColumnMapB>);
export declare type Intersect<ColumnMapA extends ColumnMap, ColumnMapB extends ColumnMap> = (LeftIntersect<ColumnMapA, ColumnMapB> & {
    readonly [columnName in Exclude<Extract<keyof ColumnMapB, string>, keyof ColumnMapA>]: (ColumnMapB[columnName]);
});
export declare function intersect<ColumnMapA extends ColumnMap, ColumnMapB extends ColumnMap>(columnMapA: ColumnMapA, columnMapB: ColumnMapB): (Intersect<ColumnMapA, ColumnMapB>);
export declare type ToNullable<ColumnMapT extends ColumnMap> = ({
    readonly [columnName in keyof ColumnMapT]: (ColumnUtil.ToNullable<ColumnMapT[columnName]>);
});
export declare function toNullable<ColumnMapT extends ColumnMap>(columnMap: ColumnMapT): ToNullable<ColumnMapT>;
export declare type ToInterface<MapT extends ColumnMap> = ({
    readonly [columnName in keyof MapT]: (ColumnUtil.ToInterface<MapT[columnName]>);
});
export declare function omit<MapT extends ColumnMap, ArrT extends string[]>(map: MapT, arr: ArrT): Omit<MapT, ArrT[number]>;
export declare function pick<MapT extends ColumnMap, ArrT extends string[]>(map: MapT, arr: ArrT): Pick<MapT, ArrT[number]>;
//# sourceMappingURL=operation.d.ts.map