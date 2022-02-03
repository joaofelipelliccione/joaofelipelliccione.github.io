SELECT
  u.name AS 'usuario',
  COUNT(ph.song_id) AS 'qtde_musicas_ouvidas',
  ROUND((SUM(s.song_duration_sec) / 60), 2) AS 'total_minutos'
FROM
	SpotifyClone.playing_history AS ph
INNER JOIN
	SpotifyClone.users AS u
ON
	ph.user_id = u.user_id
INNER JOIN
	songs AS s
ON
	ph.song_id = s.song_id
GROUP BY usuario
ORDER BY usuario ASC;