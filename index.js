const express = require("express")
const cors = require("cors");
const { connection } = require("./db");
const { ApiRouter } = require("./routes/api.routes");

require("dotenv").config();
const PORT = process.env.PORT || 8080

const app = express();
app.use(express.json()); // parse req.body
app.use(cors()); // Cross Origin Resource Sharing Access

// routes

app.use("/api",ApiRouter)

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

