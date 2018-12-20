SELECT
  (`table`.`z` <=> `table`.`y`) AS `__aliased--value`,
  (32 <=> NULL) AS `__aliased--a`,
  (NULL <=> NULL) AS `__aliased--b`,
  (NULL <=> 'test') AS `__aliased--c`,
  (`table`.`a` <=> true) AS `__aliased--d`,
  (`table`.`b` <=> true) AS `__aliased--e`,
  (`table`.`a` <=> `table`.`b`) AS `__aliased--f`,
  (`table`.`b` <=> `table`.`a`) AS `__aliased--g`,
  ((`table`.`y` <=> `table`.`x`) <=> false) AS `__aliased--nestedEq`