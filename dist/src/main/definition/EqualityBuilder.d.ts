import * as d from "../declaration";
import * as sd from "schema-decorator";
export declare class EqualityBuilder<ConvertFuncT extends undefined | ((raw: any) => d.IExpr<{}, boolean>) = undefined> implements d.IEqualityBuilder<ConvertFuncT> {
    private readonly convertImpl;
    readonly convert: ConvertFuncT;
    private constructor();
    static Create(): EqualityBuilder<undefined>;
    add<IdentifierT extends object, MappingT extends d.ColumnMapping<IdentifierT>>(identifierAssert: sd.AssertFunc<IdentifierT>, mapping: MappingT): d.EqualityBuilderAddResult<ConvertFuncT, IdentifierT, MappingT>;
    addTable<IdentifierT extends object, TableT extends d.ITable<any, any, any, any>>(identifierAssert: sd.AssertFunc<IdentifierT>, table: TableT): (TableT["columns"] extends d.TableColumnsWithMapping<IdentifierT> ? d.EqualityBuilderAddTableResult<ConvertFuncT, IdentifierT, TableT> : ("Invalid table, does not have all the columns of IdentifierT" | void | never));
}
