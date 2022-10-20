import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import { validate as uuidValidate } from "uuid";
import { BatchWithJobs } from "../types";
import { url } from "./constants";

// accepts weird types due to react-router's query type
export default function useBatch(id: string | string[] | undefined) {
  return useQuery<BatchWithJobs>(
    ["batch", id],
    async () => {
      const response = await ky.get(`${url}/api/batches/${id}`);
      return response.json<BatchWithJobs>();
    },
    { enabled: typeof id === "string" && uuidValidate(id) },
  ).data;
}
