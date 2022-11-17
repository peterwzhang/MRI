import { useMutation, useQueryClient } from "@tanstack/react-query";
import ky from "ky";
import { UserWithKey } from "../types";
import { apiUrl } from "./constants";

export default function useCheckSsh() {
  const queryClient = useQueryClient();

  return useMutation(
    () => ky.post(`${apiUrl}users/me/check-ssh`, { credentials: "include" }).json<UserWithKey>(),
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["user"]);
      },
    },
  ).mutateAsync;
}
