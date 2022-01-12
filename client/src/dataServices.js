//this file has method to get data from backend
//using axios

//import { response } from 'express';

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
}