import { Table } from "../table";
import { Column } from "../column";
export declare const KEY_COLUMN_USAGE: Table<"KEY_COLUMN_USAGE", "KEY_COLUMN_USAGE", {
    readonly TABLE_CATALOG: Column<"KEY_COLUMN_USAGE", "TABLE_CATALOG", string>;
    readonly TABLE_SCHEMA: Column<"KEY_COLUMN_USAGE", "TABLE_SCHEMA", string>;
    readonly TABLE_NAME: Column<"KEY_COLUMN_USAGE", "TABLE_NAME", string>;
    readonly COLUMN_NAME: Column<"KEY_COLUMN_USAGE", "COLUMN_NAME", string>;
    readonly ORDINAL_POSITION: Column<"KEY_COLUMN_USAGE", "ORDINAL_POSITION", number>;
    readonly CONSTRAINT_CATALOG: Column<"KEY_COLUMN_USAGE", "CONSTRAINT_CATALOG", string>;
    readonly CONSTRAINT_SCHEMA: Column<"KEY_COLUMN_USAGE", "CONSTRAINT_SCHEMA", string>;
    readonly CONSTRAINT_NAME: Column<"KEY_COLUMN_USAGE", "CONSTRAINT_NAME", string>;
    readonly POSITION_IN_UNIQUE_CONSTRAINT: Column<"KEY_COLUMN_USAGE", "POSITION_IN_UNIQUE_CONSTRAINT", number | null>;
    readonly REFERENCED_TABLE_SCHEMA: Column<"KEY_COLUMN_USAGE", "REFERENCED_TABLE_SCHEMA", string | null>;
    readonly REFERENCED_TABLE_NAME: Column<"KEY_COLUMN_USAGE", "REFERENCED_TABLE_NAME", string | null>;
    readonly REFERENCED_COLUMN_NAME: Column<"KEY_COLUMN_USAGE", "REFERENCED_COLUMN_NAME", string | null>;
}, {
    readonly autoIncrement: undefined;
    readonly isGenerated: {
        readonly TABLE_CATALOG: true;
        readonly TABLE_SCHEMA: true;
        readonly TABLE_NAME: true;
        readonly COLUMN_NAME: true;
        readonly ORDINAL_POSITION: true;
        readonly CONSTRAINT_CATALOG: true;
        readonly CONSTRAINT_SCHEMA: true;
        readonly CONSTRAINT_NAME: true;
        readonly POSITION_IN_UNIQUE_CONSTRAINT: true;
        readonly REFERENCED_TABLE_SCHEMA: true;
        readonly REFERENCED_TABLE_NAME: true;
        readonly REFERENCED_COLUMN_NAME: true;
    };
    readonly hasDefaultValue: {
        readonly TABLE_CATALOG: true;
        readonly TABLE_SCHEMA: true;
        readonly TABLE_NAME: true;
        readonly COLUMN_NAME: true;
        readonly ORDINAL_POSITION: true;
        readonly CONSTRAINT_CATALOG: true;
        readonly CONSTRAINT_SCHEMA: true;
        readonly CONSTRAINT_NAME: true;
        readonly POSITION_IN_UNIQUE_CONSTRAINT: true;
        readonly REFERENCED_TABLE_SCHEMA: true;
        readonly REFERENCED_TABLE_NAME: true;
        readonly REFERENCED_COLUMN_NAME: true;
    };
    readonly isMutable: {};
    readonly id: undefined;
    readonly uniqueKeys: undefined;
    readonly parentTables: undefined;
    readonly noInsert: false;
}>;
//# sourceMappingURL=key-column-usage.d.ts.map