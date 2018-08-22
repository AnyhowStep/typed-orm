import { Tuple, TupleKeys, TupleLength } from "../tuple";
import { AnyColumn, Column } from "./column";
import { ColumnUtil } from "./util";
export declare namespace ColumnTupleUtil {
    type WithTableAlias<TupleT extends Tuple<AnyColumn>, NewTableAliasT extends string> = ({
        [index in TupleKeys<TupleT>]: (TupleT[index] extends AnyColumn ? ColumnUtil.WithTableAlias<TupleT[index], NewTableAliasT> : never);
    } & {
        length: TupleLength<TupleT>;
    } & {
        "0": ColumnUtil.WithTableAlias<TupleT[0], NewTableAliasT>;
    } & AnyColumn[]);
    function withTableAlias<TupleT extends Tuple<any>, NewTableAliasT extends string>(tuple: TupleT, newTableAlias: NewTableAliasT): (WithTableAlias<TupleT, NewTableAliasT>);
    type HasDuplicate<TupleT extends Tuple<AnyColumn>> = (TupleT["length"] extends 1 ? false : ({
        [index in TupleKeys<TupleT>]: ({
            [other in Exclude<TupleKeys<TupleT>, index>]: (Extract<TupleT[index], TupleT[other]> extends never ? false : true);
        }[Exclude<TupleKeys<TupleT>, index>]);
    }[TupleKeys<TupleT>]));
    type MapToColumnNames<TupleT extends Tuple<AnyColumn>> = ({
        [index in TupleKeys<TupleT>]: (TupleT[index] extends AnyColumn ? TupleT[index]["name"] : never);
    } & {
        "0": TupleT[0]["name"];
        length: TupleLength<TupleT>;
    } & string[]);
    type FindColumnsWithTableAlias<TupleT extends Tuple<AnyColumn>, TableAliasT extends string> = ({
        [index in TupleKeys<TupleT>]: (Extract<TupleT[index], Column<TableAliasT, any, any>>);
    }[TupleKeys<TupleT>]);
    type FindColumn<TupleT extends Tuple<AnyColumn>, TableAliasT extends string, NameT extends string> = ({
        [index in TupleKeys<TupleT>]: (Extract<TupleT[index], Column<TableAliasT, NameT, any>>);
    }[TupleKeys<TupleT>]);
    type ToColumnReferences<TupleT extends Tuple<AnyColumn>> = {
        [tableAlias in Extract<TupleT[TupleKeys<TupleT>], AnyColumn>["tableAlias"]]: {
            [columnName in FindColumnsWithTableAlias<TupleT, tableAlias>["name"]]: (FindColumn<TupleT, tableAlias, columnName>);
        };
    };
}
//# sourceMappingURL=tuple-util.d.ts.map