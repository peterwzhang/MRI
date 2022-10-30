import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import { UserWithKey } from "../types";
import { apiUrl } from "./constants";

export default function useCurrentUser() {
  return useQuery<UserWithKey>(["user"], async () => {
    const response = await ky.get(`${apiUrl}users/me`);
    return response.json<UserWithKey>();
  }).data;
}
