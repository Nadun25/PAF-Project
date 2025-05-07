import "./learnPlan.scss";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import LearnPlanComments from "../learnPlanComments/LearnPlanComments";
import { useState } from "react";
import axios from "axios";
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

const LearnPlan = ({ learn, userName }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [form] = Form.useForm();

  const deletePost = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/deleteLearn/${id}`
      );
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const updateDescription = async (id, newDescription) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/descriptionUpdateLearn/${id}/${newDescription}`
      );
      return response.data;
    } catch (error) {
      console.error("Error updating description:", error);
    }
  };

  const updateName = async (id, newDescription) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/name/${id}/${newDescription}`
      );
      return response.data;
    } catch (error) {
      console.error("Error updating description:", error);
    }
  };

  const updateContent = async (id, newDescription) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/content/${id}/${newDescription}`
      );
      return response.data;
    } catch (error) {
      console.error("Error updating description:", error);
    }
  };

  const updateStudySchedule = async (id, newSchedule) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/studySchedule/${id}/${newSchedule}`
      );
      return response.data;
    } catch (error) {
      console.error("Error updating description:", error);
    }
  };

  const updateKeyConcepts = async (id, newKeyConcepts) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/keyConcepts/${id}/${newKeyConcepts}`
      );
      return response.data;
    } catch (error) {
      console.error("Error updating description:", error);
    }
  };

  const handleDeletePost = () => {
    deletePost(learn.id);
    setMenuOpen(false);
  };

  const handleUpdateDescription = () => {
    const newDescription = prompt(learn.description);
    if (newDescription !== null && newDescription.trim() !== "") {
      updateDescription(learn.id, newDescription);
      setMenuOpen(false);
    }
  };

  const handleUpdateContent = () => {
    const newContent = prompt(learn.content);
    if (newContent !== null && newContent.trim() !== "") {
      updateContent(learn.id, newContent);
      setMenuOpen(false);
    }
  };

  const handleUpdateName = () => {
    const newName = prompt("Enter the new name:");
    if (newName !== null && newName.trim() !== "") {
      updateName(learn.id, newName);
      setMenuOpen(false);
    }
  };

  const handleUpdateKeyConcepts = () => {
    const newKeyConcepts = prompt("Enter the new key concepts:");
    if (newKeyConcepts !== null && newKeyConcepts.trim() !== "") {
      updateKeyConcepts(learn.id, newKeyConcepts);
      setMenuOpen(false);
    }
  };

  const handleUpdateStudySchedule = () => {
    const newSchedule = prompt(learn.studySchedule);
    if (newSchedule !== null && newSchedule.trim() !== "") {
      updateStudySchedule(learn.id, newSchedule);
      setMenuOpen(false);
    }
  };

  return (
    <div className="learn">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img
              style={{ borderRadius: "20px" }}
              src={`data:image/jpeg;base64,${learn.userProfilePicture}`}
              alt="Profile"
            />
            <div className="details">
              <Link
                to={`/profile/${learn.userName}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{learn.userName}</span>
              </Link>
              <span className="date">1 min ago</span>
            </div>
          </div>
          {learn.userName === userName && (
            <div className="menu">
              <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
              {menuOpen && (
                <div className="dropdown-menu">
                  <button onClick={handleDeletePost}>Delete LearnPlan</button>
                  <button onClick={handleUpdateName}>
                    Update Topic Name
                  </button>
                  <button onClick={handleUpdateDescription}>
                    Update Description
                  </button>
                  <button onClick={handleUpdateContent}>Update Content</button>
                  <button onClick={handleUpdateKeyConcepts}>
                    Update Key Concepts
                  </button>
                  <button onClick={handleUpdateStudySchedule}>
                    Update Study Schedule
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <Form form={form}>
          <div className="content">
            <h2 style={{ textAlign: "center", textDecoration: "underline" }}>
              {learn.topicName}
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
              <p>{learn.description}</p>
            </div>
            <img src={`data:image/jpeg;base64,${learn.post}`} alt="NoImages" />
            <div
              style={{
                marginTop: "20px",
                backgroundColor: "rgba(248,215,213,255)",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <div className="sub-topic">
                <span>Content</span>
              </div>
              <p>{learn.content}</p>
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
                  <span>Difficulty Level</span>
                </div>
                <p>{learn.difficultyLevel}</p>
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
                  <span>Study Schedule</span>
                </div>
                <p>{learn.studySchedule}</p>
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
                <span>Key Concepts</span>
              </div>
              <p>{learn.keyConcepts}</p>
            </div>
            <div
              className="sub-topic"
              style={{ marginTop: "20px", marginBottom: "10px" }}
            >
              <span>Learning Preferences</span>
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
                  {learn.vegetarian ? (
                    <>
                      <div
                        style={{
                          backgroundColor: "rgba(17,134,123,255)",
                          padding: "20px",
                          borderRadius: "10px",
                          color: "white",
                        }}
                      >
                        Visual Learner
                      </div>
                    </>
                  ) : null}
                </li>
                <li>
                  {learn.vegan ? (
                    <>
                      <div
                        style={{
                          backgroundColor: "rgba(17,134,123,255)",
                          padding: "20px",
                          borderRadius: "10px",
                          color: "white",
                        }}
                      >
                        Auditory Learner
                      </div>
                    </>
                  ) : null}
                </li>
                <li>
                  {learn.glutenFree ? (
                    <>
                      <div
                        style={{
                          backgroundColor: "rgba(17,134,123,255)",
                          padding: "20px",
                          borderRadius: "10px",
                          color: "white",
                        }}
                      >
                        Kinesthetic Learner
                      </div>
                    </>
                  ) : null}
                </li>
                <li>
                  {learn.dairyFree ? (
                    <>
                      <div
                        style={{
                          backgroundColor: "rgba(17,134,123,255)",
                          padding: "20px",
                          borderRadius: "10px",
                          color: "white",
                        }}
                      >
                        Reading/Writing Learner
                      </div>
                    </>
                  ) : null}
                </li>
                <li>
                  {learn.nutFree ? (
                    <>
                      <div
                        style={{
                          backgroundColor: "rgba(17,134,123,255)",
                          padding: "20px",
                          borderRadius: "10px",
                          color: "white",
                        }}
                      >
                        Social Learner
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
            <p>{learn.comments}</p>
          </div>
        </div>
        {commentOpen && (
          <LearnPlanComments postId={learn.id} commenterName={userName} />
        )}
      </div>
    </div>
  );
};

export default LearnPlan;