import { IColumn } from "../../column";
import { IConnection } from "../../execution";
export declare function fetchGenerationExpression(connection: IConnection, column: IColumn): Promise<string>;
