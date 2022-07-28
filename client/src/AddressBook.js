import React from "react";

import './App.css';

function AddressBook({ followedHouseholds, handleHouseholdRemoval } ) {
  return(
    <>
      <h2>Your address book:</h2>
      <ul>
      {followedHouseholds.map((household) =>
        <>
          <li>{household.name}
            <span className="x" id={`followed_household_id_${household.id}`} onClick={handleHouseholdRemoval} title="Remove this household"> ❌</span>
          </li>
        </>
      )}
      </ul>
    </>
  )
}

export default AddressBook;
