import React, { useContext, useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import UserDetailContext from "../../context/UserDetailContext.js"
import {useMutation} from "react-query"
import { bookVisit } from '../../utils/api.js';
import { toast } from 'react-toastify';

const BookingModal = ({ opened, setOpened, email, propertyId }) => {
  const [value, setValue] = useState(null);
  const handleClose = () => setOpened(false);
 
  const {userDetails:{token},setUserDetails} = useContext(UserDetailContext);
 
  const handleBookingSuccess=()=>{
    toast.success("You have Successfully booked your visit",{
      position: "bottom-right",
    });
    setUserDetails((prev)=>({
      ...prev,
      bookings: [
        ...prev.bookings,
        {
          id: propertyId, 
          date:dayjs(value).format('DD/MM/YYYY'),
        }
      ]
    }))
  }
  
  
   //sending date and other data to backend
  const {mutate,isLoading} = useMutation({
    mutationFn:()=> bookVisit(value,propertyId,email,token),
    onSuccess:()=>handleBookingSuccess(),
    onError:({response})=> toast.error(response.data.message),
    onSettled:()=> setOpened(false)
  });

  return (
    <Modal
      open={opened}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',  // Centers the content horizontally
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2" textAlign="center" mb={2}>
          Select Your Date of Visit
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Date"
            value={value}
            onChange={(newValue) => setValue(newValue)}
            renderInput={(params) => <TextField {...params} sx={{ width: '100%' }} />}  // Ensures full-width in the box
            minDate={dayjs()}
          />
        </LocalizationProvider>
        <Button
          variant="contained"
          fullWidth
          sx={{ 
            mt: 2, 
            bgcolor: 'purple', // Default purple color
            '&:hover': { bgcolor: 'rgba(128, 0, 128, 0.8)' } // Customizable RGBA hover color
          }} 
          onClick={() => mutate()}
          disabled={!value || isLoading} // Disable button if no date is selected
        >
          Book Visit
        </Button>
      </Box>
    </Modal>
  );
};

export default BookingModal;;
