export type TypeRef = {
    readonly [tableAlias : string] : {
        readonly [columnName : string] : any
    }
};