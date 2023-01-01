const connectDB = require("./db/connect");
require("dotenv").config();

const express = require("express");
const app = express();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleWare = require("./middleware/error-handler");

// VIEWS
const tasks = require("./views/tasks");

// MIDDLEWARE
app.use(express.json()); // if we dont use this, we dont have access to req.body which containing some data which user sends
app.use(express.static("./public"));

// ROUTES

app.use("/api/v1/tasks", tasks);

app.use(notFound); // app.all('*', (req,res)=>{res.send('Not Found')} this is alternative for not found route
app.use(errorHandlerMiddleWare);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}....`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
