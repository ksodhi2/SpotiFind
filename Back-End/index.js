const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

var db = mysql.createConnection({
    host: '34.121.38.95',
    user: 'root',
    password: 'CS411Team80',
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

app.get("/api/getArtistInfo", function(req, res){
    // Fetch parameters from the call header
    const artist = req.query.artist;
    // Generate SQL call
    const sqlReq = `SELECT * FROM Artists WHERE artist_name = "${artist}";`;
    // Send call to the database 
    db.query(sqlReq, (err,result) => {
        // Send the SQL result in the API response
        res.send(result);
    })
} )


app.listen(8080, () => {
    console.log("Listening on Port 8080...");
})

