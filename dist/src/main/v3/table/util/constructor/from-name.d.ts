import { Table } from "../../table";
export declare type FromName<NameT extends string> = (Table<{
    readonly usedRef: {};
    readonly alias: NameT;
    readonly columns: {};
    readonly autoIncrement: undefined;
    readonly id: undefined;
    readonly primaryKey: undefined;
    readonly candidateKeys: [];
    readonly generated: [];
    readonly isNullable: [];
    readonly hasExplicitDefaultValue: [];
    readonly mutable: [];
    readonly parents: [];
    readonly insertAllowed: true;
    readonly deleteAllowed: true;
}>);
export declare function fromName<NameT extends string>(name: NameT): (FromName<NameT>);
//# sourceMappingURL=from-name.d.ts.map