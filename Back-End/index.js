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
        console.log(result);
        res.send(result);
    })
} )


app.put("/api/deleteUser", function(req, res){
    const userId = req.query.id;
    const sqlDelete = `DELETE FROM USERS WHERE user_id = "${userId}";`;
    db.query(sqlDelete, (err, result) => {
        res.sned(result);
    })
})

app.get("/api/insertUser", function(req, res){
    const userId = parseInt(req.query.userId);
    const userCountry = req.query.userCountry;
    console.log(req.query);
    const sqlInsert = `INSERT INTO Users (user_id, country, explicit) values (${userId}, "${userCountry}", 0);`;
    db.query(sqlInsert, (err, result) => {
        res.send(result);
    })
})

app.get("/api/findUser", function(req, res){
    const userId = parseInt(req.query.userId);
    //console.log(req.query);
    const sqlInsert = `SELECT * FROM Users WHERE user_id = ${userId};`;
    db.query(sqlInsert, (err, result) => {
        res.send(result);
    })
})

app.get("/api/getLogin", function(req, res) {
    const uri = JSON.parse(req.query.user).uri;
    
    var findUser = `SELECT * FROM Logins WHERE spotify_id="${uri}";`;
    
    db.query(findUser, (err,result) => {
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

    console.log(newUser);
    db.query(newUser, (err,result) => {
        console.log(err);
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

    console.log(newLogin);
    db.query(newLogin, (err,result) => {
        console.log(err);
        res.send("Added to logins");
    })
})


app.listen(8080, () => {
    console.log("Listening on Port 8080...");
})

