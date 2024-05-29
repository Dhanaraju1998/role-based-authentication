const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const registerRoute = require("./routes/Register");
const loginRoute = require("./routes/Login");
const port = 4300;

const app = express();


// DB connection
mongoose
  .connect("mongodb+srv://dhanaraju:dhanaraju@authentication.edtvf3f.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("Db connected successfully");
  })
  .catch((err) => {
    console.log("Db connection failed");
  });
  
// Middlewares
app.use(express.json());
app.use(cors({ origin: true }));

app.use("/auth/register", registerRoute);
app.use("/auth/login", loginRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
