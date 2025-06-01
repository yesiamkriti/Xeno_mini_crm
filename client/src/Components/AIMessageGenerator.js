import React, { useState } from "react";
import axios from "axios";

export default function AIMessageGenerator({ setMessage }) {
  const [objective, setObjective] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const generate = async () => {
    const res = await axios.post("http://localhost:5000/api/ai/suggest", {
      objective,
    });
    setSuggestions(res.data.suggestions);
  };

  return (
    <div>
      <h3>AI Message Suggestions</h3>
      <input
        value={objective}
        onChange={(e) => setObjective(e.target.value)}
        placeholder="e.g. win back inactive users"
      />
      <button onClick={generate}>Generate</button>

      {suggestions.map((msg, i) => (
        <p key={i} onClick={() => setMessage(msg)} style={{ cursor: "pointer" }}>
          👉 {msg}
        </p>
      ))}
    </div>
  );
}
