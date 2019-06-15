import * as sd from "type-mapping";
declare function double(): sd.FluentMapper<sd.Mapper<unknown, number> & sd.ExpectedInput<number> & sd.MappableInput<string | number>>;
declare namespace double {
    var nullable: () => sd.Mapper<unknown, number | null> & sd.ExpectedInput<number | null> & sd.MappableInput<string | number | null>;
}
export { double };
