import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import { Script } from "../types";
import { url } from "./constants";

export default function useScript(id: string | undefined, enabled = true) {
  return useQuery<Script>(
    ["script", id],
    async () => {
      const response = await ky.get(`${url}/api/scripts/${id}`);
      return response.json<Script>();
    },
    { enabled: enabled && id !== undefined },
  ).data;
}
