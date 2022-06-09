import React, { useState, useEffect } from "react";
import './App.css';


function App() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email_address, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [household_id, setHouseholdId] = useState("");

  useEffect(() => {
    fetch("/me")
      .then(response => {
        if (response.ok) {
          response.json()
          .then(data => {
            setUser(data.email_address)
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
        console.log("data", data)
        setUser(data.email_address)
      })
  }

  return (
    <>
      {user ? (
        <h1>Hello, {user}!</h1>
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
