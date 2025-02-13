require("dotenv").config();
const express = require("express");
const dbConnect = require("./config/dbConnect");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.use("/api/users/v1", userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
