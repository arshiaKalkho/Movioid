

const axios = require('axios');
const jwt = require('jsonwebtoken')
const baseUrl = "api/"
//const usersUrl = "api/users"


export default class ClientSideDataServices{
    static getLatestMovies(){
        return new Promise((resolve,reject)=>{
                axios.get(baseUrl+"latest").then(
                    resMovies=>{
                        resolve(
                            resMovies.data.map(movie=>({
                                ...movie,
                            }))
                        )
                    }).catch(err=>{
                        reject(err)
                    })
        })
    }
    static getMovieByTitle(title){
        return new Promise((resolve,reject)=>{
                axios.get(baseUrl+"movie",{
                    title:title
                }).then(resMovies=>{
                    resolve(
                        resMovies.data.map(movie=>({
                            ...movie,
                        }))
                    )
                }).catch(err=>{
                    reject(err)
                })
        })
    }
    static addNewMovie(movie){//protected route
        return new Promise((resolve,reject)=>{
            axios.post(baseUrl+"movie",{
                movie:movie
            }).then(response=>
                resolve(response)
            ).catch((err)=>{
                reject(err)
            })
        })
    }
    static registerUser(usrnm ,pswrd,email){
        return new Promise((resolve,reject)=>{
            axios(baseUrl+"register",  {
                headers:{
                    'Content-Type': 'application/json'
                },
                data:{user:{username:usrnm,password:pswrd,email:email}},
                method: 'POST'
                
            }).then(response=>{
                console.log(response)
                resolve(response)
            }).catch(err=>{
                reject(err)
            })  
            
        })
    }
    static loginUser(usrnm, pswrd){
        //body formant
        // "user":{
        //     "username":"root",
        //     "password":"password"
        // }
        return new Promise((resolve,reject)=>{
            axios(baseUrl+"login",  {
                headers:{
                    'Content-Type': 'application/json'
                },
                data:{user:{username:usrnm,password:pswrd}},
                method: 'POST'
                
            }).then(response=>{
                localStorage.setItem("refreshToken",response.data.refreshToken)
                localStorage.setItem("accessToken",response.data.accessToken)
                resolve(response)
            }).catch(err=>{
                reject(err)
            })  
        })
    }

    static getNewAccessToken(){
        return new Promise((resolve,reject)=>{
            const refreshToken = localStorage.getItem("refreshToken");
            if(refreshToken){
                axios.post(baseUrl+"token", {
                    token:refreshToken
                }).then(response=>{
                    resolve(response)
                }).catch(err=>{
                    reject("invalid token",err)
                })  
            }else{
                reject("no refresh token in local storage")
            }
        })
        
    }
    static getLoggedInUsername(){
        const refreshToken = localStorage.getItem("refreshToken");
        if(refreshToken){
            return jwt.decode(refreshToken);
        }else{
            return null;
        }
    }

}