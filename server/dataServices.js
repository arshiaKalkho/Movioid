const mongoose = require('mongoose');
let movieSchema = new mongoose.Schema({
    genres:[
        {
            genre:String
        }
    ],
    title:  {
        type: String,
        required: true
    },
    author:  {
        type: String,
        required: true
    },
    scenes:[{
      scene:String  
    }],
    rating:  {
        rating: Number,
        required: true
    },
    comments:[{
        rating:Number,
        comment:String,
        likes:Number
    }]
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
    }
})

module.exports = function(connectionString){
    return{
        
        initialize: function(){//stablish connection to db
            return new Promise((resolve,reject)=>{
                let db1 = mongoose.createConnection(connectionString,{ useNewUrlParser: true,useUnifiedTopology: true });
    
                db1.on('error', ()=>{
                    reject();
                });
                db1.once('open', ()=>{
                    users = db1.model("users", userSchema);//compiling a db instance into users
                    movies = db1.model("users", movieSchema);//compiling a db instance into movies

                    resolve();
                });
            });
        },
        RegisterUser: function(data){//register new user
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
        getUserByEmail: function(Cemail){//for login
            return new Promise((resolve,reject)=>{
                users.findOne({email: Cemail}).exec().then(user=>{
                    resolve(user)
                }).catch(err=>{
                    reject(err);
                });
            });
        },

        createMovie: function(movie){
            return new Promise((resolve,reject)=>{
                movies.find().sort({_id:-1}).limit(10).then(topMovieList =>{
                    resolve(topMovieList)
                }).catch(err=>{
                    reject(err);
                })
            })
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
        getMovieByName: function(movieName){//return movies their name contains "movieName"
            
            return new Promise((resolve,reject)=>{
                movies.find({"title":{$regex: movieName}}).sort({_id:-1}).then(MovieList =>{
                    resolve(MovieList)
                }).catch(err=>{
                    reject(err);
                })
            })
        }




    }

}