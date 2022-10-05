import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../api/constants";
import { UserWithKey } from "../types";

export default function UserInfo() {
  const [user, setUser] = useState<UserWithKey | null>(null);

  useEffect(() => {
    axios.get(`${url}/api/users/me`, { withCredentials: true }).then((response) => {
      setUser(response.data);
    });
  }, []);

  if (!user) return null;

  return (
    <div>
      <h1>{user.username}</h1>
      {user.admin && <h3>Admin</h3>}
      <p>{user.id}</p>
      <p>{user.email}</p>
    </div>
  );
}
