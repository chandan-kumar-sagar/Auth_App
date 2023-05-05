
//auth, isStudent, isAdmin naam ka middleware  banaya h

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth =(req, res,next)=>{

    try{
        
        //extract jwt token.................
         const token = req.body.token;
         if(!token){
            return res.status(401).json({
                success:false,
                message:'token missing',
            });
         }

         //very the token......
        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);
            req.user = payload;

        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            }); 
        }
        next();
          
    }

    catch(error){
          return res.status(401).json({
            success:false,
            message:'somwthing went wrong, while verifying the token ',
          });
    }
}


exports.isStudent = (req, res, next)=>{
    try{
         if(req.use.role !== "student"){
            return res.status(401).json({
                success:false,
                message:' this is the protected routes for the students ',
            });
         } 
         next();   
    }

    catch(error){
             return res.status(500).json({
                success:false,
                message:'user is not matching',
             });
    }
}

exports.isAdmin = (req, res,next) =>{
    try{
        if(req.use.role !== "Admin"){
           return res.status(401).json({
               success:false,
               message:' this is the protected routes for the students ',
           });
        } 
        next();   
   }

   catch(error){
            return res.status(500).json({
               success:false,
               message:'user is not matching',
            });
   }
}


