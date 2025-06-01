import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CampaignHistory() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const res = await axios.get("http://localhost:5000/api/campaign/history");
      setLogs(res.data);
    };
    fetchLogs();
  }, []);

  return (
    <div>
      <h2>📊 Campaign History</h2>
      {logs.length === 0 && <p>No campaigns yet</p>}
      {logs.map((log) => (
        <div
          key={log._id}
          style={{
            border: "1px solid #ccc",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <p><strong>Campaign:</strong> {log.campaignName}</p>
          <p><strong>Customer:</strong> {log.customerId?.name}</p>
          <p><strong>Email:</strong> {log.customerId?.email}</p>
          <p><strong>Status:</strong> {log.status}</p>
          <p><strong>Message:</strong> {log.message}</p>
        </div>
      ))}
    </div>
  );
}
