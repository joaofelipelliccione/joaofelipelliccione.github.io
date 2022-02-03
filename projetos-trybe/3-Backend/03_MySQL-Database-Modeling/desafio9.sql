SELECT
    COUNT(ph.song_id) AS quantidade_musicas_no_historico
FROM
	SpotifyClone.users AS u
INNER JOIN
	SpotifyClone.playing_history AS ph
ON
	u.user_id = ph.user_id
WHERE u.name = 'Bill'
GROUP BY u.name;