import express from "express";
import path from "path";
import ejsMate from "ejs-mate";
import { fileURLToPath } from "url";
import methodOveride from "method-override";
import flash from "connect-flash";
import session from "express-session";
import passport from "passport";
import localStrategy from "passport-local";
import { User } from "./models/user.model.js";
import MongoStore from "connect-mongo";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.engine("ejs", ejsMate);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(methodOveride("_method"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  })
);
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.reject = req.flash("reject");
  next();
});

app.get("/", (req, res) => {
  res.render("home");
});

// routes import
import productRouter from "./routes/product.routes.js";
import categoryRouter from "./routes/category.routes.js";
import reviewRouter from "./routes/review.routes.js";
import userRouter from "./routes/user.routes.js";
import cartRouter from "./routes/cart.routes.js";
import paymentRouter from "./routes/payment.routes.js";
import apiRoutes from "./routes/api.routes.js";

// routes declaration
app.use("/api/products", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/products", reviewRouter);
app.use("/api/user", userRouter);
app.use("/api/user", cartRouter);
app.use("/api/payment", paymentRouter);
app.use("/api", apiRoutes);

export { app };
