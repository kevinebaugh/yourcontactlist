import React, { useState, useEffect } from "react";
import './App.css';


function App() {
  const [person, setPerson] = useState(null);
  const [name, setName] = useState("");
  const [email_address, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [household_id, setHouseholdId] = useState("");

  const [line1, setLine1] = useState(null)
  const [line2, setLine2] = useState(null)
  const [city, setCity] = useState(null)
  const [state, setState] = useState(null)
  const [postal_code, setPostalCode] = useState(null)
  const [country, setCountry] = useState(null)

  useEffect(() => {
    fetch("/me")
      .then(response => {
        if (response.ok) {
          response.json()
          .then(data => {
            console.log(data)
            setName(data.name)
            setPerson(data.email_address)
            if (data.household_id) {
              setHouseholdId(data.household_id)
              setLine1(data.address.line1)
              setLine2(data.address.line2)
              setCity(data.address.city)
              setState(data.address.state)
              setPostalCode(data.address.postal_code)
              setCountry(data.address.country)
            }
          })
        }
      })
  }, []);

  function handleSubmit(e) {
    e.preventDefault()

    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email_address: email_address,
        household_id: household_id,
        password: password,
        password_confirmation: password_confirmation,
      }),
    }).then(response => response.json())
      .then(data => {
        setPerson(data.email_address)
        if (data.household_id) {
          setHouseholdId(data.household_id)
          setLine1(data.address.line1)
          setLine2(data.address.line2)
          setCity(data.address.city)
          setState(data.address.state)
          setPostalCode(data.address.postal_code)
          setCountry(data.address.country)
        }
      })
  }

  return (
    <>
      {person ? (
        <>
          <h1>Hello, {name}!</h1>
          <h2>Your address:</h2>
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

          <h2>Your address book:</h2>

        </>
      ) : (
        <>
          <h1>Sign up!</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="email_address">Email address</label>
            <input
              type="text"
              id="email_address"
              value={email_address}
              onChange={(e) => setEmailAddress(e.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label htmlFor="password_confirmation">Password confirmation</label>
            <input
              type="password"
              id="password_confirmation"
              value={password_confirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />

            <label htmlFor="household_id">Household ID</label>
            <input
              type="text"
              id="household_id"
              value={household_id}
              onChange={(e) => setHouseholdId(e.target.value)}
            />

            <button type="submit">Sign up</button>
          </form>
        </>
      )}
    </>
  );
}

export default App;
