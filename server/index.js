if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}//adding environment variables
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const dataServicesF = require("./dataServices")
const bcrypt = require('bcrypt')
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
app.post('/api/register', async (req,res)=>{
    
    const hashedPassword = await bcrypt.hash(req.body.user.password, 10)
    var tempOBJ = req.body.user;
    tempOBJ.password = hashedPassword;
    dataServices.registerUser(tempOBJ).then((ok)=>{
        res.send(ok).status(201)
    }).catch((err)=>{
        res.send(err).status(500)
    })
})
app.get('/api/login',async (req,res)=>{
    const password = req.body.user.password;
    const DBhashedPass = await dataServices.getuserByUsername(req.body.user.username)
    bcrypt.compare(password, DBhashedPass,(err,result)=>{
        if(err){
            res.send(500)
        }else if(result){
            res.send(200)//send jwt token
        }else{
            res.send(400)
        }
    })
})
app.get('/api/movie', async (req,res)=>{
    dataServices.getMovieBytitle(req.body.title).then((data)=>{
        res.send(data).status(200)
    }).catch(err=>{
        res.send(err).status(500)
    })


})
app.post('/api/movie', async (req,res)=>{//for now no error checking
    const temp = {
        genre: req.body.movie.genre ,
        title: req.body.movie.title ,
        author: "root" ,
        scenes: req.body.movie.scenes ,
        rating: 5 ,
        comments: [] ,
        duration: req.body.movie.duration
    }
    dataServices.createMovie(temp)
    .then(result=>res.send(result).status(201))
    .catch(err=>res.send(err).status(500))
    
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