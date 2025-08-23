import React, { useState, useEffect } from "react";
import axios from "axios";
import DefauProfile from './Pictures/DefauProfile.png';
import './ClientDisplay.css';

function ClientDisplay() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetchProfiles();


    const interval = setInterval(fetchProfiles, 5000);
        return () => clearInterval(interval);
  }, []);
    const Back_End_URL=process.env.REACT_APP_BACKEND_URL;
  const fetchProfiles = async () => {
    try {
      const res = await axios.get(`${Back_End_URL}/admin-display`);
      const data = Array.isArray(res.data.records) ? res.data.records : [];
      setProfiles(data);
    } catch (err) {
      console.error("Error fetching profiles:", err);
    }
  };

  return (
    <div className="profiles-container">
      <h2>View detailed profiles of service providers to choose the right professional.</h2>
      <div className="profile-grid">
        {profiles.map((profile) => (
          <div key={profile._id} className="profile-card">
            <div className="profile-set">
              <img src={DefauProfile} alt="Profile" className="profile-img" />
              <div className="profile-info">
                <label>Name:</label> <span>{profile.Name}</span>
                <label>Age:</label> <span>{profile.Age}</span>
                <label>Address:</label> <span>{profile.Address}</span>
                <label>Phone:</label> <span>{profile.PhoneNo}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClientDisplay;
