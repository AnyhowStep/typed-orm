import * as sd from "schema-decorator";
import {DataType, IDataType, buildDataType} from "../data-type";
import {Collation} from "../collation";
import {escape} from "sqlstring";

//Just a type alias since we don't support DATETIME(4/5/6)
export type DateTime = Date;
export function char (
    //[1,255]
    characterMaximumLength : number,
    collation : Collation,
    assert : ((name : string, str : string) => string) = ((_name : string, str : string) => str)
) : IDataType<string> {
    characterMaximumLength = sd.chain(
        sd.integer(),
        sd.gtEq(1),
        sd.ltEq(255)
    )("length", characterMaximumLength);

    return buildDataType(
        sd.chain(
            sd.varChar(0, characterMaximumLength),
            assert
        ),
        {
            toSql : (value) => {
                return escape(value);
            },
            dataType : DataType.char,
            characterMaximumLength : BigInt(characterMaximumLength),
            numericPrecision : null,
            numericScale : null,
            dateTimePrecision : null,
            collationName : collation,
            columnType : `char(128)`,
        }
    );
}