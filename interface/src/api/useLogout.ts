import ky from "ky";

export default function useLogout() {
  return async () => {
    await ky.post("/logout");
    // must do a full redirect, otherwise react-router will "helpfully" not reload
    window.location.href = "/";
  };
}
