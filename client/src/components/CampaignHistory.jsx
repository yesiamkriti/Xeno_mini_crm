import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CampaignHistory = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const res = await axios.get('/api/campaigns');
      setCampaigns(res.data);
    };
    fetchCampaigns();
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-4">Campaign History</h2>
      <ul className="space-y-2">
        {campaigns.map(c => (
          <li key={c._id} className="p-4 border rounded shadow-sm">
            <h3 className="text-lg font-bold">{c.name}</h3>
            <p>Sent: {c.sent}</p>
            <p>Failed: {c.failed}</p>
            <p>Audience: {c.audienceSize}</p>
            <p>Created: {new Date(c.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CampaignHistory;
