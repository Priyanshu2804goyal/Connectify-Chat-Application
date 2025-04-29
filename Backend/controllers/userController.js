import { User } from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register=async(req,res)=>{
    try{
      const {fullname,username,password,confirmpassword,gender}=req.body;
      if(!fullname || !username ||!password ||!confirmpassword|| !gender){
        return res.status(400).json({message:"All fields are required"});
      }
      if(password!=confirmpassword){
        return res.status(400).json({message:"Password not match"});
      }
      const user= await User.findOne({username});
      if(user){
        return res.status(400).json({message:"Username already exists"});
      }
      const hassedpassword=await bcrypt.hash(password,10);
      const maleprofilephoto=`https://avatar.iran.liara.run/public/boy?username=${username}`;
      const femaleprofilephoto=`https://avatar.iran.liara.run/public/girl?username=${username}`;
      await User.create({
        fullname,
        username,
        password:hassedpassword,
        profilephoto:gender==="male"?maleprofilephoto:femaleprofilephoto,
        gender
      })
      return res.status(201).json({
        success:true,
        message:"Account Successfully Created"
      })
    }catch(error){
      console.log(error);
    }
};
export const login=async(req,res)=>{
    try{
       const {username,password}=req.body;
       if(!username ||!password){
        return res.status(400).json({message:"All fields are required"});
      }
       const user=await User.findOne({username});
       if(!user){
        return res.status(400).json({message:"Incorrect Username or password",success:false});
       }
      const ispasswordmatch= await bcrypt.compare(password,user.password);
      if(!ispasswordmatch){
        return res.status(400).json({message:"Incorrect Username or password",success:false});
      } 
     const tokendata={
        userId:user._id
     }
     const token=jwt.sign(tokendata,process.env.JWT_SECRET_KEY,{expiresIn:'1d'});
     return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:'strict'}).json({
        _id:user._id,
        username:user.username,
        fullname:user.fullname,
        profilephoto:user.profilephoto
       })
    }catch(error){
        console.log(error); 
    }
};
export const logout=(req,res)=>{
    try{
      return res.status(200).cookie("token","",{maxAge:0}).json({
        message:"Logged Out Successfully"
      })
    }catch(error){
        console.log(error);
    }
}
export const getotherusers=async(req,res)=>{
    try{
       const loggedinuser=req.id;
       const otherusers=await User.find({_id:{$ne:loggedinuser}}).select("-password");
       return res.status(200).json(otherusers);
    }catch(err){
        console.log(err);
    }
}