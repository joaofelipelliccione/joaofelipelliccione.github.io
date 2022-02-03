SELECT
	art.artist_name AS 'artista',
    alb.album_name AS 'album',
    COUNT(fa.artist_id) AS 'seguidores'
FROM
	SpotifyClone.artists AS art
INNER JOIN
	SpotifyClone.albums AS alb
ON
	art.artist_id = alb.artist_id
INNER JOIN
	SpotifyClone.followed_artists AS fa
ON
	art.artist_id = fa.artist_id
GROUP BY artista, album
ORDER BY seguidores DESC, artista, album;