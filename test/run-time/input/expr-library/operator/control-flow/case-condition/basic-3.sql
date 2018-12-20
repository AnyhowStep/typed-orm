SELECT
  (
    CASE
      WHEN `table`.`b` THEN '45'
      ELSE 'hello'
    END
  ) AS `__aliased--value`