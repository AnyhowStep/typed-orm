//In particular,
//BLOB data should be sent as a Buffer
//JSON data should be sent as a string
//undefined IS NOT ALLOWED
//TODO Add MySqlDateTime as PrimitiveExpr
export type PrimitiveExpr = bigint|number|string|boolean|Date|Buffer|null;
export type NonNullPrimitiveExpr = Exclude<PrimitiveExpr, null>;