let router = require('express').Router()
let mysql = require('mysql')
let bodyParser = require('body-parser')
// router.use(bodyParser.json())
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
const db = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: '01041992',
    database: 'beardgrow'
})
db.connect(() => {
    console.log('')
})
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.get('/user', (req, res) => {
    let sql = 'select * from pengguna'
    db.query(sql, (err, result) => {
        if (err) throw err
        console.log(result)
        res.send(result)
    })
})
router.post('/signup', (req, res) => {
    let data = req.body
    let sql = 'insert into pengguna set ?'
    db.query(sql, data, (err, result) => {
        if (err) throw err
        console.log(result)
        res.send(result)
    })
})
router.post('/sign', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    db.query('SELECT * FROM pengguna WHERE email = ?', [email], function (error, results, fields) {
        if (error) {
            // console.log("error ocurred",error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            // console.log('The solution is: ', results);
            if (results.length > 0) {
                if (results[0].password == password) {
                    res.send({
                        results,
                        "code": 200,
                        "success": "login sucessfull"
                    });
                }
                else {
                    res.send({
                        "code": 204,
                        "success": "Email and password does not match"
                    });
                }
            }
            else {
                res.send({
                    "code": 204,
                    "success": "Email does not exits"
                });
            }
        }
    });
})

router.get('/sign', (req, res) => {
    let data = req.body
    let sql = 'select * from pengguna '
    db.query(sql, data, (err, result) => {
        if (err) throw err
        console.log('SUKSES')
        res.send(result)
    })
})
module.exports = router

