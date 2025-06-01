const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const ingestRoutes = require('./routes/ingest')
const segmentRoutes = require('./routes/segment')
const campaignRoutes = require('./routes/campaign')
const aiRooutes = require('./routes/ai')
// const session = require("express-session");
// const passport = require("passport");
// require("./auth/google");

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

app.use("/api",[ingestRoutes,segmentRoutes,campaignRoutes,aiRooutes]);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connect to mongoDb')
    app.listen(process.env.PORT, () => {
      console.log(`server is running on port ${process.env.PORT}`)
    })
  })
  .catch((err) => {
    console.error('Error while connecting to mongodb', err)
    process.exit(1)
  })

// app.use(
//   session({
//     secret: "secret-xeno",
//     resave: false,
//     saveUninitialized: false
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

// // Auth Routes
// app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/" }),
//   (req, res) => res.redirect("http://localhost:3000/dashboard") // redirect to frontend
// );

// // Logout route
// app.get("/auth/logout", (req, res) => {
//   req.logout(() => {
//     res.redirect("/");
//   });
// });