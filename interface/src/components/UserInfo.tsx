import useCurrentUser from "../api/useCurrentUser";

export default function UserInfo() {
  const user = useCurrentUser();

  if (!user) return null;

  return (
    <div>
      <h2>{user.username}</h2>
      {user.admin && <h3>Admin</h3>}
      <p>{user.id}</p>
      <p>{user.email}</p>
    </div>
  );
}
