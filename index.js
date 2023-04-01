const express = require("express");
const port = 8000;
const app = express();
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const cookieParser = require("cookie-parser");
//session
const session = require("express-session");
const MongoStore = require("connect-mongo");
const store = MongoStore.create({
  mongoUrl: "mongodb://localhost/placement_cell_site",
  ttl: 14 * 24 * 60 * 60,
  autoRemove: "disabled",
});
//passport
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

//cookie parser
app.use(cookieParser());

//parser function
app.use(express.urlencoded());

//set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//set up the express layouts
app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//accessing static files
app.use(express.static("assets"));

//mongo store is used to store the session cookie in the db
app.use(
  session({
    name: "placement_site",
    secret: "secretkeytoencriptanddecript",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: store,
    function(err) {
      console.log(err || "connect-mongodb setup ok");
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//set up the routes
app.use("/", require("./routes/index"));

app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the server", err);
    return;
  }
  console.log(`Server is running on port ${port}`);
});
