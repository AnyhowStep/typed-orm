import * as sd from "type-mapping";
declare function bigint(): sd.Mapper<unknown, bigint> & sd.ExpectedInput<string | number | bigint> & sd.MappableInput<string | number | bigint>;
declare namespace bigint {
    var nullable: () => sd.Mapper<unknown, bigint | null> & sd.ExpectedInput<string | number | bigint | null> & sd.MappableInput<string | number | bigint | null>;
}
declare function bigintSigned(): sd.Mapper<unknown, bigint> & sd.ExpectedInput<bigint> & sd.MappableInput<string | number | bigint>;
declare namespace bigintSigned {
    var nullable: () => sd.Mapper<unknown, bigint | null> & sd.ExpectedInput<bigint | null> & sd.MappableInput<string | number | bigint | null>;
}
declare function bigintUnsigned(): sd.Mapper<unknown, bigint> & sd.ExpectedInput<bigint> & sd.MappableInput<string | number | bigint>;
declare namespace bigintUnsigned {
    var nullable: () => sd.Mapper<unknown, bigint | null> & sd.ExpectedInput<bigint | null> & sd.MappableInput<string | number | bigint | null>;
}
export { bigint, bigintSigned, bigintUnsigned };
