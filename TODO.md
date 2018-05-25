### TODO

Support for accessing parent-query column references (in JOIN clause),

+ whereIsNotNull()
+ whereIsNull()
+ whereIsEqual()
+ groupBy()
+ appendGroupBy()
+ having()
+ andHaving()
+ orderBy()
+ appendOrderBy()
+ unionOrderBy()
+ appendUnionOrderBy()

-----

Better table inheritance support,

+ Concrete vs. Abstract (Can the base table be instantiated?)
+ Exclusive vs. Inclusive (Can a base table row be multiple derived types?)

-----

Table-per-hierarchy support,

+ Discriminator column
+ Auto-increment of base type
+ Auto joins in SELECT?
+ Auto transaction, insert base, then insert derived?
+ Exclusive and inclusive

-----

+ Better README?
+ More examples?
+ Documentation?