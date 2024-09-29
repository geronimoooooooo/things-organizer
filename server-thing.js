require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path')
const https = require('https');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportLocalMongoose = require('passport-local-mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
// const flash = require('connect-flash');
const bodyParser = require('body-parser');
// const indexRoutes = require('./routes/index.routes');
const birdRoutes = require('./routes/bird.routes');
const categoryRoutes = require('./routes/category.routes');
const locationRoutes = require('./routes/location.routes');
const organizationRoutes = require('./routes/organization.routes');
const thingRoutes = require('./routes/thing.routes');
const userRoutes = require('./routes/user.routes');
const deleteContentFromCollections = require('./models/deleteModels')
// const User = require('./models/User');
const app = express()
// npm i express fs path https mongoose passport passport-local passport-local-mongoose 
// npm i express-session connect-mongo connect-flash body-parser

const PORT = process.env.PORT
const mongoString = process.env.MONGO_URL
console.log(mongoString);

const host = process.env.HOST
const portHTTPS = process.env.PORTHTTPS || 443

mongoose.connect(mongoString);
const db = mongoose.connection;

// app.use(session({
//   secret: 'your secret key',
//   resave: false,
//   saveUninitialized: true, //sometimes false
//   store: new MongoStore({ mongoUrl: db.client.s.url }) //or mongoUrl: mongoString
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// // Configure Passport.js to use the User model
// passport.use(User.createStrategy()); //new
// //passport.use(new LocalStrategy(User.authenticate())); //old
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// Middleware to parse JSON
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(flash());
// app.use('/', indexRoutes);
app.use('/birds', birdRoutes);
app.use('/user', userRoutes);
app.use('/category', categoryRoutes);
app.use('/location', locationRoutes);
app.use('/organization', organizationRoutes);
app.use('/thing', thingRoutes);


app.get('/', (req, res) => {        
    res.send('Hello, World! date: ' + new Date());
});

app.get('/delete', deleteContentFromCollections.deleteContentFromCollections);
//#region WEBSERVER
//set NODE_OPTIONS=--openssl-legacy-provider in cmd in VS;read magic wiki
if (host == 'vm04') {
  const credentials = {
    pfx: fs.readFileSync(path.join(__dirname, 'sslcert', 'STAR_xx_at.pfx'))
  };
  const httpsServer = https.createServer(credentials, app);

  //443 used: check tomcat http://localhost:8080/ 
  httpsServer.listen(portHTTPS, (err) => {
    if (err) {
      console.log("Error: ", err);
      console.log(new Date().toISOString() + ` https server could not start on ${host} port: ${portHTTPS}`);
    } else {
      console.log(new Date().toISOString() + ` https server running on ${host} port: ${portHTTPS}`);
      console.log(new Date().toISOString() + ` call: https:vm04 or https://localhost/`);
    }
  });
} else {
  const portHTTPS = process.env.PORTHTTPS || 443
  app.listen(portHTTPS, (err) => {
    if (err) {
      console.log("Error: ", err);
      console.log(new Date().toISOString() + ` https server on host ${host} could not start on port: ${portHTTPS}`);
    } else {
      console.log(new Date().toISOString() + ` https server running on host ${host} port: ${portHTTPS}`);
      console.log(new Date().toISOString() + ` call: localhost:443 in Mozilla`);
    }
  });
}
//#endregion