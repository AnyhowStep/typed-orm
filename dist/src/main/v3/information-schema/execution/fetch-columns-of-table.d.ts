import { IConnection } from "../../execution";
export declare function fetchColumnsOfTable(connection: IConnection, tableName: string): Promise<{
    readonly PRIVILEGES: string;
    readonly TABLE_CATALOG: string;
    readonly TABLE_SCHEMA: string;
    readonly TABLE_NAME: string;
    readonly COLUMN_NAME: string;
    readonly ORDINAL_POSITION: number;
    readonly COLUMN_DEFAULT: string | null;
    readonly IS_NULLABLE: string;
    readonly DATA_TYPE: string;
    readonly CHARACTER_MAXIMUM_LENGTH: bigint | null;
    readonly CHARACTER_OCTET_LENGTH: bigint | null;
    readonly NUMERIC_PRECISION: number | null;
    readonly NUMERIC_SCALE: number | null;
    readonly DATETIME_PRECISION: number | null;
    readonly CHARACTER_SET_NAME: string | null;
    readonly COLLATION_NAME: string | null;
    readonly COLUMN_TYPE: string;
    readonly COLUMN_KEY: string;
    readonly EXTRA: string;
    readonly COLUMN_COMMENT: string;
    readonly GENERATION_EXPRESSION: string;
}[]>;
//# sourceMappingURL=fetch-columns-of-table.d.ts.map