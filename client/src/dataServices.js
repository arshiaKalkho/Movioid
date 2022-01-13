

const axios = require('axios');
const baseUrl = "api/"
//const usersUrl = "api/users"


export default class ClientSideDataServices{
    static getLatestMovies(){
        return new Promise((resolve,reject)=>{
                axios.get(baseUrl+"/latest").then(
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
    static addNewMovie(movie){
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
    static loginUser(user){
        return new Promise((resolve,reject)=>{
            axios.get(baseUrl+"login", {
                user:user
            }).then(response=>{
                resolve(response.jwt)
            }).catch(err=>{
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
}