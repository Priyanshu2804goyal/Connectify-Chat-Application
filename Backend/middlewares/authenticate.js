import jwt from "jsonwebtoken";
const isauthenticated=async(req,res,next)=>{
    try{
      const token=req.cookies.token;
      if(!token){
        return res.status(401).json({message:"User not authenticate"});
      };
      const decode=jwt.verify(token,process.env.JWT_SECRET_KEY);
      console.log(decode);
      if(!decode){
        return res.status(401).json({message:"invalid token"});
      }
      req.id=decode.userId;
      next();
    }catch(error){
        console.log(error);
    }
}
export default isauthenticated;