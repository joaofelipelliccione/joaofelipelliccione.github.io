SELECT
	a.artist_name AS 'artista',
    alb.album_name AS 'album'
FROM
	SpotifyClone.artists AS a
INNER JOIN
	SpotifyClone.albums AS alb
ON
	a.artist_id = alb.artist_id
WHERE a.artist_name = 'Walter Phoenix'
ORDER BY album ASC;