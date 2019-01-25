import { IColumn } from "../../../column";
export declare type FromColumnArray<ColumnsT extends IColumn[]> = ({
    readonly [columnName in ColumnsT[number]["name"]]: (Extract<ColumnsT[number], {
        name: columnName;
    }>);
});
export declare function fromColumnArray<ColumnsT extends IColumn[]>(columns: ColumnsT): FromColumnArray<ColumnsT>;
