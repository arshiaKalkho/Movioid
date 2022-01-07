if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}//adding environment variables
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const dataServicesF = require("./dataServices")
const dbConnectionString = process.env.CONNECTION_STRING;
const dataServices = dataServicesF(dbConnectionString);
app = express();

//middlewears
app.use(bodyparser.json())//parse json request body by default
app.use(cors())//prevent Cross Origin Resource Sharing errs





//api routes

//first for movie actions

app.get('/api/latest', async (req,res)=>{//for now no error checking
    const latestMovies = await dataServices.getLatestMovies();
    
    res.json(latestMovies)
})



//now for users actions







if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public/'));//set base dir
    //give the built vue app in the public dir to everyone who isn't asking for the api
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
    //whatever route express receives it sends vue's index html file leting the vue router handle everything
}else{
    app.use(express.static(__dirname + '/public/'));
    app.get(/.*/, (req, res) =>{ res.sendFile(__dirname + '/public/index.html')
    
});

}



dataServices.initialize().then(()=>{//start the server
    app.listen(process.env.PORT||3000,()=>{
        console.log(`running on port ${process.env.PORT||3000}" `)
    })    
}).catch((err)=>
{console.log("database is out of service",err)});