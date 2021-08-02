require("dotenv").config();

const express = require("express");
const sequelize = require("./dataBase");
const models = require("./models/models");
const cors = require("cors");
const ErrorHandler = require("./middleware/ErrorHandlingModdleware");

const PORT = process.env.PORT || 5000;

const router = require("./routes/index");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

//last!!
app.use(ErrorHandler);

// app.get("/", (req, res) => {
//   res.status(200).json({ message: "working !!!!!!!!" });
// });

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`server started ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
