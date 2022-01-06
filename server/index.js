const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const dataServices = require("./dataServices")


app = express();

//middlewears
app.use(bodyparser.json())//parse json request body by default
app.use(cors())//prevent Cross Origin Resource Sharing errs





//api routes

//first for movie actions

app.get('/api/topten', (req,res)=>{
    
})



//now for users actions







if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/'));//set base dir
    app.get(/.*/, (req, res) => res.sendFile(__dirname + 'client/public/index.html'));
    //whatever route express receives it sends vue's index html file leting the vue router handle everything
}



dataServices.initialize().then(()=>{//start the server
    app.listen(process.env.PORT||3000,()=>{
        console.log(`running on port ${process.env.PORT||3000}" `)
    })    
}).catch((err)=>
{console.log("database is out of service",err)});