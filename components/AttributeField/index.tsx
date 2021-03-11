import React from 'react';

const AttributeField = ({ title, value }) => {
  return (
    <div className="flex flex-row justify-around">
      <span className="font-bold">
        {title.replace(/^\w/, c => c.toUpperCase())}
      </span>
      <span>{value}</span>
    </div>
  );
};

export default AttributeField;
