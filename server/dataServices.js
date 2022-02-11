const mongoose = require('mongoose');
let scene = new mongoose.Schema({
    startTime:{
        type:Number,
        required:true
    },
    endTime:{
        type:Number,
        required:true
    },
    type:{
        type: String,
        enum : [
            'awkward',
            'kiss',
            'nudity'
        ],
        required:true
    }
})

let movieSchema = new mongoose.Schema({
    image:{
        type: String
    },
    genre:{
        type: String,
        enum : [
            'Action',
            'Comedy',
            'Drama',
            'Fantasy',
            'Horror',
            'Mystery',
            'Romance',
            'Thriller',
            'Western'
        ],
        required:true
    }
    ,
    title:  {
        type: String,
        required: true,
        unique:true
    },
    author:  {//user
        type: String,
        required: true
    },
    scenes:[scene],
    rating:  {
        type: Number,
        required: true
    },
    comments:[{
        rating:Number,
        comment:String,
        likes:Number
    }]
    ,
    duration:{
        type:Number,
        required:true
    },
    Data:Date
})
let userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    authority:{
        type:String,
        default:"user"
    },
    Date:Date
})
let refreshToken = new mongoose.Schema({
    token:{
        type:String,
        required:true
    },
    Date:Date
})

module.exports = function(connectionString){
    let users;//db instances are saved here after initialization
    let movies;//so other functions can access them like RegisterUser...
    let refreshTokens;
    
    return{
        
        initialize: function(){//stablish connection to db
            return new Promise((resolve,reject)=>{
                let db1 = mongoose.createConnection(connectionString,{ useNewUrlParser: true,useUnifiedTopology: true });
    
                db1.on('error', ()=>{
                    reject();
                });
                db1.once('open', ()=>{
                    users = db1.model("users", userSchema);//compiling a db instance into users
                    movies = db1.model("movies", movieSchema);//compiling a db instance into movies
                    refreshTokens = db1.model("refreshTokens", refreshToken)
                    
                    resolve();
                });
            });
        },
        registerUser: function(data){//register new user
            return new Promise((resolve,reject)=>{
    
                let newUser = new users(data);
                newUser.Date = Date.now();
                newUser.save((err) => {
                    if(err) {
                        reject(err , "user already exists")
                    } else {
                        resolve(`new user: ${newUser.email} successfully added`);
                    }
                })
                
                
                
            });
        },
        getuserByUsername: function(_username){//for login
            return new Promise((resolve,reject)=>{
                users.findOne({username: _username}).exec().then(user=>{
                    resolve(user)
                }).catch(err=>{
                    reject(err);
                });
            });
        },

        createMovie: function(_movie){
        return new Promise((resolve,reject)=>{
            let movie = _movie;
            for(var i = 0; i<_movie.length;i++){
                movie.scenes[i].push(scene(_movie.scenes[i]))
            }
            let newMovie = new movies(movie);
            newMovie.Date = Date.now();
                
                newMovie.save((err) => {
                    if(err) {
                        
                        reject(err)
                    } else {
                        resolve(`new Movie: ${newMovie._id} successfully added`);
                    }
                }) 
            });
        },
        getLatestMovies: function(){
            return new Promise((resolve,reject)=>{
                movies.find().sort({_id:-1}).limit(10).then(topMovieList =>{
                    resolve(topMovieList)
                }).catch(err=>{
                    reject(err);
                })
            })
        },
        getMoviesBytitle: function(_title){
            return new Promise((resolve,reject)=>{
                movies.find({"title":{$regex: _title}}).sort({_id:-1}).then(MovieList =>{
                    resolve(MovieList)
                }).catch(err=>{
                    reject(err);
                })
            })
        },
        getRefreshToken(_token){
            return new Promise((resolve,reject)=>{
                refreshTokens.findOne({"token":_token}).then(token =>{
                    resolve(token)
                }).catch(err=>{
                    reject(err);
                })
            })
        },
        
        saveRefreshToken: function(_token){
        return new Promise((resolve,reject)=>{
            
            let newToken = new refreshTokens({"token":_token});
            newToken.Date = Date.now();
            
            newToken.save((err) => {
                    if(err) {
                        reject(err)
                    } else {
                        resolve(_token);
                    }
                }) 
            });
        },
        deleteRefreshToken: function(_token){
        return new Promise((resolve,reject)=>{

            refreshTokens.deleteOne({token:_token},(err) => {
                    if(err) {
                        reject(err)
                    } else {
                        resolve("token '",_token,"' deleted.");
                    }
                }) 
            });
        },
        
        
        
        

    }

}