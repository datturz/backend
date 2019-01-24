let express = require('express')
let router = require('express').Router()
let mysql = require('mysql')
let bodyParser = require('body-parser')
let upload = require('express-fileupload')
// let cors = require('cors')
router.use(upload())
router.use('/carousel', express.static('gambar'))
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
    console.log('Terhubung ke Mysql')
})
// router.use(cors())
router.get('/carousel', (req, res) => {
    let sql = 'select * from slide'
    db.query(sql, (err, result) => {
        if (err) throw err
        res.send(result)
    })
})
router.post("/carousel", function (req, res, next) {
    if (req.files) {
        console.log(req.files)
        let judul = req.body.judul
        let deskrip = req.body.deskrip
        var file = req.files.filename;
        var filename = file.name;
        file.mv("./gambar/" + filename, function (err) {
            if (err) {
                res.json({ status: "Upload Gagal" });
            } else {
                let semua = {
                    judul, deskrip, filename
                }
                let sql = "insert into slide set ?"
                db.query(sql, semua, (err, result) => {
                    if (err) {
                        console.log(err)
                    } else {
                        res.json({ status: 'Image Succes' })
                    }
                })
                // res.send(console.log(semua));
                // res.send(console.log(semua.judul));
                // res.send(console.log(semua.deskrip));
                // res.send(console.log(semua.filename));
            }
        })

    }
})
// router.get('/carousel/:id', (req, res) => {
//     let sql = `select * from slide where id = '${req.params.id}'`
//     if (req.files) {
//         console.log(req.files)
//         var file = req.files.filename;
//         var filename = file.name;
//         console.log(filename)
//         file.mv("../gambar/" + filename, function (err) {
//             if (err) {
//                 console.log(err);
//                 res.send('<h1>Upload gagal!</h1>');
//             } else {
//                 res.send('<h1>Upload sukses!</h1>');
//             }
//         })
//     }
//     db.query(sql, (err, res) => {
//         if (err) throw err //#endregion
//         res.send(result)
//     })
// })
router.put('/carousel/:id', (req, res) => {
    let data1 = req.body
    let sql = `update product set ? where id = ?`
    db.query(sql, data1[req.params.id], (err, result) => {
        if (err) throw err
        console.log(result)
        res.send(result)
    })
})
module.exports = router;