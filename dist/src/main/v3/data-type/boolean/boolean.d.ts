import * as sd from "type-mapping";
export declare const assertBoolean: sd.FluentMapper<sd.Mapper<unknown, boolean> & sd.ExpectedInput<boolean> & sd.MappableInput<boolean | 0 | 1 | "0" | "1" | "false" | "true">>;
export declare const assertTrue: sd.FluentMapper<sd.Mapper<unknown, true> & sd.ExpectedInput<true> & sd.MappableInput<true | 1 | "1" | "true">>;
export declare const assertFalse: sd.FluentMapper<sd.Mapper<unknown, false> & sd.ExpectedInput<false> & sd.MappableInput<false | 0 | "0" | "false">>;
declare function boolean(): sd.FluentMapper<sd.Mapper<unknown, boolean> & sd.ExpectedInput<boolean> & sd.MappableInput<boolean | 0 | 1 | "0" | "1" | "false" | "true">>;
declare namespace boolean {
    var nullable: () => sd.Mapper<unknown, boolean | null> & sd.ExpectedInput<boolean | null> & sd.MappableInput<boolean | 0 | 1 | "0" | "1" | "false" | "true" | null>;
}
declare function getTrue(): sd.FluentMapper<sd.Mapper<unknown, true> & sd.ExpectedInput<true> & sd.MappableInput<true | 1 | "1" | "true">>;
declare namespace getTrue {
    var nullable: () => sd.Mapper<unknown, true | null> & sd.ExpectedInput<true | null> & sd.MappableInput<true | 1 | "1" | "true" | null>;
}
declare function getFalse(): sd.FluentMapper<sd.Mapper<unknown, false> & sd.ExpectedInput<false> & sd.MappableInput<false | 0 | "0" | "false">>;
declare namespace getFalse {
    var nullable: () => sd.Mapper<unknown, false | null> & sd.ExpectedInput<false | null> & sd.MappableInput<false | 0 | "0" | "false" | null>;
}
export { boolean, getTrue as true, getFalse as false, };
