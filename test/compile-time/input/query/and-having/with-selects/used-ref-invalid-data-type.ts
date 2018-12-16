import * as sd from "schema-decorator";
import * as o from "../../../../../../dist/src/main";

const table = o.table(
    "table",
    {
        x : sd.naturalNumber(),
        y : sd.string(),
        z : sd.boolean(),
    }
);
const sameName = o.table(
    "table",
    {
        /*
            TODO

            Note that if this was sd.naturalNumber() instead,
            it would compile but MySQL would give us an error.

            The only real way around this would be to not pass a
            ColumnRef to andHaving() but to pass a Ref-type that
            would have IExprSelectItem as well.

            And also having the usedRef use this new Ref-type.

            That way, we'll have this error saying that we expected
            an IExprSelectItem for `table.test` but received
            an IColumn instead
        */
        test : sd.date()
    }
)

export const query = o.from(table)
    .select(c => [c.x.as("test")])
    .andHaving(() => o.eq(
        sameName.columns.test,
        sameName.columns.test
    ));