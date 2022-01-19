const jwt = require("jsonwebtoken")



module.exports = function(DBconnection){

    return{
        validateRefreshToken: function(_token){
            return new Promise((resolve,reject)=>{    
                DBconnection.getRefreshToken(_token)
                .then(token=>{
                    if(token[0]){
                        jwt.verify(token[0], process.env.JWT_REFRESH_TOKEN_SECRET,
                            (err,user)=>{
                            if(err){
                                reject("refresh token expired")
                            }else if(user){
                                const token = jwt.sign(user, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '30m' })
                                resolve(token);
                            }
                            
                        })
                    }else{
                        reject("token doesn't exist")
                    }
                })
                .catch(err=>{
                    reject("err connecting to database: for refresh token")
                })
            })
        },
        createRefreshToken: function(user){
            const refToken = jwt.sign({user:user}, process.env.JWT_REFRESH_TOKEN_SECRET,{ expiresIn: '30m' })
            const accessToken = jwt.sign({user:user}, process.env.JWT_ACCESS_TOKEN_SECRET,{ expiresIn: '10m' })

            return {
                refreshToken : DBconnection.saveRefreshToken(refToken)
                .then(()=>{
                    return refToken;
                }).catch(err=>{
                    console.log("err saving token ",err)
                    return null;
                }),
                accessToken : accessToken
            }
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