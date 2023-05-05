const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(express.json());
 
require("./config/database").connect();

//routes import karainge bna kr and usko mount bhii karainge.......

const user = require("./routes/user");
app.use("/api/v1", user);


app.listen(PORT, ()=>{
    console.log("app is running succesfully");
})