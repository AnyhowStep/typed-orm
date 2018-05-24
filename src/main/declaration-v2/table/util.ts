import {AnyTable} from "./table";

export namespace TableUtil {
    export type RequiredColumnNames<
        TableT extends AnyTable
    > = (
        Exclude<
            Extract<keyof TableT["columns"], string>,
            keyof TableT["data"]["hasDefaultValue"] | keyof TableT["data"]["isGenerated"]
        >
    );
    export type OptionalColumnNames<
        TableT extends AnyTable
    > = (
        Exclude<
            Extract<keyof TableT["data"]["hasDefaultValue"], string>,
            keyof TableT["data"]["isGenerated"]
        >
    );
    export function validateInsertRow (table : AnyTable, row : any) {
        for (let name in row) {
            if (!table.columns.hasOwnProperty(name)) {
                throw new Error(`Unexpected column ${name}; it does not exist on table ${table.alias}`);
            }
            if (table.data.isGenerated.hasOwnProperty(name)) {
                throw new Error(`Unexpected column ${name}; it is a generated column on table ${table.alias}, you cannot specify a value for it`);
            }
            const value = (row as any)[name];
            if (value === undefined && !table.data.hasDefaultValue.hasOwnProperty(name)) {
                throw new Error(`Expected a value for column ${name} on table ${table.alias}; received undefined`);
            }
            //If we specify a value, it better match our assertion
            if (!(value instanceof Object) || (value instanceof Date)) {
                (row as any)[name] = table.columns[name].assertDelegate(name, value) as any;
            }
        }
    }
    export function validateInsertRows (table : AnyTable, rows : any[]) {
        for (let row of rows) {
            validateInsertRow(table, row);
        }
    }
}