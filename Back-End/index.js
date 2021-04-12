const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

var db = mysql.createConnection({
    host: '34.121.38.95',
    user: 'jack',
    password: 'cs411team80',
    database: 'spotifind'
})

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


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
    //console.log(req.query);
    const sqlInsert = `SELECT * FROM Users WHERE user_id = ${userId};`;
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


app.listen(8080, () => {
    console.log("Listening on Port 8080...");
})

