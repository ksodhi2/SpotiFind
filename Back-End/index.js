const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

var db = mysql.createConnection({
    host: '34.121.38.95',
    user: 'rahul',
    password: 'rahul123',
    database: 'spotifind'
})

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
        console.log(result);
        res.send(result);
    })
} )


app.get("/api/deleteTopGenres", function(req, res){
    const userId = req.query.userId;
    const genreId = req.query.genreId;
    const sqlDelete = `DELETE FROM Top_Genres WHERE user_id = "${userId}" AND genre_id = "${genreId}";`;
    db.query(sqlDelete, (err, result) => {
        res.send(result);
    })
})

app.get("/api/insertTopGenres", function(req, res){
    const userId = req.query.userId;
    const genreId = req.query.genreId;
    const genreRank = req.query.genreRank;
    const sqlInsert = `INSERT INTO Top_Genres (user_id, genre_id, genre_rank) values ("${userId}", "${genreId}", "${genreRank}");`;
    db.query(sqlInsert, (err, result) => {
        res.send(result);
    })
})

app.get("/api/findGenre", function(req, res){
    const genreName = req.query.genreName;
    //console.log(req.query);
    const sqlInsert = `SELECT * FROM Genres WHERE genre_name LIKE '${genreName}%';`;
    db.query(sqlInsert, (err, result) => {
        res.send(result);
    })
})

app.get("/api/updateGenres", function(req, res){
    const userId = req.query.userId;
    const genreId = req.query.genreId;
    const genreRank = req.query.genreRank;
    const sqlUpdate = `UPDATE Top_Genres SET genre_rank = "${genreRank}" WHERE user_id = "${userId}" AND genre_id = "${genreId}";`;
    db.query(sqlUpdate, (err, result) => {
        res.send(result);
    })
})

app.get("/api/getLowkeyGenres", function(req, res){
    // Fetch parameters from the call header
    const userId = req.query.userId;
    // Generate SQL call
    const sqlReq = `SELECT u.user_id, g.genre_name, (t.genre_rank) AS "User Genre Rank", g.popularity
    FROM (SELECT * FROM spotifind.Genres WHERE popularity > 0 AND popularity < 31) g 
    NATURAL JOIN spotifind.Top_Genres t JOIN spotifind.Users u USING (user_id)
    WHERE t.genre_rank >= 5 AND u.user_id = ${userId}
    ORDER BY u.user_id ASC;`
    // Send call to the database 
    db.query(sqlReq, (err,result) => {
        // Send the SQL result in the API response
        res.send(result);
    })
} )


app.listen(8080, () => {
    console.log("Listening on Port 8080...");
})

