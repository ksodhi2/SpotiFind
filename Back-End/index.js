const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

var db = mysql.createConnection({
    host: '34.121.38.95',
    user: 'karan',
    password: 'karan123',
    database: 'spotifind'
})

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

/*  EXAMPLE QUERIES (THESE DO NOT WORK)

app.get("/api/getTracksByArtist", function(req, response){
    const artist = req.query.artist;
    console.log(req.query.artist)
    const sqlSelect = "SELECT DISTINCT t.track_name, t.artists  \
        FROM Artists a JOIN                                         \
        Tracks t ON(t.artists LIKE CONCAT('%',a.artist_name, '%'))  \
    WHERE a.artist_name = '" + artist +"' \
    ORDER BY t.artists ASC;";
    db.query(sqlSelect, (err, result) => {
        console.log(err);
        response.send(result);
    });
});

app.post("/api/addUserTopTracks", function(req, res){
    const artist = req.query.artist;
    const sqlReq = `UPDATE * FROM Artists WHERE artist_name = "${artist}";`;
    //console.log(sqlReq);
    db.query(sqlReq, (err,result) => {
        console.log(result);
        
    })

    const verifyUpdate = "SELECT * FROM ...."
    db.query(verifyUpdate, (err,result) => {
        console.log(result);
        res.send(result);
    })
} )

*/

app.get("/api/getTrackInfo", function(req, res){
    // Fetch parameters from the call header
    const track = req.query.track;
    // Generate SQL call
    const sqlReq = `SELECT * FROM Tracks WHERE track_name = "${track}";`;
    // Send call to the database 
    db.query(sqlReq, (err,result) => {
        // Send the SQL result in the API response
        res.send(result);
    })
} )


app.get("/api/getCountryTopTracks", function(req, res){
    // Fetch parameters from the call header
    const country = req.query.country;
    // Generate SQL call
    const sqlReq = `SELECT country, track_name, Track_Count FROM ( SELECT country, track_id, Track_Count, row_number() over (partition by country order by Track_Count DESC) as rnk FROM ( SELECT country, track_id , COUNT(track_id) as Track_Count FROM Users JOIN Top_Tracks ON Users.user_id = Top_Tracks.user_id GROUP BY country, track_id ) temp ) Qry JOIN Tracks on Qry.Track_id = Tracks.track_id where rnk <= 3 AND country = "${country}";`
    // Send call to the database 
    db.query(sqlReq, (err,result) => {
        // Send the SQL result in the API response
        res.send(result);
    })
} )

app.get("/api/getUserTop", function(req, res){
    // Fetch parameters from the call header
    const userId = req.query.userId;
    // Generate SQL call
    const sqlReq = `SELECT * FROM Top_Tracks WHERE user_id = "${userId}" ORDER BY track_rank;`;
    // Send call to the database 
    db.query(sqlReq, (err,result) => {
        // Send the SQL result in the API response
        res.send(result);
    })
} )

app.get("/api/insertTopTrack", function(req, res){
    const userId = req.query.userId;
    const trackId = req.query.trackId;
    const trackRank = req.query.trackRank;
    const sqlInsert = `INSERT INTO Top_Tracks (user_id, track_id, track_rank) values ("${userId}", "${trackId}", "${trackRank}");`;
    db.query(sqlInsert, (err, result) => {
        res.send(result);
    })
})

app.get("/api/deleteTopTrack", function(req, res){
    const userId = req.query.userId;
    const trackId = req.query.trackId;
    const sqlDelete = `DELETE FROM Top_Tracks WHERE user_id = "${userId}" AND track_id = "${trackId}";`;
    db.query(sqlDelete, (err, result) => {
        res.send(result);
    })
})

app.get("/api/updateTrackRanking", function(req, res){
    const userId = req.query.userId;
    const trackId = req.query.trackId;
    const trackRank = req.query.trackRank;
    const sqlUpdate = `UPDATE Top_Tracks SET track_rank = "${trackRank}" WHERE user_id = "${userId}" AND track_id = "${trackId}";`;
    db.query(sqlUpdate, (err, result) => {
        res.send(result);
    })
})


app.listen(8080, () => {
    console.log("Listening on Port 8080...");
})

