import {ColumnReferences} from "./column-references";
import {IColumn} from "./column";
import {ColumnType} from "./column-operation";

export type Union<T> = (T[keyof T]);
export type ColumnOfReferencesInner<ColumnReferencesT extends ColumnReferences> = ({
    data: {
        [k in keyof ColumnReferencesT] : (
            Union<ColumnReferencesT[k]>
        )
    }
});
export type ColumnOfReferences<ColumnReferencesT extends ColumnReferences> = (
    {
        data : {
            [k in keyof ColumnOfReferencesInner<ColumnReferencesT>] : (
                Union<ColumnOfReferencesInner<ColumnReferencesT>[k]>
            )
        }
    }["data"]["data"]
);
export type ToNullableColumnReferences<ColumnReferencesT extends ColumnReferences> = (
    {
        [table in keyof ColumnReferencesT] : {
            [column in keyof ColumnReferencesT[table]] : (
                ColumnReferencesT[table][column] extends IColumn<any, any, infer TypeT> ?
                    (
                        IColumn<table, column, TypeT|null>
                    ) :
                    (("Invalid ColumnT or could not infer TypeT of ColumnT"&table&column)&never&void)
            )
        }
    }
)

//TODO Rename to References
export type ReplaceColumnOfReference<
    ColumnReferencesT extends ColumnReferences,
    TableNameT extends string,
    NameT extends string,
    NewTypeT
> = (
    {
        [table in keyof ColumnReferencesT] : {
            [column in keyof ColumnReferencesT[table]] : (
                ColumnReferencesT[table][column] extends IColumn<TableNameT, NameT, any> ?
                    IColumn<TableNameT, NameT, NewTypeT> :
                    (ColumnReferencesT[table][column])
                /*table extends TableNameT ?
                    (
                        column extends NameT ?
                            (
                                IColumn<TableNameT, NameT, NewTypeT>
                            ) :
                            (ColumnReferencesT[table][column])
                    ) :
                    (ColumnReferencesT[table][column])*/
            )
        }
    }
);

export type ToPartialColumnReferences<ColumnReferencesT extends ColumnReferences> = {
    [table in keyof ColumnReferencesT]+? : {
        [column in keyof ColumnReferencesT[table]]+? : ColumnReferencesT[table][column]
    }
};

export type PartialToColumnReferences<PartialT extends ColumnReferences> = {
    [table in keyof PartialT] : {
        [column in keyof PartialT[table]] : Exclude<PartialT[table][column], undefined>
    }
}

export type ColumnReferencesToSchema<ColumnReferencesT extends ColumnReferences> = {
    [table in keyof ColumnReferencesT] : {
        [column in keyof ColumnReferencesT[table]] : ColumnType<ColumnReferencesT[table][column]>
    }
}
