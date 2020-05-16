import React from "react";

const AddUser = ({ username, email, handleSubmit, handleChange }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <input
          name="username"
          className="input is-large"
          type="text"
          placeholder="Enter a username"
          required
          value={username}
          onChange={handleChange}
        />
      </div>
      <div className="field">
        <input
          name="email"
          className="input is-large"
          type="email"
          placeholder="Enter an email address"
          required
          value={email}
          onChange={handleChange}
        />
      </div>
      <input
        type="submit"
        className="button is-primary is-large is-fullwidth"
        value="Submit"
      />
    </form>
  );
};

export default AddUser;
