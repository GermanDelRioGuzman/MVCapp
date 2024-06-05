const express = require('express')
const path = require('path');
const exphbs = require('express-handlebars');
const { database } = require('./keys');
const session = require('express-session');
const MySQLStore = require("express-mysql-session")
const flash = require('connect-flash')
const morgan = require('morgan')

// Initializations
const app = express();

// Settings
app.set('port', process.env.PORT || 4000);

//  Views with Handlebars
app.set('views', path.join(__dirname, "views"))
app.engine('.hbs', exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require("./lib/handlebars")
}))

app.set("view engine", ".hbs")


// Middlewares
app.use(session({
    secret: "itesm",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}))

app.use(flash())
app.use(morgan("dev"))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Global Variables
app.use((req, res, next) => {
    // logica:
    app.locals.success = req.flash('success')
    app.locals.message = req.flash('message')
    app.locals.user = req.user
    // exito?
    next();
})


// Routes
app.use(require("./routes"))
app.use(require("./routes/authentication"))

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Starting the server
app.listen(app.get('port'), () => {
    console.log("Server on port: ", app.get('port'))
})