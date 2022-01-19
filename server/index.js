if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}//adding environment variables
const dbConnectionString = process.env.CONNECTION_STRING;

const express = require("express");
app = express();

const bodyparser = require("body-parser");
const cors = require("cors");
const bcrypt = require('bcrypt')

const dataServicesF = require("./dataServices");
const jwtServicesF = require('./jwtServices');
const dataServices = dataServicesF(dbConnectionString);
const jwtServices = jwtServicesF(dataServices);


//middlewears
app.use(bodyparser.json())//parse json request body by default
app.use(cors())//prevent Cross Origin Resource Sharing errs




app.get('/api/latest', async (req,res)=>{//for now no error checking
    const latestMovies = await dataServices.getLatestMovies();
    
    res.json(latestMovies)
})
app.post('/api/register', async (req,res)=>{
    
    const hashedPassword = await bcrypt.hash(req.body.user.password, 10)
    var tempOBJ = req.body.user;
    tempOBJ.password = hashedPassword;
    dataServices.registerUser(tempOBJ).then(()=>{
        res.sendStatus(201)
    }).catch((err)=>{
        //console.log(err)
        res.sendStatus(500)
    })
})
app.get('/api/login',async (req,res)=>{

    const password = req.body.user.password;
    const DBuserObj = await dataServices.getuserByUsername(req.body.user.username)
    if(DBuserObj){//if username found
        bcrypt.compare(password, DBuserObj.password,(err,result)=>{
            if(err){//err processing password
                res.sendStatus(500)
            }else if(result){//make tokens, true password
                jwtServices.createRefreshToken(req.body.user.username).then((tokens)=>{
                    if(!tokens.err){
                        
                        res.json(tokens)
    
                    }else{//err processing tokens
                        res.sendStatus(500)
                    }

                }).catch(err=>{
                    res.sendStatus(500)
                })
                
            
            }else{//wrong password
                res.sendStatud(403)
            }
        })
    }else{//username not found
        res.sendStatus(403)
    }
})
app.get('/api/movie', async (req,res)=>{
    dataServices.getMovieBytitle(req.body.title).then((data)=>{
        res.send(data).status(200)
    }).catch(err=>{
        res.send(err).status(500)
    })


})
app.post('/api/movie',checkJwtAuthHeader, async (req,res)=>{//for now no error checking
    try{
    const temp = {
        genre: req.body.movie.genre ,
        title: req.body.movie.title ,
        author: "root" ,
        scenes: req.body.movie.scenes ,
        rating: req.body.movie.rating ,
        comments: [] ,
        duration: req.body.movie.duration
    }
    dataServices.createMovie(temp)
    .then(result=>res.sendStatus(201))
    .catch(err=>res.sendStatus(409))
    }catch(err){
        res.sendStatus(422)
    }
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







async function checkJwtAuthHeader(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] ;
    
    
    if(!token){
        //console.log("no token provided")
        return res.sendStatus(401)
    }
    
    jwtServices.validateAccessToken(token).then(user=>{
        req.user = user;
        next();
    }).catch(err=>{
        return res.sendStatus(401)
    })
    
    
}