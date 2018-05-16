import * as d from "../declaration";
import * as sd from "schema-decorator";
export declare class EqualityBuilder<ConvertFuncT extends undefined | d.ToEqualityExprFunc<any, any> = undefined> implements d.IEqualityBuilder<ConvertFuncT> {
    private readonly convertImpl;
    readonly convert: ConvertFuncT;
    private constructor();
    static Create(): EqualityBuilder<undefined>;
    add<IdentifierT extends object, MappingT extends d.ColumnMapping<IdentifierT>>(identifierAssert: sd.AssertFunc<IdentifierT>, mapping: MappingT): d.EqualityBuilderAddResult<ConvertFuncT, IdentifierT, MappingT>;
}
