import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getProperty, removeBooking } from "../../utils/api";
import { PuffLoader } from "react-spinners";
import { AiFillHeart, AiTwotoneCar } from "react-icons/ai";
import { FaShower } from "react-icons/fa";
import { MdMeetingRoom, MdLocationPin } from "react-icons/md";
import "./Property.css";
import Map from "../../components/Map/Map";
import useAuthCheck from "../../hooks/useAuthCheck";
import { useAuth0 } from "@auth0/auth0-react";
import BookingModal from "../../components/BookingModal/BookingModal";
import UserDetailContext from "../../context/UserDetailContext.js";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import Heart from "../../components/Heart/Heart.jsx";

const Property = () => {
  // first fetch data of individual  property
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0]; //from last take 0th index of array
  const { data, isLoading, isError } = useQuery(["resd", id], () =>
    getProperty(id)
  );
  //console.log(data)

  // booking open model
  const [modalOpened, setModalOpened] = useState(false);

  //validate aith check hook
  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();

  //Contexts
  const {
    userDetails: { token, bookings },
    setUserDetails,
  } = useContext(UserDetailContext);

 //cancel booking
  const {mutate:cancelBooking,isLoading:cancelling} = useMutation({
    mutationFn: ()=> removeBooking(id,user?.email,token),
    onSuccess:()=>{
      setUserDetails((prev)=>({
        ...prev,
        bookings: prev.bookings.filter((booking)=> booking?.id !== id)
      }))
      toast.success("Booking cancelled",{position:'bottom-right'});
    }
  })


  if (isLoading) {
    <div className="wrapper">
      <div className="flexCenter paddings">
        <PuffLoader />
      </div>
    </div>;
  }

  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error While fetching the property details</span>
        </div>
      </div>
    );
  }

  //  now here populate our data

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        {/* like button  */}
        <div className="like">
          <Heart id={id} />
        </div>

        {/* image */}
        <img src={data?.image} alt="home image" />

        <div className="flexCenter property-details">
          {/* left */}
          <div className="flexColStart left">
            {/* head of details */}
            <div className="flexStart head">
              <span className="primaryText">{data?.title}</span>
              <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                $ {data?.price}
              </span>
            </div>

            {/* facilities */}
            <div className="flexStart facilities">
              {/* bathrooms */}
              <div className="flexStart facility">
                <FaShower size={20} color="#1F3E72" />
                <span>{data?.facilities?.bathrooms} Bathrooms</span>
              </div>

              {/* parkings */}
              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="#1F3E72" />
                <span>{data?.facilities.parkings} Parkings</span>
              </div>

              {/* rooms */}
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="1F3E72" />
                <span>{data?.facilities.bedrooms} Rooms</span>
              </div>
            </div>

            {/* description */}
            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {data?.description}
            </span>

            {/* address */}

            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={23} />
              <span className="secondaryText">
                {data?.address}{" "}
                {data?.city}{" "}
                {data?.country}
              </span>
            </div>

            {/* Booking button */}
            {bookings?.map((booking) => booking.id).includes(id) ? (
              <>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    color: "red",
                    borderColor: "red",
                    "&:hover": {
                      borderColor: "red",
                      backgroundColor: "white", // Slight red background on hover
                    },
                  }}
                  onClick={()=> cancelBooking()}
                  disabled={cancelling}
                >
                  <span>Cancel booking</span>
                </Button>
                <span>
                  Your visit already booked for date{" "}
                  {bookings?.filter((booking) => booking?.id === id)[0].date}
                </span>
              </>
            ) : (
              <button
                className="button"
                onClick={() => {
                  validateLogin() && setModalOpened(true);
                }}
              >
                Book your visit
              </button>
            )}

            {/* booking model */}
            <BookingModal
              opened={modalOpened}
              setOpened={setModalOpened}
              propertyId={id}
              email={user?.email}
            />
          </div>

          {/* right side */}

          <div className="map">
            <Map
              address={data?.address}
              city={data?.city}
              country={data?.country}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Property;
