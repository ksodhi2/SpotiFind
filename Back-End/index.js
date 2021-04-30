require('dotenv').config()

const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

<<<<<<< HEAD
=======
var db = mysql.createConnection({
    host: '34.121.38.95',
    user: 'jack',
    password: 'cs411team80',
    database: 'spotifind'
})
>>>>>>> master


<<<<<<< HEAD
let config = {
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS
}

var db = mysql.createConnection({
    socketPath: '/cloudsql/ultra-aquifer-274120:us-central1:spotifind8',
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS
});

/*var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS
})*/

console.log(process.env.DB_HOST)

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.get("/api/getArtistInfo", function(req, res){
    // Fetch parameters from the call header
    const artist = req.query.artist;
    // Generate SQL call
    const sqlReq = `SELECT * FROM Artists WHERE artist_name = "${artist}";`;
    // Send call to the database 
    db.query(sqlReq, (err,result) => {
        // Send the SQL result in the API response
        //console.log(result);
=======

app.get("/api/insertUser", function(req, res){
    const userId = parseInt(req.query.userId);
    const userCountry = req.query.userCountry;
    // console.log(req.query);
    const sqlInsert = `INSERT INTO Users (user_id, country, explicit) values (${userId}, "${userCountry}", 0);`;
    db.query(sqlInsert, (err, result) => {
        res.send(result);
    })
})

app.get("/api/updateUser", function(req, res){
    const userId = parseInt(req.query.userId);
    const userCountry = req.query.userCountry;
    // console.log(userId);
    // console.log(userCountry);

    const sqlUpdate = `update Users set country = "${userCountry}" where user_id = ${userId};`;
    db.query(sqlUpdate, (err, result) => {
>>>>>>> master
        res.send(result);
    })
})

app.get("/api/deleteUser", function(req, res){
    const userId = parseInt(req.query.userId);
    const sqlDelete = `delete from Users where user_id = ${userId};`;
    db.query(sqlDelete, (err, result) => {
        res.send(result);
    })
})


app.get("/api/findUser", function(req, res){
    const userId = parseInt(req.query.userId);
<<<<<<< HEAD
    const userCountry = req.query.userCountry;
    //console.log(req.query);
    const sqlInsert = `INSERT INTO Users (user_id, country, explicit) values (${userId}, "${userCountry}", 0);`;
=======
    //console.log(req.query);
    const sqlInsert = `SELECT * FROM Users WHERE user_id = ${userId};`;
>>>>>>> master
    db.query(sqlInsert, (err, result) => {
        res.send(result);
    })
})
app.get("/api/findHighestRankGenre", function(req, res){
    const userId = parseInt(req.query.userId);
    //console.log(req.query);
    const sqlInsert = `Select genre_id, u.user_id
                        From Users u join Top_Genres tg on u.user_id = tg.user_id 
                        Where tg.genre_rank = ( 
                                        Select max(tg_in.genre_rank)
                                        From Users u_in join Top_Genres tg_in 
                                                    on u_in.user_id = tg_in.user_id 
                                        where u_in.user_id = u.user_id
                                        Group By u_in.user_id
                                        ) and 
                                u.user_id = ${userId}
                        Order By user_id;`
    ;
    db.query(sqlInsert, (err, result) => {
        res.send(result);
    })
})

app.get("/api/getLogin", function(req, res) {
    const uri = JSON.parse(req.query.user).uri;
    
    var findUser = `SELECT * FROM Logins WHERE spotify_id="${uri}";`;
    
    db.query(findUser, (err,result) => {
        console.log(err)
        res.send(result[0]);
    })
})

app.get("/api/updateLogin", function(req, res) {
    var _user = JSON.parse(req.query.user);
    var cache = JSON.parse(req.query.cache);
    var updateUser = `UPDATE Logins
                    SET last_login = NOW(), country = "${_user.country}", 
                        cache_token  = "${cache}"
                    WHERE spotify_id = "${_user.uri}";`

    db.query(updateUser, (err,result) => {
        res.send("Update Successful");
    })
})

app.get("/api/getNewUserId", function(req, res){
    var findMax = "SELECT max(user_id) as max_id FROM Users;"
    db.query(findMax, (err,result) => {
        
        res.send(result[0]);
    })
})

app.get("/api/addNewUser", function(req, res) {
    var user = JSON.parse(req.query.user);
    var cache = req.query.cache;
    var id = req.query.id;
    //console.log(req.query);

    //Set explicit
    var explicit = user.explicit_content.filter_enabled == true ? 0 : 1;
    var newUser = `INSERT INTO Users (user_id, explicit, country)
                        VALUES (${id}, ${explicit}, "${user.country}");`

    
    db.query(newUser, (err,result) => {
        
        res.send("Added to users");
    })
})

app.get("/api/addNewLogin", function(req, res) {
    var user = JSON.parse(req.query.user);
    var cache = req.query.cache;
    var id = req.query.id;
    
    var explicit = user.explicit_content.filter_enabled == true ? 0 : 1;
    var newLogin = `INSERT INTO Logins (spotify_id, user_id, last_login, cache_token, country)
                        VALUES ("${user.uri}", ${id}, NOW(), "${cache}", "${user.country}");`

    
    db.query(newLogin, (err,result) => {
        
        res.send("Added to logins");
    })
})

app.get("/api/deleteLogin", function(req, res) {
    var user = JSON.parse(req.query.user);
    
   
    var deleteLogin = `DELETE FROM Logins
                        WHERE spotify_id = "${user.uri}";`

   
    db.query(deleteLogin, (err,result) => {
        
        res.send("Deleted from logins");
    })
})

app.get("/api/logins/getTopArtists", function(req, res) {
    var uri = req.query.uri;

    var topArtists = `SELECT a.artist_name, a.artist_id
                        FROM Logins l 
                            LEFT JOIN Users u USING (user_id)
                            NATURAL JOIN Top_Artists t 
                            NATURAL JOIN Artists a
                        WHERE l.spotify_id = "${uri}"
                        ;`
    db.query(topArtists, (err,result) => {
        
        res.send(result);
    })
})

app.get("/api/searchTracks", function(req, res) {
    var trackName = req.query.trackName;

    var trackQuery = `SELECT track_id FROM Tracks WHERE track_name LIKE "%${trackName}%" OR Artists LIKE "%${trackName}%" ORDER BY popularity DESC LIMIT 20;`
    //console.log(trackQuery);
    db.query(trackQuery, (err,result)=> {
        console.log(result);
        res.send(result);
        
    })
})


app.get("/api/addTopTracks", function(req, res) {
    var trackList = req.query.trackList;

    var insert = `INSERT INTO Top_Tracks (user_id, track_id, track_rank) VALUES ${trackList}`
    //console.log(insert);
    db.query(insert, (err,result)=> {
        res.send(result);
    })
})

app.get("/api/getArtistsId", function(req, res) {
    var conditions = req.query.conditions;

    var findArtists = `SELECT artist_id, artist_name FROM Artists WHERE ${conditions}`
    //console.log(findArtists)
    db.query(findArtists, (err,result) => {
        
        res.send(result);
    })
})

app.get("/api/addTopArtists", function(req, res) {
    var values = req.query.values;
    var insert = `INSERT INTO Top_Artists(user_id, artist_id, artist_rank)
                            VALUES ${values}`

    //console.log(insert)
    db.query(insert, (err, result) => {
        //console.log(result);
        res.send(result);
    })

})

app.get("/api/getTracksBySound", function(req,res) {
    var id = req.query.spotifyId;
    var soundProp = req.query.soundProp;
    var getTracks = `SELECT t.track_name, t.track_id, t.${soundProp}
                        FROM ( SELECT round(avg(dance), 2) as avg_dance
                                FROM ( SELECT  t.${soundProp} as dance
                                        FROM Tracks t JOIN spotifind.Top_Tracks tp USING (track_id) NATURAL JOIN Users NATURAL JOIN Logins
                                        WHERE Logins.spotify_id = "${id}"
                                    UNION 
                                        SELECT a.${soundProp} as dance
                                        FROM Artists a JOIN Top_Artists t USING (artist_id) NATURAL JOIN Users NATURAL JOIN Logins
                                        WHERE Logins.spotify_id = "${id}"
                                    UNION
                                        SELECT g.${soundProp} as dance
                                        FROM Genres g JOIN Top_Genres t USING (genre_id) NATURAL JOIN Users NATURAL JOIN Logins
                                        WHERE Logins.spotify_id = "${id}") g 
                                ) h 
                            NATURAL JOIN Tracks t
                        WHERE avg_dance = t.${soundProp}
                        ORDER BY t.popularity DESC
                        LIMIT 50;`
    //console.log(getTracks)
    db.query(getTracks, (err,result)=> {
        res.send(result)
    })
})

app.get("/api/getTracksByPopularity", function(req,res) {
    var id = req.query.spotifyId;
    
    var getTracks = `SELECT t.track_name, t.track_id, t.popularity
                        FROM ( SELECT round(avg(dance)) as avg_dance
                                FROM ( SELECT  t.popularity as dance
                                        FROM Tracks t JOIN spotifind.Top_Tracks tp USING (track_id) NATURAL JOIN Users NATURAL JOIN Logins
                                        WHERE Logins.spotify_id = "${id}"
                                    UNION 
                                        SELECT a.popularity as dance
                                        FROM Artists a JOIN Top_Artists t USING (artist_id) NATURAL JOIN Users NATURAL JOIN Logins
                                        WHERE Logins.spotify_id = "${id}"
                                    UNION
                                        SELECT g.popularity as dance
                                        FROM Genres g JOIN Top_Genres t USING (genre_id) NATURAL JOIN Users NATURAL JOIN Logins
                                        WHERE Logins.spotify_id = "${id}") g 
                                ) h 
                            NATURAL JOIN Tracks t
                        WHERE avg_dance = t.popularity
                        ORDER BY t.popularity DESC
                        LIMIT 50;`
    //console.log(getTracks)
    db.query(getTracks, (err,result)=> {
        res.send(result)
    })
})

app.get("/api/countTopGenres", function(req,res) {
    var userId = req.query.userId;
    var q = `SELECT genre_id, sum(genre_count) as genre_sum
            FROM ((SELECT genre, count(genre) as genre_count
                    FROM Users NATURAL JOIN Top_Artists NATURAL JOIN Artists JOIN Artists_By_Genre ON (artist_name = artist)
                    WHERE user_id = ${userId}
                    GROUP BY genre
                    LIMIT 10)
                    
                    UNION
                    
                    (SELECT genre, count(genre) as genre_count
                    FROM Users NATURAL JOIN Top_Tracks NATURAL JOIN Tracks 
                        NATURAL JOIN Tracks_By_Artist JOIN Artists USING (artist_name)
                        JOIN Artists_By_Genre ON (artist_name = artist)
                    WHERE user_id = ${userId}
                    GROUP BY genre
                    LIMIT 10)
                    ) g JOIN Genres ON (genre = genre_name)
            GROUP BY genre_id
            ORDER BY genre_sum DESC
            LIMIT 10;`;
    db.query(q, (err,result) => {
        console.log(result)
        res.send(result)
    })
})

app.get("/api/addTopGenres", function(req,res) {
    var vals = req.query.values;
    var add = `INSERT INTO Top_Genres(user_id, genre_id, genre_rank)
                VALUES ${vals};`
    console.log(add)
    db.query(add, (err,result) => {
        res.send(result);
    })
})

app.get("/api/getTopTracks", function(req, res)  {
    var spotifyId = req.query.spotifyId;
    var q = `SELECT track_rank, track_name, track_id
            FROM Tracks NATURAL JOIN Top_Tracks JOIN Users USING(user_id) NATURAL JOIN Logins 
            WHERE spotify_id = "${spotifyId}"
            ORDER BY track_rank ASC;`
    db.query(q, (err, result) => {
        res.send(result)
    })
})


app.get("/api/getTopArtists", function(req, res)  {
    var spotifyId = req.query.spotifyId;
    var q = `SELECT artist_rank, artist_name
            FROM Artists NATURAL JOIN Top_Artists NATURAL JOIN Users NATURAL JOIN Logins 
            WHERE spotify_id = "${spotifyId}"
            ORDER BY artist_rank ASC;`
    db.query(q, (err, result) => {
        res.send(result)
    })
})

app.get("/api/getTopGenres", function(req, res)  {
    var spotifyId = req.query.spotifyId;
    var q = `SELECT genre_name, genre_rank
            FROM Genres NATURAL JOIN Top_Genres NATURAL JOIN Users NATURAL JOIN Logins 
            WHERE spotify_id = "${spotifyId}"
            ORDER BY genre_rank ASC;`
    db.query(q, (err, result) => {
        res.send(result)
    })
})

app.get("/api/getTrackUri", function(req,res) {
    var track_name = req.query.track_name;
    var q = `SELECT track_id FROM Tracks WHERE track_name="${track_name}"`
    db.query(q, (err,result) => {
        res.send(result);
    })
})

app.get("/api/trackSearch", function(req,res) {
    var name = req.query.name;
    var q = `SELECT track_name, track_id FROM Tracks WHERE track_name LIKE "%${name}%";`;
   
    db.query(q, (err, response) => {
        //console.log(response)
        res.send(response);
    })

})

app.get("/api/searchArtists", function(req,res) {
    var name = req.query.name;
    var q = `SELECT artist_name, artist_id FROM Artists WHERE artist_name LIKE "%${name}%";`;
   
    db.query(q, (err, response) => {
        //console.log(response)
        res.send(response);
    })

})

app.get("/api/searchGenres", function(req,res) {
    var name = req.query.name;
    var q = `SELECT genre_name, genre_id FROM Genres WHERE genre_name LIKE "%${name}%";`;
   
    db.query(q, (err, response) => {
        //console.log(response)
        res.send(response);
    })

})

app.get("/api/setTopList", function(req,res)  {
    
    var spotifyId1 = req.query.spotifyId1;
    var spotifyId2 = req.query.spotifyId2;
    var spotifyId3 = req.query.spotifyId3;

    var genreId =  parseInt(req.query.genreId) ;
    var genreRank = parseInt(req.query.genreRank) ;
    
    var trackId = req.query.trackId;
    var trackRank =parseInt(req.query.trackRank);
    
    var artistId = parseInt(req.query.artistId);
    var artistRank = parseInt(req.query.artistRank);
    
   

    var routine = `CALL InsertIntoTopTables('${spotifyId1}', ${isNaN(genreId) ? 0 : genreId},  ${isNaN(genreRank) ? 0: genreRank}, 
                                        '${spotifyId2}','${trackId}' ,${isNaN(trackRank)? 0 : trackRank }, 
                                        '${spotifyId3}', ${isNaN(artistId)? 0: artistId },  ${isNaN(artistRank)? 0: artistRank });`
    console.log(routine)
    db.query(routine, (err,response) => {
        
        res.send(response);
    })
})

app.get("/api/getTracksByCountry", function(req,res) {
    var spotifyId = req.query.spotifyId;
    var q = `SELECT country, Qry.track_id, Track_Count FROM
    (
    SELECT country, track_id, Track_Count, row_number() over (partition by country order by Track_Count DESC) as rnk
    FROM
    (
    SELECT country, track_id, COUNT(track_id) as Track_Count
    FROM Users JOIN Top_Tracks ON Users.user_id = Top_Tracks.user_id
    GROUP BY country, track_id
    ) temp
    ) Qry
    JOIN Tracks on Qry.Track_id = Tracks.track_id
    where rnk <= 30 AND country = (SELECT country FROM Users NATURAL JOIN Logins WHERE spotify_id = "${spotifyId}");`
    //console.log(q);
    db.query(q, (err,response) => {
        res.send(response);
    })

})

app.get("/api/getTracksByTopArtists", function(req,res) {
    var spotifyId = req.query.spotifyId;
    var q =`SELECT t.track_name, t.track_id, t.popularity
            FROM Artists a JOIN Tracks_By_Artist ta ON a.artist_name = ta.artist_name
            JOIN Tracks t ON ta.track_id = t.track_id
            WHERE a.artist_id IN 
                (SELECT artist_id FROM Top_Artists NATURAL JOIN Users NATURAL JOIN Logins WHERE spotify_id = "${spotifyId}")
            ORDER BY popularity DESC
            LIMIT 30;`

    db.query(q, (err,response) => {
        res.send(response);
    })
})

app.get("/api/getTracksByTopGenres", function(req,res) {
    var spotifyId = req.query.spotifyId;
    var q =`SELECT DISTINCT t.track_name, t.track_id, t.popularity
                FROM Genres g JOIN Artists_By_Genre ag on g.genre_name = ag.genre
                JOIN Tracks_By_Artist ta ON ag.artist = ta.artist_name
                JOIN Tracks t ON ta.track_id = t.track_id
                WHERE g.genre_id IN (SELECT genre_id FROM Top_Genres NATURAL JOIN Users NATURAL JOIN Logins WHERE spotify_id = "${spotifyId}")
                ORDER BY popularity DESC
                LIMIT 30;`

    db.query(q, (err,response) => {
        res.send(response);
    })
})

app.get("/api/", function(req,res) {
    res.send("Test!");
})

app.listen(8080, () => {
    console.log("Listening on Port 8080...");
})

