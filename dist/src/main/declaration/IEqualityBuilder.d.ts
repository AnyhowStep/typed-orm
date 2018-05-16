import * as sd from "schema-decorator";
import { IColumn } from "./column";
import { IExpr } from "./expr";
export declare type ColumnMapping<IdentifierT> = {
    [name in keyof IdentifierT]: IColumn<any, any, IdentifierT[name]>;
};
export declare type ToEqualityExprFunc<IdentifierT extends object, MappingT extends ColumnMapping<IdentifierT>> = ((rawIdentifier: IdentifierT) => IExpr<{
    [name in keyof IdentifierT]: (MappingT[name] extends IColumn<infer TableNameT, infer NameT, infer TypeT> ? {
        [table in TableNameT]: {
            [name in NameT]: IColumn<TableNameT, NameT, TypeT>;
        };
    } : never);
}[keyof IdentifierT], boolean>);
export declare type EqualityBuilderAddResult<ConvertFuncT extends undefined | ToEqualityExprFunc<any, any>, IdentifierT extends object, MappingT extends ColumnMapping<IdentifierT>> = (IEqualityBuilder<ConvertFuncT extends undefined ? ToEqualityExprFunc<IdentifierT, MappingT> : ((ConvertFuncT & ToEqualityExprFunc<IdentifierT, MappingT>) & (ConvertFuncT extends (raw: infer ARawT) => infer AReturnT ? (ToEqualityExprFunc<IdentifierT, MappingT> extends (raw: infer BRawT) => infer BReturnT ? ((raw: ARawT | BRawT) => (AReturnT | BReturnT)) : never) : never))>);
export interface IEqualityBuilder<ConvertFuncT extends undefined | ToEqualityExprFunc<any, any> = undefined> {
    add<IdentifierT extends object, MappingT extends ColumnMapping<IdentifierT>>(identifierAssert: sd.AssertFunc<IdentifierT>, mapping: MappingT): EqualityBuilderAddResult<ConvertFuncT, IdentifierT, MappingT>;
    readonly convert: ConvertFuncT;
}
