const role = require('express').Router()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const upload = require('express-fileupload')
role.use(upload())
role.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// role.use(bodyParser.urlencoded({ extended: true }))
role.use(bodyParser.json())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: '01041992',
    database: 'beardgrow'
})
db.connect(() => {

})

role.get('/transcuk', (req, res) => {
    let sql = 'select * from transaksi'
    db.query(sql, (err, result) => {
        if (err) throw err
        res.send(result)
    })
})

role.post('/transcuk', (req, res) => {
    let data = {
        pengguna_id: 1,
        product_id: req.body.id
    }
    console.log(data)
    let sql = "insert into transaksi set ?"
    db.query(sql, data, (err, result) => {
        if (err) throw err
        res.send(result)
    })
})

module.exports = role