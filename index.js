const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
const authorRoute = require("./routes/author");
const bookRoute = require("./routes/book");
const userRoute = require('./routes/user');

dotenv.config();
mongoose.set('strictQuery', false);
//CONNECT DATABASE
mongoose.connect(process.env.MONGODB_URL, () => {
  console.log("Connected to MongoDB");
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: "50mb" }));
app.use(helmet());
app.use(cors());
app.use(morgan("common"));
app.use(express.static('public'))

//ROUTES
app.use("/v1/author", authorRoute);
app.use("/v1/book", bookRoute);
app.use('/v1/user', userRoute);

app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running...");
});
