const express=require('express');
const cors=require('cors');
require('dotenv').config();
const db=require('./config/db');
const authRoutes=require('./routes/authRoutes');
const verifyToken = require("./middleware/authMiddleware");
const authorizeRoles = require("./middleware/roleMiddleware");
const socialAccountRoutes = require("./routes/socialAccountRoutes");


const app=express();
const PORT=process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/auth',authRoutes);    //authRoutes.js, this route is used for authentication, it contains the register and login routes
app.use('/api/social-account', socialAccountRoutes);    //socialAccountController.js, this route is used for adding social accounts, it is protected by the verifyToken middleware, only authenticated users can access this route

app.get('/',(req,res)=>{ 
    res.send("hello world");
});

app.get("/api/profile", verifyToken, (req, res) => {        //authMiddleware.js, this route is protected, only authenticated users can access this route, if the user is not authenticated, they will get a 401 error
    res.json({ message: "Protected Route", user: req.user});
});


//reads admin route, only admin can access this route, if the user is not an admin, they will get a 403 error
app.get( "/api/admin", verifyToken, authorizeRoles("admin"),(req, res) => {             //roleMiddleware.js
    res.json({ message: "Welcome Admin" });
});


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});
 
