import React from "react";
import './App.css';

function AvailableHouseholds({ allHouseholds, followedHouseholds, household_id, handleNewFollow } ) {
  return(
    <>
      <h2>Available households:</h2>
        {allHouseholds.filter((household) => {
          const followedIds = followedHouseholds.map((household) => household.id)
          const alreadyFollowed = followedIds.includes(household.id)

          return !!!alreadyFollowed
        }).filter((household) => {
          return household_id !== household.id
        }).map((household) =>
          <>
            <form id={`all_household_id_${household.id}`} onSubmit={handleNewFollow}>
              <button type="submit">Follow the {household.name} household</button>
            </form>
          </>
        )}
    </>
  )
}

export default AvailableHouseholds;
