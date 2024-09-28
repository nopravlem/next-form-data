"use client";

import { useState } from "react";
import Link from "next/link";

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
      let db_users = await response.json();
      console.log(db_users);
      setUsers(db_users.map((usr: any) => usr.name));
    } else {
      alert("Something went wrdfgdgong!");
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
