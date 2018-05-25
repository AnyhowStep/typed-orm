"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("typed-mysql");
class Column {
    constructor(tableAlias, name, assertDelegate, subTableName, isSelectReference) {
        this.tableAlias = tableAlias;
        this.name = name;
        this.assertDelegate = assertDelegate;
        //HACK
        this.subTableName = subTableName;
        //HACK
        this.isSelectReference = (isSelectReference === true);
        if (tableAlias == "__expr") {
            this.fullName = mysql.escapeId(`${tableAlias}--${name}`);
            //this.fullName = Database.EscapeId(`${name}`);
        }
        else {
            if (subTableName == undefined) {
                if (this.isSelectReference) {
                    this.fullName = mysql.escapeId(`${tableAlias}--${name}`);
                }
                else {
                    this.fullName = `${mysql.escapeId(tableAlias)}.${mysql.escapeId(name)}`;
                }
            }
            else {
                const hackedName = mysql.escapeId(`${subTableName}--${name}`);
                this.fullName = `${mysql.escapeId(tableAlias)}.${hackedName}`;
            }
        }
    }
    querify(sb) {
        sb.append(this.fullName);
    }
}
exports.Column = Column;
//# sourceMappingURL=column.js.map