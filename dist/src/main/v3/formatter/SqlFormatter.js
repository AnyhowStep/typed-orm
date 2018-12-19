"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Formatter_1 = require("./Formatter");
const Tokenizer_1 = require("./Tokenizer");
const reservedWords = [
    "ACCESSIBLE", "ACTION", "AGAINST", "AGGREGATE", "ALGORITHM", "ALL", "ALTER", "ANALYSE", "ANALYZE", "AS", "ASC", "AUTOCOMMIT",
    "AUTO_INCREMENT",
    "BACKUP", "BEGIN", "BETWEEN", "BINLOG", "BOTH",
    "CASCADE", "CASE", "CHANGE", "CHANGED", "CHARACTER SET", "CHARSET", "CHECK", "CHECKSUM", "COLLATE", "COLLATION", "COLUMN", "COLUMNS",
    "COMMENT", "COMMIT", "COMMITTED", "COMPRESSED", "CONCURRENT", "CONSTRAINT", "CONTAINS", "CONVERT", "CREATE", "CROSS",
    "CURRENT_TIMESTAMP",
    "DATABASE", "DATABASES", "DAY", "DAY_HOUR", "DAY_MINUTE", "DAY_SECOND", "DEFAULT", "DEFINER", "DELAYED", "DELETE", "DESC", "DESCRIBE",
    "DETERMINISTIC", "DISTINCT", "DISTINCTROW", "DIV", "DO", "DROP", "DUMPFILE", "DUPLICATE", "DYNAMIC",
    "ELSE", "ENCLOSED", "END", "ENGINE", "ENGINES", "ENGINE_TYPE", "ESCAPE", "ESCAPED", "EVENTS", "EXEC", "EXECUTE", "EXISTS", "EXPLAIN",
    "EXTENDED",
    "FAST", "FETCH", "FIELDS", "FILE", "FIRST", "FIXED", "FLUSH", "FOR", "FORCE", "FOREIGN", "FULL", "FULLTEXT", "FUNCTION",
    "GLOBAL", "GRANT", "GRANTS", "GROUP_CONCAT",
    "HEAP", "HIGH_PRIORITY", "HOSTS", "HOUR", "HOUR_MINUTE", "HOUR_SECOND",
    "IDENTIFIED", "IF", "IFNULL", "IGNORE", "IN", "INDEX", "INDEXES", "INFILE", "INSERT", "INSERT_ID", "INSERT_METHOD", "INTERVAL",
    "INTO", "INVOKER", "IS", "ISOLATION",
    "KEY", "KEYS", "KILL",
    "LAST_INSERT_ID", "LEADING", "LEVEL", "LIKE", "LINEAR", "LINES", "LOAD", "LOCAL", "LOCK", "LOCKS", "LOGS", "LOW_PRIORITY",
    "MARIA", "MASTER", "MASTER_CONNECT_RETRY", "MASTER_HOST", "MASTER_LOG_FILE", "MATCH", "MAX_CONNECTIONS_PER_HOUR",
    "MAX_QUERIES_PER_HOUR", "MAX_ROWS", "MAX_UPDATES_PER_HOUR", "MAX_USER_CONNECTIONS", "MEDIUM", "MERGE", "MINUTE", "MINUTE_SECOND",
    "MIN_ROWS", "MODE", "MODIFY", "MONTH", "MRG_MYISAM", "MYISAM",
    "NAMES", "NATURAL", "NOT", "NOW()", "NULL",
    "ON DELETE", "ON UPDATE", "ONLY", "OPEN", "OPTIMIZE", "OPTION", "OPTIONALLY", "OUTFILE",
    "PACK_KEYS", "PAGE", "PARTIAL", "PARTITION", "PARTITIONS", "PASSWORD", "PRIMARY", "PRIVILEGES", "PROCEDURE", "PROCESS", "PROCESSLIST",
    "PURGE",
    "QUICK",
    "RAID0", "RAID_CHUNKS", "RAID_CHUNKSIZE", "RAID_TYPE", "RANGE", "READ", "READ_ONLY", "READ_WRITE", "REFERENCES", "REGEXP", "RELOAD",
    "RENAME", "REPAIR", "REPEATABLE", "REPLACE", "REPLICATION", "RESET", "RESTORE", "RESTRICT", "RETURN", "RETURNS", "REVOKE", "RLIKE",
    "ROLLBACK", "ROW", "ROWS", "ROW_FORMAT",
    "SECOND", "SECURITY", "SEPARATOR", "SERIALIZABLE", "SESSION", "SHARE", "SHOW", "SHUTDOWN", "SLAVE", "SONAME", "SOUNDS", "SQL",
    "SQL_AUTO_IS_NULL", "SQL_BIG_RESULT", "SQL_BIG_SELECTS", "SQL_BIG_TABLES", "SQL_BUFFER_RESULT", "SQL_CACHE", "SQL_CALC_FOUND_ROWS",
    "SQL_LOG_BIN", "SQL_LOG_OFF", "SQL_LOG_UPDATE", "SQL_LOW_PRIORITY_UPDATES", "SQL_MAX_JOIN_SIZE", "SQL_NO_CACHE",
    "SQL_QUOTE_SHOW_CREATE", "SQL_SAFE_UPDATES", "SQL_SELECT_LIMIT", "SQL_SLAVE_SKIP_COUNTER", "SQL_SMALL_RESULT", "SQL_WARNINGS",
    "START", "STARTING", "STATUS", "STOP", "STORAGE", "STRAIGHT_JOIN", "STRING", "STRIPED", "SUPER",
    "TABLE", "TABLES", "TEMPORARY", "TERMINATED", "THEN", "TO", "TRAILING", "TRANSACTIONAL", "TRUE", "TRUNCATE", "TYPE", "TYPES",
    "UNCOMMITTED", "UNIQUE", "UNLOCK", "UNSIGNED", "USAGE", "USE", "USING",
    "VARIABLES", "VIEW", "WHEN", "WITH", "WORK", "WRITE",
    "YEAR_MONTH"
];
const reservedToplevelWords = [
    "ADD", "AFTER", "ALTER COLUMN", "ALTER TABLE",
    "DELETE FROM",
    "EXCEPT",
    "FETCH FIRST", "FROM",
    "GROUP BY", "GO",
    "HAVING",
    "INSERT INTO", "INSERT", "INTERSECT",
    "LIMIT",
    "MODIFY",
    "ORDER BY",
    /*New reserved top-level word*/ "SELECT DISTINCT", "SELECT", "SET CURRENT SCHEMA", "SET SCHEMA", "SET",
    "UNION ALL", /*New reserved top-level word*/ "UNION DISTINCT", "UNION", "UPDATE",
    "VALUES",
    "WHERE",
    //Originally in reservedNewlineWords
    //But I think this is better to me
    "CROSS APPLY", "CROSS JOIN",
    "INNER JOIN",
    "JOIN",
    "LEFT JOIN", "LEFT OUTER JOIN",
    "OUTER APPLY", "OUTER JOIN",
    "RIGHT JOIN", "RIGHT OUTER JOIN",
    //Originally in reservedWords
    //But I think this is better to me
    "ON",
    "OFFSET",
];
const reservedNewlineWords = [
    "AND",
    "ELSE",
    "OR",
    "WHEN",
    "XOR"
];
let tokenizer;
class SqlFormatter {
    /**
     * @param {Object} cfg Different set of configurations
     */
    constructor(cfg) {
        this.cfg = cfg;
    }
    /**
     * Format the whitespace in a Standard SQL string to make it easier to read
     *
     * @param {String} query The Standard SQL string
     * @return {String} formatted string
     */
    format(query) {
        if (!tokenizer) {
            tokenizer = new Tokenizer_1.Tokenizer({
                reservedWords,
                reservedToplevelWords,
                reservedNewlineWords,
                stringTypes: [`""`, "N''", "''", "``", "[]"],
                openParens: ["(", "CASE"],
                closeParens: [")", "END"],
                indexedPlaceholderTypes: ["?"],
                namedPlaceholderTypes: ["@", ":"],
                lineCommentTypes: ["#", "--"],
                specialWordChars: undefined,
            });
        }
        return new Formatter_1.Formatter(this.cfg, tokenizer).format(query);
    }
}
exports.SqlFormatter = SqlFormatter;
//# sourceMappingURL=SqlFormatter.js.map