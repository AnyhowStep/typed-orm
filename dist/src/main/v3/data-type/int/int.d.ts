import * as sd from "type-mapping";
declare function unsafeInt(): sd.Mapper<unknown, number> & sd.ExpectedInput<number> & sd.MappableInput<string | number>;
declare namespace unsafeInt {
    var nullable: () => sd.Mapper<unknown, number | null> & sd.ExpectedInput<number | null> & sd.MappableInput<string | number | null>;
}
declare function tinyIntSigned(): sd.Mapper<unknown, number> & sd.ExpectedInput<number> & sd.MappableInput<string | number>;
declare namespace tinyIntSigned {
    var nullable: () => sd.Mapper<unknown, number | null> & sd.ExpectedInput<number | null> & sd.MappableInput<string | number | null>;
}
declare function smallIntSigned(): sd.Mapper<unknown, number> & sd.ExpectedInput<number> & sd.MappableInput<string | number>;
declare namespace smallIntSigned {
    var nullable: () => sd.Mapper<unknown, number | null> & sd.ExpectedInput<number | null> & sd.MappableInput<string | number | null>;
}
declare function mediumIntSigned(): sd.Mapper<unknown, number> & sd.ExpectedInput<number> & sd.MappableInput<string | number>;
declare namespace mediumIntSigned {
    var nullable: () => sd.Mapper<unknown, number | null> & sd.ExpectedInput<number | null> & sd.MappableInput<string | number | null>;
}
declare function intSigned(): sd.Mapper<unknown, number> & sd.ExpectedInput<number> & sd.MappableInput<string | number>;
declare namespace intSigned {
    var nullable: () => sd.Mapper<unknown, number | null> & sd.ExpectedInput<number | null> & sd.MappableInput<string | number | null>;
}
declare function tinyIntUnsigned(): sd.Mapper<unknown, number> & sd.ExpectedInput<number> & sd.MappableInput<string | number>;
declare namespace tinyIntUnsigned {
    var nullable: () => sd.Mapper<unknown, number | null> & sd.ExpectedInput<number | null> & sd.MappableInput<string | number | null>;
}
declare function smallIntUnsigned(): sd.Mapper<unknown, number> & sd.ExpectedInput<number> & sd.MappableInput<string | number>;
declare namespace smallIntUnsigned {
    var nullable: () => sd.Mapper<unknown, number | null> & sd.ExpectedInput<number | null> & sd.MappableInput<string | number | null>;
}
declare function mediumIntUnsigned(): sd.Mapper<unknown, number> & sd.ExpectedInput<number> & sd.MappableInput<string | number>;
declare namespace mediumIntUnsigned {
    var nullable: () => sd.Mapper<unknown, number | null> & sd.ExpectedInput<number | null> & sd.MappableInput<string | number | null>;
}
declare function intUnsigned(): sd.Mapper<unknown, number> & sd.ExpectedInput<number> & sd.MappableInput<string | number>;
declare namespace intUnsigned {
    var nullable: () => sd.Mapper<unknown, number | null> & sd.ExpectedInput<number | null> & sd.MappableInput<string | number | null>;
}
export { unsafeInt, tinyIntSigned, smallIntSigned, mediumIntSigned, intSigned, tinyIntUnsigned, smallIntUnsigned, mediumIntUnsigned, intUnsigned, };
