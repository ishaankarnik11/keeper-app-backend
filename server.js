require("dotenv").config();
const express = require("express");
const cors = require("cors");
const notes = require("./routes/notes")
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/notes", notes);

let url = process.env.DB_CONNECTION;
mongoose.connect(url);
const db_connection = mongoose.connection;
db_connection.once("open", ()=>{
    console.log("DB connection extablished.");
});


app.listen(port, ()=>{console.log(`server started on ${port}`)});