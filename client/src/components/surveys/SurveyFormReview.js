import React from 'react';

const SurveyFormReview = ({ onCancel }) => {
  return (
    <div>
      <h5>Please Check this first</h5>
      <button className="teal btn-flat" onClick={onCancel}>
        Back
      </button>
    </div>
  );
};

export default SurveyFormReview;
