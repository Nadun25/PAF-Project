import "./mealPlan.scss";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import MealPlanComments from "../mealPlanComments/MealPlanComment";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  Checkbox,
} from "antd";

const { TextArea } = Input;
const { Option } = Select;

const MealPlan = ({ meal, userName }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Set initial form values when meal changes or modal opens
  useEffect(() => {
    if (isModalVisible) {
      form.setFieldsValue({
        mealName: meal.mealName,
        description: meal.description,
        recipe: meal.recipe,
        portion: meal.portion,
        schedule: meal.schedule,
        nutrition: meal.nutrition,
        vegetarian: meal.vegetarian,
        vegan: meal.vegan,
        glutenFree: meal.glutenFree,
        dairyFree: meal.dairyFree,
        nutFree: meal.nutFree,
      });
    }
  }, [isModalVisible, meal, form]);

  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/deleteMeal/${id}`);
      Swal.fire("Success!", "Study Plan deleted successfully!", "success");
    } catch (error) {
      console.error("Error deleting post:", error);
      Swal.fire("Error!", "Failed to delete Study Plan.", "error");
    }
  };

  const handleFullUpdate = async (values) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/updateMealPlan/${meal.id}`,
        values
      );
      Swal.fire("Success!", "Study Plan updated successfully!", "success");
      setIsModalVisible(false);
      // Refresh the page to see changes
      window.location.reload();
    } catch (error) {
      console.error("Error updating Study Plan:", error);
      Swal.fire("Error!", "Failed to update Study Plan.", "error");
    }
  };

  const handleDeletePost = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deletePost(meal.id);
        setMenuOpen(false);
      }
    });
  };

  const showModal = () => {
    setIsModalVisible(true);
    setMenuOpen(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
                  <button onClick={handleDeletePost}>Delete StudyPlan</button>
                  <button onClick={showModal}>Update StudyPlan</button>
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
                <span>Resources</span>
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
                  <span>Study Plan</span>
                </div>
                <p>
                  {meal.portion === 'Small' ? 'Daily Consistency Plan' :
                   meal.portion === 'Medium' ? 'Weekend Booster Plan' :
                   meal.portion === 'Large' ? 'Focused Sprint Plan' : ''}
                </p>
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
                <p>
                  {meal.schedule === 'one' ? '30 minutes' :
                   meal.schedule === 'two' ? '1–3 hours' :
                   meal.schedule === 'three' ? '3–5 hours' :
                   meal.schedule === 'four' ? '6–7 hours' :
                   meal.schedule === 'five' ? 'More than 7 hours' : ''}
                </p>
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
                <span>Subjects Learned</span>
              </div>
              <p>{meal.nutrition}</p>
            </div>
            <div
              className="sub-topic"
              style={{ marginTop: "20px", marginBottom: "10px" }}
            >
              <span>Focus Mode</span>
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
                  {meal.vegetarian && (
                    <div
                      style={{
                        backgroundColor: "rgba(17,134,123,255)",
                        padding: "20px",
                        borderRadius: "10px",
                        color: "white",
                      }}
                    >
                      Distraction-Free Mode
                    </div>
                  )}
                </li>
                <li>
                  {meal.vegan && (
                    <div
                      style={{
                        backgroundColor: "rgba(17,134,123,255)",
                        padding: "20px",
                        borderRadius: "10px",
                        color: "white",
                      }}
                    >
                      Listening to Music
                    </div>
                  )}
                </li>
                <li>
                  {meal.glutenFree && (
                    <div
                      style={{
                        backgroundColor: "rgba(17,134,123,255)",
                        padding: "20px",
                        borderRadius: "10px",
                        color: "white",
                      }}
                    >
                      Digital Notes
                    </div>
                  )}
                </li>
                <li>
                  {meal.dairyFree && (
                    <div
                      style={{
                        backgroundColor: "rgba(17,134,123,255)",
                        padding: "20px",
                        borderRadius: "10px",
                        color: "white",
                      }}
                    >
                      Hand Written Notes
                    </div>
                  )}
                </li>
                <li>
                  {meal.nutFree && (
                    <div
                      style={{
                        backgroundColor: "rgba(17,134,123,255)",
                        padding: "20px",
                        borderRadius: "10px",
                        color: "white",
                      }}
                    >
                      Medication Before Studying
                    </div>
                  )}
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

      {/* Update Modal */}
      <Modal
        title="Update Study Plan"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              form
                .validateFields()
                .then((values) => {
                  handleFullUpdate(values);
                })
                .catch((info) => {
                  console.log("Validate Failed:", info);
                });
            }}
          >
            Update
          </Button>,
        ]}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            mealName: meal.mealName,
            description: meal.description,
            recipe: meal.recipe,
            portion: meal.portion,
            schedule: meal.schedule,
            nutrition: meal.nutrition,
            vegetarian: meal.vegetarian,
            vegan: meal.vegan,
            glutenFree: meal.glutenFree,
            dairyFree: meal.dairyFree,
            nutFree: meal.nutFree,
          }}
        >
          <Form.Item
            name="mealName"
            label="Study Plan Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input placeholder="Study Plan Name" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please input the description!" }]}
          >
            <TextArea rows={4} placeholder="Description" />
          </Form.Item>

          <Form.Item
            name="recipe"
            label="Resources Used"
            rules={[{ required: true, message: "Please input the resources!" }]}
          >
            <TextArea rows={4} placeholder="Resources" />
          </Form.Item>

          <Form.Item
            name="portion"
            label="Study Plan"
            rules={[{ required: true, message: "Please select a plan!" }]}
          >
            <Select placeholder="Select plan">
              <Option value="Small">Daily Consistency Plan</Option>
              <Option value="Medium">Weekend Booster Plan</Option>
              <Option value="Large">Focused Sprint Plan</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="schedule"
            label="Study Schedule"
            rules={[{ required: true, message: "Please select a schedule!" }]}
          >
            <Select placeholder="Select schedule">
              <Option value="one">30 minutes a day</Option>
              <Option value="two">1 - 3 hours a day</Option>
              <Option value="three">3 - 5 hours a day</Option>
              <Option value="four">6 - 7 hours a day</Option>
              <Option value="five">More than 7 hours</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="nutrition"
            label="Subjects Learned"
            rules={[{ required: true, message: "Please input subjects!" }]}
          >
            <TextArea rows={4} placeholder="Subjects" />
          </Form.Item>

          <Form.Item label="Focus Mode">
            <Form.Item name="vegetarian" valuePropName="checked" noStyle>
              <Checkbox>Distraction-Free Mode</Checkbox>
            </Form.Item>
            <br />
            <Form.Item name="vegan" valuePropName="checked" noStyle>
              <Checkbox>Listening to Music</Checkbox>
            </Form.Item>
            <br />
            <Form.Item name="glutenFree" valuePropName="checked" noStyle>
              <Checkbox>Digital Notes</Checkbox>
            </Form.Item>
            <br />
            <Form.Item name="dairyFree" valuePropName="checked" noStyle>
              <Checkbox>Hand Written Notes</Checkbox>
            </Form.Item>
            <br />
            <Form.Item name="nutFree" valuePropName="checked" noStyle>
              <Checkbox>Medication Before Studying</Checkbox>
            </Form.Item>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MealPlan;