const jwt = require("jsonwebtoken")




module.exports = function(DBconnection){

    return{
        validateRefreshToken: function(_token){
            return new Promise((resolve,reject)=>{    
                DBconnection.getRefreshToken(_token)
                .then(token=>{
                    
                    if(token){
                        jwt.verify(token.token, process.env.JWT_REFRESH_TOKEN_SECRET,
                            (err,userOBJ)=>{
                            if(err){
                                DBconnection.deleteRefreshToken(_token)
                                .catch(err=>{
                                    //console.log(err)
                                })
                                reject("refresh token expired")
                            }else if(userOBJ){
                                const token = jwt.sign({user:userOBJ.user}, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn:"10m" })
                                resolve(token);
                            }
                            
                        })
                    }else{
                        reject("token doesn't exist")
                    }
                })
                .catch(err=>{
                    reject("err recieving refresh token from db")
                })
            })
        },
        createRefreshToken:async function(user){
            const refToken = jwt.sign({user:user}, process.env.JWT_REFRESH_TOKEN_SECRET,{ expiresIn: "60m"  })
            
            const accessToken = jwt.sign({user:user}, process.env.JWT_ACCESS_TOKEN_SECRET,{ expiresIn: "10m" })
            
            

            return DBconnection.saveRefreshToken(refToken)
            .then((tkn)=>{ 
                return {refreshToken : tkn, accessToken : accessToken};
                
            }).catch(err=>{
                return {err:err}
            })
            

            
        },
        validateAccessToken: function(_token){
            return new Promise((resolve,reject)=>{
                jwt.verify(_token, process.env.JWT_ACCESS_TOKEN_SECRET,(err, user)=>{
                    if(err){
                        reject(err)
                    }else{
                    resolve(user)
                    }
                })
            })
        },
        
        
    } 
}