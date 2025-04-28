import express from "express"
import Location from "../model/Location.models.js"
import User from "../model/User.models.js";
import axios from "axios"
import Donation from "../model/Donation.models.js";
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


// router.post('/add', async(req , res) => {
//     const {Name , address , category} = req.body;
//     try {
//         if(!Name || !address || !category){
//             return res.status(200).json({
//                 message : "All fields are required"
//             })
//         }
//         const location = new Location({
//             Name,
//             address,
//             category,
//             latitude : '0',
//             longitude : '0'
//         })
//         location.save();
//         res.status(200).json({
//             message : "Location created successfully"
//         })
//     } catch (error) {
//         res.send(500).json({
//             message : "Error while creating needy location"
//         })
//     }
// })

// router.get('/latitude/:lat/longitude/:lon',async (req ,res) => {
//     const {lat , lon} = req.params;
//     try {
//         if(!lat || !lat){
//             return res.status(400).json({
//                 message : "All fields are required"
//             })
//         }
//         const locations = await Location.find();
//         const nearby = [];
//         for(let location : locations){
//             const dist = calculateDistance(lat,lon,location.latitude,location.longitude);
//             if(dist < 5){
    
//                 nearby.push(location)
//             }
//         }
    
//         res.status(200).json({
//             message : "Nearby locations succefully fetched",
//             nearby
//         })
//     } catch (error) {
//         res.status(400).json({
//             message : "Error while fetching nearby locations"
//         })
//     }
// })

// router.get('/getDonations/:locationId', async(req,res) => {
//     const {locationId} = req.body;
//     try {
//         if(!locationId){
//             return res.status(200).json({
//                 message : "LocationId is invalid"
//             })
//         }
//         const location = await Location.findById(locationId);
//         const history = location.history;
//         res.status(200).json({
//             message : "history fetche successfully",
//             history
//         })
//     } catch (error) {
//         res.status(500).json({
//             message : "Error while fetching history"
//         })
//     }
// })
router.get('/volunteer/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      if (!userId) {
        return res.status(400).json({
          message: "UserId is required",
        });
      }
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }
     // console.log(user)
      const request = user.requests[4];
      if (!request) {
        return res.status(404).json({
          message: "No volunteering donation found for user",
        });
      }
  
      const donation = await Donation.findById(request);
      if (!donation) {
        return res.status(404).json({
          message: "Donation not found",
        });
      }
      const donor = await User.findById(donation.Donor)
      //console.log(donor)
      console.log("Donor Latitude:", donor.latitude);
      console.log("Donor Longitude:", donor.longitude);

  
      res.status(200).json({
        message: "Coords fetched successfully",
        destination: {
          lat: donor.latitude,
          lng: donor.longitude,
        },
      });
    } catch (error) {
      console.error("Server error:", error.message);
      res.status(500).json({
        message: "Error while finding path",
      });
    }
  });

router.get('/volunteer-drop/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      if (!userId) {
        return res.status(400).json({
          message: "UserId is required",
        });
      }
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }
     // console.log(user)
      const volunteering = user.volunteering[1];
      if (!volunteering) {
        return res.status(404).json({
          message: "No volunteering donation found for user",
        });
      }
  
      const donation = await Donation.findById(volunteering);
     // console.log(donation,volunteering)
      if (!donation) {
        return res.status(404).json({
          message: "Donation not found",
        });
      }
      //const donor = await User.findById(donation.Donor)
      //console.log(donation)
      console.log("Donation Latitude:", donation.Latitude);
      console.log("Donation Longitude:", donation.Longitude);

  
      res.status(200).json({
        message: "Coords fetched successfully",
        destination: {
          lat: donation.Latitude,
          lng: donation.Longitude,
        },
      });
    } catch (error) {
      console.error("Server error:", error.message);
      res.status(500).json({
        message: "Error while finding path",
      });
    }
});
  

const OSRM_URL = 'https://router.project-osrm.org/route/v1/driving/';

// Get path between two points using OSRM
router.get('/path', async (req, res) => {
  try {
    const { source, destination } = req.query;
    
    // Construct OSRM API URL
    const url = `${OSRM_URL}${source.lng},${source.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson`;
    
    // Call OSRM API
    const response = await axios.get(url);
    const data = response.data;
    
    if (data.code !== 'Ok') {
      throw new Error(data.message || 'Routing failed');
    }
    
    // Extract the route geometry
    const route = data.routes[0];
    res.json({
      geometry: route.geometry,
      distance: route.distance,
      duration: route.duration
    });
  } catch (error) {
    console.error('Routing error:', error.message);
    res.status(500).json({ 
      error: error.message,
      details: 'Failed to get route from OSRM service' 
    });
  }
});

router.post('/setLocation' , async(req , res) => {
    const {lat , lon , userId} = req.body;
    if(!lat || !lon || !userId){
        return res.status(401).json({
            message : "Location not found"
        })
    }
    try {
        
        const user = await User.findById(userId);
        user.latitude = lat;
        user.longitude = lon;
        await user.save();
        res.status(200).json({
            message : "Location updated sucessfully",
        })
    } catch (error) {
        res.status(500).json({
            message : "Error while updating location",
            error 
        })
    }
})


export default router;