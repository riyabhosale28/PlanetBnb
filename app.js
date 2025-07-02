//main code

// if(process.env.NODE_ENV !="production"){


// require('dotenv').config();
// }


// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const listingController = require('./controllers/listing'); 

// // const Listing = require("./models/listing.js");
// const path = require("path");
// const methodOverride = require("method-override");
// const ejsMate = require("ejs-mate");
// const wrapAsync = require("./utils/wrapAsync.js");
// const ExpressError = require("./utils/ExpressError.js");
// // const { listingSchema, reviewSchema } = require("./schema.js");
// // const Review = require("./models/review.js");
// const session = require("express-session");
// const flash = require("connect-flash");
// const passport = require("passport");
// const Localstrategy = require("passport-local");
// const User = require("./models/user.js");
// const listingRouter = require("./routes/listing.js");
// const reviewRouter = require("./routes/review.js");
// const userRouter = require("./routes/user.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// async function main() {
//     try {
//         await mongoose.connect(MONGO_URL);
//         console.log("Connected to DB");
//     } catch (err) {
//         console.error("MongoDB Connection Error:", err);
//     }
// }
// main();

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride("_method"));
// app.engine("ejs", ejsMate);
// app.use(express.static(path.join(__dirname, "/public")));
// app.use((req, res, next) => {
//     res.locals.currUser = req.user;
//     next();
//   });
  
  


// const sessionOptions ={
//     secret :"mysupersecretcode",
//     resave :false,
//     saveUninitialized: true ,
//     cookie : {
//         expires: Date.now() + 7 * 24 * 60 * 60 *1000,
//         maxAge: 7*24*60*60*1000,
//         httpOnly: true,
//     }, 
// };


// app.use(session(sessionOptions));
// app.use(flash());
// app.use((req, res, next) => {
//     res.locals.success = req.flash("success");
//     res.locals.error = req.flash("error");
//     res.locals.currUser = req.user;
//     next();
// });

// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new Localstrategy(User.authenticate()));

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());




// app.use("/listings",listingRouter);
// app.use("/listings/:id/reviews",reviewRouter);
// app.use("/",userRouter);

// app.all("*", (req, res, next) => {
//     next(new ExpressError(404, "Page Not Found!"));
// });

// app.use((err, req, res, next) => {
//     let { statusCode = 500, message = "Something went wrong!" } = err;
//     res.status(statusCode).render("error.ejs", { message });
// });

// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//     console.log(`Server is listening on port ${PORT}`);
// });








if(process.env.NODE_ENV !="production"){


    require('dotenv').config();
    }
    
    
    const express = require("express");
    const app = express();
    const mongoose = require("mongoose");
    const listingController = require('./controllers/listing'); 
    
    // const Listing = require("./models/listing.js");
    const path = require("path");
    const methodOverride = require("method-override");
    const ejsMate = require("ejs-mate");
    const wrapAsync = require("./utils/wrapAsync.js");
    const ExpressError = require("./utils/ExpressError.js");
    // const { listingSchema, reviewSchema } = require("./schema.js");
    // const Review = require("./models/review.js");
    const session = require("express-session");
    const flash = require("connect-flash");
    const passport = require("passport");
    const Localstrategy = require("passport-local");
    const User = require("./models/user.js");
    const listingRouter = require("./routes/listing.js");
    const reviewRouter = require("./routes/review.js");
    const userRouter = require("./routes/user.js");
    
    const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
    
    async function main() {
        try {
            await mongoose.connect(MONGO_URL);
            console.log("Connected to DB");
        } catch (err) {
            console.error("MongoDB Connection Error:", err);
        }
    }
    main();
    
    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "views"));
    
    app.use(express.urlencoded({ extended: true }));
    app.use(methodOverride("_method"));
    app.engine("ejs", ejsMate);
    app.use(express.static(path.join(__dirname, "/public")));
      
    
    
    const sessionOptions ={
        secret :process.env.SECRET,
        resave :false,
        saveUninitialized: true ,
        cookie : {
            expires: Date.now() + 7 * 24 * 60 * 60 *1000,
            maxAge: 7*24*60*60*1000,
            httpOnly: true,
        }, 
    };
    
    
    app.use(session(sessionOptions));
    app.use(flash());
    app.use((req, res, next) => {
        res.locals.success = req.flash("success");
        res.locals.error = req.flash("error");
        res.locals.currUser = req.user;
        next();
    });
    
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new Localstrategy(User.authenticate()));
    
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
    
    
    
    
    app.use("/listings",listingRouter);
    app.use("/listings/:id/reviews",reviewRouter);
    app.use("/",userRouter);
    
    app.all("*", (req, res, next) => {
        next(new ExpressError(404, "Page Not Found!"));
    });
    
    app.use((err, req, res, next) => {
        let { statusCode = 500, message = "Something went wrong!" } = err;
        res.status(statusCode).render("error.ejs", { message });
    });
    
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });