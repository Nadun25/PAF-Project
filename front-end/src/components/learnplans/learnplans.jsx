import React, { useState, useEffect } from "react";
import LearnPlan from "../learnplan/LearnPlan";
import axios from "axios";
import "./LearnPlans.scss";

const LearnPlans = ({ userName }) => {
  const [learnPlans, setLearnPlans] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/allLearnPlans`);
        console.log('Fetched all learn plans data:', response.data);

        setLearnPlans(response.data);
        console.log('Called setLearnPlans with data:', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log('Updated learnPlans state after setLearnPlans call:', learnPlans);
  });

  return (
    <div className="learnplans">
      {learnPlans.map(learnPlan => (
        <LearnPlan learn={learnPlan} userName={userName} key={learnPlan.id} />
      ))}
    </div>
  );
};

export default LearnPlans;