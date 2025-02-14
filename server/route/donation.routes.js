import express from "express"
import Donation from "../model/Donation.models.js";
import User from "../model/User.models.js";

const router = express.Router();

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
};


router.post('/donor',async(req,res) => {
    try {
        const {food , expiryDate , time , category , address , Donor } = req.body;
        if(!food || !expiryDate || !time || !category || address || !Donor){
            return res.status(401).json({
                message: "All fields are required"
            })
        }
    
        const donation = new Donation({
            food,
            expiryDate,
            category,
            time,
            Address:address,
            Donor: Donor,
            Volunteer: null,
            Latitude: 0,
            Longitude: 0,
            Status: false
        });
        res.status(200).json({
            message: "Donation created successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Error while donating food"
        });
    }

})

router.post('/find',async(req,res) => {
    const {latitude , longitude , DonationId} = req.body;
    const donation = await Donation.findById(DonationId);
    const volunteers = [];
    // want to go into user db and find all users who have distance of less than 5km into volunteers find using latitude , longtude
    // send pick request to all of them 
    // who ever first select will pick the donation
    // there is a 30 min to pick the donation else donation rejected
    const users = await User.find();
    for(let user of users){
        let distance = calculateDistance(latitude , longitude , user.latitude , user.longitude);
        if(distance < 5){
            volunteers.push(user);
        }
    }
    if(volunteers.length === 0){
        return res.status(200).json({
            message: "No volunteer in near by area available"
        })
    }
    // send notification to all volunteers
    const expirationTime = Date.now() + 30 * 60 * 1000;
    // send message to all volunteers
})


router.post(`/pick:volunteerId`, async(req,res) => {
    try {
        const volunteerId = req.params;
        const donationId = req.body;
        if(!volunteerId || donationId){
            return res.status(401).json({
                message: "VolunteerId or DonationId not found"
            })
        }
        const volunteer = await User.findById(volunteerId);
        const donation = await Donation.findById(donationId);
        if(!volunteer || !donation){
            return res.status(401).json({
                message: "Volunteer or Donation not found"
            })
        }
        donation.Volunteer = volunteer;
        donation.save();
        return res.status(200).json({
            message: "Donation request accepted by the volunteer"
        })
    } catch (error) {
        res.status(500).json({
            message : "Server error while accepting the request for the volunteer"
        })
    }
})

router.post(`/drop:donationId`, async (req,res) =>{
    try {
        const donationId = req.params;
        const {Lon , Lat} = req.body;
        const donation = await Donation.findById(donationId);
        const destinationLon = donation.Longitude;
        const destinationLat = donation.Latitude;
        if(Lon != destinationLon || Lat != destinationLat){
            return res.status(201).json({
                message: "Item not found at location there might be some problem"
            })
        }
    
        res.status(200).json({
            message: "Donation successfully delievered to location"
        })
    } catch (error) {
        res.status(500).json({
            message: "Error from volunteer side while delievering"
        })
    }
})


