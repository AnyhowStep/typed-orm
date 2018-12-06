import { ColumnMap, ColumnMapUtil } from "./column-map";
import { IJoin } from "./join";
import { JoinArrayUtil } from "./join-array";
import { IColumn, ColumnUtil } from "./column";
import { IQuery } from "./query";
import { ColumnIdentifier } from "./column-identifier";
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
    type FromColumn<ColumnT extends IColumn> = ({
        readonly [tableAlias in ColumnT["tableAlias"]]: (ColumnMapUtil.FromColumn<ColumnT>);
    });
    function fromColumn<ColumnT extends IColumn>(column: ColumnT): FromColumn<ColumnT>;
    type FromQuery<QueryT extends IQuery> = ((QueryT["joins"] extends IJoin[] ? FromJoinArray<QueryT["joins"]> : {}) & (QueryT["parentJoins"] extends IJoin[] ? FromJoinArray<QueryT["parentJoins"]> : {}));
    function fromQuery<QueryT extends IQuery>(query: QueryT): FromQuery<QueryT>;
    function assertIsSubset(a: ColumnRef, b: ColumnRef): void;
    type HasColumnIdentifier<ColumnRefT extends ColumnRef, ColumnIdentifierT extends ColumnIdentifier> = (keyof ColumnRefT extends never ? false : ColumnRef extends ColumnRefT ? boolean : string extends ColumnIdentifierT["tableAlias"] ? (string extends ColumnIdentifierT["name"] ? boolean : ColumnIdentifierT["name"] extends ColumnUtil.Name.FromColumnRef<ColumnRefT> ? boolean : false) : ColumnIdentifierT["tableAlias"] extends keyof ColumnRefT ? (ColumnMapUtil.HasColumnIdentifier<ColumnRefT[ColumnIdentifierT["tableAlias"]], ColumnIdentifierT>) : false);
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
}
//# sourceMappingURL=column-ref.d.ts.map