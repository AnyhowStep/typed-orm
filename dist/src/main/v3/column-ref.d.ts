import { ColumnMap, ColumnMapUtil } from "./column-map";
import { IJoin } from "./join";
import { JoinArrayUtil } from "./join-array";
import { IColumn, Column } from "./column";
import { IQuery } from "./query";
export declare type ColumnRef = {
    readonly [tableAlias: string]: ColumnMap;
};
export declare namespace ColumnRefUtil {
    type FromJoinArray<JoinsT extends IJoin[]> = ({
        readonly [tableAlias in JoinArrayUtil.ToTableAliasUnion<JoinsT>]: (ColumnMapUtil.FromJoin<JoinArrayUtil.FindWithTableAlias<JoinsT, tableAlias>>);
    });
    function fromJoinArray<JoinsT extends IJoin[]>(joins: JoinsT): (FromJoinArray<JoinsT>);
    type HasOneTable<ColumnRefT extends ColumnRef> = (Extract<keyof ColumnRefT, string> extends never ? false : string extends Extract<keyof ColumnRefT, string> ? boolean : ({
        [tableAlias in Extract<keyof ColumnRefT, string>]: (Exclude<Extract<keyof ColumnRefT, string>, tableAlias>);
    }[Extract<keyof ColumnRefT, string>]) extends never ? true : false);
    function hasOneTable<ColumnRefT extends ColumnRef>(columnRef: ColumnRefT): HasOneTable<ColumnRefT>;
    type ToConvenient<ColumnRefT extends ColumnRef> = (HasOneTable<ColumnRefT> extends true ? ColumnRefT[Extract<keyof ColumnRefT, string>] : ColumnRefT);
    function toConvenient<ColumnRefT extends ColumnRef>(columnRef: ColumnRefT): ToConvenient<ColumnRefT>;
    type ToUnion<ColumnRefT extends ColumnRef> = (ColumnRefT extends ColumnRef ? Column.UnionFromColumnMap<ColumnRefT[keyof ColumnRefT]> : never);
    type FromColumn<ColumnT extends IColumn> = ({
        readonly [tableAlias in ColumnT["tableAlias"]]: (ColumnMapUtil.FromColumn<ColumnT>);
    });
    function fromColumn<ColumnT extends IColumn>(column: ColumnT): FromColumn<ColumnT>;
    type FromQuery<QueryT extends IQuery> = ((QueryT["joins"] extends IJoin[] ? FromJoinArray<QueryT["joins"]> : {}));
    function fromQuery<QueryT extends IQuery>(query: QueryT): FromQuery<QueryT>;
    function assertIsSubset(a: ColumnRef, b: ColumnRef): void;
}
//# sourceMappingURL=column-ref.d.ts.map