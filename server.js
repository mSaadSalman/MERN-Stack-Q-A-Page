console.log("testing")
const express = require("express")
const app = express()

app.get("/",(req, res) => {
    res.send("Welcome to the homepage")

})

app.get("/admin",(req, res) => {
    res.send("Welcome to admin page (top secret)")

})


app.listen(3000)