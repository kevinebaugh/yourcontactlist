import React from "react";
import './App.css';

function AddressBook({ followedHouseholds, addressBook, handleHouseholdRemoval } ) {

  function addressForHousehold(id) {
    let address = addressBook.find((address) => {
      return address.household_id === id
    })
    return `
      ${address?.line1}
      ${address?.line2}
      ${address?.city}
      ${address?.state}
      ${address?.postal_code}
      ${address?.country}
    `
  }

  return(
    <>
      <h2>Your address book:</h2>
      <ul>
      {followedHouseholds.map((household) =>
          <li key={household.id}>
            <b>The {household.name} Household</b>
            <br/>{addressForHousehold(household.id)}
            <span className="x" id={`followed_household_id_${household.id}`} onClick={handleHouseholdRemoval} title="Remove this household"> ❌</span>
          </li>
      )}
      </ul>
    </>
  )
}

export default AddressBook;
