import { ITable } from "../../../table";
import { GeneratedColumnNames } from "../query";
export declare type IsGenerated<TableT extends ITable, NameT extends string> = (NameT extends GeneratedColumnNames<TableT> ? true : false);
//# sourceMappingURL=is-generated.d.ts.map