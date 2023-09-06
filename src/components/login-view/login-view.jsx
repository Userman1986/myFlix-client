import React, { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); // Add password state

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password, // Use the password state
    };

    fetch("https://guarded-hamlet-46049-f301c8b926bd.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password} // Bind to the password state
          onChange={(e) => setPassword(e.target.value)} // Update the password state
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
