import { ITable } from "../../../table";
import { IConnection } from "../../../../execution";
export interface ValidateTableArrayResult {
    warnings: string[];
    errors: string[];
}
export declare function validate(tables: ITable[], connection: IConnection, result: ValidateTableArrayResult): Promise<void>;
