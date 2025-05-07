import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Images from "../../assets/images.png";
import Watch from "../../assets/4.png";
import Gaming from "../../assets/fitness.png";
import Diet from "../../assets/diet.png";
import WorkoutStatus from "../../assets/fitness1.png";
import Logout from "../../assets/logout.png";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./leftBar.scss";

const LeftBar = ({ userName }) => {
  const [profilePic, setProfilePic] = useState("");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchProfilePhoto = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/profile-photo/${userName}`
        );
        setProfilePic(response.data); // assuming response.data is the Base64 image string
      } catch (error) {
        console.error("Error fetching profile photo:", error);
      }
    };

    fetchProfilePhoto();
  }, [userName]);

  return (
    <div
      className="leftBar"
      style={{
        backgroundColor: "#f6f3f3",
        height: "calc(100vh - 60px)",
      }}
    >
      <div
        className="container"
        style={{
          position: "relative",
          borderRadius: "20px",
          height: "calc(80vh + 20px)",
        }}
      >
        <div
          className="menu"
          style={{
            backgroundColor: "white",
            padding: "25px 20px",
            borderRadius: "20px",
          }}
        >
          <Link to={`/home/${userName}`} className="item">
            <svg
              version="1.1"
              id="Layer_1"
              x="0px"
              y="0px"
              viewBox="0 0 122.88 90.78"
              width="20px"
              height="20px"
            >
              <g>
                <path
                  class="st0"
                  d="M46.86,0.05h43.63l9.94,17.7h20.48c1.09,0,1.98,0.92,1.98,1.98v69.08c0,1.06-0.91,1.98-1.98,1.98H1.98 C0.92,90.78,0,89.89,0,88.81l0-69.08c0-1.09,0.89-1.98,1.98-1.98h9.21V11.4h11.38v6.35h12.36c2.57-5.08,5.14-10.15,7.71-15.23 C44.2-0.57,43.34,0.05,46.86,0.05L46.86,0.05z M110.07,26.5c3.26,0,5.9,2.64,5.9,5.9c0,3.26-2.64,5.9-5.9,5.9 c-3.26,0-5.9-2.64-5.9-5.9C104.18,29.14,106.82,26.5,110.07,26.5L110.07,26.5L110.07,26.5z M66.64,33.37 c9.87,0,17.88,8.01,17.88,17.88c0,9.87-8.01,17.88-17.88,17.88c-9.87,0-17.88-8.01-17.88-17.88 C48.76,41.38,56.77,33.37,66.64,33.37L66.64,33.37z M66.64,21.73c16.31,0,29.53,13.22,29.53,29.53c0,16.3-13.22,29.53-29.53,29.53 c-16.3,0-29.53-13.23-29.53-29.53C37.12,34.95,50.34,21.73,66.64,21.73L66.64,21.73z"
                />
              </g>
            </svg>
            <span>Posts</span>
          </Link>
          <Link to={`/videos/${userName}`} className="item">
            <svg
              version="1.1"
              id="Layer_1"
              x="0px"
              y="0px"
              viewBox="0 0 115.46 122.88"
              width="20px"
              height="20px"
            >
              <g>
                <path
                  class="st0"
                  d="M108.07,15.56L5.7,52.84L0,37.22L102.37,0L108.07,15.56L108.07,15.56z M115.46,122.88H5.87V53.67h109.59 V122.88L115.46,122.88z M101.79,15.65V2.36l-7.23,2.61v13.34L101.79,15.65L101.79,15.65L101.79,15.65z M87.39,20.93V7.59 l-7.26,2.58v13.45L87.39,20.93L87.39,20.93z M72.49,26.07v-13.2l-7.26,2.61v13.26L72.49,26.07L72.49,26.07L72.49,26.07z M113.43,68.32l-4.56-12.54h-7.73l4.56,12.54H113.43L113.43,68.32z M97.64,68.32l-4.56-12.54h-7.76l4.59,12.54H97.64L97.64,68.32z M57.98,31.69V18.32l-7.25,2.61v13.34L57.98,31.69L57.98,31.69z M82.41,68.32l-4.56-12.54h-7.73l4.56,12.54H82.41L82.41,68.32z M43.08,36.8V23.54l-7.34,2.61v13.34L43.08,36.8L43.08,36.8z M66.62,68.32l-4.56-12.54h-7.75l4.56,12.54H66.62L66.62,68.32z M28.82,42.28V28.9l-7.31,2.7v13.26L28.82,42.28L28.82,42.28L28.82,42.28z M51.06,68.32L46.5,55.78h-7.73l4.56,12.54H51.06 L51.06,68.32z M13.84,47.39V34.13l-7.26,2.58v13.37L13.84,47.39L13.84,47.39z M35.36,68.32l-4.64-12.54l-7.67,0l4.48,12.54H35.36 L35.36,68.32z M19.96,68.32l-4.64-12.54l-7.73,0l4.56,12.54H19.96L19.96,68.32z"
                />
              </g>
            </svg>
            <span>Watch</span>
          </Link>
                  
        
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "75%",
              backgroundImage:
                "linear-gradient(to right, rgba(100, 81, 159, 0.3), rgba(134, 90, 153, 0.3))",
              padding: "10px 10px",
              borderRadius: "10px",
            }}
          >
            {profilePic && (
              <img
                style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                src={`data:image/jpeg;base64,${profilePic}`}
                alt="Profile"
              />
            )}
            <span style={{ color: "#31004f", fontWeight: "bold" }}>
              {userName}
            </span>
            <div>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <svg
                  fill="#000000"
                  height="13px"
                  width="13px"
                  version="1.1"
                  id="Capa_1"
                  viewBox="0 0 60 60"
                >
                  <g>
                    <path d="M30,16c4.411,0,8-3.589,8-8s-3.589-8-8-8s-8,3.589-8,8S25.589,16,30,16z" />
                    <path d="M30,44c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S34.411,44,30,44z" />
                    <path d="M30,22c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S34.411,22,30,22z" />
                  </g>
                </svg>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>
                  <Link to={`/`} style={{ textDecoration: "none" }}>
                    Log out
                  </Link>
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default LeftBar;
