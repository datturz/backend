// // let router = require('express').Router()
// // let mysql = require('mysql')
// // let bodyParser = require('body-parser')

// router.use(bodyParser.json())
// router.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
//     res.header("Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'admin',
//     password: '01041992',
//     database: 'beardgrow'
// })

// db.connect(() => {
//     console.log('')
// })

// router.get('/user', (req, res) => {
//     let sql = 'select * from pengguna'
//     db.query(sql, (err, result) => {
//         if (err) throw err
//         console.log(result)
//         res.send(result)
//     })
// })

// router.post('/signup', (req, res) => {
//     let data = req.body
//     let sql = "insert into pengguna set ?"
//     db.query(sql, data, (err, result) => {
//         if (err) throw err
//         console.log(result)
//         res.send(result)
//     })
// })

// router.get('/sign', (req, res) => {
//     let data = req.body
//     let sql = 'select * from pengguna '
//     db.query(sql, data, (err, result) => {
//         if (err) throw err
//         console.log('SUKSES')
//         res.send(result)
//     })
// })
// module.exports = router

const Sequelize = require('sequelize')
const db = require('../database/db')
module.exports = db.sequelize.define(
    'pengguna',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        firstname:{
            type: Sequelize.STRING 
        },
        lastname:{
            type: Sequelize.STRING
        },
        email:{
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        created: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    },
    {
        timestamps: false
    }
)