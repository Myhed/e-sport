const express = require('express')
const app = express()
const path = require('path')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
require('./config/passport')(passport)
//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
// port
const port = process.env.PORT || 3000
//view Engine
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname,'views/partials'),
  helpers: {
    say: (text) => {
      return text
    }
  }
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))
// static file img etc ..
app.use(express.static('public'))
// Session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}))
//passport middleware
app.use(passport.initialize())
app.use(passport.session())
// flash
app.use(flash())
// global variable
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})
// path root
app.use((req,res,next) => {
    req.pathRoot = __dirname
    next()
})
//routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))
app.use('/admin', require('./routes/admin'))
app.use('/', require('./routes/member'))

app.listen(port, () => {
    console.log('the server is started');
})