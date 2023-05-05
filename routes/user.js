const express = require("express");

const router = express.Router();

const {login,signup} = require("../Controllers/Auth");
const{auth, isStudent, isAdmin} = require("../middleware/auth")

router.post("/login", login);
router.post("/signup", signup);

// protected routes.......................
router.get("/test", auth, isStudent, (req,res)=>{
    res.json({
        success :true,
        message:'welcome to the procted routes for students'
    });
});

router.get("/student",auth,isStudent, (req,res)=>{
    res.json({
        success :true,
        message:'welcome to the procted routes for students'
    });
   
});

router.get("/admin",auth, isStudent, (res,req)=>{
    res.json({
        success :true,
        message:'welcome to the procted routes for students'
    });
});

module.exports = router;
