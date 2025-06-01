import React from "react";
import CampaignForm from "./Components/CampaignForm";
import CampaignHistory from "./Components/CampaignHistory";
import Login from "./Components/Login";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <h1>Mini CRM App</h1>
        <nav>
          <Link to="/">Segment + Campaign</Link> |{" "}
          <Link to="/history">History</Link> |{" "}
          <Link to="/login">Login</Link>
        </nav>
        <hr />
        <Routes>
          <Route path="/" element={<CampaignForm />} />
          <Route path="/history" element={<CampaignHistory />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
