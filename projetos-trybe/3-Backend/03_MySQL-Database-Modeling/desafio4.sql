SELECT
	u.`name` AS 'usuario',
    IF(MAX(YEAR(ph.date_of_rep)) = 2021, 'Usuário ativo', 'Usuário inativo') AS 'condicao_usuario'
FROM
	SpotifyClone.users AS u
INNER JOIN
	SpotifyClone.playing_history AS ph
ON
	u.user_id = ph.user_id
GROUP BY usuario
ORDER BY usuario ASC;