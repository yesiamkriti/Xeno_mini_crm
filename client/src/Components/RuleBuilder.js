import React from "react";

export default function RuleBuilder({ rules, setRules }) {
  const updateRule = (i, field, value) => {
    const updated = [...rules];
    updated[i][field] = value;
    setRules(updated);
  };

  const addRule = () =>
    setRules([...rules, { field: "totalSpend", op: ">", value: 0 }]);

  return (
    <div>
      {rules.map((rule, i) => (
        <div key={i} style={{ marginBottom: "10px" }}>
          <select onChange={(e) => updateRule(i, "field", e.target.value)}>
            <option value="totalSpend">Spend</option>
            <option value="visits">Visits</option>
            <option value="inactive">Inactive (days)</option>
          </select>

          <select onChange={(e) => updateRule(i, "op", e.target.value)}>
            <option value=">">Greater than</option>
            <option value="<">Less than</option>
          </select>

          <input
            type="number"
            onChange={(e) => updateRule(i, "value", e.target.value)}
          />
        </div>
      ))}

      <button onClick={addRule}>+ Add Rule</button>
    </div>
  );
}
