import "./mealPlan.scss";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Sad from "@mui/icons-material/SentimentVeryDissatisfied";
import Happy from "@mui/icons-material/SentimentSatisfiedAlt";
import { Link } from "react-router-dom";
import MealPlanComments from "../mealPlanComments/MealPlanComment";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Button,
  Modal,
  Form,
  Input,
  Card,
  Popconfirm,
  Upload,
  Row,
  Col,
} from "antd";

const MealPlan = ({ meal, userName }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [form] = Form.useForm();

  const deletePost = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/deleteMeal/${id}`
      );
      // alert("Video deleted successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);
      // alert("Failed to delete post. Please try again.");
    }
  };

  const updateDescription = async (id, newDescription) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/descriptionUpdateMeal/${id}/${newDescription}`
      );
      // alert("Video description updated successfully!");
      return response.data;
    } catch (error) {
      console.error("Error updating description:", error);
      // alert("Failed to update description. Please try again.");
    }
  };

  const updateName = async (id, newDescription) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/name/${id}/${newDescription}`
      );
      // alert("Meal name updated successfully!");
      return response.data;
    } catch (error) {
      console.error("Error updating description:", error);
      // alert("Failed to update name. Please try again.");
    }
  };

  const updateRecipe = async (id, newDescription) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/recipe/${id}/${newDescription}`
      );
      // alert("Meal recipe updated successfully!");
      return response.data;
    } catch (error) {
      console.error("Error updating description:", error);
      // alert("Failed to update recipe. Please try again.");
    }
  };

  const updateSchedule = async (id, newSchedule) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/schedule/${id}/${newSchedule}`
      );
      // alert("Meal Plan Schedule updated successfully!");
      return response.data;
    } catch (error) {
      console.error("Error updating description:", error);
      // alert("Failed to update Shedule. Please try again.");
    }
  };

  const updateNutrition = async (id, newNutrition) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/nutrition/${id}/${newNutrition}`
      );
      // alert("Nutrition details updated successfully!");
      return response.data;
    } catch (error) {
      console.error("Error updating description:", error);
      // alert("Failed to update Details. Please try again.");
    }
  };

  const handleDeletePost = () => {
    deletePost(meal.id);
    setMenuOpen(false);
  };

  const handleUpdateDescription = () => {
    const newDescription = prompt(meal.description);
    if (newDescription !== null && newDescription.trim() !== "") {
      updateDescription(meal.id, newDescription);
      setMenuOpen(false);
    }
  };

  const handleUpdateRecipe = () => {
    const newRecipe = prompt(meal.recipe);
    if (newRecipe !== null && newRecipe.trim() !== "") {
      updateRecipe(meal.id, newRecipe);
      setMenuOpen(false);
    }
  };

  const handleUpdateName = () => {
    const newName = prompt("Enter the new name:");
    if (newName !== null && newName.trim() !== "") {
      updateName(meal.id, newName);
      setMenuOpen(false);
    }
  };

  const handleUpdateNutrition = () => {
    const newNutrition = prompt("Enter the new nutrition condition:");
    if (newNutrition !== null && newNutrition.trim() !== "") {
      updateNutrition(meal.id, newNutrition);
      setMenuOpen(false);
    }
  };

  const handleUpdateSchedule = () => {
    const newShedule = prompt(meal.recipe);
    if (newShedule !== null && newShedule.trim() !== "") {
      updateSchedule(meal.id, newShedule);
      setMenuOpen(false);
    }
  };

  return (
    <div className="meal">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img
              style={{ borderRadius: "20px" }}
              src={`data:image/jpeg;base64,${meal.userProfilePicture}`}
              alt="Profile"
            />
            <div className="details">
              <Link
                to={`/profile/${meal.userName}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{meal.userName}</span>
              </Link>
              <span className="date">1 min ago</span>
            </div>
          </div>
          {meal.userName === userName && (
            <div className="menu">
              <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
              {menuOpen && (
                <div className="dropdown-menu">
                  <button onClick={handleDeletePost}>Delete MealPlan</button>
                  <button onClick={handleUpdateName}>
                    Update MealPlan Name
                  </button>
                  <button onClick={handleUpdateDescription}>
                    Update Description
                  </button>
                  <button onClick={handleUpdateRecipe}>Update Recipe</button>
                  <button onClick={handleUpdateNutrition}>
                    Update Nutritional Benefits
                  </button>
                  <button onClick={handleUpdateSchedule}>
                    Update Schedule
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <Form form={form}>
          <div className="content">
            <h2 style={{ textAlign: "center", textDecoration: "underline" }}>
              {meal.mealName}
            </h2>
            <div
              style={{
                marginTop: "20px",
                backgroundColor: "rgba(248,236,213,255)",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <div className="sub-topic">
                <span>Description</span>
              </div>
              <p>{meal.description}</p>
            </div>
            <img src={`data:image/jpeg;base64,${meal.post}`} alt="NoImages" />
            <div
              style={{
                marginTop: "20px",
                backgroundColor: "rgba(248,215,213,255)",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <div className="sub-topic">
                <span>Recipe</span>
              </div>
              <p>{meal.recipe}</p>
            </div>
            <div style={{ display: "flex", columnGap: "15px" }}>
              <div
                style={{
                  width: "50%",
                  marginTop: "20px",
                  backgroundColor: "rgba(236,248,213,255)",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                <div className="sub-topic">
                  <span>Portion per time</span>
                </div>
                <p>{meal.portion}</p>
              </div>
              <div
                style={{
                  width: "50%",
                  marginTop: "20px",
                  backgroundColor: "rgba(213,241,248,255)",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                <div className="sub-topic">
                  <span>Meal Schedule</span>
                </div>
                <p>{meal.schedule}</p>
              </div>
            </div>
            <div
              style={{
                marginTop: "20px",
                backgroundColor: "rgba(231,227,243,255)",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <div className="sub-topic">
                <span>Nutrient Benifits</span>
              </div>
              <p>{meal.nutrition}</p>
            </div>
            <div
              className="sub-topic"
              style={{ marginTop: "20px", marginBottom: "10px" }}
            >
              <span>Dietry Conditions</span>
            </div>
            <div className="points-list" style={{ width: "100%" }}>
              <ul
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <li>
                  {meal.vegetarian ? (
                    <>
                      <div
                        style={{
                          backgroundColor: "rgba(17,134,123,255)",
                          padding: "20px",
                          borderRadius: "10px",
                          color: "white",
                        }}
                      >
                        Suitable for vegetarians
                      </div>
                    </>
                  ) : null}
                </li>
                <li>
                  {meal.vegan ? (
                    <>
                      <div
                        style={{
                          backgroundColor: "rgba(17,134,123,255)",
                          padding: "20px",
                          borderRadius: "10px",
                          color: "white",
                        }}
                      >
                        Suitable for vegans
                      </div>
                    </>
                  ) : null}
                </li>
                <li>
                  {meal.glutenFree ? (
                    <>
                      <div
                        style={{
                          backgroundColor: "rgba(17,134,123,255)",
                          padding: "20px",
                          borderRadius: "10px",
                          color: "white",
                        }}
                      >
                        Suitable for gluten-free
                      </div>
                    </>
                  ) : null}
                </li>
                <li>
                  {meal.dairyFree ? (
                    <>
                      <div
                        style={{
                          backgroundColor: "rgba(17,134,123,255)",
                          padding: "20px",
                          borderRadius: "10px",
                          color: "white",
                        }}
                      >
                        Suitable for dairy-free
                      </div>
                    </>
                  ) : null}
                </li>
                <li>
                  {meal.nutFree ? (
                    <>
                      <div
                        style={{
                          backgroundColor: "rgba(17,134,123,255)",
                          padding: "20px",
                          borderRadius: "10px",
                          color: "white",
                        }}
                      >
                        Suitable for nut-free
                      </div>
                    </>
                  ) : null}
                </li>
              </ul>
            </div>
          </div>
        </Form>
        <div className="info">
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            <p>{meal.comments}</p>
          </div>
        </div>
        {commentOpen && (
          <MealPlanComments postId={meal.id} commenterName={userName} />
        )}
      </div>
    </div>
  );
};

export default MealPlan;
