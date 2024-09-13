import express from 'express';
import { createUser,bookVisit, getAllBookings, cancelBooking, toFav, getAllFavorites,  } from '../controllers/userCntrl.js';

const router = express.Router()

router.post("/register",createUser)

// Book vist function when someone book the residency
router.post("/bookVisit/:id",bookVisit)

//Getall Bookings

router.post("/allBookings", getAllBookings);

//cancel booking
router.post("/removeBooking/:id",cancelBooking)

//tofav for favourite 
router.post("/toFav/:rid",toFav)

//for all fav residencies
router.get("/allFav",getAllFavorites)

export {router as userRoute} 