import { useMutation, useQueryClient } from "@tanstack/react-query";
import ky from "ky";
import { BatchForSubmission, BatchMetadataWithId } from "../types";
import { apiUrl } from "./constants";

export default function useBatchCreateMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    (newBatch: BatchForSubmission) =>
      ky.post(`${apiUrl}/api/batches`, { json: newBatch }).json<BatchMetadataWithId>(),
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["scripts"]);
        queryClient.invalidateQueries(["batches"]);
      },
    },
  ).mutateAsync;
}
