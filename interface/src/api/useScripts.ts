import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import { ScriptCollection } from "../types";
import { apiUrl } from "./constants";

export default function useScripts(includeArchived: boolean) {
  return useQuery<ScriptCollection>(["scripts", includeArchived], async () => {
    const response = await ky.get(
      `${apiUrl}scripts?${new URLSearchParams({
        includeArchived: includeArchived ? "true" : "false",
      })}`,
      { credentials: "include" },
    );
    return response.json<ScriptCollection>();
  });
}
