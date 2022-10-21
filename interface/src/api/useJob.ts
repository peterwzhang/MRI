import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import { validate as uuidValidate } from "uuid";
import { Job } from "../types";
import { apiUrl } from "./constants";

export default function useJob(batchId: string | undefined, jobId: string | undefined) {
  return useQuery<Job>(
    ["batch", batchId, jobId],
    async () => {
      const response = await ky.get(`${apiUrl}/api/batches/${batchId}/jobs/${jobId}`);
      return response.json<Job>();
    },
    {
      enabled:
        batchId !== undefined &&
        uuidValidate(batchId) &&
        jobId !== undefined &&
        uuidValidate(jobId),
    },
  ).data;
}
