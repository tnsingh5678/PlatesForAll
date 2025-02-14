import express from "express"
import Donation from "../model/Donation.models.js";
import User from "../model/User.models.js";
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth:{
        user : process.env.EMAIL,
        pass:process.env.PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

// transporter.verify((error, success) => {
//     if (error) {
//         console.log('Error verifying SMTP connection:', error);
//     } else {
//         console.log('SMTP connection verified');
//     }
// });

const sendEmail = async (email) =>{
    const mailOptions = {
        from : process.env.EMAIL,
        to : email,
        subject : "Vounteering request for you",
        html : `<p>We are happy to announce you that you got a chance to volunteer with us.Click on the button below to accept the request. ${email}</p>`
    }
    // console.log(mailOptions);

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email : ",info.response);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        return error;
    }
}

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
        const {food , category , address , DonorId } = req.body;
        if(!food || !category || category.length === 0 || !address || !DonorId){
            return res.status(401).json({
                message: "All fields are required"
            })
        }

        const Donor = await User.findById(DonorId);
    
        const donation = new Donation({
            food,
            expiryDate : Date.now() + 24 * 60 * 60 * 1000,
            category,
            time : Date.now(),
            Address:address,
            Donor: Donor,
            Volunteer: null,
            Latitude: 0,
            Longitude: 0,
            Status: false
        });
        donation.save();
        res.status(200).json({
            message: "Donation created successfully",
            donation
        })
    } catch (error) {
        res.status(500).json({
            message: "Error while donating food"
        });
    }

})

router.get('/find',async(req,res) => {
    const {latitude , longitude , DonationId} = req.body;
    if(!latitude || !longitude || !DonationId){
        return res.statusMessage(400).json({
            message: "All fields are required"
        })
    }
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
    // console.log(process.env.email);
    // console.log(process.env.password)
    for(let vol of volunteers){
        // console.log(vol.email)
        // sendEmail(vol.email);
    }
    const expirationTime = Date.now() + 30 * 60 * 1000;
    res.status(200).json({
        message : "Message sent to volunteers",
        volunteers
    })
    // send message to all volunteers
})


router.post('/pick', async(req,res) => {
    try {
        
        const {donationId , volunteerId }= req.body;
        console.log(volunteerId)
        console.log(donationId)
        if(!volunteerId || !donationId){
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
        if(donation.Volunteer){
            return res.status(200).json({
                message : "Item request already acceppted . Try next time . Thank you for connecting with us."
            })
        }
        donation.Volunteer = volunteer;
        donation.save();
        return res.status(200).json({
            message: "Donation request accepted by the volunteer",
            donation
        })
    } catch (error) {
        res.status(500).json({
            message : "Server error while accepting the request for the volunteer"
        })
    }
})

router.post('/drop', async (req,res) =>{
    try {
        
        const {Lon , Lat , donationId} = req.body;
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

export default router;


