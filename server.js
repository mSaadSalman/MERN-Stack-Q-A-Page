const {MongoClient} = require("mongodb")
const express = require("express")
const app = express()
let db

app.set("view engine", "ejs")
app.set("views","./views")

app.get("/",async(req, res) => {
    const allErrors = await db.collection("errors").find().toArray()
    res.render("home", {allErrors})
})

app.get("/admin",(req, res) => {
    res.send("Welcome to admin page (top secret)")

})

async function start(){
    const client = new MongoClient("mongodb://root:root@localhost:27017/BackEnd-QA-Page?&authSource=admin")
    await client.connect()
    db = client.db()
    app.listen(3000)
}
start()

