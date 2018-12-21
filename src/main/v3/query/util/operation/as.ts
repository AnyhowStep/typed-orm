/*
    If IQuery is a RawExpr, then the result is,
    IExprSelectItem & IAlasedTable

    If IQuery is ZeroOrOneRowQuery, then the
    type is nullable.

    If IQuery is OneRowQuery, then the
    type is NOT nullable.

    -----

    If IQuery is not a RawExpr, then the result is
    IAlasedTable

    -----

    The query.as() operation is useful for joining
    to sub queries.

    To alias, no duplicate column names are allowed
    in the query.

    Selecting `table--x` and `other--x` is not allowed
    to alias the query.

    -----

    TODO IAliasedTable MUST have a usedRef and JOIN
    operations must check for compatible usedRef
*/
/*
    IExprSelectItem
    readonly usedRef : DataT["usedRef"]; = from _parentJoins
    readonly assertDelegate : DataT["assertDelegate"]; = from _selects[0]

    readonly tableAlias : DataT["tableAlias"]; = `__aliased`
    --> readonly alias : DataT["alias"];       = <alias>

    readonly unaliasedQuery : QueryTree; = QueryUtil.queryTree_RawExpr()

    -----

    IAliasedTable
    readonly usedRef : DataT["usedRef"]; = from _parentJoins

    --> readonly alias : DataT["alias"]; = <alias>
    readonly name  : DataT["name"];      = "" <- Empty string
    readonly columns : DataT["columns"]; = No columnName overlap, from _selects

    TODO readonly unaliasedQuery : QueryTree; = QueryUtil.queryTree_RawExpr()
*/