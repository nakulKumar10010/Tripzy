//require the pakages
if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo"); //to store session in mongoDB
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./model/user.js");

//ROUTES
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const dbUrl = process.env.ATLASDB_URL;

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err);
    });

async function main(){
    await mongoose.connect(dbUrl);
}

//set views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true})); //parse the data
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
app.use('/uploads', express.static('uploads'));

const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 3600, // time in seconds
    crypto: {
        secret: process.env.SECRET, // secret to encrypt the session
    },                      
});

store.on("error", ()=>{
    console.log("ERROR in session store");
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,//7 days time milisecond
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httOnly: true,//for security purpose - to prevent cross-site scripting attacks
    },
};

//middleware fro session and flash
app.use(session(sessionOptions));
app.use(flash());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
//to use static authenticate method in localStrategy - see docxs for more details
passport.use(new LocalStrategy(User.authenticate())); 

//use static serialise and deserialise of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//middleware for flash locals
app.use((req, res, next) =>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});


//demo user
app.get("/demouser", async (req, res) =>{
    let fakeUser = new User({
        email: "student@gmail.com",
        username: "abcd",
    })

    let registeredUser = await User.register(fakeUser, "heloeorld");
    res.send(registeredUser);
})
//for Listing route
app.use("/listings", listingsRouter);
//for review route
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);

// // if request is for any other route of our server except the above routes then show an error of 404
// app.all("*", (req, res, next) => {
//     next(new ExpressError(404, "Page Not Found"));
// });

//define a middleware for an error
app.use((err, req, res, next) =>{
    let{statusCode = 500, message = "Something went wrong!"} = err;
    res.status(statusCode).render("error.ejs", {message});
}); 

//basic Api to check the server
app.get("/", (req, res) => {
    res.render("home.ejs");
});
//starting the server
app.listen(8080, ()=>{
    console.log("server is listening at port 8080");
});