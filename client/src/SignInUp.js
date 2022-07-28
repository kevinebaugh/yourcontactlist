import React from "react";
import './App.css';

function SignInUp({ handleSignup, handleSignin, name, setName, email_address, setEmailAddress, password, setPassword, password_confirmation, setPasswordConfirmation, household_id, setHouseholdId }) {
  return(
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
  )
}

export default SignInUp;
