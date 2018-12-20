SELECT
  (
    CASE
      `table`.`x`
      WHEN 45 THEN '45'
      ELSE 'hello'
    END
  ) AS `__aliased--value`