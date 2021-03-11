import React from 'react';

const TopicField = ({ title, value }) => {
  return (
    <div className="mt-4 mb-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <span>{value}</span>
    </div>
  );
};

export default TopicField;
