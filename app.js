require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const loginRoute = require("./controllers/handleLogin");
const registerRoute = require("./controllers/handleRegister");
const kebabRoute = require("./controllers/handleKebab");
const verifyRoute = require("./controllers/handleVerify");
const auth = require("./utils/middleware/auth");

try {
  const mongoURL = `mongodb+srv://andrewadmin:${process.env.MONGODB_PW}@cluster0.iiydq.mongodb.net/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`;
  mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
} catch (error) {
  console.log(error);
}
app.use(cors());
app.use(express.json());

app.use("/api/register", registerRoute);
app.use("/api/verify", verifyRoute);
app.use("/api/login", loginRoute);
app.use("/api/kebab", auth.verifyToken, kebabRoute);

app.get("/", (req, res) => {
  console.log("connected");
  res.send("Connected");
});

module.exports = app;
