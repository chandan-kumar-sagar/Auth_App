 
 const bcrypt = require("bcrypt");
 const user = require("../models/user");
 const jwt = require("jsonwebtoken");
 require("dotenv").config();

 //signup rout handler...........

 exports.signup = async(req, res)=>{
    try{

        //get data.............
        const {name, email, password, role}= req.body;

        //is user already exits.............

        const exinstingUser = await user.findOne({email});

        if(exinstingUser){

            return res.status(400).json({
                "message": 'user already exist',
                "succes": false,
            });
        }

        //password ko secure kro......................
        let hashedPassword;
         try{
             hashedPassword = await bcrypt.hash(password, 10);

         }

         catch(err){
            return res.status(400).json({
                "message": 'erroe in hasihing password',
                "success": false,
            });
         }

         // create entrya for user..............

         const user = await user.create({
            name,email,password:hashedPassword, role
         })

         return res.status(200).json({
            "success" : true,
            "message": 'user created successfully',
         });
    }
     catch(error){

        console.error(error);
        return res.status(500).json({
            "success": false,
            "message": 'usser cannot be registred , plzzz try agin latter'
        });    

     }
    
 }


 //login 

 exports.login = async(req,res)=>{
    try{
        const{email, password}=req.body;

        if(!email || !password){
            return res.status(400).json({
                succes:false,
                message:'please fill all the details carefully',
            });
        }
       let user = await user.findone({email:email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:'user not regestered',

            });
        }

        const payload ={
            email:user.email,
            id:user._id,
            role:user.role,
        };

        if(await bcrypt.compare(password,user.password)){
              //password match...........
              let token = jwt.sign(payload,
                                    process.env.JWT_SECRET,
                                    { expiresIn:"2h",
        
                                });
        user = user.toObject();                        
        user.token = token;
        user.password =undefined;
        
        

        const options={
           
            expires:new Date(date.now()+3*24*60*60*1000),
            httpOnly:true,
     }

        res.cookie("token", token, options).status(200).json({
            success:true,
            token,
            user,
            message:'user logidin succesfully'
        });

        }
        else{
            return res.status(403).json({
                succes:false,
                message:'incorrect password',
            });
        }
    }

    catch(error){
        console.log(error);
       return res.status(500).json({
        success :false,
        message :'login failure',
       }); 
    }
 }