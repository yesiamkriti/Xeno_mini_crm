import React, { useState } from 'react';
import axios from 'axios';

const MessageSuggestions = ({ onSelect }) => {
  const [objective, setObjective] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const res = await axios.post('http://localhost:5000/api/ai/message-suggestions', { objective }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    setMessages(res.data.messages);
    setLoading(false);
  };

  return (
    <div className="my-4">
      <h3 className="text-lg font-semibold mb-2">AI Message Suggestions</h3>
      <input
        type="text"
        placeholder="e.g. Bring back inactive users"
        value={objective}
        onChange={(e) => setObjective(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <button onClick={handleGenerate} className="bg-indigo-600 text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? 'Generating...' : 'Suggest Messages'}
      </button>

      {messages.length > 0 && (
        <div className="mt-4 space-y-2">
          {messages.map((msg, idx) => (
            <div key={idx} className="bg-gray-100 p-2 rounded flex justify-between items-center">
              <span>{msg}</span>
              <button onClick={() => onSelect(msg)} className="ml-4 text-sm text-blue-600 hover:underline">
                Use
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageSuggestions;
