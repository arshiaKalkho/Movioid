

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
    static getMoviesByTitle(title){
        return new Promise((resolve,reject)=>{
                axios.get(baseUrl+`movie?title=${title}`).then(resMovies=>{
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
    static addNewMovie(_movie){//protected route
        return new Promise((resolve,reject)=>{
            axios(baseUrl+"movie",{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${localStorage.getItem('accessToken')}`
                },
                data:{movie:_movie},
                method: "POST"
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
                resolve(response)
            }).catch(err=>{
                reject(err)
            })  
            
        })
    }
    static loginUser(usrnm, pswrd){
        //body format
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
                axios.get(baseUrl+`token?token=${refreshToken}`).then(response=>{
                    localStorage.setItem("accessToken",response.data.accessToken)
                    resolve(response.accessToken)
                }).catch(err=>{
                    reject("invalid token",err)
                })  
            }else{
                reject("no refresh token in local storage")
            }
        })
        
    }
    static getVerifiedUsername(){
        return new Promise((resolve,reject)=>{
            const refreshToken = localStorage.getItem("refreshToken");
            if(refreshToken){        
                
                axios.get(baseUrl+`token?token=${refreshToken}`).then(response=>{
                    localStorage.setItem("accessToken",response.data.accessToken)
                    
                    resolve(jwt.decode(refreshToken).user)
                }).catch(()=>{//reset user
                    localStorage.removeItem("accessToken")
                    localStorage.removeItem("refreshToken")
                    reject()
                })  
            
            }else{
                reject();
            }
        
        })
    }

    
    static logOutUser(){
        return new Promise((resolve,reject)=>{
            axios(baseUrl+"logout",  {
                headers:{
                    'Content-Type': 'application/json'
                },
                data:{refreshToken:localStorage.getItem("refreshToken")},
                method: 'DELETE'
                
            }).then(response=>{
                localStorage.removeItem("refreshToken")
                localStorage.removeItem("accessToken")
                resolve(response)
            }).catch(err=>{
                reject(err)
            })  
        })
    }
    static validateAccessToken(){
        return new Promise((resolve,reject)=>{
            let accessToken =localStorage.getItem('accessToken');
            axios.get(baseUrl+`accessToken?token=${accessToken}`)
            .then(response=>{
                if(response.statusCode === 200){
                    resolve()
                }else{
                    reject()
                }
            })
            .catch(()=>reject())
        })
    }

}