/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';

function ExperienceTableRow({
  name, descriptions, newReviewData, handleNewReviewChange, id,
}) {
  const change = (e) => {
    handleNewReviewChange(e, null, null, id);
  };
  return (
    <tr>
      <td>{name}</td>
      { descriptions.map((des, index) => (
        <td key={index}>
          <span>
            <label htmlFor={name.toLowerCase()}>
              {des}
            </label>
            <input className="charSelect" type="radio" name={name.toLowerCase()} value={index + 1} onChange={(e) => { change(e, id); }} checked={newReviewData.characteristics?.[name]} />
          </span>

        </td>
      ))}
    </tr>
  );
}
export default ExperienceTableRow;
