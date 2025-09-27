import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Avatar,
  TextField,
  Typography,
  MenuItem,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// import DeleteIcon from "@mui/icons-material/Delete";
import userImg from "../../assets/UI/userDemo.jpg";
import "../../styles/user/UserProfile.css";

const UserProfile: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState(userImg);
  console.log(setPreview);
  const [image, setImage] = useState<string | null>(null);

  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  console.log("Uploaded File URL:", uploadedFile);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      setUploadedFile(fileUrl);
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  // const handleRemoveFile = () => {
  //   setUploadedFile(null);
  // };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     const file = e.target.files[0];
  //     const imageUrl = URL.createObjectURL(file);
  //     setPreview(imageUrl); // Show selected image as preview
  //   }
  // };

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
          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: "#c14365",
              "&:hover": { backgroundColor: "#a83252" },
            }}
          >
            Delete Account
          </Button>
          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: "#c14365",
              "&:hover": { backgroundColor: "#a83252" },
            }}
          >
            Logout
          </Button>
        </Box>
      </Paper>

      {/* Right Side Section */}
      <Box className="rightContaineruserProfile">
        <Typography variant="h4" className="userInforight">
          User Information
        </Typography>
        <Box className="userInfoFormProfile">
          {/* Full Name + Email */}
          <Box className="inputsUserinfoProfile">
            <Box className="inputboxChilduserProfile">
              <Typography className="userProfileFormLabel">Email</Typography>
              <TextField
                type="email"
                variant="outlined"
                fullWidth
                label="Email"
                margin="normal"
              />
            </Box>
            <Box className="inputboxChilduserProfile">
              <Typography className="userProfileFormLabel">
                Full Name
              </Typography>
              <TextField
                type="text"
                label="Full Name"
                variant="outlined"
                fullWidth
                margin="normal"
              />
            </Box>
          </Box>

          {/* DOB + Gender */}
          <Box className="inputsUserinfoProfile">
            <Box className="inputboxChilduserProfile">
              <Typography className="userProfileFormLabel">DOB</Typography>
              <TextField
                type="date"
                variant="outlined"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <Box className="inputboxChilduserProfile">
              <Typography className="userProfileFormLabel">Gender</Typography>
              <TextField
                select
                variant="outlined"
                fullWidth
                margin="normal"
                label="Gender"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            </Box>
          </Box>

          {/* Address */}
          <Box className="inputsUserinfoProfile">
            <Box className="inputboxChilduserProfile" style={{ width: "100%" }}>
              <Typography className="userProfileFormLabel">Address</Typography>
              <TextField
                variant="outlined"
                fullWidth
                label="Full Address"
                margin="normal"
                multiline
                rows={3}
              />
            </Box>
          </Box>

          {/* Contact Number + Country */}
          <Box className="inputsUserinfoProfile">
            <Box className="inputboxChilduserProfile">
              <Typography className="userProfileFormLabel">
                Contact Number
              </Typography>
              <TextField
                type="tel"
                label="Contact Number"
                variant="outlined"
                fullWidth
                margin="normal"
              />
            </Box>
            <Box className="inputboxChilduserProfile">
              <Typography className="userProfileFormLabel">Country</Typography>
              <TextField
                type="text"
                variant="outlined"
                label="Country"
                fullWidth
                margin="normal"
              />
            </Box>
          </Box>

          {/* State + City */}
          <Box className="inputsUserinfoProfile">
            <Box className="inputboxChilduserProfile">
              <Typography className="userProfileFormLabel">State</Typography>
              <TextField
                select
                variant="outlined"
                fullWidth
                margin="normal"
                label="State"
              >
                <MenuItem value="state1">State 1</MenuItem>
                <MenuItem value="state2">State 2</MenuItem>
              </TextField>
            </Box>
          </Box>

          {/* Pincode + ID Type */}
          <Box className="inputsUserinfoProfile">
            <Box className="inputboxChilduserProfile">
              <Typography className="userProfileFormLabel">Pincode</Typography>
              <TextField
                type="text"
                variant="outlined"
                label="Pincode"
                fullWidth
                margin="normal"
              />
            </Box>
            <Box className="inputboxChilduserProfile">
              <Typography className="userProfileFormLabel">ID Type</Typography>
              <TextField
                select
                variant="outlined"
                fullWidth
                margin="normal"
                label="Document Type"
              >
                <MenuItem value="aadhar">Aadhar</MenuItem>
                <MenuItem value="passport">Passport</MenuItem>
                <MenuItem value="license">Driving License</MenuItem>
              </TextField>
            </Box>
          </Box>

          {/* ID Number */}
          <Box className="inputsUserinfoProfile">
            <Box className="inputboxChilduserProfile">
              <Typography className="userProfileFormLabel">
                ID Number
              </Typography>
              <TextField
                type="text"
                variant="outlined"
                fullWidth
                label="ID Number"
                margin="normal"
              />
            </Box>
          </Box>

          {/* Upload ID */}
          <Box className="inputsUserinfoProfile uploadSection">
            <Box className="inputboxChilduserProfile" style={{ width: "100%" }}>
              <Typography className="userProfileFormLabel">
                Upload ID
              </Typography>
              <Box className="uploadBox">
                <Button
                  variant="contained"
                  component="label"
                  className="chooseFileBtn"
                >
                  Choose File
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Button>
                {image && (
                  <Box className="imagePreview">
                    <img src={image} alt="Preview" className="previewImg" />
                    <IconButton
                      className="removeImgBtn"
                      onClick={handleRemoveImage}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>

          {/* Submit Button */}
          <Box
            className="inputsUserinfoProfile"
            style={{ justifyContent: "center" }}
          >
            <Button variant="contained" color="primary" className="submitBtn">
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfile;
