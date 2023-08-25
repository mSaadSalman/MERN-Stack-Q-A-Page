const {MongoClient} = require("mongodb")
const express = require("express")
const app = express()
let db

app.set("view engine", "ejs")
app.set("views","./views")
app.use(express.static("public"))

app.get("/",async(req, res) => {
    const allErrors = await db.collection("errors").find().toArray()
    res.render("home", {allErrors})
})

app.get("/admin",(req, res) => {
    res.render("admin")

})

app.get("/api/errors",async (req, res)=>{
    const allErrors = await db.collection("errors").find().toArray()
    res.json(allErrors)
})

async function start(){
    const client = new MongoClient("mongodb://root:root@localhost:27017/BackEnd-QA-Page?&authSource=admin")
    await client.connect()
    db = client.db()
    app.listen(3000)
}
start()

