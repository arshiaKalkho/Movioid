const mongoose = require('mongoose');


let movieSchema = new mongoose.Schema({
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
    scenes:[{
        scene:String  
    }],
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
    usrename:{
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
        required:true,
        default:"user"
    },
    Date:Date
})

module.exports = function(connectionString){
    let users;//db instances are saved here after initialization
    let movies;//so other functions can access them like RegisterUser...
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

        createMovie: function(movie){
            return new Promise((resolve,reject)=>{
    
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
        getMovieBytitle: function(title){
            return new Promise((resolve,reject)=>{
                movies.find({"title":{$regex: title}}).sort({_id:-1}).then(MovieList =>{
                    resolve(MovieList)
                }).catch(err=>{
                    reject(err);
                })
            })
        }
        
        




    }

}