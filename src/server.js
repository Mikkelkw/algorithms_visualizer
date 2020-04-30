const express = require('express');
const bodyParser = require('body-parser');
var currentUser = "1"
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

var sql = require("mysql");

// config for your database (will need to have a local database with the table users to deploy locally)
var connection = sql.createConnection({
    host: 'localhost',
    user:'root',
    password:"3560Hemsedal",
    database:'reactserver',
    port:1337
});
//checks for connection
connection.connect(function(error){
    if(!!error){
        console.log("Error");
    }else{
        console.log("Connected");
    }
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

//handles post request when loggin in
app.post('/api/world', (req, res) => {

  connection.query(`select * from users where email = '${req.body.uname}' and password = '${req.body.pass}'`, function(error, rows, fields){
  if(!!error){
    console.log("error")
  }else{
      console.log(rows.length)
      if(rows.length == 1){
        currentUser = rows[0].id
        console.log(currentUser)
        res.send(true);
      }else{
        console.log("FALSE")
        res.send(false);
      }
  }
});
});
//handles post request when making a new user
app.post('/api/newUser', (req, res) => {
    connection.query(`select * from users where email = '${req.body.uname}'`, function(error, rows, fields){
        
      if(!!error){
        console.log("error")
      }else{
          console.log(rows.length)
          if(rows.length == 0){
            connection.query(`insert into users (email, password) values ( '${req.body.uname}', '${req.body.pass}')`)
            console.log("TRUE")
            res.send(true);
          }else{
            console.log(req.body.uname)
            console.log(req.body.pass)
            res.send(false);
          }
      }
})})

//start of map saving post request. Will expand upon in the future
app.post('/api/saveMap', (req, res) => {
    connection.query(`insert into maps (id, map) values ('${currentUser}',  '${req.body.grid}')`, function(error, rows, fields){
        console.log(req.body.grid)

      if(!!error){
        console.log(error)
      }


})})
//start of map getting post request. Will expand upon in the future
app.post('/api/myMaps', (req, res) => {
    connection.query(`select map from maps where id = ${currentUser}`, function(error, rows, fields){
        console.log("GETTING MAPS")
        
      if(!!error){
        console.log(error)
      }else{
          
          res.send(rows);
      }


})})

app.listen(port, () => console.log(`Listening on port ${port}`));
