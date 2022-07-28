import React, { useState, useEffect } from "react";
// import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';

import Address from "./Address";
import AddressBook from "./AddressBook";
import AvailableHouseholds from "./AvailableHouseholds";


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

  const [allHouseholds, setAllHouseholds] = useState([])
  const [followedHouseholds, setFollowedHouseholds] = useState([])

  useEffect(() => {
    fetch("/me")
      .then(response => {
        if (response.ok) {
          response.json()
          .then(data => {
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
              setFollowedHouseholds(data.followings)
            }
          })
        } else {
          console.log("Signed out")
        }
      })

    fetch('/households')
      .then(response => response.json())
      .then(data => {
        setAllHouseholds(data)
      })
  }, []);

  function handleSignup(e) {
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

  function handleSignin(e) {
    e.preventDefault()

    fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email_address,
        password: password
      }),
    }).then(response => response.json())
      .then(data => {
        setPerson(data.email_address)
      })
  }

  function handleNewFollow(e) {
    e.preventDefault()

    const household_id_to_follow = e.target.id.replace("all_household_id_", "")

    fetch('/update_follows', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        household_ids_to_follow: household_id_to_follow
      })
    }).then(response => response.json())
      .then(data => {
        setFollowedHouseholds(data)
      })
  }

  function handleHouseholdRemoval(e) {
    e.preventDefault()

    const household_id_to_remove = e.target.id.replace("followed_household_id_", "")

    fetch('/remove_follow', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        household_id_to_remove: household_id_to_remove
      })
    }).then(response => response.json())
      .then(data => {
        setFollowedHouseholds(data)
      })
  }

  function handleSignOut(e) {
    e.preventDefault()

    fetch('/signout', {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    }).then(response => response.json())
      .then(data => {
        console.log(data)
      })
      .catch((error) => {
        console.error(error)
        window.location.reload(false);
      })

  }

  return (
    <>
      <h1><img alt="Contact List logo" id="header-icon" src="logo192.png" /> Contact List</h1>
      <h3>Update your address and view your friends' updated addresses in one place.</h3>
      {person ? (
        <>
          <h1>Hello, {name}!
            <a id="sign-out-link" href="#" onClick={handleSignOut}>sign out</a>
          </h1>
          <h2>Your address</h2>
          <Address
            line1={line1}
            line2={line2}
            city={city}
            state={state}
            postal_code={postal_code}
            country={country}
            setLine1={setLine1}
            setLine2={setLine2}
            setCity={setCity}
            setState={setState}
            setPostalCode={setPostalCode}
            setCountry={setCountry}
          />

          {followedHouseholds.length > 0 ? (
            <AddressBook followedHouseholds={followedHouseholds} handleHouseholdRemoval={handleHouseholdRemoval} />
          ) : (
            <h3>Your household doesn't currently follow any other households.</h3>
          )}

          {allHouseholds.length > followedHouseholds.length ? (
            <AvailableHouseholds
              allHouseholds={allHouseholds}
              followedHouseholds={followedHouseholds}
              household_id={household_id}
              handleNewFollow={handleNewFollow}
            />
          ) : null }

        </>
      ) : (
        <>
          <h1>Sign up!</h1>
          <form onSubmit={handleSignup}>
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
              placeholder="Leave blank to generate a new household based on your last name"
              onChange={(e) => setHouseholdId(e.target.value)}
            />

            <button type="submit">Sign up</button>
          </form>

          <h1>Or, sign in!</h1>
          <form onSubmit={handleSignin}>
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

            <button type="submit">Sign in</button>
          </form>

        </>
      )}
      <footer>
        Logo: <a
          href="https://thenounproject.com/icon/stacked-envelopes-1130470/"
          target="_blank"
          rel="noreferrer"
        >
          Stacked Envelopes by Ben Davis, NounProject.com
        </a>
      </footer>
    </>
  );
}

export default App;
