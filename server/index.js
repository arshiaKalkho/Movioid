if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}//adding environment variables
const dbConnectionString = process.env.CONNECTION_STRING;

const express = require("express");
app = express();
app.set('query parser', 'simple');

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
    dataServices.getLatestMovies().then((latestMovies)=>
        res.json(latestMovies)
    ).catch(()=>{
        res.sendStatus(500)
    })
})
app.post('/api/register', async (req,res)=>{
    
    const hashedPassword = await bcrypt.hash(req.body.user.password, 10)
    var tempOBJ = req.body.user;
    tempOBJ.password = hashedPassword;
    
    dataServices.registerUser(tempOBJ).then(()=>{
        res.sendStatus(201)
    }).catch((err)=>{
        res.sendStatus(500)
    })
})

app.get('/api/token',async (req,res)=>{//get new access token with refresh token
    
    if(req.query.token){
        jwtServices.validateRefreshToken(req.query.token)
        .then(accessToken=>{
            res.json({accessToken:accessToken})
        }).catch(err=>{
            res.sendStatus(401)
        })
    }else{
        res.sendStatus(401)
    }
})

app.get('/api/accessToken',async (req,res)=>{//validate access token
    if(req.query.token){
    jwtServices.validateAccessToken(req.query.token)
    .then(()=>res.sendStatus(200))
    .catch(()=>res.sendStatus(401))//this is just in case of vue routeguards, middle wers could be used
    }else{
        res.sendStatus(401)
    }
})
app.delete('/api/logout',async (req,res)=>{
    if(req.body.refreshToken){
        dataServices.deleteRefreshToken(req.body.refreshToken)
        .then(()=>{
            res.sendStatus(204) 
        })
        .catch(err=>{
            res.sendStatus(500)
        })
        
    }else{
        res.sendStatus(401)
    }
})

app.post('/api/login',async (req,res)=>{//post because of axios bug on front end
    
    if(req.body.user && req.body.user.password && req.body.user.username){
        const password = req.body.user.password.replace(/\s/g, "");//white space remover
        const username = req.body.user.username.replace(/\s/g, "");
        

        const DBuserObj = await dataServices.getuserByUsername(username)
        
        if(DBuserObj){//if username found
            bcrypt.compare(password, DBuserObj.password,(err,result)=>{
                if(err){//err processing password
                    res.sendStatus(500)
                }else if(result){//make tokens, true password
                    jwtServices.createRefreshToken(username).then((tokens)=>{
                        if(!tokens.err){
                            
                            res.json(tokens)
        
                        }else{//err processing tokens
                            res.sendStatus(500)
                        }

                    }).catch(err=>{
                        res.sendStatus(500)
                    })
                    
                
                }else{//wrong password
                    res.sendStatus(403)
                }
            })
        }else{//username not found
            res.sendStatus(403)
        }
    }else{//invalid request format
        res.sendStatus(400)
    }
})
app.get('/api/movie', async (req,res)=>{
    
    dataServices.getMoviesBytitle(req.query.title).then((data)=>{
        
        res.send(data).status(200)
    }).catch(err=>{
        res.send(err).status(500)
    })


})
app.post('/api/movie',checkJwtAuthHeader, async (req,res)=>{//for now no error checking
    
    try{
        const temp = {
            image: req.body.movie.image , 
            genre: req.body.movie.genre ,
            title: req.body.movie.title.toLowerCase() ,
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
        return res.sendStatus(401)
    }
    
    jwtServices.validateAccessToken(token).then(user=>{
        req.user = user;
        next();
    }).catch(err=>{
        return res.sendStatus(401)
    })
    
    
}