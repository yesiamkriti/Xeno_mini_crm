import React, { useState } from 'react';
import axios from 'axios';

const NaturalInput = ({ setQuery }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    setLoading(true);
    const res = await axios.post('http://localhost:5000/api/ai/text-to-segment', { prompt }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    setQuery(res.data.rules);
    setLoading(false);
  };

  return (
    <div className="my-4">
      <textarea
        className="w-full p-2 border rounded"
        rows="3"
        placeholder='e.g. "People who haven’t shopped in 6 months and spent over ₹5000"'
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={handleConvert}
        className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Convert to Segment Rules'}
      </button>
    </div>
  );
};

export default NaturalInput;
