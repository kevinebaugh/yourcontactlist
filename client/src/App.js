import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';

import NavBar from "./NavBar";
import SignInUp from "./SignInUp";
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
  const [addressBook, setAddressBook] = useState([])

  useEffect(() => {
    fetch("/me")
      .then(response => {
        if (response.ok) {
          response.json()
          .then(data => {
            console.log("data", data)
            setName(data.name)
            setPerson(data.email_address)
            if (data.household_id) {
              setHouseholdId(data.household_id)
              setLine1(data.address?.line1)
              setLine2(data.address?.line2)
              setCity(data.address?.city)
              setState(data.address?.state)
              setPostalCode(data.address?.postal_code)
              setCountry(data.address?.country)
              setFollowedHouseholds(data.followings)
              setAddressBook(data.addresses)
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
      })}

  function updateAddress() {
    fetch('/update_address', {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        household_id: household_id,
        line1: line1,
        line2: line2,
        city: city,
        state: state,
        postal_code: postal_code,
        country: country
      })
    }).then(response => response.json())
      .then(data => console.log("data", data)
    )}

  function deleteAddress() {
    fetch('/delete_address', {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        household_id: household_id
      })
    }).then(response => response.json())
      .then(data => {
        console.log(data)
      })
    }


  if (!person) return (
    <SignInUp
      handleSignup={handleSignup}
      handleSignin={handleSignin}
      name={name}
      setName={setName}
      email_address={email_address}
      setEmailAddress={setEmailAddress}
      password={password}
      setPassword={setPassword}
      password_confirmation={password_confirmation}
      setPasswordConfirmation={setPasswordConfirmation}
      household_id={household_id}
      setHouseholdId={setHouseholdId}
    />
  )

  return (
    <>
      <BrowserRouter>
        <NavBar name={name} handleSignOut={handleSignOut} />
        <Switch>
          <Route exact path="/your-address">
            <Address
              name={name}
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
              updateAddress={updateAddress}
              deleteAddress={deleteAddress}
            />
          </Route>
          <Route exact path="/address-book">
            {followedHouseholds.length > 0 ? (
              <AddressBook followedHouseholds={followedHouseholds} addressBook={addressBook} handleHouseholdRemoval={handleHouseholdRemoval} />
            ) : (
              <h3>Your household doesn't currently follow any other households. 👉 <a href="/available-addresses">Available addresses</a></h3>
            )}
          </Route>
          <Route exact path="/available-addresses">
            {allHouseholds.length > followedHouseholds.length ? (
              <AvailableHouseholds
                allHouseholds={allHouseholds}
                followedHouseholds={followedHouseholds}
                household_id={household_id}
                handleNewFollow={handleNewFollow}
              />
            ) : null }
          </Route>
        </Switch>
      </BrowserRouter>

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
