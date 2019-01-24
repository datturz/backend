const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: '01041992',
    database: 'beardgrow'
})
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE')
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
db.connect()

app.get('/', (req, res) => {
    res.json('WELCOME TO API ')
})
app.post('/product', (req, res) => {
    let signup = req.body
    let sql = "insert into product set ?"
    db.query(sql, signup, (err, result) => {
        if (err) throw err
        console.log(result)
        res.send(result)
    })
})


app.get('/product', (req, res) => {
    let sql = 'select * from product'
    db.query(sql, (err, result) => {
        if (err) throw err
        console.log(result)
        res.send(result)
    })
})
app.get('/product/:id', (req, res) => {
    console.log(req.params.id)
    let sql = `select * from product where id = '${req.params.id}' `
    db.query(sql, (err, result) => {
        if (err) throw err
        console.log(result)
        res.send(result)
    })
})
app.put('/product/:id', (req, res) => {
    console.log(req.params.id)
    let sql = `update product set ? where= ${req.params.id}`
    db.query(sql, (err, result) => {
        if (err) throw err
        console.log(result)
        res.send(result)
    })
})
app.delete('/product/:id', (req, res) => {
    console.log(req.params.id)
    let data = req.params.id
    let sql = `DELETE from product where id = ?`
    db.query(sql, data, (err, result) => {
        if (err) throw err
        console.log(result)
        res.send(result)
    })
})
app.post('/signup', (req, res) => {
    let data = req.body
    console.log(data)
    let sql = 'insert into pengguna set ?'
    db.query(sql, data, (err, result) => {
        if (err) throw err
        console.log(result)
        res.send('Data sukses')
    })
})

app.get('/sign', (req, res) => {
    let data = req.body
    let sql = 'select * from pengguna '
    db.query(sql, data, (err, result) => {
        if (err) throw err
        console.log('SUKSES')
        res.send(result)
    })
})

// app.get('/', (req, res) => {
//     res.send('Selamat Json')
// })
// app.get('/hello', (req, res) => {
//     res.send('hallo')
// })


app.listen(3006, () => {
    console.log('dah jalan')
})

// var express = require("express");
// var login = require('./routes/loginroutes');
// var bodyParser = require('body-parser');
// var app = express();
// var mysql = require('mysql');
// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'admin',
//     password: '01041992',
//     database: 'beardgrow'
// });
// connection.connect(function (err) {
//     if (!err) {
//         console.log("Database is connected ... nn");
//     } else {
//         console.log("Error connecting database ... nn");
//     }
// });
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
// var router = express.Router();
// // test route
// router.get('/', function (req, res) {
//     res.json({ message: 'welcome to our upload module apis' });
// });
// //route to handle user registration
// router.post('/register', login.register);

// router.post('/sign', login.login)

// app.use('/api', router);
// app.listen(5000);