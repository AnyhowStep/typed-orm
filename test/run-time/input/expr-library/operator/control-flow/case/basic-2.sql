SELECT
  (
    CASE
      `table`.`x`
      WHEN 45 THEN '45'
      WHEN 67 THEN '67'
      WHEN 90 THEN '90'
    END
  ) AS `__aliased--value`