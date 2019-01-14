import { IConnection } from "../../execution";
export declare function fetchCandidateKeysOfTable(connection: IConnection, tableName: string): Promise<{
    name: string;
    columns: string[];
}[]>;
//# sourceMappingURL=fetch-candidate-keys-of-table.d.ts.map