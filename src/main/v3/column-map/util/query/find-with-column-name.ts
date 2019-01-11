import {ColumnMap} from "../../column-map";

/*
    Used for unions of ColumnMap

    (A|B)[columnName] will likely give you unknown or similar
*/
export type FindWithColumnName<
   ColumnMapT extends ColumnMap,
   ColumnNameT extends string
> = (
   ColumnMapT extends ColumnMap ?
   (
       ColumnNameT extends keyof ColumnMapT ?
       ColumnMapT[ColumnNameT] :
       never
   ) :
   never
);