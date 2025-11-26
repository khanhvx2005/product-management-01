const flash = require('express-flash')
const express = require('express')
// Cấu hình .env
require('dotenv').config()
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
// Cấu hình method-override
const methodOverride = require('method-override')
// Cấu hình body-parser
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT
// Cấu hình body-parser
app.use(bodyParser.urlencoded())
// Cấu hình express-flash
app.use(cookieParser('ABCDSADSA'));
app.use(expressSession({ cookie: { maxAge: 60000 } }));
app.use(flash());
// Cấu hình method-override
app.use(methodOverride('_method'))
// Cấu hình pug
app.set('views', `${__dirname}/views`)
app.set('view engine', 'pug')


// Nhúng file tĩnh
app.use(express.static(`${__dirname}/public`))
// Gọi route
const routeClient = require('./routes/client/index.route')
const routeAdmin = require('./routes/admin/index.route')
const database = require('./config/database.config')
routeAdmin(app)
routeClient(app)
database.connect()

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})