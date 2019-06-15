import * as sd from "type-mapping";
export declare type Decimal = string;
declare function decimal(): sd.FluentMapper<sd.Mapper<unknown, string> & sd.ExpectedInput<string> & sd.MappableInput<string | number>>;
declare namespace decimal {
    var nullable: () => sd.Mapper<unknown, string | null> & sd.ExpectedInput<string | null> & sd.MappableInput<string | number | null>;
}
export { decimal };
