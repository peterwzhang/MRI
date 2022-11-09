export default function useLogout() {
  return async () => {
    // single sign-out!
    window.location.href = "/logout/cas";
  };
}
