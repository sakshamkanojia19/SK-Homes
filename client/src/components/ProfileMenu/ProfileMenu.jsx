import React from 'react';
import { Avatar, Menu, MenuItem, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProfileMenu = ({ user, logout }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <Avatar src={user?.picture} alt="user image" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => { handleClose(); navigate("./favourites", { replace: true }); }}>
          Favourites
        </MenuItem>
        <MenuItem onClick={() => { handleClose(); navigate("./bookings", { replace: true }); }}>
          Bookings
        </MenuItem>
        <MenuItem onClick={() => {
          handleClose();
          localStorage.clear();
          logout();
        }}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileMenu;;
