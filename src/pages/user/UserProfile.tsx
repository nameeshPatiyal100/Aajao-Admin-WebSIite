import React, { useRef, useState } from "react";
import { Box, Button, Paper, Avatar, TextField, Typography } from "@mui/material";
import userImg from "../../assets/UI/userDemo.jpg";
import "../../styles/user/UserProfile.css";

const UserProfile: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState(userImg);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl); // Show selected image as preview
    }
  };

  return (
    <Box className="mainContaineruserProfile">
      {/* Left Side Profile Section */}
      <Paper className="leftContaineruserProfile" elevation={2}>
        <Box className="imageContainerUserProfile">
          <Avatar
            src={preview}
            alt="User"
            className="userDemoImg"
            sx={{ width: 120, height: 120 }}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#c14365",
              "&:hover": { backgroundColor: "#a83252" },
            }}
            onClick={handleUploadClick}
          >
            Change Photo
          </Button>
        </Box>

        {/* Change Password Section */}
        <Box className="changePasswordContainer">
          <Typography variant="h6" className="changePasswordTitle">
            Change Password
          </Typography>
          <TextField
            label="Old Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="New Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: "#c14365",
              "&:hover": { backgroundColor: "#a83252" },
            }}
          >
            Change Password
          </Button>
        </Box>
      </Paper>

      {/* Right Side Section */}
      <Box className="rightContaineruserProfile"></Box>
    </Box>
  );
};

export default UserProfile;
