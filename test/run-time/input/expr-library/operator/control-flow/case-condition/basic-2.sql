SELECT
  (
    CASE
      WHEN `table`.`b` THEN '45'
      WHEN `table`.`c` THEN '67'
      WHEN true THEN '90'
    END
  ) AS `__aliased--value`