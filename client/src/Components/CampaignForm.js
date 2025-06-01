import React, { useState } from "react";
import RuleBuilder from "./RuleBuilder";
import AIMessageGenerator from "./AIMessageGenerator";
import axios from "axios";

export default function CampaignForm() {
  const [rules, setRules] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [message, setMessage] = useState("");

  const preview = async () => {
    const res = await axios.post("http://localhost:5000/api/segments/preview", { rules });
    setCustomers(res.data.customers);
  };

  const send = async () => {
    await axios.post("http://localhost:5000/api/campaign/send", {
      campaignName: "AI Campaign",
      messageTemplate: message,
      customers,
    });
    alert("Campaign sent!");
  };

  return (
    <div>
      <h2>Build Segment</h2>
      <RuleBuilder rules={rules} setRules={setRules} />
      <button onClick={preview}>Preview Audience</button>

      <h4>Audience: {customers.length} users</h4>

      <AIMessageGenerator setMessage={setMessage} />
      <p><b>Selected Message:</b> {message}</p>

      <button onClick={send}>Send Campaign</button>
    </div>
  );
}
