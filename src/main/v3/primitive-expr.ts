import {MySqlDateTime, MySqlDate, MySqlTime} from "./data-type";

//In particular,
//BLOB data should be sent as a Buffer
//JSON data should be sent as a string
//undefined IS NOT ALLOWED
export type PrimitiveExpr = bigint|number|string|boolean|Date|Buffer|null|MySqlDateTime|MySqlDate|MySqlTime;
export type NonNullPrimitiveExpr = Exclude<PrimitiveExpr, null>;