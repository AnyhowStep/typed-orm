import * as sd from "schema-decorator";
import { IColumn } from "./column";
import { IExpr } from "./expr";
import { ITable } from "./table";
export declare type ColumnMapping<IdentifierT> = ({
    [name in keyof IdentifierT]: IColumn<any, any, IdentifierT[name]>;
});
export declare type TableColumnsWithMapping<IdentifierT> = ({
    [name in keyof IdentifierT]: IColumn<any, any, IdentifierT[name]>;
});
export declare type ToEqualityExprFunc<IdentifierT extends object, MappingT extends ColumnMapping<IdentifierT>> = ((rawIdentifier: IdentifierT) => IExpr<{
    [name in keyof IdentifierT]: (MappingT[name] extends IColumn<infer TableNameT, infer NameT, infer TypeT> ? {
        [table in TableNameT]: {
            [name in NameT]: IColumn<TableNameT, NameT, TypeT>;
        };
    } : never);
}[keyof IdentifierT], boolean>);
export declare type TableToEqualityExprFunc<IdentifierT extends object, TableT extends ITable<any, any, any, any>> = ((rawIdentifier: IdentifierT) => IExpr<{
    [table in TableT["alias"]]: {
        [name in Extract<keyof IdentifierT, string>]: IColumn<TableT["alias"], name, IdentifierT[name]>;
    };
}, boolean>);
export declare type EqualityBuilderAddResult<ConvertFuncT extends undefined | ToEqualityExprFunc<any, any>, IdentifierT extends object, MappingT extends ColumnMapping<IdentifierT>> = (IEqualityBuilder<ConvertFuncT extends undefined ? ToEqualityExprFunc<IdentifierT, MappingT> : ((ConvertFuncT & ToEqualityExprFunc<IdentifierT, MappingT>) & (ConvertFuncT extends (raw: infer ARawT) => infer AReturnT ? (ToEqualityExprFunc<IdentifierT, MappingT> extends (raw: infer BRawT) => infer BReturnT ? ((raw: ARawT | BRawT) => (AReturnT | BReturnT)) : never) : never))>);
export declare type EqualityBuilderAddTableResult<ConvertFuncT extends undefined | ToEqualityExprFunc<any, any>, IdentifierT extends object, TableT extends ITable<any, any, any, any>> = (IEqualityBuilder<ConvertFuncT extends undefined ? TableToEqualityExprFunc<IdentifierT, TableT> : ((ConvertFuncT & TableToEqualityExprFunc<IdentifierT, TableT>) & (ConvertFuncT extends (raw: infer ARawT) => infer AReturnT ? (TableToEqualityExprFunc<IdentifierT, TableT> extends (raw: infer BRawT) => infer BReturnT ? ((raw: ARawT | BRawT) => (AReturnT | BReturnT)) : never) : never))>);
export interface IEqualityBuilder<ConvertFuncT extends undefined | ((raw: any) => IExpr<{}, boolean>) = undefined> {
    add<IdentifierT extends object, MappingT extends ColumnMapping<IdentifierT>>(identifierAssert: sd.AssertFunc<IdentifierT>, mapping: MappingT): (ColumnMapping<IdentifierT> extends MappingT ? EqualityBuilderAddResult<ConvertFuncT, IdentifierT, MappingT> : ("Extra fields not allowed in mapping" | void | never));
    addTable<IdentifierT extends object, TableT extends ITable<any, any, any, any>>(identifierAssert: sd.AssertFunc<IdentifierT>, table: TableT): (TableT["columns"] extends TableColumnsWithMapping<IdentifierT> ? EqualityBuilderAddTableResult<ConvertFuncT, IdentifierT, TableT> : ("Invalid table, does not have all the columns of IdentifierT" | void | never));
    readonly convert: ConvertFuncT;
}
export declare type IdentifierType<IEqualityBuilderT extends IEqualityBuilder<any>> = (IEqualityBuilderT extends IEqualityBuilder<infer ConvertFuncT> ? (ConvertFuncT extends ((raw: infer RawT) => any) ? RawT : never) : (never));
