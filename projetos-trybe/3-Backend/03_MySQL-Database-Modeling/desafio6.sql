SELECT
    MIN(s.subscription_price) AS 'faturamento_minimo',
    MAX(s.subscription_price) AS 'faturamento_maximo',
    ROUND(AVG(s.subscription_price),2) AS 'faturamento_medio',
    SUM(s.subscription_price) AS 'faturamento_total'
FROM
	SpotifyClone.subscription AS s
INNER JOIN
	SpotifyClone.users AS u
ON
	s.subscription_id = u.subscription_id;