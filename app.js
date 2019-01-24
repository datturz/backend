let express = require('express');
let routeku = require('./routes/product')
let cors = require('cors')
// let role = require('./routes/payment')
let user = require('./routes/user')
let carousel = require('./routes/carousel')
let checkout = require('./routes/checkout')
let upload = require('express-fileupload')
var app = express();
// app.use(role)
app.use(checkout)
app.use(user)
app.use(carousel)
app.use(routeku)

app.use(cors())
app.use(upload())
// route
app.get('/', (req, res) => {
    res.send('Express  MySQL')
})

// aktivasi server
app.listen(3006, () => {
    console.log('Server aktif di port 3006!')
})