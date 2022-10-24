import { ScriptMetadataWithId, UserWithKey } from "../types";

export default function canEditScript(
  script: ScriptMetadataWithId,
  user: UserWithKey | undefined,
): boolean {
  if (user === undefined) return false;
  // no one can edit archived
  if (script.archived) return false;

  // admins can edit any non-archived
  if (user.admin) return true;

  // only non-admins can create global templates
  if (script.globalTemplate) return false;
  // only non-admins can edit other's
  if (script.user.id !== user.id) return false;

  return true;
}
