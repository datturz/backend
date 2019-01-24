let express = require('express')
let app = express()
let upload = require('express-fileupload')
let mysql = require('mysql')

let bodyParser = require('body-parser')
app.use(upload())
app.use(function (req, res, next) {
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
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/upload.html')
})
app.post("/", function (req, res) {
    if (req.files) {
        console.log(req.files)
        let judul = req.body.judul
        let deskrip = req.body.basi
        var file = req.files.filename;
        var filename = file.name;
        file.mv("./gambar/" + filename, function (err) {
            if (err) {
                console.log(err);
                res.send('<h1>Upload gagal!</h1>');
            } else {
                let semua = {
                    judul, deskrip, filename
                }
                let sql = "insert into slide set ?"
                db.query(sql, semua, (req, result) => {
                    if (req) {
                        console.log(req)
                    } else {
                        res.send(result)
                    }

                })
                res.send(console.log(semua));
                // res.send(console.log(semua.judul));
                // res.send(console.log(semua.deskrip));
                // res.send(console.log(semua.filename));
            }
        })
    }
})

app.listen(3210, function () { console.log('Run @port 3210!'); });