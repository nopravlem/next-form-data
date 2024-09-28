"use client";

import { useState } from "react";
import Link from "next/link";

type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
}

const UserForm = () => {
  const [users, setUsers] = useState<string[]>([]);
  const handleGetUsers = async () => {
    const response = await fetch("/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const db_users = await response.json();
      setUsers(db_users.map((usr: User) => usr.name));
    } else {
      alert("Something went wrong!");
    }
  };

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    formData.forEach((value, key) => console.log(`${key}: ${value}\n`));

    const response = await fetch("/api/users", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("Data saved successfully!");
    } else {
      alert("Something went wrong!");
    }
  };

  return (
    <div>
      <form
        method="post"
        encType="multipart/form-data"
        onSubmit={handleSaveUser}
      >
        <input type="text" name="name" />
        <input type="text" name="email" />
        <input type="password" name="password" />

        <button>Save Data</button>
      </form>

      <button onClick={handleGetUsers}>Show Updated User List</button>
      {users.map((user, idx) => (
        <p key={idx}>{user}</p>
      ))}

      <p>
        <Link href="/">Go back to main page!</Link>
      </p>
    </div>
  );
};

export default UserForm;
