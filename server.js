const {MongoClient} = require("mongodb")
const express = require("express")
const app = express()
let db

app.set("view engine", "ejs")
app.set("views","./views")
app.use(express.static("public"))

function passwordProtected(req, res, next){
    res.set("WWW-Authenticate","Basic realm='Our MERN App'")
    if(req.headers.authorization == "Basic YWRtaW46U3VubnlNZWFkb3ckMzc="){
        next()
    } else{
        console.log(req.headers.authorization)
        res.status(401).send("Try Again")

    }

}

app.get("/",async(req, res) => {
    const allErrors = await db.collection("errors").find().toArray()
    res.render("home", {allErrors})
})

app.use(passwordProtected)

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

