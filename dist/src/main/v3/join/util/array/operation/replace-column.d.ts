import { IJoin } from "../../../join";
import * as operation from "../../operation";
import { IColumn } from "../../../../column";
export declare type ReplaceColumn<JoinsT extends IJoin[], ColumnT extends IColumn> = (operation.ReplaceColumn<JoinsT[number], ColumnT>[]);
export declare function replaceColumn<JoinsT extends IJoin[], ColumnT extends IColumn>(joins: JoinsT, column: ColumnT): ReplaceColumn<JoinsT, ColumnT>;
