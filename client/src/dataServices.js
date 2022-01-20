

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
    static registerUser(user){
        return new Promise((resolve,reject)=>{
            axios.post(baseUrl+"register", {
                user:user
            }).then(response=>{
                resolve(response)
            }).catch(err=>{
                reject(err)
            })  
            
        })
    }
    static loginUser(user){
        return new Promise((resolve,reject)=>{
            axios.get(baseUrl+"login", {
                user:user
            }).then(response=>{
                localStorage.setItem("refreshToken",response.refreshToken)
                localStorage.setItem("accessToken",response.accessToken)
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