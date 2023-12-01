require("./models/User");
require("./models/Gym");
require("./models/Session");
require("./models/Price");
require("./models/Wallet");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const gymRoutes = require("./routes/gymRoutes");
const requireAuth = require("./middlewares/requireAuth");
const sessionRoutes = require("./routes/sessionRoutes");
const priceRoutes = require("./routes/priceRoute");
const walletRoutes = require("./routes/walletRoutes");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(gymRoutes);
app.use(sessionRoutes);
app.use(priceRoutes);
app.use(walletRoutes);

const mongoUri = "mongodb+srv://ashutoshphotoneutron:0neE16VyM946mk14@cluster0.hhwbfrq.mongodb.net/?retryWrites=true&w=majority";
if (!mongoUri) {
  throw new Error(
    `MongoURI was not supplied.  Make sure to add Username and Password!`
  );
}

mongoose.set("strictQuery", true);
// resolves future deprecation issue with Mongoose v7

mongoose.connect(mongoUri);
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
