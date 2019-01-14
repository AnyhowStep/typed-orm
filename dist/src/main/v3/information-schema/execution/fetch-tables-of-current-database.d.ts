import { IConnection } from "../../execution";
export declare function fetchTablesOfCurrentDatabase(connection: IConnection): Promise<{
    readonly AUTO_INCREMENT: bigint | null;
    readonly CHECKSUM: bigint | null;
    readonly ENGINE: string | null;
    readonly ROW_FORMAT: string | null;
    readonly TABLE_CATALOG: string;
    readonly TABLE_SCHEMA: string;
    readonly TABLE_NAME: string;
    readonly TABLE_TYPE: string;
    readonly VERSION: bigint | null;
    readonly TABLE_ROWS: bigint | null;
    readonly AVG_ROW_LENGTH: bigint | null;
    readonly DATA_LENGTH: bigint | null;
    readonly MAX_DATA_LENGTH: bigint | null;
    readonly INDEX_LENGTH: bigint | null;
    readonly DATA_FREE: bigint | null;
    readonly CREATE_TIME: Date | null;
    readonly UPDATE_TIME: Date | null;
    readonly CHECK_TIME: Date | null;
    readonly TABLE_COLLATION: string | null;
    readonly CREATE_OPTIONS: string | null;
    readonly TABLE_COMMENT: string;
}[]>;
//# sourceMappingURL=fetch-tables-of-current-database.d.ts.map