import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import { ScriptWithId } from "../types";
import { apiUrl } from "./constants";

export default function useScript(id: string | undefined, enabled = true) {
  return useQuery<ScriptWithId>(
    ["script", id],
    async () => {
      const response = await ky.get(`${apiUrl}/api/scripts/${id}`);
      return response.json<ScriptWithId>();
    },
    { enabled: enabled && id !== undefined },
  ).data;
}
