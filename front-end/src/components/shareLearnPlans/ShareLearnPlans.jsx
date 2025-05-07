import React, { useState } from "react";
import axios from "axios";
import "./ShareLearnPlans.scss";
import Image from "../../assets/img.png";

const ShareLearnPlans = ({ userName, profilePic }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [description, setDescription] = useState("");
  const [topicName, setTopicName] = useState("");
  const [content, setContent] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [studySchedule, setStudySchedule] = useState("");
  const [keyConcepts, setKeyConcepts] = useState("");
  const [visualLearner, setVisualLearner] = useState(false);
  const [auditoryLearner, setAuditoryLearner] = useState(false);
  const [kinestheticLearner, setKinestheticLearner] = useState(false);
  const [readingLearner, setReadingLearner] = useState(false);
  const [socialLearner, setSocialLearner] = useState(false);

  // Event handler functions for each learning style checkbox
  const handleVisualLearnerChange = (e) => setVisualLearner(e.target.checked);
  const handleAuditoryLearnerChange = (e) => setAuditoryLearner(e.target.checked);
  const handleKinestheticLearnerChange = (e) => setKinestheticLearner(e.target.checked);
  const handleReadingLearnerChange = (e) => setReadingLearner(e.target.checked);
  const handleSocialLearnerChange = (e) => setSocialLearner(e.target.checked);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };

  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append("userName", userName);
      formData.append("post", selectedImage);
      formData.append("topicName", topicName);
      formData.append("description", description);
      formData.append("content", content);
      formData.append("difficultyLevel", difficultyLevel);
      formData.append("studySchedule", studySchedule);
      formData.append("keyConcepts", keyConcepts);
      formData.append("visualLearner", visualLearner);
      formData.append("auditoryLearner", auditoryLearner);
      formData.append("kinestheticLearner", kinestheticLearner);
      formData.append("readingLearner", readingLearner);
      formData.append("socialLearner", socialLearner);

      const response = await axios.post("http://localhost:8080/shareLearnPlan", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      alert("LearnPlan shared successfully!");
    } catch (error) {
      console.error("Error posting learn plan:", error);
      alert("Error in learn plan sharing");
    }
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img src={`data:image/jpeg;base64,${profilePic}`} alt="Profile" />
          <span className="name">{userName}</span>
        </div>
        <input className="name-input"
          type="text"
          placeholder={`Enter Topic Name`}
          value={topicName}
          onChange={(e) => setTopicName(e.target.value)}
        />
        <div className="sub-topic">
          <span>Description</span>
          <hr />
        </div>
        <textarea className="description"
          type="text"
          placeholder={`Enter Description About the Topic`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="sub-topic">
          <span>Content</span>
          <hr />
        </div>
        <textarea className="content"
          type="text"
          placeholder={`Enter detailed content about the topic`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="sub-topic">
          <span>Difficulty Level</span>
          <hr />
        </div>
        <select
          value={difficultyLevel}
          onChange={(e) => setDifficultyLevel(e.target.value)}
        >
          <option value="">Select difficulty level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <div className="sub-topic">
          <span>Study Schedule</span>
          <hr />
        </div>
        <select
          value={studySchedule}
          onChange={(e) => setStudySchedule(e.target.value)}
        >
          <option value="">Select study schedule</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Bi-weekly">Bi-weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Weekends only">Weekends only</option>
        </select>
        <div className="sub-topic">
          <span>Key Concepts</span>
          <hr />
        </div>
        <textarea className="keyConcepts"
          type="text"
          placeholder={`Enter key concepts to focus on`}
          value={keyConcepts}
          onChange={(e) => setKeyConcepts(e.target.value)}
        />
        <div className="sub-topic">
          <span>Learning Preferences</span>
          <hr />
        </div>
        <div className="learning-styles">
          <form>
            <label>
              <input
                type="checkbox"
                checked={visualLearner}
                onChange={handleVisualLearnerChange}
              />
              Visual Learner
            </label>

            <label>
              <input
                type="checkbox"
                checked={auditoryLearner}
                onChange={handleAuditoryLearnerChange}
              />
              Auditory Learner
            </label>

            <label>
              <input
                type="checkbox"
                checked={kinestheticLearner}
                onChange={handleKinestheticLearnerChange}
              />
              Kinesthetic Learner
            </label>

            <label>
              <input
                type="checkbox"
                checked={readingLearner}
                onChange={handleReadingLearnerChange}
              />
              Reading/Writing Learner
            </label>

            <label>
              <input
                type="checkbox"
                checked={socialLearner}
                onChange={handleSocialLearnerChange}
              />
              Social Learner
            </label>
          </form>
        </div>
        <hr />
        {previewImage && (
          <img
            src={previewImage}
            alt="Selected Learning Resource"
            style={{
              maxWidth: "100%",
              maxHeight: "500px",
              objectFit: "cover",
              marginTop: "20px"
            }}
          />
        )}
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Learning Resource</span>
              </div>
            </label>
          </div>
          <div className="right">
            <button onClick={handlePost}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareLearnPlans;