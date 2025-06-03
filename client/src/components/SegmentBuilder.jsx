import React from 'react';
import { QueryBuilder } from 'react-querybuilder';
import 'react-querybuilder/dist/query-builder.css';

const fields = [
  { name: 'totalSpend', label: 'Total Spend', type: 'number' },
  { name: 'visits', label: 'Visits', type: 'number' },
  { name: 'lastActive', label: 'Last Active', type: 'date' },
];

const SegmentBuilder = ({ query, setQuery }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Define Audience</h2>
      <QueryBuilder
        fields={fields}
        query={query}
        onQueryChange={q => setQuery(q)}
      />
    </div>
  );
};

export default SegmentBuilder;
