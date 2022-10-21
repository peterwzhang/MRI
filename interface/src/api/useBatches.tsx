import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import { BatchCollection } from "../types";
import { apiUrl } from "./constants";

export default function useBatches() {
  return useQuery<BatchCollection>(["batches"], async () => {
    const response = await ky.get(`${apiUrl}/api/batches`);
    return response.json<BatchCollection>();
  }).data;
}
