import { useMutation, useQueryClient } from "@tanstack/react-query";
import ky from "ky";
import { apiUrl } from "./constants";

export default function useJobApproveMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    (props: { batchId: string; jobs: string[] }) =>
      ky.post(`${apiUrl}batches/${props.batchId}/approve`, {
        json: props.jobs,
        credentials: "include",
      }),
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["batch"]);
        queryClient.invalidateQueries(["batches"]);
      },
    },
  ).mutateAsync;
}
