import React from "react";

import './App.css';

function Address({ line1, line2, city, state, postal_code, country, setLine1, setLine2, setCity, setState, setPostalCode, setCountry,} ) {
  return(
    <>
      <label htmlFor="line1">line1</label>
      <input
        type="text"
        id="line1"
        value={line1}
        onChange={(e) => setLine1(e.target.value)}
      />
      <label htmlFor="line2">line2</label>
      <input
        type="text"
        id="line2"
        value={line2}
        onChange={(e) => setLine2(e.target.value)}
      />
      <label htmlFor="city">city</label>
      <input
        type="text"
        id="city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <label htmlFor="state">state</label>
      <input
        type="text"
        id="state"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <label htmlFor="postal_code">postal_code</label>
      <input
        type="text"
        id="postal_code"
        value={postal_code}
        onChange={(e) => setPostalCode(e.target.value)}
      />
      <label htmlFor="country">country</label>
      <input
        type="text"
        id="country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
    </>
  )
}

export default Address;
