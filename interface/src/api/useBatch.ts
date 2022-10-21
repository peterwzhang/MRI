import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import { validate as uuidValidate } from "uuid";
import { BatchWithJobs } from "../types";
import { apiUrl } from "./constants";

export default function useBatch(id: string | undefined) {
  return useQuery<BatchWithJobs>(
    ["batch", id],
    async () => {
      const response = await ky.get(`${apiUrl}/api/batches/${id}`);
      return response.json<BatchWithJobs>();
    },
    { enabled: id !== undefined && uuidValidate(id) },
  ).data;
}
