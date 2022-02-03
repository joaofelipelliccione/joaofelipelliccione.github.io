SELECT
	s.song_name AS cancao,
	COUNT(*) AS reproducoes
FROM
	SpotifyClone.songs AS s
INNER JOIN
	SpotifyClone.playing_history AS ph
ON
	s.song_id = ph.song_id
GROUP BY cancao
ORDER BY reproducoes DESC, cancao ASC
LIMIT 2;