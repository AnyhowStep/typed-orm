import * as sd from "type-mapping";
declare function float(): sd.FluentMapper<sd.Mapper<unknown, number> & sd.ExpectedInput<number> & sd.MappableInput<string | number>>;
declare namespace float {
    var nullable: () => sd.Mapper<unknown, number | null> & sd.ExpectedInput<number | null> & sd.MappableInput<string | number | null>;
}
export { float };
