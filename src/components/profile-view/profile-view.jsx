<<<<<<< Updated upstream
// ProfileView.jsx
=======
>>>>>>> Stashed changes
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

export const ProfileView = ({ user, onUpdateUser, onDeregister, favoriteMovies }) => {
<<<<<<< Updated upstream
  const [userData, setUserData] = useState({}); // Store user data for editing
=======
  const [userData, setUserData] = useState({});
>>>>>>> Stashed changes
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setUserData({
      username: user.username,
      email: user.email,
      dob: user.dob,
    });
  }, [user]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleSave = () => {
    onUpdateUser(userData);
    setEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="profile-view">
      <h2>Profile</h2>
      {editing ? (
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formDOB">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dob"
              value={userData.dob}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </Form>
      ) : (
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Date of Birth:</strong> {user.dob}</p>
          <Button variant="primary" onClick={handleEdit}>
            Edit
          </Button>
          <Button variant="danger" onClick={onDeregister}>
            Deregister
          </Button>
        </div>
      )}

      <h3>Favorite Movies</h3>
      <ul>
        {favoriteMovies.map((movie) => (
          <li key={movie._id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};
