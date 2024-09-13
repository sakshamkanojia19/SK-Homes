import asyncHandler from 'express-async-handler';

import {prisma} from "../config/prismaConfig.js"


/*Basic format of api */

export const createUser = asyncHandler(async(req,res)=>{
    console.log("creating a user");

    let {email} = req.body;

    // console.log(email)
    //when click on register it will console email id on input value

    //Now First chck user registerd or not
    let userExists = await prisma.user.findUnique({where:{email:email}})
  
     //only run if user dont exists
     if(!userExists){
        const user =  await prisma.user.create({data:req.body});
        res.send({
            message:"User registered successfully",
            user:user,
        });
     }
     else res.status(201).send({message:'User Already registered'})


});


//resi booking by usser visit function to book visit rsidency

/*function to book a visit to resd */
export const bookVisit = asyncHandler(async (req, res) => {
    const { email, date } = req.body;
    const { id } = req.params;
  
    try {
      const alreadyBooked = await prisma.user.findUnique({
        where: { email },
        select: { bookedVisits: true },
      });
  
      if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
        res
          .status(400)
          .json({ message: "This residency is already booked by you" });
      } else {
        await prisma.user.update({
          where: { email: email },
          data: {
            bookedVisits: { push: { id, date } },
          },
        });
        res.send("your visit is booked successfully");
      }
    } catch (err) {
      throw new Error(err.message);
    }
  });




/*  Get all Bookings Function */

export const getAllBookings = asyncHandler(async (req, res) => {
    const { email } = req.body;
    try {
      const bookings = await prisma.user.findUnique({
        where: { email },
        select: { bookedVisits: true },
      });
      res.status(200).send(bookings);
    } catch (err) {
      throw new Error(err.message);
    }
  });



/*Function to Cancel the Booking  [ Function 4 ]*/

// export const cancelBooking  = asyncHandler(async(req,res)=>{
//     //2 things email of user cancell a booking and , id of property against who is cancel the property booking


export const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { bookedVisits: true },
    });
     //this above give me user who is market with booking visited
     //now find the index of booking which we are going to cancel

    const index = user.bookedVisits.findIndex((visit) => visit.id === id);
     //now we find index using findindex it iterates over the bookedvisits array and each will passed as  prop in this visit function
    //if visit.id===id when passed with const then return the index of that specific bookedVisit which is equal to vist.id to passed id

    if (index === -1) {
      res.status(404).json({ message: "Booking not found" });
    } else {
      //in user.bookvisits it delete only one element which is passed as index if above code
      user.bookedVisits.splice(index, 1);
      await prisma.user.update({
        where: { email },
        data: {
          bookedVisits: user.bookedVisits,
        },
      });

      res.send("Booking cancelled successfully");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});


/* Function to add a resd in favourite list of a user */
export const toFav = asyncHandler(async(req,res)=>{
 
const {email} = req.body ;
const {rid} = req.params;
 
   try {
         
     //1st find user 
     const user = await prisma.user.findUnique({
      where:{email}
     })
     //when get the user then check list of his favourite residencies
     if(user.favResidenciesID.includes(rid)){
      //if already in list then remove it or if not add
      const updateUser = await prisma.user.update({
        where:{email}, // this email is equal to our targeted user 
        data:{
          favResidenciesID:{
            set: user.favResidenciesID.filter((id)=> id !== rid)
            //this not equal remove the liked residency from array
          }
        }
      });
      res.send({message:"Removed from favourite list",user:updateUser})
     }else {
      //if not in list then add it
      const updateUser = await prisma.user.update({
        where:{email},
        data: {
          favResidenciesID:{
            push:rid    //push element with id which says favourite
          }
        }
      });
      res.send({message:"Added to favourite list",user:updateUser})
     }
   } catch (error) {
    throw new Error(err.message);
   }
 
}) 



/* All fav resudencies [Function 6] */

export const getAllFavorites = asyncHandler(async(req,res)=>{
  const {email} = req.body;

  try {
    const favResd = await prisma.user.findUnique({
      where:{email},
      select:{favResidenciesID:true}
    })
    res.status(200).send(favResd)
  } catch (err) {
    throw new Error(err.message) 
  }
})

