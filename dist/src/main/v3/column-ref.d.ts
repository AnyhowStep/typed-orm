import { ColumnMap, ColumnMapUtil } from "./column-map";
import { IJoin } from "./join";
import { JoinArrayUtil } from "./join-array";
import { IColumn } from "./column";
import { IQuery } from "./query";
import { ColumnIdentifier } from "./column-identifier";
import { Tuple } from "./tuple";
import { ColumnIdentifierRefUtil } from "./column-identifier-ref";
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
    type FromQueryJoins<QueryT extends IQuery> = ((QueryT["_joins"] extends IJoin[] ? FromJoinArray<QueryT["_joins"]> : {}) & (QueryT["_parentJoins"] extends IJoin[] ? FromJoinArray<QueryT["_parentJoins"]> : {}));
    function fromQueryJoins<QueryT extends IQuery>(query: QueryT): FromQueryJoins<QueryT>;
    function assertIsSubset(a: ColumnRef, b: ColumnRef): void;
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
    type IntersectTuple<ArrT extends Tuple<ColumnRef>> = (ArrT["length"] extends 0 ? {} : ArrT["length"] extends 1 ? ArrT[0] : ArrT["length"] extends 2 ? ArrT[0] & ArrT[1] : ArrT["length"] extends 3 ? ArrT[0] & ArrT[1] & ArrT[2] : ArrT["length"] extends 4 ? ArrT[0] & ArrT[1] & ArrT[2] & ArrT[3] : ArrT["length"] extends 5 ? ArrT[0] & ArrT[1] & ArrT[2] & ArrT[3] & ArrT[4] : ArrT["length"] extends 6 ? ArrT[0] & ArrT[1] & ArrT[2] & ArrT[3] & ArrT[4] & ArrT[5] : ArrT["length"] extends 7 ? ArrT[0] & ArrT[1] & ArrT[2] & ArrT[3] & ArrT[4] & ArrT[5] & ArrT[6] : ArrT["length"] extends 8 ? ArrT[0] & ArrT[1] & ArrT[2] & ArrT[3] & ArrT[4] & ArrT[5] & ArrT[6] & ArrT[7] : ArrT["length"] extends 9 ? ArrT[0] & ArrT[1] & ArrT[2] & ArrT[3] & ArrT[4] & ArrT[5] & ArrT[6] & ArrT[7] & ArrT[8] : ArrT["length"] extends 10 ? ArrT[0] & ArrT[1] & ArrT[2] & ArrT[3] & ArrT[4] & ArrT[5] & ArrT[6] & ArrT[7] & ArrT[8] & ArrT[9] : ArrT["length"] extends 11 ? ArrT[0] & ArrT[1] & ArrT[2] & ArrT[3] & ArrT[4] & ArrT[5] & ArrT[6] & ArrT[7] & ArrT[8] & ArrT[9] & ArrT[10] : ArrT["length"] extends 12 ? ArrT[0] & ArrT[1] & ArrT[2] & ArrT[3] & ArrT[4] & ArrT[5] & ArrT[6] & ArrT[7] & ArrT[8] & ArrT[9] & ArrT[10] & ArrT[11] : ArrT["length"] extends 13 ? ArrT[0] & ArrT[1] & ArrT[2] & ArrT[3] & ArrT[4] & ArrT[5] & ArrT[6] & ArrT[7] & ArrT[8] & ArrT[9] & ArrT[10] & ArrT[11] & ArrT[12] : ArrT["length"] extends 14 ? ArrT[0] & ArrT[1] & ArrT[2] & ArrT[3] & ArrT[4] & ArrT[5] & ArrT[6] & ArrT[7] & ArrT[8] & ArrT[9] & ArrT[10] & ArrT[11] & ArrT[12] & ArrT[13] : ArrT["length"] extends 15 ? ArrT[0] & ArrT[1] & ArrT[2] & ArrT[3] & ArrT[4] & ArrT[5] & ArrT[6] & ArrT[7] & ArrT[8] & ArrT[9] & ArrT[10] & ArrT[11] & ArrT[12] & ArrT[13] & ArrT[14] : ArrT["length"] extends 16 ? ArrT[0] & ArrT[1] & ArrT[2] & ArrT[3] & ArrT[4] & ArrT[5] & ArrT[6] & ArrT[7] & ArrT[8] & ArrT[9] & ArrT[10] & ArrT[11] & ArrT[12] & ArrT[13] & ArrT[14] & ArrT[15] : ArrT["length"] extends 17 ? ArrT[0] & ArrT[1] & ArrT[2] & ArrT[3] & ArrT[4] & ArrT[5] & ArrT[6] & ArrT[7] & ArrT[8] & ArrT[9] & ArrT[10] & ArrT[11] & ArrT[12] & ArrT[13] & ArrT[14] & ArrT[15] & ArrT[16] : ArrT["length"] extends 18 ? ArrT[0] & ArrT[1] & ArrT[2] & ArrT[3] & ArrT[4] & ArrT[5] & ArrT[6] & ArrT[7] & ArrT[8] & ArrT[9] & ArrT[10] & ArrT[11] & ArrT[12] & ArrT[13] & ArrT[14] & ArrT[15] & ArrT[16] & ArrT[17] : ArrT["length"] extends 19 ? ArrT[0] & ArrT[1] & ArrT[2] & ArrT[3] & ArrT[4] & ArrT[5] & ArrT[6] & ArrT[7] & ArrT[8] & ArrT[9] & ArrT[10] & ArrT[11] & ArrT[12] & ArrT[13] & ArrT[14] & ArrT[15] & ArrT[16] & ArrT[17] & ArrT[18] : ArrT["length"] extends 20 ? ArrT[0] & ArrT[1] & ArrT[2] & ArrT[3] & ArrT[4] & ArrT[5] & ArrT[6] & ArrT[7] & ArrT[8] & ArrT[9] & ArrT[10] & ArrT[11] & ArrT[12] & ArrT[13] & ArrT[14] & ArrT[15] & ArrT[16] & ArrT[17] & ArrT[18] & ArrT[19] : ColumnRef);
    function intersectTuple<ArrT extends Tuple<ColumnRef>>(...arr: ArrT): IntersectTuple<ArrT>;
}
//# sourceMappingURL=column-ref.d.ts.map