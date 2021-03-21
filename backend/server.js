const express = require("express");

require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const authRoutes = require("./routes/auth");
const cors = require("cors");
const app = express();

// connect to database
mongoose
  .connect(process.env.mongoose_uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to DataBASE"))
  .catch((error) => console.log(error));

// middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));
if (process.env.NODE_ENV == "development") {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

// routes
app.use("/api", authRoutes);

// listen to port
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`connected to port ${port}`);
});
