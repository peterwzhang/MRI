import ky from "ky";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "./constants";

export default function useLogout() {
  const navigate = useNavigate();

  return async () => {
    await ky.post(`${apiUrl}/logout`);
    navigate("/");
  };
}
