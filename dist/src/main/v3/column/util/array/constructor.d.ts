import { ColumnMap } from "../../../column-map";
import * as Ctor from "../constructor";
import { IJoin } from "../../../join";
export declare type FromColumnMap<ColumnMapT extends ColumnMap> = (Ctor.FromColumnMap<ColumnMapT>[]);
export declare function fromColumnMap<ColumnMapT extends ColumnMap>(columnMap: ColumnMapT): FromColumnMap<ColumnMapT>;
export declare type FromJoin<JoinT extends IJoin> = (Ctor.FromJoin<JoinT>[]);
export declare function fromJoin<JoinT extends IJoin>(join: JoinT): FromJoin<JoinT>;
export declare type FromJoinArray<JoinsT extends IJoin[]> = (Ctor.FromJoinArray<JoinsT>[]);
export declare function fromJoinArray<JoinsT extends IJoin[]>(joins: JoinsT): FromJoinArray<JoinsT>;
//# sourceMappingURL=constructor.d.ts.map