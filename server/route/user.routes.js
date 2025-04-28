import express from "express"
import User from "../model/User.models.js"
import Donation from "../model/Donation.models.js";

const router = express.Router();

router.get('/findDonations/:userId',async (req,res) => {
    const {userId} = req.params;
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
        const donations = user.donations;
        return res.status(200).json({
            message: "User donations",
            donations
        })
    } catch (error) {
        res.status(500).json({
            message : "Error while fetching user donations history"
        })
    }
})

router.get('/findVolunteering/:userId',async (req,res) => {
    const {userId} = req.params;
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
        const volunteered = user.volunteering;
        return res.status(200).json({
            message : "User volunteering history fetched successfully",
            volunteered
        })
    } catch (error) {
        res.status(500).json({
            message : "Error while fetching user volunteering history"
        })
    }
})

router.get('/findRequests/:userId',async (req,res) => {
    const {userId} = req.params;
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
        const requests = user.requests;
        const Request = [];
        for(let i=0;i<requests.length;i++){
            const donation = await Donation.findById(requests[i]);
            Request.push(donation);
        }
        return res.status(200).json({
            message : "User volunteering requests fetched successfully",
            Request
        })
    } catch (error) {
        res.status(500).json({
            message : "Error while fetched successfully"
        })
    }
})



export default router;