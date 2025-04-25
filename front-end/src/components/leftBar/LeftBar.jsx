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
          <Link to={`/workoutPlans/${userName}`} className="item">
            <svg
              version="1.1"
              id="Layer_1"
              x="0px"
              y="0px"
              viewBox="0 0 122.88 120.36"
              width="20px"
              height="20px"
            >
              <g>
                <path
                  class="st0"
                  d="M8.94,102.48h85.62c3.71-3.85,8.02-14.75,12.45-25.96c1.41-3.57,2.83-7.17,4.3-10.66 c-6.43,0.02-15.18-0.61-16.52-2.15c-1.04-1.19-0.66-2.93,0.91-5.12l18.93-18.48c1.77-1.6,3.31-2.21,4.62-1.81 c1.3,0.39,2.38,1.76,3.23,4.13c0.48,7.13,0.43,14.27-0.63,21.4c-0.58,0.34-1.18,0.63-1.79,0.89c-2.01,4.48-4.01,9.56-6,14.58 c-3.41,8.63-6.75,17.09-10.52,23.18h10.39c4.92,0,8.94,4.02,8.94,8.94v0c0,4.92-4.02,8.94-8.94,8.94h-105 c-4.92,0-8.94-4.02-8.94-8.94v0C0,106.51,4.02,102.48,8.94,102.48L8.94,102.48z M36.43,36.39l-0.27-0.45l-7.06,1.01L26.54,52.6 c-0.48,2.93-3.23,4.91-6.16,4.44c-2.93-0.48-4.91-3.23-4.44-6.16l3.2-19.55c0.39-2.38,2.28-4.13,4.54-4.45l0,0l13.67-1.96 l10.11-2.21c5.76,0.19,10.06,2.61,12,7.7c0.28,0.35,0.52,0.75,0.71,1.18l5.42,12.39l17.68,1.1c2.96,0.17,5.22,2.72,5.04,5.68 c-0.17,2.96-2.72,5.22-5.68,5.05l-20.97-1.3c-2.16-0.13-3.95-1.52-4.69-3.41l-1.1-2.51l-2.25,9.79l14.84,8.74 c1.29,0.75,2.14,1.96,2.48,3.3l0.02,0l5.39,21.11c0.73,2.88-1.01,5.81-3.89,6.54c-2.88,0.73-5.81-1.01-6.54-3.89L61.1,75.19 l-1.24-0.73l-15.42-5.87l-0.83,0.46l-4.71,12.49c-0.34,0.9-0.89,1.65-1.58,2.23l0,0L19.65,98.6c-2.28,1.9-5.66,1.6-7.57-0.67 c-1.9-2.28-1.6-5.66,0.67-7.57L29.03,76.7C30.22,62.9,32.82,49.5,36.43,36.39L36.43,36.39z M57.91,0c5.64,0,10.21,4.57,10.21,10.21 c0,5.64-4.57,10.21-10.21,10.21c-5.64,0-10.21-4.57-10.21-10.21C47.7,4.57,52.27,0,57.91,0L57.91,0z"
                />
              </g>
            </svg>
            <span>WorkOuts</span>
          </Link>
          <Link to={`/mealPlanes/${userName}`} className="item">
            <svg
              version="1.1"
              id="Layer_1"
              x="0px"
              y="0px"
              viewBox="0 0 122.88 89.2"
              width="20px"
              height="20px"
            >
              <g>
                <path
                  class="st0"
                  d="M122.88,21.37c0.05,2.89-0.53,11.16-1.68,24.86h-1.78V89.2l-6,0V46.23h-0.99V0c2.02,0.31,3.76,1.23,5.15,2.75 C121.07,6.31,122.83,12.53,122.88,21.37L122.88,21.37z M107.27,44.52c0,12.04-4.24,22.33-12.72,30.81 c-8.5,8.5-18.77,12.74-30.81,12.74c-12,0-22.26-4.24-30.78-12.74c-8.5-8.48-12.77-18.77-12.77-30.81c0-12,4.26-22.24,12.77-30.76 c8.53-8.5,18.79-12.77,30.78-12.77c12.04,0,22.31,4.26,30.81,12.77C103.03,22.28,107.27,32.52,107.27,44.52L107.27,44.52 L107.27,44.52z M20.69,23.22c0,2.96-1.23,5.4-3.69,7.3c-2.43,1.9-3.66,3.57-3.66,4.96V89.2h-6V35.48c0-1.4-1.23-3.06-3.66-4.96 C1.23,28.62,0,26.19,0,23.22C0,15.18,1.78,7.42,5.37,0v19.9h3.18V0h3.52v19.9h3.25V0C18.89,7.42,20.69,15.18,20.69,23.22 L20.69,23.22z M95.49,44.52c0-8.74-3.08-16.21-9.27-22.4c-6.19-6.19-13.68-9.27-22.48-9.27c-8.77,0-16.24,3.08-22.4,9.27 c-6.19,6.19-9.3,13.66-9.3,22.4c0,8.76,3.11,16.23,9.3,22.45c6.16,6.21,13.63,9.32,22.4,9.32c8.79,0,16.28-3.11,22.48-9.32 C92.4,60.75,95.49,53.28,95.49,44.52L95.49,44.52L95.49,44.52z M92.31,44.52c0,7.9-2.77,14.64-8.36,20.23 c-5.57,5.56-12.31,8.36-20.21,8.36c-7.85,0-14.58-2.8-20.16-8.36c-5.57-5.59-8.36-12.33-8.36-20.23c0-7.85,2.79-14.58,8.36-20.14 c5.59-5.56,12.31-8.36,20.16-8.36c7.9,0,14.65,2.8,20.21,8.36C89.54,29.94,92.31,36.67,92.31,44.52L92.31,44.52z"
                />
              </g>
            </svg>
            <span>Meal Planning</span>
          </Link>
          <Link to={`/currentWorkoutStatus/${userName}`} className="item">
            <svg
              version="1.1"
              id="Layer_1"
              x="0px"
              y="0px"
              viewBox="0 0 122.44 122.88"
              width="20px"
              height="20px"
            >
              <g>
                <path
                  class="st0"
                  d="M8.49,55.93c-5.21,22.63-9.1,44.85-8.41,66.95c7.27-1.05,17.17-7.9,26.59-19.15 c22.64,12.77,44.36,9.94,65.39-4.69c26.91-3.98,36.07-15.63,26.98-35.19L84.63,14.42c-1.77-2.54-0.94-1.49-3.85-4.02l-6.59-5.73 c-2.74-4.37-6.22-5.54-10.31-4.05l-9.29,3.04C48.62,6,46.9,9.21,49.35,13.28l2.83,4.56c1.51,3.8,3.87,5.55,7.67,3.8l0.56-0.18 c-0.09-0.25-0.12-0.53-0.05-0.81c0.2-0.86,0.4-1.67,0.58-2.4c0.51-2.08,0.83-3.38,0.72-3.65c-0.08-0.19-0.92,0.64-3.46,1.66 c-0.73,0.29-1.56-0.06-1.85-0.79c-0.29-0.73,0.06-1.56,0.79-1.85c4.43-1.78,6.35-2.1,7.17-0.08c0.45,1.13,0.05,2.76-0.6,5.39 c-0.12,0.48-0.25,1-0.38,1.58l0.38-0.13l-0.45,0.17c8.97-3.38,7.49,1.71,13.38,10.56c7.35,11.05,11.27,24.22,11.34,39.78 C74.35,59.4,58.75,59.8,41.92,67.66C33.54,57.94,22.24,54.37,8.49,55.93L8.49,55.93z"
                />
              </g>
            </svg>
            <span>Workout Status</span>
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
