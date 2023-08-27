const {MongoClient, ObjectId} = require("mongodb")
const express = require("express")
const app = express()
const multer = require('multer')
const upload = multer()
const sanitizeHTML = require('sanitize-html')
let db

app.set("view engine", "ejs")
app.set("views","./views")
app.use(express.static("public"))

app.use(express.json())
app.use(express.urlencoded({extended: false}))

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

app.post("/create-error", upload.single("photo"),ourCleanup,async (req,res) =>{
    console.log(req.body)
    const info = await db.collection("errors").insertOne(req.cleanData)
    const newError = await db.collection("errors").findOne({_id: new ObjectId(info.insertedId)})
    res.send(newError)
})

function ourCleanup(req,res,next){
    if(typeof req.body.Name != "string") req.body.Name =""
    if(typeof req.body.Details != "string") req.body.Details =""
    if(typeof req.body._id != "string") req.body._id =""

    req.cleanData={
        Name: sanitizeHTML(req.body.Name.trim(),{allowedTags: [], allowedAttributes:{}}),
        Details: sanitizeHTML(req.body.Details.trim(),{allowedTags: [], allowedAttributes:{}})
    }

    next()
}

async function start(){
    const client = new MongoClient("mongodb://root:root@localhost:27017/BackEnd-QA-Page?&authSource=admin")
    await client.connect()
    db = client.db()
    app.listen(3000)
}
start()

