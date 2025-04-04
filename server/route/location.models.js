import express from "express"
import Location from "../model/Location.models.js"

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


router.post('/add', async(req , res) => {
    const {Name , address , category} = req.body;
    try {
        if(!Name || !address || !category){
            return res.status(200).json({
                message : "All fields are required"
            })
        }
        const location = new Location({
            Name,
            address,
            category,
            latitude : '0',
            longitude : '0'
        })
        location.save();
        res.status(200).json({
            message : "Location created successfully"
        })
    } catch (error) {
        res.send(500).json({
            message : "Error while creating needy location"
        })
    }
})

router.get('/latitude/:lat/longitude/:lon',async (req ,res) => {
    const {lat , lon} = req.params;
    try {
        if(!lat || !lat){
            return res.status(400).json({
                message : "All fields are required"
            })
        }
        const locations = await Location.find();
        const nearby = [];
        for(let location : locations){
            const dist = calculateDistance(lat,lon,location.latitude,location.longitude);
            if(dist < 5){
    
                nearby.push(location)
            }
        }
    
        res.status(200).json({
            message : "Nearby locations succefully fetched",
            nearby
        })
    } catch (error) {
        res.status(400).json({
            message : "Error while fetching nearby locations"
        })
    }
})

router.get('/getDonations/:locationId', async(req,res) => {
    const {locationId} = req.body;
    try {
        if(!locationId){
            return res.status(200).json({
                message : "LocationId is invalid"
            })
        }
        const location = await Location.findById(locationId);
        const history = location.history;
        res.status(200).json({
            message : "history fetche successfully",
            history
        })
    } catch (error) {
        res.status(500).json({
            message : "Error while fetching history"
        })
    }
})



export default router;