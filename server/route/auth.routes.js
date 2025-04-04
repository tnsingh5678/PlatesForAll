import bcrypt from "bcryptjs"
import User from "../model/User.models.js"
import Jwt from "jsonwebtoken"
import express from "express"

const router = express.Router();

const validator = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
}

router.post("/signup",async (req,res)=>{
    const { username , password , email} = req.body;
    try {
        
        if(!username || !password || !email){
            return res.status(401).json({
                message: "All fields are required"
            })
        }

        const valid = validator(email);

        if(!valid){
            return res.status(401).json({
                message: "Email is not valid"
            })
        }

        const HashedPassword = await bcrypt.hash(password,10);
    
        const user = new User({
            username,
            password: HashedPassword,
            email
        })
    
        if(!user){
            return res.status(401).json({
                message: "User not created"
            })
        }
        user.save();

        return res.status(200).json({
            message: "User created successfully",
            user
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Server error while creating new user",
        })
    }
});

router.post('/login',async (req,res)=>{
    try {
        const {email , password} = req.body;
        if(!email || !password){
            return res.status(401).json({
                message: "All fileds are required"
            })
        }
    
        const user = await User.findOne({email});
    
        if(!user){
            return res.status(401).json({
                message: "User not found"
            })
        }
    
        const isCorrect = await bcrypt.compare(password,user.password);
    
        if(!isCorrect){
            return res.status(401).json({
                message:"Password not matched"
            })
        }
    
        const payload = {
            email: user.email,
            username: user.username,
            address: user.address,
            phone: user.phone,
            userId: user._id
        }
    
        const key = process.env.JWT_SECRET_KEY;
    
        const token = Jwt.sign(payload,key,{expiresIn: '1h'});
    
        if(!token){
            return res.status(401).json({
                message: "Token not generated"
            })
        }
    
        res.status(200).json({
            message: "Token generated successfully",
            token
        })
    } catch (error) {
        res.status(500).json({
            message: "Error during login"
        })
    }
});

router.delete('/delete' , async(req,res) => {
    const {userId} = req.body;
    try {
        if(!userId){
            return res.status(400).json({
                message : "UserId is invalid"
            })
        }
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                message : "User not found"
            })
        }
        await User.deleteOne({ _id: userId });
        res.status(200).json({
            message : "User deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message : "Error while deleting user"
        })
    }
    
})

router.patch('/update' , async (req,res) => {
    const {username , email, userId} = req.body;
    try {
        if(!username || !email || !userId){
            return res.status(400).json({
                message : "All fields are required"
            })
        } 
        const user = await User.findById(userId)
        if(!user){
            return res.status(400).json({
                message : "User not found"
            })
        }
        user.email = email;
        user.username = username;
        user.save();
        res.status(200).json({
            message : "User details updated successfully",
            user
        })
    } catch (error) {
        res.status(500).json({
            message : "Error while updating user details"
        })
    }

})

router.patch('/password',async(req,res) => {
    const {password,userId} = req.body;
    try {
        if(!password || !userId){
            return res.status(400).json({
                message : "All fields are required"
            })
        }
        const user = await User.findById(userId)
        if(!user){
            return res.status(400).json({
                message : "User not found"
            })
        }
        const HashedPassword = await bcrypt.hash(password,10);
        user.password = HashedPassword;
        user.save();
        res.status(200).json({
            message : "Password updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            message : "Error while updating password"
        })
    }

})


export default router;