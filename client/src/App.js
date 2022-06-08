import React, { useState } from "react";
import './App.css';


function App() {
  const [email_address, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [household_id, setHouseholdId] = useState("");

  function handleSubmit(e) {
    e.preventDefault()

    console.log("email_address", email_address)
    console.log("password", password)
    console.log("password_confirmation", password_confirmation)
    console.log("household_id", household_id)

    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email_address,
        household_id: household_id,
        password: password,
        password_confirmation: password_confirmation,
      }),
    }).then((response) => {
      console.log(response)
    });

    console.log("submitted")
  }

  return (
    <form onSubmit={handleSubmit}>
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
  );
}

export default App;
