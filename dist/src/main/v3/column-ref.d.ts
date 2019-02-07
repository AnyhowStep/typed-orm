import { ColumnMap, ColumnMapUtil } from "./column-map";
import { IJoin, JoinUtil } from "./join";
import { IColumn, ColumnUtil } from "./column";
import { IQuery } from "./query";
import { ColumnIdentifier } from "./column-identifier";
import { Tuple } from "./tuple";
import { ColumnIdentifierRefUtil, ColumnIdentifierRef } from "./column-identifier-ref";
import { SelectItem } from "./select-item";
import { IExprSelectItem } from "./expr-select-item";
import { UnionToIntersection } from "./type";
export declare type ColumnRef = {
    readonly [tableAlias: string]: ColumnMap;
};
export declare namespace ColumnRefUtil {
    type FromJoinArray<JoinsT extends IJoin[]> = ({
        readonly [tableAlias in JoinUtil.Array.TableAliases<JoinsT>]: (ColumnMapUtil.FromJoin<JoinUtil.Array.FindWithTableAlias<JoinsT, tableAlias>>);
    });
    function fromJoinArray<JoinsT extends IJoin[]>(joins: JoinsT): (FromJoinArray<JoinsT>);
    type HasOneTable<ColumnRefT extends ColumnRef> = (Extract<keyof ColumnRefT, string> extends never ? false : string extends Extract<keyof ColumnRefT, string> ? boolean : ({
        [tableAlias in Extract<keyof ColumnRefT, string>]: (Exclude<Extract<keyof ColumnRefT, string>, tableAlias>);
    }[Extract<keyof ColumnRefT, string>]) extends never ? true : false);
    function hasOneTable<ColumnRefT extends ColumnRef>(columnRef: ColumnRefT): HasOneTable<ColumnRefT>;
    type ToConvenient<ColumnRefT extends ColumnRef> = (HasOneTable<ColumnRefT> extends true ? ColumnRefT[Extract<keyof ColumnRefT, string>] : ColumnRefT);
    function toConvenient<ColumnRefT extends ColumnRef>(columnRef: ColumnRefT): ToConvenient<ColumnRefT>;
    type FromColumn<ColumnT extends IColumn> = ({
        readonly [tableAlias in ColumnT["tableAlias"]]: (ColumnMapUtil.FromColumn<ColumnT>);
    });
    function fromColumn<ColumnT extends IColumn>(column: ColumnT): FromColumn<ColumnT>;
    type FromQueryJoins<QueryT extends IQuery> = ((QueryT["_joins"] extends IJoin[] ? FromJoinArray<QueryT["_joins"]> : {}) & (QueryT["_parentJoins"] extends IJoin[] ? FromJoinArray<QueryT["_parentJoins"]> : {}));
    function fromQueryJoins<QueryT extends IQuery>(query: QueryT): FromQueryJoins<QueryT>;
    type FromSelectItemArray_ColumnElement<ColumnT extends IColumn> = ({
        readonly [tableAlias in ColumnT["tableAlias"]]: {
            readonly [columnName in ColumnT["name"]]: (Extract<ColumnT, {
                tableAlias: tableAlias;
                name: columnName;
            }>);
        };
    });
    type FromSelectItemArray_ExprSelectItemElement<ExprSelectItemT extends IExprSelectItem> = ({
        readonly [tableAlias in ExprSelectItemT["tableAlias"]]: {
            readonly [columnName in ExprSelectItemT["alias"]]: (ColumnUtil.FromExprSelectItem<Extract<ExprSelectItemT, {
                tableAlias: tableAlias;
                alias: columnName;
            }>>);
        };
    });
    type FromSelectItemArray_ColumnMapElement<ColumnMapT extends ColumnMap> = ({
        readonly [tableAlias in ColumnMapUtil.TableAlias<ColumnMapT>]: {
            readonly [columnName in ColumnMapUtil.FindWithTableAlias<ColumnMapT, tableAlias>["name"]]: (Extract<ColumnMapT, {
                [k in columnName]: (IColumn & {
                    tableAlias: tableAlias;
                    name: columnName;
                });
            }>[columnName]);
        };
    });
    type FromSelectItemArray_ColumnRefElement<ColumnRefT extends ColumnRef> = (ColumnRefT[keyof ColumnRefT] extends ColumnMap ? {
        readonly [tableAlias in ColumnRefUtil.TableAlias<ColumnRefT>]: {
            readonly [columnName in ColumnRefUtil.FindWithTableAlias<ColumnRefT, tableAlias>["name"]]: (Extract<ColumnRefT, {
                [ta in tableAlias]: {
                    [cn in columnName]: IColumn;
                };
            }>[tableAlias][columnName]);
        };
    } : {});
    type FromSelectItemArray<ArrT extends SelectItem[]> = (ArrT[number] extends never ? {} : (FromSelectItemArray_ColumnElement<Extract<ArrT[number], IColumn>> & FromSelectItemArray_ExprSelectItemElement<Extract<ArrT[number], IExprSelectItem>> & FromSelectItemArray_ColumnMapElement<Extract<ArrT[number], ColumnMap>> & FromSelectItemArray_ColumnRefElement<Extract<ArrT[number], ColumnRef>>));
    function fromSelectItemArray<ArrT extends SelectItem[]>(arr: ArrT): FromSelectItemArray<ArrT>;
    type FromQuerySelects<QueryT extends IQuery> = (QueryT["_selects"] extends SelectItem[] ? FromSelectItemArray<QueryT["_selects"]> : {});
    function fromQuerySelects<QueryT extends IQuery>(query: QueryT): FromQuerySelects<QueryT>;
    type FromQuery<QueryT extends IQuery> = (FromQueryJoins<QueryT> & FromQuerySelects<QueryT>);
    function fromQuery<QueryT extends IQuery>(query: QueryT): FromQuery<QueryT>;
    function assertIsSubset(a: ColumnIdentifierRef, b: ColumnIdentifierRef): void;
    type HasColumnIdentifier<ColumnRefT extends ColumnRef, ColumnIdentifierT extends ColumnIdentifier> = (ColumnIdentifierRefUtil.HasColumnIdentifier<ColumnRefT, ColumnIdentifierT>);
    function hasColumnIdentifier<ColumnRefT extends ColumnRef, ColumnIdentifierT extends ColumnIdentifier>(columnRef: ColumnRefT, columnIdentifier: ColumnIdentifierT): (HasColumnIdentifier<ColumnRefT, ColumnIdentifierT>);
    function assertHasColumnIdentifier(columnRef: ColumnRef, columnIdentifier: ColumnIdentifier): void;
    function assertHasColumnIdentifiers(columnRef: ColumnRef, columnIdentifiers: ColumnIdentifier[]): void;
    type FromColumnArray<ColumnsT extends IColumn[]> = ({
        readonly [tableAlias in ColumnsT[number]["tableAlias"]]: (ColumnMapUtil.FromColumnArray<Extract<ColumnsT[number], {
            tableAlias: tableAlias;
        }>[]>);
    });
    function fromColumnArray<ColumnsT extends IColumn[]>(columns: ColumnsT): FromColumnArray<ColumnsT>;
    type LeftIntersect<ColumnRefA extends ColumnRef, ColumnRefB extends ColumnRef> = ({
        readonly [tableAlias in Extract<keyof ColumnRefA, string>]: (tableAlias extends keyof ColumnRefB ? ColumnMapUtil.Intersect<ColumnRefA[tableAlias], ColumnRefB[tableAlias]> : ColumnRefA[tableAlias]);
    });
    type Intersect<ColumnRefA extends ColumnRef, ColumnRefB extends ColumnRef> = (Extract<LeftIntersect<ColumnRefA, ColumnRefB> & {
        readonly [tableAlias in Exclude<Extract<keyof ColumnRefB, string>, keyof ColumnRefA>]: (ColumnRefB[tableAlias]);
    }, ColumnRef>);
    function intersect<ColumnRefA extends ColumnRef, ColumnRefB extends ColumnRef>(columnRefA: ColumnRefA, columnRefB: ColumnRefB): Intersect<ColumnRefA, ColumnRefB>;
    type IntersectTuple<ArrT extends ColumnRef[]> = (ArrT[number] extends never ? {} : Extract<UnionToIntersection<ArrT[number]>, ColumnRef>);
    function intersectTuple<ArrT extends Tuple<ColumnRef>>(...arr: ArrT): IntersectTuple<ArrT>;
    type ToPartial<RefT extends ColumnRef> = ({
        readonly [tableAlias in Extract<keyof RefT, string>]?: {
            readonly [columnName in Extract<keyof RefT[tableAlias], string>]?: (RefT[tableAlias][columnName]);
        };
    });
    function isColumnRef(raw: any): raw is ColumnRef;
    type TableAlias<RefT extends ColumnRef> = (RefT extends ColumnRef ? Extract<keyof RefT, string> : never);
    type FindWithTableAlias<RefT extends ColumnRef, TableAliasT extends string> = (RefT extends ColumnRef ? ColumnMapUtil.FindWithTableAlias<RefT[Extract<keyof RefT, string>], TableAliasT> : never);
    type FindWithColumnName<RefT extends ColumnRef, ColumnNameT extends string> = (RefT extends ColumnRef ? ColumnMapUtil.FindWithColumnName<RefT[Extract<keyof RefT, string>], ColumnNameT> : never);
    function getSortedColumnArray(columnRef: ColumnRef): IColumn[];
    type DuplicateColumnName<RefT extends ColumnRef> = ({
        [tableAlias in Extract<keyof RefT, string>]: (Extract<ColumnMapUtil.ColumnNames<RefT[tableAlias]>, ColumnMapUtil.ColumnNames<RefT[Exclude<Extract<keyof RefT, string>, tableAlias>]>>);
    }[Extract<keyof RefT, string>]);
    type HasDuplicateColumnName<RefT extends ColumnRef> = (DuplicateColumnName<RefT> extends never ? false : true);
    type ToInterface<RefT extends ColumnRef> = ({
        readonly [tableAlias in keyof RefT]: (ColumnMapUtil.ToInterface<RefT[tableAlias]>);
    });
    type ColumnNames<RefT extends ColumnRef> = (RefT extends ColumnRef ? ColumnMapUtil.ColumnNames<RefT[Extract<keyof RefT, string>]> : never);
    function columnNames<RefT extends ColumnRef>(columnRef: RefT): ColumnNames<RefT>[];
}
