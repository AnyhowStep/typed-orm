import { ITable } from "../../table";
import { IConnection } from "../../../execution";
export interface ValidateTableResult {
    warnings: string[];
    errors: string[];
}
export declare function validateColumns(table: ITable, connection: IConnection, result: ValidateTableResult): Promise<void>;
export declare function validateCandidateKeys(table: ITable, connection: IConnection, result: ValidateTableResult): Promise<void>;
export declare function validate(table: ITable, connection: IConnection, result: ValidateTableResult): Promise<void>;
