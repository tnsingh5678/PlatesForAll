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


router.post('/donor/:DonorId',async(req,res) => {
    try {
        const {food , category , address , coordinates} = req.body;
        const {DonorId} = req.params;
        console.log(DonorId);
        if(!food || !category  || !address || !DonorId || !coordinates){
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
            Latitude: coordinates.lat,
            Longitude: coordinates.lng,
            Status: false
        });
        donation.save();
        Donor.donations.push(donation);
        Donor.save();
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

router.post('/find',async(req,res) => {
    const {latitude , longitude , DonationId} = req.body;
    try {
        if(!latitude || !longitude || !DonationId){
            return res.statusMessage(400).json({
                message: "All fields are required"
            })
        }
        const donation = await Donation.findById(DonationId);
        const volunteers = [];
        const users = await User.find();
        // want to go into user db and find all users who have distance of less than 5km into volunteers find using latitude , longtude
        // send pick request to all of them 
        // who ever first select will pick the donation
        // there is a 30 min to pick the donation else donation rejected
        // Use geoNear for more efficient geospatial search
        console.log("before")
        // const users = await User.aggregate([
        //     {
        //         $geoNear: {
        //             near: { type: "Point", coordinates: [Number(longitude), Number(latitude)] },
        //             distanceField: "dist.calculated",
        //             maxDistance: 5000, // 5 km radius
        //             spherical: true,
        //         }
        //     }
        // ]);
        console.log("after");
        const Locations = [];
        for(let user of users){
            let distance = calculateDistance(Number(latitude) , Number(longitude) , Number(user.latitude) , Number(user.longitude));
            if(distance < 5){
                volunteers.push(user);
                user.requests.push(donation);
                Locations.push({lat : user.latitude,lng : user.longitude, userName : user.username});
                await user.save();
            }
            //volunteers.push(user);
        }
        const donorId = donation.Donor;
        
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
           // console.log(donor)
            if(vol._id.toString() === donorId.toString()) continue;
            vol.requests.push(donation);
            vol.save();
        }
        const expirationTime = Date.now() + 30 * 60 * 1000;
        res.status(200).json({
            message : "Message sent to volunteers",
            volunteers,
            Locations
        })
        // send message to all volunteers
    } catch (error) {
        res.status(500).json({
            message : "Erorr while fetching volunteers"
        })
    }
})


router.post('/accept/:volunteerId/:donationId', async(req,res) => {
    try {
        
        const {volunteerId ,donationId }= req.params;
        

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
                message : "Item request already accepted . Try next time . Thank you for connecting with us.",
                donation
            })
        }
        donation.Volunteer = volunteer;
        
        volunteer.volunteering.push(donation);
        console.log(volunteerId)
        console.log(donationId)
        await Promise.all([donation.save(), volunteer.save()]);
        
        res.status(200).json({
            message: "Donation request accepted by the volunteer",
            donation
        })
    } catch (error) {
        res.status(500).json({
            message : "Server error while accepting the request for the volunteer"
        })
    }
})

router.post('/pick/:volunteerId/:donationId', async(req,res) => {
    const {Lat , Lon} = req.body;
    const {volunteerId , donationId} = req.params;
    try {
        if(!volunteerId || !donationId){
            return res.status(400).json({
                message: "Volunteer or Donation Id not found"
            })
        }
        const donation = await Donation.findById(donationId);
        const volunteer = await User.findById(volunteerId);
        //console.log(donation.Volunteer)
        //console.log(volunteer._id)
        if(donation.Volunteer.toString() !== volunteer._id.toString()){
            return res.status(200).json({
                message: "Volunteer not matched."
            })
        }
        const donorId = donation.Donor;
        const donor = await User.findById(donorId);
        console.log(donor)
        const donorLat = donor.latitude;
        const donorLon = donor.longitude;
        console.log(donorLat)
        console.log(donorLon)
        console.log(Lat)
        console.log(Lon)
        if(donorLat.toString() !== Lat.toString() || donorLon.toString() !== Lon.toString()){
            return res.status(400).json({
                message : "Location not matched with the location of donor"
            })
        }
        return res.status(200).json({
            message : "Item picked successfully",
            donation
        })
    } catch (error) {
        res.status(500).json({
            message : "Error while picking the item"
        })
    }
})

router.post('/drop/:donationId', async (req,res) =>{
    try {
        
        const {Lon , Lat } = req.body;
        const {donationId} = req.params;
        const donation = await Donation.findById(donationId);
        const destinationLon = donation.Longitude;
        const destinationLat = donation.Latitude;
        if(Lon.toString() !== destinationLon.toString() || Lat.toString() !== destinationLat.toString()){
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

router.get('/getDonor:donationId' , async (req,res) => {
    const {donationId} = req.params;
    try {
        if(!donationId){
            return res.status(400).json({
                message : "DonationId is invalid"
            })
        }
        const donation = await Donation.findById(donationId);
        if(!donation){
            return res.status(400).json({
                message : "Donation not found"
            })
        }
        const donor = donation.Donor;
        res.status(200).json({
            message : "Donor fetched successfully",
            donor
        })
    
    } catch (error) {
        res.status(500).json({
            message : "Error while fetching the donor"
        })
    }
})

router.get('/getVolunteer:donationId' , async(req,res) =>{
    const {donationId} = req.params;
    try {
        if(!donationId){
            return res.status(400).json({
                message : "DonationId is invalid"
            })
        }
        const donation = await Donation.findById(donationId);
        if(!donation){
            return res.status(400).json({
                message : "Donation not found"
            })
        }
        const volunteer = donation.Volunteer;
        res.status(200).json({
            message : "Volunteer fetched successfully",
            volunteer
        })
    } catch (error) {
        res.status(500).json({
            message : "Error while fetching the volunteer"
        })
    }
})


export default router;


