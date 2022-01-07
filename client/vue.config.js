const path = require('path')



//to setup production url so we can acces backend from the frontend
module.exports = {
    //put out built vue app in public directory for the express server
    outputDir: path.resolve(__dirname, "../server/public")
    ,
    devServer: {
        proxy: {
            '/api':{
                target: "http://localhost:3000"
            }
        }
    }
}