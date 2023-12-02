const connectToMongo = require("./db");
const express = require("express");
var cors = require('cors')



connectToMongo();
const app = express();
app.use(cors())
app.use(express.json()); 

// Routes

app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/note", require("./routes/note.js"));

app.get('/',(req, res)=>{
    res.send("helo its working");
})

app.listen(3001);
    