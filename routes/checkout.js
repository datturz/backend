let router = require('express').Router()
let mysql = require('mysql')
let bodyParser = require('body-parser')
// let cors = require('cors')
router.use(bodyParser.json())
const db = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: '01041992',
    database: 'beardgrow'
})
// router.cors(cors())
db.connect(() => {
    console.log('')
})

router.post('/checkout', (req, res) => {
    let data = req.body
    let sql = ' insert into transaksi set ?'
    db.query(sql, data, (err, result) => {
        if (err) throw err
        console.log(result)
        res.send(result)
    })
})
router.get('/checkout', (req, res) => {
    let sql = 'select * from transaksi'
    db.query(sql, (err, result) => {
        if (err) throw err
        console.log(result)
        res.send(result)
    })
})

module.exports = router;