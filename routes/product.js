let router = require('express').Router()
let mysql = require('mysql')
let bodyParser = require('body-parser')
router.use(bodyParser.json())
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
router.post('/product', function (req, res) {
    if (req.files) {
        console.log(req.files)
        let product_name = req.body.product_name
        let product_deskrip = req.body.product_deskrip
        let product_price = req.body.product_price
        let quantity = req.body.quantity
        var file = req.files.product_gambar;
        var product_gambar = file.name;
        var tmpFilePath = `http://localhost:3006/public/assets/${product_name}`
        file.mv(".././public/assets/img/" + product_gambar, function (err) {
            if (err) {
                console.log(err)
                res.json({ status: "Upload Gagal" });
            } else {
                let semua = {
                    product_name, product_deskrip, product_price, quantity, product_gambar
                }
                let sql = "INSERT INTO product set ?"
                db.query(sql, semua, (err, result) => {
                    if (err) {
                        console.log(err)
                    } else {
                        res.send(result)
                    }
                })

            }
        })

    }

})


router.get('/product', (req, res) => {
    let sql = "select * from product"
    db.query(sql, (err, result) => {
        if (err) throw err
        // console.log(result)
        res.send(result)
    })
})
router.get('/product/:id', (req, res) => {

    let sql = `select * from product where id = '${req.params.id}' `
    db.query(sql, (err, result) => {
        if (err) throw err
        // console.log(result)
        res.send(result)
    })
})
router.put('/product/:id', (req, res) => {
    let data = {
        product_name: req.body.product_name,
        product_deskrip: req.body.product_deskrip,
        product_price: req.body.product_price,
        product_gambar: req.body.product_gambar
    }
    let sql = `update product set ? where id = ?`
    db.query(sql, [data, req.params.id], (err, result) => {
        if (err) throw err
        console.log(result)
        res.send(result)
    })
})
router.delete('/product/:id', (req, res) => {
    let data = req.params.id
    let sql = `DELETE from product where id = ?`
    db.query(sql, data, (err, result) => {
        if (err) throw err
        console.log(result)
        res.send(result)
    })
})

module.exports = router;