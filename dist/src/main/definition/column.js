"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const typed_mysql_1 = require("typed-mysql");
const expr_1 = require("./expr");
const column_operation_1 = require("./column-operation");
class Column {
    constructor(table, name, assert, subTableName, isSelectReference) {
        this.table = table;
        this.name = name;
        this.assertDelegate = sd.toAssertDelegateExact(assert);
        //HACK
        this.subTableName = subTableName;
        //HACK
        this.isSelectReference = (isSelectReference === true);
        if (table == "__expr") {
            this.fullName = typed_mysql_1.Database.EscapeId(`${table}--${name}`);
            //this.fullName = Database.EscapeId(`${name}`);
        }
        else {
            if (subTableName == undefined) {
                if (this.isSelectReference) {
                    this.fullName = typed_mysql_1.Database.EscapeId(`${table}--${name}`);
                }
                else {
                    this.fullName = `${typed_mysql_1.Database.EscapeId(table)}.${typed_mysql_1.Database.EscapeId(name)}`;
                }
            }
            else {
                const hackedName = typed_mysql_1.Database.EscapeId(`${subTableName}--${name}`);
                this.fullName = `${typed_mysql_1.Database.EscapeId(table)}.${hackedName}`;
            }
        }
        //const alias = Database.EscapeId(`${table}--${name}`);
        //this.query = `${this.fullName} AS ${alias}`;
    }
    as(alias) {
        return new expr_1.ColumnExpr(column_operation_1.columnToReference(this), "__expr", alias, this.assertDelegate, this.fullName);
    }
    querify(sb) {
        sb.append(this.fullName);
    }
}
exports.Column = Column;
//# sourceMappingURL=column.js.map