const jwt = require("jsonwebtoken")

const authenticate = (req,res,next)=>{
    const token = req.headers.authorization;
    //console.log(token)
    if(token){
        const decoded = jwt.verify(token, "masai")
        console.log(decoded)
        if(decoded){
            const userID = decoded.userID;
            //console.log(userID)
            console.log(decoded)

            req.body.userID= userID;
            next()
        }else{
            res.send("Please Login first")
        }
    }else{
        res.send("Please login first")
    }
}

module.exports={
    authenticate
}