const express = require("express")
const cors = require("cors");
const { connection } = require("./db");

require("dotenv").config();
const PORT = process.env.PORT || 8080

const app = express();
app.use(express.json()); // parse req.body
app.use(cors()); // Cross Origin Resource Sharing Access


app.get("/",(req,res)=>{
    res.send("Home")
})




app.listen(PORT,async()=>{

    try {
        await connection
        console.log("Connected to DB");
        console.log(`Server running at http://localhost:${PORT}`);

    } catch (error) {
        console.log(error);
    }
})

