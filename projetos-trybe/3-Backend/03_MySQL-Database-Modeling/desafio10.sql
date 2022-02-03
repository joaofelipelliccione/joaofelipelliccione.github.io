SELECT
	so.song_name AS 'nome',
	COUNT(*) AS 'reproducoes'
FROM
	SpotifyClone.users AS u
INNER JOIN
	SpotifyClone.subscription AS su
ON
	u.subscription_id = su.subscription_id
INNER JOIN
	SpotifyClone.playing_history AS ph
ON
	u.user_id = ph.user_id
INNER JOIN
	SpotifyClone.songs AS so
ON
	ph.song_id = so.song_id
WHERE su.subscription_id IN(1, 4)
GROUP BY nome
ORDER BY nome ASC;