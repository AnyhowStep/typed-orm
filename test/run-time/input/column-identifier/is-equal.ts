import * as tape from "tape";
import * as o from "../../../../dist/src/main";

tape(__filename, (t) => {
    const a = {
        tableAlias : "tableAlias",
        name : "name",
    };
    const b = {
        tableAlias : "tableAliasB",
        name : "name",
    };
    const c = {
        tableAlias : "tableAlias",
        name : "nameC",
    };
    const d = {
        tableAlias : "tableAliasD",
        name : "nameD",
    };

    t.deepEqual(
        o.ColumnIdentifierUtil.isEqual(a, a),
        true
    );
    t.deepEqual(
        o.ColumnIdentifierUtil.isEqual(a, b),
        false
    );
    t.deepEqual(
        o.ColumnIdentifierUtil.isEqual(a, c),
        false
    );
    t.deepEqual(
        o.ColumnIdentifierUtil.isEqual(a, d),
        false
    );

    t.deepEqual(
        o.ColumnIdentifierUtil.isEqual(b, a),
        false
    );
    t.deepEqual(
        o.ColumnIdentifierUtil.isEqual(b, b),
        true
    );
    t.deepEqual(
        o.ColumnIdentifierUtil.isEqual(b, c),
        false
    );
    t.deepEqual(
        o.ColumnIdentifierUtil.isEqual(b, d),
        false
    );

    t.deepEqual(
        o.ColumnIdentifierUtil.isEqual(c, a),
        false
    );
    t.deepEqual(
        o.ColumnIdentifierUtil.isEqual(c, b),
        false
    );
    t.deepEqual(
        o.ColumnIdentifierUtil.isEqual(c, c),
        true
    );
    t.deepEqual(
        o.ColumnIdentifierUtil.isEqual(c, d),
        false
    );

    t.deepEqual(
        o.ColumnIdentifierUtil.isEqual(d, a),
        false
    );
    t.deepEqual(
        o.ColumnIdentifierUtil.isEqual(d, b),
        false
    );
    t.deepEqual(
        o.ColumnIdentifierUtil.isEqual(d, c),
        false
    );
    t.deepEqual(
        o.ColumnIdentifierUtil.isEqual(d, d),
        true
    );

    t.end();
});