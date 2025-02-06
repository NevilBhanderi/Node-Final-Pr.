import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:1008/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUserId) {
        await axios.put(`http://localhost:1008/api/users/${editingUserId}`, {
          name,
          email,
          password,
        });
      } else {
        const res = await axios.post("http://localhost:1008/api/users", {
          name,
          email,
          password,
        });
        setUsers([...users, res.data]);
      }
      resetForm();
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:1008/api/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };
  

  const editUser = (user) => {
    setName(user.name);
    setEmail(user.email);
    setPassword(user.password);
    setEditingUserId(user._id);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setEditingUserId(null);
  };

  return (
    <>
      <h1>User List</h1>
      {users.map((user) => (
        <ul key={user._id}>
          <li>
            Name: {user.name} <br />
            Email: {user.email} <br />
            Password: {user.password}
          </li>
          <button onClick={() => editUser(user)}>Edit</button>
          <button onClick={() => deleteUser(user._id)}>Delete</button>
        </ul>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">{editingUserId ? "Update User" : "Add User"}</button>
      </form>
    </>
  );
}
